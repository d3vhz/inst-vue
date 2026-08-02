<script setup lang="ts">
import { BookmarkIcon } from '@lucide/vue';

import { Button, type IButtonProps } from '~/shared/ui';

withDefaults(defineProps<{ postId: string; size?: IButtonProps['size'] }>(), {
  size: 'icon',
});
</script>

<template>
  <Button disabled variant="primary-text" :size="size">
    <BookmarkIcon />
  </Button>
</template>
