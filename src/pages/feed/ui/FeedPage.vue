<script setup lang="ts">
import { PostList } from '~/features/post-list';
import { DefaultLayout } from '~/widgets/layouts';
</script>

<template>
  <DefaultLayout>
    <PostList class="w-full space-y-6 lg:w-1/2" show-details />
  </DefaultLayout>
</template>
