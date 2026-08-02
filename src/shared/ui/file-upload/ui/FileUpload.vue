<script setup lang="ts">
import { PlusIcon, XIcon } from '@lucide/vue';
import { ref } from 'vue';

import { getFileSize } from '~/shared/lib';
import type { IFileItem, Nullable } from '~/shared/model';

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from '../../attachment';
import { Button } from '../../button';
import {
  Carousel,
  CarouselActions,
  CarouselContent,
  CarouselItem,
} from '../../carousel';
import { Image, ImageFallback, ImageRoot } from '../../image';
import { Input } from '../../input';
import { Label } from '../../label';
import type { IFileUploadProps } from '../model';

defineProps<IFileUploadProps>();

const emit = defineEmits<{ (event: 'change', files: IFileItem[]): void }>();

const files = ref<IFileItem[]>([]);

const onRemoveFile = (index: number) => {
  const file = files.value[index];
  if (!file) return;

  URL.revokeObjectURL(file.blobUrl);
  files.value.splice(index, 1);
  emit('change', files.value);
};

const clearFiles = () => {
  files.value.forEach((file) => URL.revokeObjectURL(file.blobUrl));
  files.value = [];
  emit('change', files.value);
};

const onChangeFiles = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const fileList: Nullable<FileList> = target.files;
  files.value.forEach((file) => URL.revokeObjectURL(file.blobUrl));
  files.value = Array.from(fileList ?? []).map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type,
    blobUrl: URL.createObjectURL(file),
    file,
  }));
  emit('change', files.value);
};
</script>

<template>
  <div v-if="files.length" class="space-y-2">
    <Button :disabled="disabled" size="xs" variant="muted" @click="clearFiles">
      Clear all
    </Button>
    <Carousel class="space-y-4">
      <CarouselContent class="-ml-1">
        <CarouselItem
          v-for="({ name, size, blobUrl }, index) in files"
          :key="name"
          class="basis-1/2"
        >
          <Attachment orientation="vertical" class="w-full!">
            <AttachmentMedia variant="image">
              <ImageRoot>
                <Image :src="blobUrl" :alt="`image-${index}`" />
                <ImageFallback>Image</ImageFallback>
              </ImageRoot>
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{{ name }}</AttachmentTitle>
              <AttachmentDescription>
                {{ getFileSize(size) }}
              </AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction
                :disabled="disabled"
                :aria-label="`Remove ${name}`"
                @click="onRemoveFile(index)"
              >
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </CarouselItem>
      </CarouselContent>
      <CarouselActions />
    </Carousel>
  </div>
  <div v-else class="flex">
    <Label
      for="file-input"
      :disabled="disabled"
      class="basis-1/2 cursor-pointer rounded-md border border-dashed"
    >
      <div class="flex aspect-square w-full items-center justify-center">
        <PlusIcon class="text-muted-foreground" />
      </div>
    </Label>
    <Input
      id="file-input"
      type="file"
      class="hidden"
      :disabled="disabled"
      :multiple="multiple"
      :accept="accept"
      @change="onChangeFiles"
    />
  </div>
</template>
