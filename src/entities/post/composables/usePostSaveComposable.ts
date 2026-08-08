import { useDebounceFn } from '@vueuse/core';
import { computed, type ComputedRef, ref, watch } from 'vue';
import { toast } from 'vue-sonner';

import { DEFAULT_DEBOUNCE_TIME } from '~/shared/config';
import { parseError } from '~/shared/lib';

import { usePostSetSave } from '../api';
import type { IPost } from '../model';

export function usePostSaveComposable(post: ComputedRef<IPost>) {
  const isSaved = ref(post.value.savedByUser);

  const { mutateAsync: setSave, isPending: isPostSetSavePending } =
    usePostSetSave();

  const onSetSave = async () => {
    try {
      await setSave({ postId: post.value.id, isSaved: isSaved.value });
    } catch (error) {
      toast.error(parseError(error));
    }
  };

  const handleDebouncedSave = useDebounceFn(onSetSave, DEFAULT_DEBOUNCE_TIME);

  const handleSave = () => {
    isSaved.value = !isSaved.value;
    handleDebouncedSave();
  };

  watch(
    () => post.value.savedByUser,
    (newValue) => {
      isSaved.value = newValue;
    }
  );

  const isPending = isPostSetSavePending;

  return {
    isSaved: computed(() => isSaved.value),
    isPending,
    handleSave,
  };
}
