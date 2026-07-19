<script setup lang="ts">
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

import { PASSWORD_MAX_CHARACTERS_COUNT, useSignIn } from '~/entities/auth';
import { RouteName } from '~/shared/config';
import { parseError } from '~/shared/lib';
import { Button, InputField } from '~/shared/ui';

import { initialValues, typedSignInSchema } from '../config';
import type { ISignInDto } from '../model';

const router = useRouter();

const { handleSubmit, resetForm, isSubmitting } = useForm<ISignInDto>({
  validationSchema: typedSignInSchema,
  initialValues,
});

const { mutateAsync: signIn, isPending } = useSignIn();

const onSubmit = handleSubmit(async ({ email, password }) => {
  try {
    await signIn({ email, password });
    resetForm();
    toast.success('success');
    router.push({ name: RouteName.Home });
  } catch (error) {
    toast.error(parseError(error));
  }
});

const isSignInPending = isSubmitting || isPending;
</script>

<template>
  <div class="flex h-dvh items-center justify-center p-4">
    <form class="space-y-4" @submit.prevent="onSubmit">
      <h3 class="text-center">Sign In</h3>
      <InputField
        name="email"
        label="Email"
        placeholder="user@example.com"
        type="email"
      />
      <InputField
        name="password"
        label="Password"
        placeholder="••••••"
        :description="`Must be at least ${PASSWORD_MAX_CHARACTERS_COUNT} characters.`"
        type="password"
        autocomplete
      />
      <Button :disabled="isSignInPending">Sign in</Button>
      <div class="space-x-2">
        <small>Don't have an account?</small>
        <RouterLink to="/sign-up" class="text-primary">Sign up</RouterLink>
      </div>
    </form>
  </div>
</template>
