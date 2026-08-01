import { useDebounceFn } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { toast } from 'vue-sonner';

import { DEFAULT_DEBOUNCE_TIME } from '~/shared/config';
import { parseError } from '~/shared/lib';

import { useGetPost, useGetPostLike, usePostSetLike } from '../api';

export function usePostLikeComposable(postId: string) {
  const { data: postData, isPending: isGetPostPending } = useGetPost(postId);
  const { data: postLikeData, isPending: isGetPostLikePending } =
    useGetPostLike(postId);
  const { mutateAsync: setLike, isPending: isPostSetLikePending } =
    usePostSetLike();

  const onSetLike = (data: { postId: string; isLike: boolean }) => {
    try {
      setLike(data);
    } catch (error) {
      toast.error(parseError(error));
    }
  };

  const handleDebouncedLike = useDebounceFn(onSetLike, DEFAULT_DEBOUNCE_TIME);

  const isLike = ref(false);

  const post = computed(() => postData.value);
  const hasPostLike = computed(() => postLikeData.value?.hasPostLike);

  watch(
    () => hasPostLike.value,
    (newValue) => {
      isLike.value = Boolean(newValue);
    },
    {
      immediate: true,
    }
  );

  const handleLike = () => {
    isLike.value = !isLike.value;
    handleDebouncedLike({ postId: postId, isLike: isLike.value });
  };

  const isPending =
    isGetPostPending || isGetPostLikePending || isPostSetLikePending;

  return {
    likeCount: computed(() => post.value?.likes ?? 0),
    isLike,
    isPending,
    handleLike,
  };
}
