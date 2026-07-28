<script setup lang="ts">
import { ChevronsUpDownIcon } from '@lucide/vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

import { useSignout } from '~/shared/api';
import { RouteName, toastMessages } from '~/shared/config';
import { parseError } from '~/shared/lib';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/shared/ui';

import { useUserDropdownItems } from '../composables';

const { user, userDropdownItems } = useUserDropdownItems();

const router = useRouter();
const { mutateAsync: signOut, isPending } = useSignout();

const onSignOut = async () => {
  try {
    await signOut();
    toast.success(toastMessages.auth.signOut);
    router.push({ name: RouteName.SignIn });
  } catch (error) {
    toast.error(parseError(error));
  }
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <div class="flex cursor-pointer items-center justify-between">
        <div class="flex items-center gap-4">
          <Avatar size="lg">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div class="flex flex-col gap-1">
            <small>User</small>
            <small class="text-muted-foreground">
              {{ user.email }}
            </small>
          </div>
        </div>
        <div>
          <ChevronsUpDownIcon class="size-4" />
        </div>
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      side="top"
      class="w-(--reka-popper-anchor-width)"
      :side-offset="8"
    >
      <DropdownMenuItem
        v-for="{ title, routeName, routeParams, disabled } in userDropdownItems"
        :key="title"
        :disabled="disabled"
        @click="router.push({ name: routeName, params: routeParams })"
      >
        <span>{{ title }}</span>
      </DropdownMenuItem>
      <DropdownMenuItem :disabled="isPending" @click="onSignOut">
        <span>Logout</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
