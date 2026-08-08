<script setup lang="ts">
import { BookmarkIcon } from '@lucide/vue';
import { computed } from 'vue';

import { Button, type IButtonProps } from '~/shared/ui';

import { usePostSaveComposable } from '../composables';
import type { IPost } from '../model';

import SaveButtonSkeleton from './SaveButtonSkeleton.vue';

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

const { isSaved, handleSave } = usePostSaveComposable(currentPost);
</script>

<template>
  <SaveButtonSkeleton v-if="isPending" :size="size" />
  <Button v-else variant="primary-text" :size="size" @click="handleSave">
    <BookmarkIcon :class="{ 'fill-primary': isSaved }" />
  </Button>
</template>
