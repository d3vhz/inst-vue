<script setup lang="ts">
import { HeartIcon } from '@lucide/vue';

import { Button, type IButtonProps } from '~/shared/ui';

import { usePostLikeComposable } from '../composables';

const props = withDefaults(
  defineProps<{ postId: string; size?: IButtonProps['size'] }>(),
  {
    size: 'icon',
  }
);

const { likeCount, isLike, handleLike } = usePostLikeComposable(props.postId);
</script>

<template>
  <div class="flex items-center gap-1">
    <Button variant="text-primary" :size="size" @click="handleLike">
      <HeartIcon :class="{ 'fill-primary': isLike }" />
    </Button>
    {{ likeCount }}
  </div>
</template>
