<script setup lang="ts">
import { Button } from '../../button';
import { useTheme } from '../composables';
import { themeItems } from '../config';
import type { IThemeSwitcherProps } from '../model';

const { theme, setTheme } = useTheme();

defineProps<IThemeSwitcherProps>();
</script>

<template>
  <div class="space-x-1">
    <Button
      v-for="{ label, icon } in themeItems"
      :key="label"
      :variant="variant"
      :size="size"
      :data-active="label === theme"
      @click="setTheme(label)"
    >
      <component :is="icon" />
    </Button>
  </div>
</template>
