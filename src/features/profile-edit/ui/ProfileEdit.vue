<script setup lang="ts">
import { Trash2Icon } from '@lucide/vue';
import { useRouter } from 'vue-router';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Form,
  InputField,
} from '~/shared/ui';

import { useProfileEditComposable } from '../composables/index.ts';

import DeleteProfilePopover from './DeleteProfilePopover.vue';
import OnboardingPopover from './OnboardingPopover.vue';

const {
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
} = useProfileEditComposable();

const router = useRouter();
</script>

<template>
  <div v-if="isPending">...Loading</div>
  <div v-else-if="isError">Error: {{ error?.message }}</div>
  <div v-else-if="!profile">No data</div>
  <div v-else class="space-y-4">
    <div class="flex justify-between gap-4">
      <h3>Edit Profile</h3>
      <DeleteProfilePopover @delete-user="onProfileDelete">
        <Button variant="destructive" :disabled="isBtnDisabled">
          <Trash2Icon /> Delete
        </Button>
      </DeleteProfilePopover>
    </div>
    <Form class="w-full space-y-4 md:w-3/4 xl:w-1/2">
      <OnboardingPopover
        :is-open="isShowOnboardingMessage"
        @close="closeOnboardingMessage"
      >
        <Avatar size="xl">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </OnboardingPopover>
      <InputField
        name="firstName"
        label="First name"
        placeholder="Enter your first name"
        :disabled="isDisabled"
      />
      <InputField
        name="lastName"
        label="Last name"
        placeholder="Enter your last name"
        :disabled="isDisabled"
      />
      <div class="space-x-4">
        <Button variant="secondary" @click="router.back()">Cancel</Button>
        <Button :disabled="isBtnDisabled" @click="onProfileUpdate">
          Update
        </Button>
      </div>
    </Form>
  </div>
</template>
