<script setup lang="ts">
import { ChevronsUpDownIcon } from '@lucide/vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

import { useGetUser } from '~/entities/user';
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

const { user: authUser, userDropdownItems } = useUserDropdownItems();

const router = useRouter();
const { data, isPending: isGetUserPending } = useGetUser(authUser.id as string);
const user = computed(() => data.value);
const { mutateAsync: signOut, isPending: isSignOutPending } = useSignout();

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
      <div class="flex cursor-pointer items-center justify-between gap-4">
        <div class="flex items-center gap-4 truncate">
          <Avatar size="lg">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div class="flex flex-col gap-1 truncate">
            <small v-if="isGetUserPending">...loading</small>
            <small v-else-if="!user">No data</small>
            <template v-else>
              <small
                v-if="user.firstName || user.lastName"
                class="text-muted-foreground truncate"
              >
                {{ user.firstName }} {{ user.lastName }}
              </small>
              <small class="text-muted-foreground truncate">
                {{ authUser.email }}
              </small>
            </template>
          </div>
        </div>
        <ChevronsUpDownIcon class="size-4 shrink-0" />
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
      <DropdownMenuItem :disabled="isSignOutPending" @click="onSignOut">
        <span>Logout</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
