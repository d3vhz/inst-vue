<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

import { Button, type IButtonVariants } from '../../button';

interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class'];
  variant?: IButtonVariants['variant'];
  size?: IButtonVariants['size'];
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'icon-sm',
  class: '',
});
</script>

<template>
  <Button data-slot="attachment-action" :variant="variant" :size="size">
    <slot />
  </Button>
</template>
