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
  const { mutateAsync: setLike } = usePostSetLike();

  const onSetLike = (data: { postId: string; isLike: boolean }) => {
    try {
      setLike(data);
    } catch (error) {
      toast.error(parseError(error));
    }
  };

  const handleDebouncedLike = useDebounceFn(onSetLike, DEFAULT_DEBOUNCE_TIME);

  const isLike = ref(false);
  const likesCount = ref(0);

  const post = computed(() => postData.value);
  const postLikes = computed(() => post.value?.likes ?? 0);
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

  watch(
    () => postLikes.value,
    (newValue) => {
      likesCount.value = newValue ?? 0;
    },
    {
      immediate: true,
    }
  );

  const handleLike = () => {
    isLike.value = !isLike.value;
    likesCount.value += isLike.value ? 1 : -1;
    handleDebouncedLike({ postId: postId, isLike: isLike.value });
  };

  const isPending = isGetPostPending || isGetPostLikePending;

  return {
    likesCount: computed(() => likesCount.value),
    isLike: computed(() => isLike.value),
    isPending,
    handleLike,
  };
}
