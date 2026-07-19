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
  <header class="sticky top-0 shadow backdrop-blur-xs">
    <nav class="flex h-14 w-full items-center justify-between px-4">
      <div class="space-x-4">
        <RouterLink to="/">
          <small>Home</small>
        </RouterLink>
        <RouterLink to="/about">
          <small>About</small>
        </RouterLink>
      </div>
      <Button size="sm" @click="onSignOut">Logout</Button>
    </nav>
  </header>
</template>
