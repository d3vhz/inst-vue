<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { LikeSaveActions, useGetPost } from '~/entities/post';
import { useAuth } from '~/shared/api';
import { RouteName } from '~/shared/config';
import {
  Button,
  Carousel,
  CarouselActions,
  CarouselContent,
  CarouselItem,
  Image,
  ImageFallback,
  ImageRoot,
} from '~/shared/ui';

const route = useRoute();

const { data, isPending, isError, error } = useGetPost(
  route.params.id as string
);

const post = computed(() => {
  return data.value;
});

const { hasAccess } = useAuth();
</script>

<template>
  <div class="py-4">
    <div v-if="isPending">...Loading</div>
    <div v-else-if="isError">Error: {{ error?.message }}</div>
    <div v-else-if="!post">No data</div>
    <div v-else class="space-y-4">
      <div class="flex justify-between gap-4">
        <h3>Show Post</h3>
      </div>
      <div class="w-full lg:w-1/2 xl:w-1/3">
        <Carousel>
          <CarouselContent class="-ml-1">
            <CarouselItem
              v-for="(url, index) in post.imgUrls"
              :key="url"
              class="basis-full"
            >
              <ImageRoot>
                <Image :src="url" :alt="`post-image-${index}`" />
                <ImageFallback>Post Image</ImageFallback>
              </ImageRoot>
            </CarouselItem>
          </CarouselContent>
          <div class="space-y-2 p-2">
            <LikeSaveActions :post="post" />
            <CarouselActions />
            <p>
              <small>{{ post.caption }}</small>
            </p>
            <RouterLink
              v-if="hasAccess(post.userId)"
              :to="{
                name: RouteName.PostEdit,
                params: { id: post.id },
              }"
            >
              <Button>Edit</Button>
            </RouterLink>
          </div>
        </Carousel>
      </div>
    </div>
  </div>
</template>
