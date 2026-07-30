<script setup lang="ts">
import {
  SelectComp,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../select-items';
import type { ISelectProps } from '../model';

const props = defineProps<ISelectProps>();
</script>

<template>
  <SelectComp v-bind="$attrs">
    <SelectTrigger v-bind="selectTriggerProps">
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
