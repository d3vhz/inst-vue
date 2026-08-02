import { useDebounceFn } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { toast } from 'vue-sonner';

import { DEFAULT_DEBOUNCE_TIME } from '~/shared/config';
import { parseError } from '~/shared/lib';

import { useGetPostSave, usePostSetSave } from '../api';

export function usePostSaveComposable(postId: string) {
  const isSaved = ref(false);

  const { data: postSaveData, isPending: isGetPostSavePending } =
    useGetPostSave(postId);
  const { mutateAsync: setSave } = usePostSetSave();

  const hasPostSave = computed(() => postSaveData.value?.hasPostSave);

  const onSetSave = () => {
    try {
      setSave({ postId: postId, isSave: isSaved.value });
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
    () => hasPostSave.value,
    (newValue) => {
      isSaved.value = Boolean(newValue);
    },
    {
      immediate: true,
    }
  );

  const isPending = isGetPostSavePending;

  return {
    isSaved: computed(() => isSaved.value),
    isPending,
    handleSave,
  };
}
