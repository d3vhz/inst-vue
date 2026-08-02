<script setup lang="ts">
import { HeartIcon } from '@lucide/vue';

import { Button, type IButtonProps } from '~/shared/ui';

import { usePostLikeComposable } from '../composables';

import LikeButtonSkeleton from './LikeButtonSkeleton.vue';

const props = withDefaults(
  defineProps<{ postId: string; size?: IButtonProps['size'] }>(),
  {
    size: 'icon',
  }
);

const { likesCount, isLike, handleLike, isPending } = usePostLikeComposable(
  props.postId
);
</script>

<template>
  <LikeButtonSkeleton v-if="isPending" :size="size" />
  <div v-else class="flex items-center gap-1">
    <Button variant="primary-text" :size="size" @click="handleLike">
      <HeartIcon :class="{ 'fill-primary': isLike }" />
    </Button>
    {{ likesCount }}
  </div>
</template>
