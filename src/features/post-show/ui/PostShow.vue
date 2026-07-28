<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useGetPost } from '~/entities/post';
import { RouteName } from '~/shared/config';
import {
  AttachmentMedia,
  AttachmentWrap,
  Button,
  Carousel,
  CarouselActions,
  CarouselContent,
  CarouselItem,
} from '~/shared/ui';

const route = useRoute();

const { data, isPending, isError, error } = useGetPost(
  route.params.id as string
);

const post = computed(() => {
  return data.value?.data;
});
</script>

<template>
  <div class="py-4">
    <div v-if="isPending">...Loading</div>
    <div v-else-if="isError">Error: {{ error?.message }}</div>
    <div v-else-if="!post">No data</div>
    <div v-else class="w-full space-y-4 xl:w-1/2">
      <h3>Show Post</h3>
      <Carousel>
        <CarouselContent class="-ml-1">
          <CarouselItem
            v-for="(url, index) in post.imgUrls"
            :key="url"
            class="basis-1/2"
          >
            <AttachmentWrap>
              <AttachmentMedia variant="image">
                <img :src="url" :alt="`imageUrl-${index + 1}`" />
              </AttachmentMedia>
            </AttachmentWrap>
          </CarouselItem>
        </CarouselContent>
        <CarouselActions />
      </Carousel>
      <div>
        <p>
          <small>{{ post.caption }}</small>
        </p>
      </div>
      <RouterLink
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
