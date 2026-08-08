<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { PostCard, useGetPost } from '~/entities/post';
import { useAuth } from '~/shared/api';
import { RouteName } from '~/shared/config';
import { Button } from '~/shared/ui';

const route = useRoute();

const postId = computed(() => route.params.id as string);

const { data, isPending, isError, error } = useGetPost(postId);

const post = computed(() => {
  return data.value;
});

const { isCurrentUser } = useAuth();
</script>

<template>
  <div v-if="isPending">...Loading</div>
  <div v-else-if="isError">Error: {{ error?.message }}</div>
  <div v-else-if="!post">No data</div>
  <div v-else class="w-full lg:w-1/2 xl:w-1/3">
    <div class="space-y-4">
      <PostCard :post="post" show-details />
      <RouterLink
        v-if="isCurrentUser(post.userId)"
        :to="{
          name: RouteName.PostEdit,
          params: { id: post.id },
        }"
      >
        <Button>Edit</Button>
      </RouterLink>
    </div>
  </div>
</template>
