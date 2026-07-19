<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import { cn } from '~/shared/lib';

import { Button, type IButtonVariants } from '../../button';
import { inputGroupButtonVariants } from '../config';
import type { InputGroupButtonVariants } from '../model';

interface InputGroupButtonProps {
  variant?: IButtonVariants['variant'];
  size?: InputGroupButtonVariants['size'];
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<InputGroupButtonProps>(), {
  size: 'xs',
  variant: 'ghost',
  class: '',
});
</script>

<template>
  <Button
    :data-size="props.size"
    :variant="props.variant"
    :class="cn(inputGroupButtonVariants({ size: props.size }), props.class)"
  >
    <slot />
  </Button>
</template>
