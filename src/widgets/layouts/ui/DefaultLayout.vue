<script setup lang="ts">
import { ref } from 'vue';

import {
  Breadcrumbs,
  SidebarProvider,
  SidebarTrigger,
  ThemeSwitcher,
} from '~/shared/ui';

import { AppSidebar } from '../../app-sidebar';

const open = ref(true);
</script>

<template>
  <SidebarProvider :open="open" @update:open="open = $event">
    <AppSidebar />
    <main class="flex h-dvh w-full flex-col px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <SidebarTrigger />
          <Breadcrumbs />
        </div>
        <ThemeSwitcher variant="ghost" size="icon-sm" />
      </div>
      <div class="flex-1">
        <slot />
      </div>
    </main>
  </SidebarProvider>
</template>
