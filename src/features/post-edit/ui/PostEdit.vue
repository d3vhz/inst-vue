<script setup lang="ts">
import { useRouter } from 'vue-router';

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
  post,
  isPending,
  isError,
  error,
  CAPTION_MAX_LENGTH,
  isDisabled,
  isBtnDisabled,
  onDeletePost,
  onEditPost,
} = usePostEditComposable();

const router = useRouter();
</script>

<template>
  <div v-if="isPending">...Loading</div>
  <div v-else-if="isError">Error: {{ error?.message }}</div>
  <div v-else-if="!post">No data</div>
  <Form v-else class="w-full space-y-4 md:w-3/4 xl:w-1/2">
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
      <Button variant="muted" @click="router.back()">Cancel</Button>
      <DeletePostPopover @delete-post="onDeletePost">
        <Button variant="destructive">Delete</Button>
      </DeletePostPopover>
      <Button :disabled="isBtnDisabled" @click="onEditPost"> Update </Button>
    </div>
  </Form>
</template>
