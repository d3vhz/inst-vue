<script setup lang="ts">
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

import { PASSWORD_MAX_CHARACTERS_COUNT, useSignUp } from '~/shared/api';
import { RouteName, toastMessages } from '~/shared/config';
import { parseError } from '~/shared/lib';
import { Button, Form, InputField } from '~/shared/ui';

import { initialValues, typedSignUpSchema } from '../config';
import type { ISignUpDto } from '../model';

const router = useRouter();

const { handleSubmit, resetForm, isSubmitting } = useForm<ISignUpDto>({
  validationSchema: typedSignUpSchema,
  initialValues,
});

const { mutateAsync: signUp, isPending } = useSignUp();

const onSubmit = handleSubmit(async ({ email, password }) => {
  try {
    await signUp({ email, password });
    resetForm();
    toast.success(toastMessages.auth.signUp);
    router.push({
      name: RouteName.Home,
      query: { showOnboardingMessage: 'true' },
    });
  } catch (error) {
    toast.error(parseError(error));
  }
});

const isSignUpPending = isSubmitting || isPending;
</script>

<template>
  <div class="flex h-full items-center justify-center p-4">
    <Form class="w-full space-y-4 md:w-1/2 xl:w-1/3">
      <h3 class="text-center">Sign Up</h3>
      <InputField
        name="email"
        label="Email"
        placeholder="user@example.com"
        type="email"
        :disabled="isSignUpPending"
      />
      <InputField
        name="password"
        label="Password"
        placeholder="••••••"
        :description="`Must be at least ${PASSWORD_MAX_CHARACTERS_COUNT} characters.`"
        type="password"
        autocomplete
        :disabled="isSignUpPending"
      />
      <InputField
        name="confirmPassword"
        label="Confirm Password"
        placeholder="••••••"
        type="password"
        autocomplete
        :disabled="isSignUpPending"
      />
      <Button :disabled="isSignUpPending" @click="onSubmit">Sign up</Button>
      <div class="space-x-2">
        <small>Already have an account?</small>
        <RouterLink :to="{ name: RouteName.SignIn }" class="text-primary">
          Sign in
        </RouterLink>
      </div>
    </Form>
  </div>
</template>
