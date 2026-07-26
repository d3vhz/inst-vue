<script setup lang="ts">
import { Button, FileUploadField, Form, TextareaField } from '~/shared/ui';

import { usePostCreateComposable } from '../composables';

const {
  CAPTION_MAX_LENGTH,
  IMAGES_MAX_LENGTH,
  isDisabled,
  isBtnDisabled,
  onSubmit,
} = usePostCreateComposable();
</script>

<template>
  <div class="py-4">
    <Form class="w-full space-y-4 md:w-3/4 xl:w-1/2">
      <h3>Create Post</h3>
      <FileUploadField
        name="images"
        label="Images"
        multiple
        accept="image/*"
        :description="`Select up to ${IMAGES_MAX_LENGTH} images`"
        :disabled="isDisabled"
      />
      <TextareaField
        name="caption"
        label="Caption"
        placeholder="Enter your caption"
        description="Include steps to reproduce, expected behavior, and what actually happened."
        :max-length="CAPTION_MAX_LENGTH"
        :disabled="isDisabled"
      />
      <Button :disabled="isBtnDisabled" @click="onSubmit">Create Post</Button>
    </Form>
  </div>
</template>
