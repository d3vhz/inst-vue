<script setup lang="ts">
import { Trash2Icon } from '@lucide/vue';

import { RouteName } from '~/shared/config';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Form,
  InputField,
} from '~/shared/ui';

import { useUserEditComposable } from '../composables';

import DeleteUserPopover from './DeleteUserPopover.vue';

const {
  user,
  isPending,
  isError,
  error,
  isDisabled,
  isBtnDisabled,
  onDeleteUser,
  onEditUser,
} = useUserEditComposable();
</script>

<template>
  <div class="py-4">
    <div v-if="isPending">...Loading</div>
    <div v-else-if="isError">Error: {{ error?.message }}</div>
    <div v-else-if="!user">No data</div>
    <div v-else class="space-y-4">
      <div class="flex justify-between gap-4">
        <h3>Edit Post</h3>
        <DeleteUserPopover @delete-user="onDeleteUser">
          <Button variant="destructive" :disabled="isBtnDisabled">
            <Trash2Icon /> Delete
          </Button>
        </DeleteUserPopover>
      </div>
      <Form class="w-full space-y-4 md:w-3/4 xl:w-1/2">
        <Avatar size="xl">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
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
          <RouterLink
            :to="{
              name: RouteName.UserShow,
              params: { id: user.id },
            }"
          >
            <Button variant="secondary">Cancel</Button>
          </RouterLink>
          <Button :disabled="isBtnDisabled" @click="onEditUser">Update</Button>
        </div>
      </Form>
    </div>
  </div>
</template>
