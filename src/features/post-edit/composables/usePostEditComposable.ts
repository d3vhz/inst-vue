import { useForm } from 'vee-validate';
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

import {
  CAPTION_MAX_LENGTH,
  IMAGES_MAX_LENGTH,
  postApi,
  useGetPost,
  usePostDelete,
  usePostUpdate,
} from '~/entities/post';
import { useAuth } from '~/shared/api';
import { RouteName, toastMessages } from '~/shared/config';
import { parseError } from '~/shared/lib';

import { typedPostEditSchema } from '../config';
import type { IPostEditFormData } from '../model';

export function usePostEditComposable() {
  const router = useRouter();
  const route = useRoute();
  const { hasAccess } = useAuth();

  const {
    data,
    isPending: isGetPostPending,
    isError: isGetPostError,
    error: getPostError,
  } = useGetPost(route.params.id as string);

  const post = computed(() => {
    return data.value;
  });

  const { handleSubmit, resetForm, isSubmitting, meta } =
    useForm<IPostEditFormData>({
      validationSchema: typedPostEditSchema,
      initialValues: {
        imgUrls: post.value?.imgUrls,
        caption: post.value?.caption,
        status: post.value?.status,
      },
    });

  watch(
    () => post.value,
    (post) => {
      if (!post || !hasAccess(post.userId)) {
        router.push({ name: RouteName.PostList });

        return;
      }

      resetForm({
        values: {
          imgUrls: post.imgUrls,
          caption: post.caption,
          status: post.status,
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
      toast.success(toastMessages.post.update);
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
  const isBtnDisabled = computed(
    () => isDisabled.value || !meta.value.valid || !meta.value.dirty
  );
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
    hasAccess,
    onDeletePost,
    onEditPost,
  };
}
