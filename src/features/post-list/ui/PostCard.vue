<script setup lang="ts">
import { type IPost } from '~/entities/post';
import { RouteName } from '~/shared/config';
import {
  Badge,
  Button,
  Card,
  Carousel,
  CarouselActions,
  CarouselContent,
  CarouselItem,
  Image,
  ImageFallback,
  ImageRoot,
} from '~/shared/ui';

defineProps<{ post: IPost }>();
</script>

<template>
  <Card class="py-0">
    <Carousel>
      <CarouselContent>
        <CarouselItem
          v-for="(url, index) in post.imgUrls"
          :key="url"
          class="aspect-square basis-full pl-0"
        >
          <ImageRoot>
            <Image :src="url" :alt="`post-card-image-${index}`" />
            <ImageFallback>Post Card Image</ImageFallback>
          </ImageRoot>
        </CarouselItem>
      </CarouselContent>
      <div class="space-y-2 p-2">
        <div class="flex items-center justify-between">
          <CarouselActions size="xs" />
          <Badge
            :variant="post.status === 'archived' ? 'secondary' : 'default'"
          >
            {{ post.status }}
          </Badge>
        </div>
        <p class="line-clamp-1">
          <small class="text-muted-foreground">{{ post.caption }}</small>
        </p>

        <div class="space-x-2">
          <RouterLink
            :to="{
              name: RouteName.PostShow,
              params: { id: post.id },
            }"
          >
            <Button size="sm" variant="secondary">Show</Button>
          </RouterLink>
          <RouterLink
            :to="{
              name: RouteName.PostEdit,
              params: { id: post.id },
            }"
          >
            <Button size="sm" variant="link">Edit</Button>
          </RouterLink>
        </div>
      </div>
    </Carousel>
  </Card>
</template>
