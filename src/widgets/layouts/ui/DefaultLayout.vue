<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

import { useSignout } from '~/entities/auth';
import { RouteName } from '~/shared/config';
import { parseError } from '~/shared/lib';
import { Button } from '~/shared/ui';

const router = useRouter();
const { mutateAsync: signOut } = useSignout();

const onSignOut = async () => {
  try {
    await signOut();
    toast.success('success');
    router.push({ name: RouteName.SignIn });
  } catch (error) {
    toast.error(parseError(error));
  }
};
</script>

<template>
  <div class="flex h-screen flex-col">
    <header class="flex h-14 items-center px-4 shadow">
      <nav class="flex w-full items-center justify-between space-x-4">
        <div class="space-x-4">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </div>
        <Button @click="onSignOut">Logout</Button>
      </nav>
    </header>
    <main class="flex flex-1 flex-col">
      <slot></slot>
    </main>
  </div>
</template>
