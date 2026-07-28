import { useForm } from 'vee-validate';
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

import { useGetUser, useUserDelete, useUserUpdate } from '~/entities/user';
import { useSignout } from '~/shared/api';
import { RouteName, toastMessages } from '~/shared/config';
import { parseError } from '~/shared/lib';

import { typedUserEditSchema } from '../config';
import type { IUserEditFormData } from '../model';

export function useUserEditComposable() {
  const router = useRouter();
  const route = useRoute();

  const isShowOnboardingMessage = computed(() =>
    Boolean(route.query.showOnboardingMessage)
  );

  const closeOnboardingMessage = () => {
    router.replace({
      query: {
        ...route.query,
        showOnboardingMessage: undefined,
      },
    });
  };

  const {
    data,
    isPending: isGetUserPending,
    isError: isGetUserError,
    error: getUserError,
  } = useGetUser(route.params.id as string);

  const user = computed(() => {
    return data.value?.data;
  });

  const { handleSubmit, resetForm, isSubmitting, meta } =
    useForm<IUserEditFormData>({
      validationSchema: typedUserEditSchema,
      initialValues: {
        firstName: user.value?.firstName,
        lastName: user.value?.lastName,
      },
    });

  watch(
    () => user.value,
    (newUser) => {
      if (!newUser) return;

      resetForm({
        values: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        },
      });
    }
  );

  const { mutateAsync: signOut, isPending: isSignoutPending } = useSignout();

  const { mutateAsync: userUpdate, isPending: isUserUpdatePending } =
    useUserUpdate();
  const { mutateAsync: deleteUser, isPending: isUserDeletePending } =
    useUserDelete();

  const onDeleteUser = async () => {
    if (!user.value) return;

    try {
      await deleteUser(user.value.id);
      await signOut();
      toast.success(toastMessages.user.delete);
      router.push({ name: RouteName.SignUp });
    } catch (error) {
      toast.error(parseError(error));
    }
  };

  const onEditUser = handleSubmit(async (data) => {
    if (!user.value) return;

    try {
      await userUpdate({
        id: user.value.id,
        data,
      });
      resetForm();
      toast.success(toastMessages.user.update);
      router.push({ name: RouteName.UserShow });
    } catch (error) {
      toast.error(parseError(error));
    }
  });

  const isPending = isGetUserPending;
  const isDisabled =
    isSubmitting ||
    isGetUserPending ||
    isUserUpdatePending ||
    isUserDeletePending ||
    isSignoutPending;
  const isBtnDisabled = computed(
    () => isDisabled.value || !meta.value.valid || !meta.value.dirty
  );
  const isError = isGetUserError;
  const error = getUserError;

  return {
    user,
    isPending,
    isError,
    error,
    isDisabled,
    isBtnDisabled,
    isShowOnboardingMessage,
    closeOnboardingMessage,
    onDeleteUser,
    onEditUser,
  };
}
