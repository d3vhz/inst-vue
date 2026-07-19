<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import { cn } from '~/shared/lib';

import { fieldVariants } from '../config';
import type { IFieldVariants } from '../model';

const props = defineProps<{
  class?: HTMLAttributes['class'];
  orientation?: IFieldVariants['orientation'];
}>();
</script>

<template>
  <div
    role="group"
    data-slot="field"
    :data-orientation="orientation"
    :class="cn(fieldVariants({ orientation }), props.class)"
  >
    <slot />
  </div>
</template>
