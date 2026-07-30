<script setup lang="ts">
import { XIcon } from '@lucide/vue';

import { InputGroupAddon } from '../../input-group';

const emit = defineEmits<{ (event: 'clear'): void }>();
</script>

<template>
  <InputGroupAddon align="inline-end">
    <XIcon class="cursor-pointer opacity-50" @click="emit('clear')" />
  </InputGroupAddon>
</template>
