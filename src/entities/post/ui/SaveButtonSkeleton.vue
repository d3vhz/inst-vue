<script setup lang="ts">
import { BookmarkIcon } from '@lucide/vue';

import { ButtonSkeleton, type IButtonProps } from '~/shared/ui';

withDefaults(defineProps<{ size?: IButtonProps['size'] }>(), {
  size: 'icon',
});
</script>

<template>
  <ButtonSkeleton variant="muted-text" :size="size" disabled>
    <BookmarkIcon />
  </ButtonSkeleton>
</template>
