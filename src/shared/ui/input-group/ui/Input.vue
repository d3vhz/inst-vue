<script setup lang="ts">
import { XIcon } from '@lucide/vue';
import { useVModel } from '@vueuse/core';

import { type IInputProps } from '../../input';

import { InputGroup, InputGroupAddon, InputGroupInput } from './index.ts';

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
  <InputGroup class="rounded-full">
    <InputGroupInput
      v-model="modelValue"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
    />
    <InputGroupAddon
      v-show="String(modelValue).length > 0"
      align="inline-end"
      @pointerdown.stop="emits('update:modelValue', '')"
    >
      <XIcon class="cursor-pointer opacity-50" />
    </InputGroupAddon>
  </InputGroup>
</template>
