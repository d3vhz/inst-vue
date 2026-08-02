<script setup lang="ts">
import { useVModel } from '@vueuse/core';

import {
  SelectComp,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../select-items';
import type { ISelectProps } from '../model';

const props = defineProps<ISelectProps>();

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <SelectComp v-model="modelValue" :disabled="props.disabled">
    <SelectTrigger
      :clearable="String(modelValue)?.length > 0"
      @clear="emits('update:modelValue', '')"
    >
      <SelectValue :placeholder="props.placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="{ value, label } in props.items"
        :key="value"
        :value="value"
      >
        {{ label }}
      </SelectItem>
    </SelectContent>
  </SelectComp>
</template>
