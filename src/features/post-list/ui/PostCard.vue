<script setup lang="ts">
import { type IPost } from '~/entities/post';
import { RouteName } from '~/shared/config';
import {
  AttachmentMedia,
  AttachmentWrap,
  Badge,
  Button,
  Card,
  Carousel,
  CarouselActions,
  CarouselContent,
  CarouselItem,
} from '~/shared/ui';

defineProps<{ post: IPost }>();
</script>

<template>
  <Card class="py-0">
    <Carousel>
      <CarouselContent>
        <CarouselItem
          v-for="url in post.imgUrls"
          :key="url"
          class="aspect-square basis-full pl-0"
        >
          <AttachmentWrap>
            <AttachmentMedia variant="image" class="rounded-none">
              <img :src="url" :alt="post.caption" />
            </AttachmentMedia>
          </AttachmentWrap>
        </CarouselItem>
      </CarouselContent>
      <div class="space-y-2 p-2">
        <div class="flex items-center justify-between">
          <CarouselActions size="xs" />
          <Badge
            :variant="post.status === 'archived' ? 'secondary' : 'default'"
            >{{ post.status }}</Badge
          >
        </div>
        <p class="line-clamp-1">
          <small class="text-muted-foreground">{{ post.caption }}</small>
        </p>
        <RouterLink
          :to="{
            name: RouteName.PostEdit,
            params: { id: post.id },
          }"
        >
          <Button size="sm" variant="link">Edit</Button>
        </RouterLink>
      </div>
    </Carousel>
  </Card>
</template>
