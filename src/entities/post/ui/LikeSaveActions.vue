<script setup lang="ts">
import type { IButtonProps } from '~/shared/ui';

import type { IPost } from '../model';

import LikeButton from './LikeButton.vue';
import SaveButton from './SaveButton.vue';

withDefaults(defineProps<{ post: IPost; size?: IButtonProps['size'] }>(), {
  size: 'icon',
});
</script>

<template>
  <div class="flex justify-between gap-2">
    <LikeButton :post="post" :size="size" />
    <SaveButton :post="post" :size="size" />
  </div>
</template>
