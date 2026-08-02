import { useDebounceFn } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { toast } from 'vue-sonner';

import { DEFAULT_DEBOUNCE_TIME } from '~/shared/config';
import { parseError } from '~/shared/lib';

import { useGetPost, useGetPostLike, usePostSetLike } from '../api';

export function usePostLikeComposable(postId: string) {
  const isLiked = ref(false);
  const likesCount = ref(0);

  const { data: postData, isPending: isGetPostPending } = useGetPost(postId);
  const { data: postLikeData, isPending: isGetPostLikePending } =
    useGetPostLike(postId);
  const { mutateAsync: setLike } = usePostSetLike();

  const postLikes = computed(() => postData.value?.likes ?? 0);
  const hasPostLike = computed(() => postLikeData.value?.hasPostLike);

  const onSetLike = () => {
    try {
      setLike({ postId: postId, isLike: isLiked.value });
    } catch (error) {
      toast.error(parseError(error));
    }
  };

  const handleDebouncedLike = useDebounceFn(onSetLike, DEFAULT_DEBOUNCE_TIME);

  const handleLike = () => {
    isLiked.value = !isLiked.value;
    likesCount.value += isLiked.value ? 1 : -1;
    handleDebouncedLike();
  };

  watch(
    () => hasPostLike.value,
    (newValue) => {
      isLiked.value = Boolean(newValue);
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

  const isPending = isGetPostPending || isGetPostLikePending;

  return {
    likesCount: computed(() => likesCount.value),
    isLiked: computed(() => isLiked.value),
    isPending,
    handleLike,
  };
}
