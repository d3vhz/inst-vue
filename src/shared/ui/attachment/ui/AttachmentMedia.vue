<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import { cn } from '~/shared/lib';

import { attachmentMediaVariants } from '../config';
import type { AttachmentMediaVariants } from '../model';

const props = defineProps<{
  class?: HTMLAttributes['class'];
  variant?: AttachmentMediaVariants['variant'];
}>();
</script>

<template>
  <div
    data-slot="attachment-media"
    :data-variant="variant"
    :class="cn(attachmentMediaVariants({ variant }), props.class)"
  >
    <slot />
  </div>
</template>
