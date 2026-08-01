<script setup lang="ts">
import { BookmarkIcon } from '@lucide/vue';

import { Button, type IButtonProps } from '~/shared/ui';

withDefaults(defineProps<{ postId: string; size?: IButtonProps['size'] }>(), {
  size: 'icon',
});
</script>

<template>
  <Button disabled variant="text-primary" :size="size">
    <BookmarkIcon />
  </Button>
</template>
