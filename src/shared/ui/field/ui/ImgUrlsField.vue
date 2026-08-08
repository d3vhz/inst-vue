<script setup lang="ts">
import { XIcon } from '@lucide/vue';
import { useField } from 'vee-validate';

import type { IUrl } from '~/shared/model';

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentMedia,
} from '../../attachment';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevNextButtons,
} from '../../carousel';
import { Image, ImageFallback, ImageRoot } from '../../image';
import type { IFieldBaseProps } from '../model';

import { FieldWrap } from './index';

const props = defineProps<IFieldBaseProps>();

const { value: imgUrls, errorMessage, setValue } = useField<IUrl[]>(props.name);

const onRemoveFile = (url: IUrl) => {
  if (imgUrls.value.length <= 1) return;
  setValue(imgUrls.value.filter((imgUrl) => imgUrl !== url));
};
</script>

<template>
  <FieldWrap
    :name="name"
    :label="label"
    :description="description"
    :error-message="errorMessage"
  >
    <Carousel>
      <CarouselContent class="space-y-4">
        <CarouselItem
          v-for="(url, index) in imgUrls"
          :key="url"
          class="basis-1/2"
        >
          <Attachment orientation="vertical" class="w-full!">
            <AttachmentMedia variant="image">
              <ImageRoot>
                <Image :src="url" :alt="`image-${index}`" />
                <ImageFallback>Image</ImageFallback>
              </ImageRoot>
            </AttachmentMedia>
            <AttachmentActions v-if="imgUrls.length > 1">
              <AttachmentAction
                :aria-label="`Remove imageUrl-${index + 1}`"
                @click="onRemoveFile(url)"
              >
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevNextButtons />
    </Carousel>
  </FieldWrap>
</template>
