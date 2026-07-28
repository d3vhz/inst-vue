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

import { FieldWrap } from './index';

const props = withDefaults(defineProps<IInputFieldProps>(), {});

const { value, errorMessage } = useField<string>(props.name);
const showPassword = ref(false);
</script>

<template>
  <FieldWrap
    :name="name"
    :label="label"
    :description="description"
    :error-message="errorMessage"
  >
    <InputGroup class="rounded-full">
      <InputGroupInput
        :id="name"
        v-model="value"
        v-bind="$attrs"
        :placeholder="placeholder"
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
  </FieldWrap>
</template>
