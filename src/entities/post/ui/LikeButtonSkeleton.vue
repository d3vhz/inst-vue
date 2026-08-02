<script setup lang="ts">
import { HeartIcon } from '@lucide/vue';

import { ButtonSkeleton, type IButtonProps, Skeleton } from '~/shared/ui';

withDefaults(defineProps<{ size?: IButtonProps['size'] }>(), {
  size: 'icon',
});
</script>

<template>
  <div class="flex items-center gap-1">
    <ButtonSkeleton variant="muted-text" :size="size" disabled>
      <HeartIcon />
    </ButtonSkeleton>
    <Skeleton class="h-5 w-8" />
  </div>
</template>
