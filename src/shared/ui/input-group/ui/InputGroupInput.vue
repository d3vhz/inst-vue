<script setup lang="ts">
import { useVModel } from '@vueuse/core';

import { cn } from '~/shared/lib';

import { type IInputProps, Input } from '../../input';

const props = defineProps<IInputProps>();

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <Input
    v-model="modelValue"
    :disabled="props.disabled"
    :placeholder="props.placeholder"
    data-slot="input-group-control"
    :class="
      cn(
        'flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent',
        props.class
      )
    "
  />
</template>
