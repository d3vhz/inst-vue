<script setup lang="ts">
import { ref } from 'vue';

import { type IPost, LikeSaveActions } from '~/entities/post';
import { useAuth } from '~/shared/api';
import { RouteName } from '~/shared/config';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Carousel,
  CarouselContent,
  CarouselDotButtons,
  CarouselItem,
  Image,
  ImageFallback,
  ImageRoot,
} from '~/shared/ui';

defineProps<{ post: IPost; showDetails?: boolean }>();

const showMore = ref(false);

const { isCurrentUser } = useAuth();
</script>

<template>
  <div v-if="showDetails" class="space-y-2">
    <div class="flex items-center justify-between gap-4">
      <RouterLink
        :to="{ name: RouteName.ProfileShow, params: { id: post.user.id } }"
      >
        <div class="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div v-if="post.user">
            <p>
              <small>{{ post.user.firstName }} {{ post.user.lastName }}</small>
            </p>
          </div>
        </div>
      </RouterLink>
      <Button v-if="!isCurrentUser(post.userId)" disabled size="sm">
        Follow
      </Button>
    </div>
    <div class="space-y-4">
      <Carousel class="space-y-2">
        <CarouselContent>
          <CarouselItem
            v-for="(url, index) in post.imgUrls"
            :key="url"
            class="aspect-square basis-full"
          >
            <ImageRoot>
              <Image :src="url" :alt="`post-card-image-${index}`" />
              <ImageFallback>Post Card Image</ImageFallback>
            </ImageRoot>
          </CarouselItem>
        </CarouselContent>
        <CarouselDotButtons size="icon-xs" />
      </Carousel>
      <div class="space-y-2">
        <LikeSaveActions :post="post" />
        <div>
          <p :class="{ 'line-clamp-1': !showMore }">
            <small class="text-muted-foreground">{{ post.caption }}</small>
          </p>
          <Button
            v-if="!showMore"
            size="xs"
            variant="primary-text"
            @click="showMore = true"
          >
            ...more
          </Button>
        </div>
      </div>
    </div>
  </div>
  <RouterLink
    v-else
    :to="{ name: RouteName.PostShow, params: { id: post.id } }"
    class="block"
  >
    <ImageRoot>
      <Image :src="post.imgUrls[0]" alt="post-card-image" />
      <ImageFallback>Post Card Image</ImageFallback>
    </ImageRoot>
  </RouterLink>
</template>
