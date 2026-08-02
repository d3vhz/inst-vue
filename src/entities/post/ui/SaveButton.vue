<script setup lang="ts">
import { BookmarkIcon } from '@lucide/vue';

import { Button, type IButtonProps } from '~/shared/ui';

import { usePostSaveComposable } from '../composables';

import SaveButtonSkeleton from './SaveButtonSkeleton.vue';

const props = withDefaults(
  defineProps<{ postId: string; size?: IButtonProps['size'] }>(),
  {
    size: 'icon',
  }
);

const { isPending, isSaved, handleSave } = usePostSaveComposable(props.postId);
</script>

<template>
  <SaveButtonSkeleton v-if="isPending" :size="size" />
  <Button v-else variant="primary-text" :size="size" @click="handleSave">
    <BookmarkIcon :class="{ 'fill-primary': isSaved }" />
  </Button>
</template>
