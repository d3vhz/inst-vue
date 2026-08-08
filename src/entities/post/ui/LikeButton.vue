<script setup lang="ts">
import { HeartIcon } from '@lucide/vue';
import { computed } from 'vue';

import { Button, type IButtonProps } from '~/shared/ui';

import { usePostLikeComposable } from '../composables';
import type { IPost } from '../model';

import LikeButtonSkeleton from './LikeButtonSkeleton.vue';

const props = withDefaults(
  defineProps<{
    post: IPost;
    size?: IButtonProps['size'];
    isPending?: boolean;
  }>(),
  {
    size: 'icon',
  }
);

const currentPost = computed(() => props.post);

const { likesCount, isLiked, handleLike } = usePostLikeComposable(currentPost);
</script>

<template>
  <LikeButtonSkeleton v-if="isPending" :size="size" />
  <div class="flex items-center gap-1">
    <Button variant="primary-text" :size="size" @click="handleLike">
      <HeartIcon :class="{ 'fill-primary': isLiked }" />
    </Button>
    {{ likesCount }}
  </div>
</template>
