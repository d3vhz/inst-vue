import { useDebounceFn } from '@vueuse/core';
import { computed, type ComputedRef, ref, watch } from 'vue';
import { toast } from 'vue-sonner';

import { DEFAULT_DEBOUNCE_TIME } from '~/shared/config';
import { parseError } from '~/shared/lib';

import { usePostSetLike } from '../api';
import type { IPost } from '../model';

export function usePostLikeComposable(post: ComputedRef<IPost>) {
  const isLiked = ref(post.value.likedByUser);
  const likesCount = ref(post.value.likes);

  const { mutateAsync: setLike, isPending: isPostSetLikePending } =
    usePostSetLike();

  const onSetLike = async () => {
    try {
      await setLike({ postId: post.value.id, isLiked: isLiked.value });
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
    () => post.value,
    (newPost) => {
      isLiked.value = newPost.likedByUser;
      likesCount.value = newPost.likes;
    }
  );

  const isPending = isPostSetLikePending;

  return {
    likesCount: computed(() => likesCount.value),
    isLiked: computed(() => isLiked.value),
    isPending,
    handleLike,
  };
}
