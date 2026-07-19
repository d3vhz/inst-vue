<script setup lang="ts">
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

import { PASSWORD_MAX_CHARACTERS_COUNT, useSignUp } from '~/entities/auth';
import { RouteName } from '~/shared/config';
import { parseError } from '~/shared/lib';
import { Button, InputField } from '~/shared/ui';

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
    toast.success('success');
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
  <div class="flex h-dvh items-center justify-center p-4">
    <form class="space-y-4" @submit.prevent="onSubmit">
      <h3 class="text-center">Sign Up</h3>
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
      <InputField
        name="confirmPassword"
        label="Confirm Password"
        placeholder="••••••"
        type="password"
        autocomplete
      />
      <Button :disabled="isSignUpPending">Sign up</Button>
      <div class="space-x-2">
        <small>Already have an account?</small>
        <RouterLink to="/sign-in" class="text-primary">Sign in</RouterLink>
      </div>
    </form>
  </div>
</template>
