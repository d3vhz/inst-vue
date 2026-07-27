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

import { FieldWrap } from './index';

const props = withDefaults(defineProps<ITextareaFieldProps>(), {
  maxLength: 100,
});

const { value, errorMessage } = useField<string>(props.name);
</script>

<template>
  <FieldWrap
    :name="name"
    :label="label"
    :description="description"
    :error-message="errorMessage"
  >
    <InputGroup>
      <InputGroupTextarea
        :id="name"
        v-model="value"
        v-bind="$attrs"
        :placeholder="$attrs.placeholder"
      />
      <InputGroupAddon align="block-end">
        <InputGroupText
          :class="
            cn('tabular-nums', {
              'text-destructive': (value?.length || 0) > maxLength,
            })
          "
        >
          {{ value?.length || 0 }}/{{ maxLength }} characters
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  </FieldWrap>
</template>
