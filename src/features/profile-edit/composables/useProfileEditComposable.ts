import { useForm } from 'vee-validate';
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

import { useGetUser, useUserDelete, useUserUpdate } from '~/entities/user';
import { useSignout } from '~/shared/api';
import { RouteName, toastMessages } from '~/shared/config';
import { parseError } from '~/shared/lib';

import { typedProfileEditSchema } from '../config';
import type { IProfileEditFormData } from '../model';

export function useProfileEditComposable() {
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

  const userId = computed(() => route.params.id as string);

  const {
    data: userData,
    isPending: isGetProfilePending,
    isError: isGetProfileError,
    error: profileError,
  } = useGetUser(userId);

  const profile = computed(() => {
    return userData.value;
  });

  const { handleSubmit, resetForm, isSubmitting, meta } =
    useForm<IProfileEditFormData>({
      validationSchema: typedProfileEditSchema,
      initialValues: {
        firstName: profile.value?.firstName,
        lastName: profile.value?.lastName,
      },
    });

  watch(
    () => profile.value,
    (newProfile) => {
      if (!newProfile) return;

      resetForm({
        values: {
          firstName: newProfile.firstName,
          lastName: newProfile.lastName,
        },
      });
    }
  );

  const { mutateAsync: signOut, isPending: isSignoutPending } = useSignout();

  const { mutateAsync: profileUpdate, isPending: isProfileUpdatePending } =
    useUserUpdate();
  const { mutateAsync: deleteProfile, isPending: isProfileDeletePending } =
    useUserDelete();

  const onProfileDelete = async () => {
    if (!profile.value) return;

    try {
      await deleteProfile(profile.value.id);
      await signOut();
      toast.success(toastMessages.profile.delete);
      router.push({ name: RouteName.SignUp });
    } catch (error) {
      toast.error(parseError(error));
    }
  };

  const onProfileUpdate = handleSubmit(async (data) => {
    if (!profile.value) return;

    try {
      await profileUpdate({
        id: profile.value.id,
        data,
      });
      resetForm();
      toast.success(toastMessages.profile.update);
      router.push({ name: RouteName.ProfileShow });
    } catch (error) {
      toast.error(parseError(error));
    }
  });

  const isPending = isGetProfilePending;
  const isDisabled =
    isSubmitting ||
    isGetProfilePending ||
    isProfileUpdatePending ||
    isProfileDeletePending ||
    isSignoutPending;
  const isBtnDisabled = computed(
    () => isDisabled.value || !meta.value.valid || !meta.value.dirty
  );
  const isError = isGetProfileError;
  const error = profileError;

  return {
    profile,
    isPending,
    isError,
    error,
    isDisabled,
    isBtnDisabled,
    isShowOnboardingMessage,
    closeOnboardingMessage,
    onProfileDelete,
    onProfileUpdate,
  };
}
