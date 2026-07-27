<script setup lang="ts">
import type { IFieldBaseProps } from '../model';

import { Field, FieldDescription, FieldError, FieldLabel } from './index';

defineProps<IFieldBaseProps>();
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
