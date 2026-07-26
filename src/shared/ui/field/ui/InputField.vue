<script setup lang="ts">
import { EyeIcon, EyeOffIcon } from '@lucide/vue';
import { useField } from 'vee-validate';
import { ref } from 'vue';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../../input-group';
import type { IInputFieldProps } from '../model';

import { Field, FieldDescription, FieldError, FieldLabel } from './index';

const props = defineProps<IInputFieldProps>();

const { value, errorMessage } = useField<string>(props.name);
const showPassword = ref(false);
</script>

<template>
  <Field>
    <FieldLabel :for="props.name">{{ props.label }}</FieldLabel>
    <InputGroup class="rounded-full">
      <InputGroupInput
        :id="props.name"
        v-model="value"
        v-bind="$attrs"
        :placeholder="$attrs.placeholder"
        :type="
          $attrs.type === 'password' && showPassword ? 'text' : $attrs.type
        "
      />
      <InputGroupAddon v-if="$attrs.type === 'password'" align="inline-end">
        <InputGroupButton @click="showPassword = !showPassword">
          <EyeIcon v-if="showPassword" />
          <EyeOffIcon v-else />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
    <FieldDescription v-if="props.description">
      {{ props.description }}
    </FieldDescription>
    <FieldError>{{ errorMessage }}</FieldError>
  </Field>
</template>
