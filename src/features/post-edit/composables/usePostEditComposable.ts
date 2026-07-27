import { useForm } from 'vee-validate';
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

import {
  CAPTION_MAX_LENGTH,
  IMAGES_MAX_LENGTH,
  type IPostEditFormData,
  postApi,
  useGetPost,
  usePostDelete,
  usePostUpdate,
} from '~/entities/post';
import { RouteName, toastMessages } from '~/shared/config';
import { parseError } from '~/shared/lib';

import { typedPostEditSchema } from '../config';

export function usePostEditComposable() {
  const router = useRouter();
  const route = useRoute();

  const {
    data,
    isPending: isGetPostPending,
    isError: isGetPostError,
    error: getPostError,
  } = useGetPost(route.params.id as string);

  const post = computed(() => {
    return data.value?.data;
  });

  const { handleSubmit, resetForm, isSubmitting, meta } =
    useForm<IPostEditFormData>({
      validationSchema: typedPostEditSchema,
      initialValues: {
        imgUrls: post.value?.imgUrls ?? [],
        caption: post.value?.caption ?? '',
        status: post.value?.status ?? 'active',
      },
    });

  watch(
    () => post.value,
    (newPost) => {
      if (!newPost) return;

      resetForm({
        values: {
          imgUrls: post.value?.imgUrls ?? [],
          caption: post.value?.caption ?? '',
          status: post.value?.status ?? 'active',
        },
      });
    }
  );

  const { mutateAsync: postUpdate, isPending: isPostUpdatePending } =
    usePostUpdate();
  const { mutateAsync: deletePost, isPending: isPostDeletePending } =
    usePostDelete();

  const onDeletePost = async () => {
    if (!post.value) return;

    try {
      await deletePost(post.value.id);
      if (post.value.imgUrls.length) {
        await postApi.deleteFiles(post.value.imgUrls);
      }
      toast.success(toastMessages.post.delete);
      router.push({ name: RouteName.PostList });
    } catch (error) {
      toast.error(parseError(error));
    }
  };

  const onEditPost = handleSubmit(async (data) => {
    if (!post.value) return;

    try {
      await postUpdate({ id: post.value.id, data });
      const removedImgUrls = post.value.imgUrls.filter(
        (url) => !data.imgUrls.includes(url)
      );
      if (removedImgUrls.length) {
        await postApi.deleteFiles(removedImgUrls);
      }
      resetForm();
      toast.success(toastMessages.post.create);
      router.push({ name: RouteName.PostList });
    } catch (error) {
      toast.error(parseError(error));
    }
  });

  const isPending = isGetPostPending;
  const isDisabled =
    isSubmitting ||
    isGetPostPending ||
    isPostUpdatePending ||
    isPostDeletePending;
  const isBtnDisabled = computed(() => isDisabled.value || !meta.value.valid);
  const isError = isGetPostError;
  const error = getPostError;

  return {
    post,
    CAPTION_MAX_LENGTH,
    IMAGES_MAX_LENGTH,
    isPending,
    isError,
    error,
    isDisabled,
    isBtnDisabled,
    onDeletePost,
    onEditPost,
  };
}
