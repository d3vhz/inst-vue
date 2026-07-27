<script setup lang="ts">
import { useField } from 'vee-validate';

import { Select } from '../../select';
import type { ISelectFieldProps } from '../model';

import { FieldWrap } from './index';

const props = defineProps<ISelectFieldProps>();

const { value, errorMessage } = useField<string>(props.name);
</script>

<template>
  <FieldWrap
    :name="name"
    :label="label"
    :description="description"
    :error-message="errorMessage"
  >
    <Select v-model="value" v-bind="$attrs" :items="items" />
  </FieldWrap>
</template>
