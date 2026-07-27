<script setup lang="ts">
import { statusItems } from '~/entities/post';
import {
  Button,
  Form,
  ImgUrlsField,
  SelectField,
  TextareaField,
} from '~/shared/ui';

import { usePostEditComposable } from '../composables';

import DeletePostPopover from './DeletePostPopover.vue';

const {
  isPending,
  isError,
  error,
  CAPTION_MAX_LENGTH,
  isDisabled,
  isBtnDisabled,
  onDeletePost,
  onEditPost,
} = usePostEditComposable();
</script>

<template>
  <div class="py-4">
    <div v-if="isPending">...Loading</div>
    <div v-else-if="isError">Error: {{ error?.message }}</div>
    <Form v-else class="w-full space-y-4 md:w-3/4 xl:w-1/2">
      <h3>Edit Post</h3>
      <ImgUrlsField name="imgUrls" label="Images" />
      <TextareaField
        name="caption"
        label="Caption"
        description="Include steps to reproduce, expected behavior, and what actually happened."
        :max-length="CAPTION_MAX_LENGTH"
        :disabled="isDisabled"
      />
      <SelectField name="status" label="Status" :items="statusItems" />
      <div class="space-x-4">
        <Button :disabled="isBtnDisabled" @click="onEditPost">Edit Post</Button>
        <DeletePostPopover @delete-post="onDeletePost">
          <Button variant="destructive-text" :disabled="isBtnDisabled">
            Remove
          </Button>
        </DeletePostPopover>
      </div>
    </Form>
  </div>
</template>
