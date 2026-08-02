<script setup lang="ts">
import { cn } from '~/shared/lib';

import { Skeleton } from '../../skeleton';
import { buttonVariants } from '../config';
import type { IButtonProps } from '../model';

const props = defineProps<Omit<IButtonProps, 'as' | 'asChild'>>();
</script>

<template>
  <Skeleton :class="cn(buttonVariants({ variant, size }), props.class)">
    <slot />
  </Skeleton>
</template>
