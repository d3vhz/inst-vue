<script setup lang="ts">
import { useField } from 'vee-validate';

import { FileUpload, type IFileItem } from '../../file-upload';
import type { IFieldBaseProps } from '../model';

import { FieldWrap } from './index';

const props = defineProps<IFieldBaseProps>();

const { errorMessage, setValue } = useField<IFileItem[]>(props.name);
</script>

<template>
  <FieldWrap
    :name="name"
    :label="label"
    :description="description"
    :error-message="errorMessage"
  >
    <FileUpload v-bind="$attrs" @change="setValue" />
  </FieldWrap>
</template>
