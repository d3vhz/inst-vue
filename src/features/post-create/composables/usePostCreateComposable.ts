import { useForm } from 'vee-validate';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

import {
  CAPTION_MAX_LENGTH,
  IMAGES_MAX_LENGTH,
  type IPostCreateFormData,
  usePostCreate,
  usePostUpdate,
} from '~/entities/post';
import { useAuthStore } from '~/shared/api';
import { RouteName, toastMessages } from '~/shared/config';
import { parseError } from '~/shared/lib';

import { initialValues, typedPostCreateSchema } from '../config';
import { uploadMultipleFiles } from '../lib';

export function usePostCreateComposable() {
  const router = useRouter();

  const authStore = useAuthStore();

  const { handleSubmit, resetForm, isSubmitting, meta } =
    useForm<IPostCreateFormData>({
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

  const isDisabled = isSubmitting || isPostCreatePending || isPostUpdatePending;
  const isBtnDisabled = computed(() => isDisabled.value || !meta.value.valid);

  return {
    CAPTION_MAX_LENGTH,
    IMAGES_MAX_LENGTH,
    isDisabled,
    isBtnDisabled,
    onSubmit,
  };
}
