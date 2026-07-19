<script setup lang="ts">
import { AvatarRoot } from 'reka-ui';

import { cn } from '~/shared/lib';

import { avatarVariants } from '../config';
import type { IAvatarProps } from '../model';

const props = defineProps<IAvatarProps>();
</script>

<template>
  <AvatarRoot
    data-slot="avatar"
    :class="cn(avatarVariants({ size }), props.class)"
  >
    <slot />
  </AvatarRoot>
</template>
