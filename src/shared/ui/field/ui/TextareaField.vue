<script setup lang="ts">
import { useField } from 'vee-validate';

import { cn } from '~/shared/lib';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '../../input-group';
import type { ITextareaFieldProps } from '../model';

import { Field, FieldDescription, FieldError, FieldLabel } from './index';

const props = withDefaults(defineProps<ITextareaFieldProps>(), {
  maxLength: 100,
});

const { value, errorMessage } = useField<string>(props.name);
</script>

<template>
  <Field>
    <FieldLabel :for="props.name">{{ props.label }}</FieldLabel>
    <InputGroup>
      <InputGroupTextarea
        :id="props.name"
        v-model="value"
        v-bind="$attrs"
        :placeholder="$attrs.placeholder"
        :rows="$attrs.rows || 4"
      />
      <InputGroupAddon align="block-end">
        <InputGroupText
          :class="
            cn('tabular-nums', {
              'text-destructive': (value?.length || 0) > props.maxLength,
            })
          "
        >
          {{ value?.length || 0 }}/{{ props.maxLength }} characters
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
    <FieldDescription v-if="props.description">
      {{ props.description }}
    </FieldDescription>
    <FieldError>{{ errorMessage }}</FieldError>
  </Field>
</template>
