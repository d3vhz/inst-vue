<script setup lang="ts">
import { useField } from 'vee-validate';

import { FileUpload, type IFileItem } from '../../file-upload';
import type { IInputFieldProps } from '../model';

import { Field, FieldDescription, FieldError, FieldLabel } from './index';

const props = defineProps<IInputFieldProps>();

const { errorMessage, setValue } = useField<IFileItem[]>(props.name);
</script>

<template>
  <Field>
    <FieldLabel :for="props.name">{{ props.label }}</FieldLabel>
    <FileUpload v-bind="$attrs" @change="setValue" />
    <FieldDescription v-if="props.description">
      {{ props.description }}
    </FieldDescription>
    <FieldError>{{ errorMessage }}</FieldError>
  </Field>
</template>
