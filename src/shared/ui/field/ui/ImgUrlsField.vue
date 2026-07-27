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
  CarouselActions,
  CarouselContent,
  CarouselItem,
} from '../../carousel';
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
      <CarouselContent class="-ml-1">
        <CarouselItem
          v-for="(url, index) in imgUrls"
          :key="url"
          class="basis-1/2"
        >
          <Attachment orientation="vertical" class="w-full!">
            <AttachmentMedia variant="image">
              <img :src="url" :alt="`imageUrl-${index + 1}`" />
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
      <CarouselActions />
    </Carousel>
  </FieldWrap>
</template>
