<script setup lang="ts">
import { Primitive } from 'reka-ui';

import { cn } from '~/shared/lib';

import { buttonVariants } from '../config';
import type { IButtonProps } from '../model';

const props = withDefaults(defineProps<IButtonProps>(), {
  as: 'button',
});
</script>

<template>
  <Primitive
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
