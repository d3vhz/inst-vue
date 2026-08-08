<script setup lang="ts">
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

import { PASSWORD_MAX_CHARACTERS_COUNT, useSignIn } from '~/shared/api';
import { RouteName, toastMessages } from '~/shared/config';
import { parseError } from '~/shared/lib';
import { Button, Form, InputField } from '~/shared/ui';

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
    toast.success(toastMessages.auth.signIn);
    router.push({ name: RouteName.Feed });
  } catch (error) {
    toast.error(parseError(error));
  }
});

const isSignInPending = isSubmitting || isPending;
</script>

<template>
  <div class="flex h-full items-center justify-center p-4">
    <Form class="w-full space-y-4 md:w-1/2 xl:w-1/3">
      <h3 class="text-center">Sign In</h3>
      <InputField
        name="email"
        label="Email"
        placeholder="user@example.com"
        type="email"
        :disabled="isSignInPending"
      />
      <InputField
        name="password"
        label="Password"
        placeholder="••••••"
        :description="`Must be at least ${PASSWORD_MAX_CHARACTERS_COUNT} characters.`"
        type="password"
        autocomplete
        :disabled="isSignInPending"
      />
      <Button :disabled="isSignInPending" @click="onSubmit">Sign in</Button>
      <div class="space-x-2">
        <small>Don't have an account?</small>
        <RouterLink :to="{ name: RouteName.SignUp }" class="text-primary">
          Sign up
        </RouterLink>
      </div>
    </Form>
  </div>
</template>
