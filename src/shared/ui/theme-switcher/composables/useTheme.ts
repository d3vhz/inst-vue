import { type BasicColorSchema, useColorMode } from '@vueuse/core';
import { computed } from 'vue';

export function useTheme() {
  const mode = useColorMode();

  const setTheme = (theme: BasicColorSchema) => {
    mode.value = theme;
  };

  return {
    theme: computed(() => mode.store.value),
    currentTheme: computed(() => mode.value),
    setTheme,
  };
}
