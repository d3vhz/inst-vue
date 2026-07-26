<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import { cn } from '~/shared/lib';

import { attachmentVariants } from '../config';
import type { AttachmentVariants } from '../model';

interface Props {
  size?: AttachmentVariants['size'];
  orientation?: AttachmentVariants['orientation'];
  state?: 'idle' | 'uploading' | 'processing' | 'error' | 'done';
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
  state: 'done',
  size: 'default',
  orientation: 'horizontal',
  class: '',
});
</script>

<template>
  <div
    data-slot="attachment"
    :data-state="state"
    :data-size="size"
    :data-orientation="orientation"
    :class="cn(attachmentVariants({ size, orientation }), props.class)"
  >
    <slot />
  </div>
</template>
