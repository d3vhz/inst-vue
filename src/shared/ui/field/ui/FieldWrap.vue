<script setup lang="ts">
import type { IFieldWrapProps } from '../model';

import { Field, FieldDescription, FieldError, FieldLabel } from './index';

defineProps<IFieldWrapProps>();
</script>

<template>
  <Field>
    <FieldLabel :for="name">{{ label }}</FieldLabel>
    <slot />
    <FieldDescription>
      {{ description }}
    </FieldDescription>
    <FieldError>{{ errorMessage }}</FieldError>
  </Field>
</template>
