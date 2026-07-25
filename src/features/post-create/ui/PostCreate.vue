<script setup lang="ts">
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

import {
  type IPostCreateSchema,
  usePostCreate,
  usePostUpdate,
} from '~/entities/post';
import { useAuthStore } from '~/shared/api';
import { RouteName, toastMessages } from '~/shared/config';
import { parseError } from '~/shared/lib';
import { Button, FileUploadField, Form, TextareaField } from '~/shared/ui';

import { initialValues, typedPostCreateSchema } from '../config';
import { uploadMultipleFiles } from '../lib';

const router = useRouter();

const authStore = useAuthStore();

const { handleSubmit, resetForm, isSubmitting } = useForm<IPostCreateSchema>({
  validationSchema: typedPostCreateSchema,
  initialValues,
});

const { mutateAsync: postCreate, isPending: isPostCreatePending } =
  usePostCreate();
const { mutateAsync: postUpdate, isPending: isPostUpdatePending } =
  usePostUpdate();

const onSubmit = handleSubmit(async (data) => {
  try {
    const post = await postCreate({ caption: data.caption });
    const imgUrls = await uploadMultipleFiles({
      path: `${authStore.user.id}/posts/${post.data.id}`,
      files: data.images,
    });
    await postUpdate({ id: post.data.id, data: { imgUrls } });
    resetForm();
    toast.success(toastMessages.post.create);
    router.push({ name: RouteName.PostList });
  } catch (error) {
    toast.error(parseError(error));
  }
});

const isPending = isSubmitting || isPostCreatePending || isPostUpdatePending;
</script>

<template>
  <div class="py-4">
    <Form class="w-full space-y-4 md:w-3/4 xl:w-1/2">
      <h3>Create Post</h3>
      <FileUploadField
        name="images"
        label="Images"
        multiple
        accept="/image/*"
        description="Select up to 5 images"
        :disabled="isPending"
      />
      <TextareaField
        name="caption"
        label="Caption"
        placeholder="Enter your caption"
        description="Include steps to reproduce, expected behavior, and what actually happened."
        :disabled="isPending"
      />
      <Button :disabled="isPending" @click="onSubmit">Create Post</Button>
    </Form>
  </div>
</template>
