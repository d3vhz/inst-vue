<script setup lang="ts">
import { ref } from 'vue';

import { SidebarProvider, SidebarTrigger } from '~/shared/ui';

import { AppSidebar } from '../../app-sidebar';

const open = ref(true);
</script>

<template>
  <SidebarProvider :open="open" @update:open="open = $event">
    <AppSidebar />
    <main class="flex h-dvh flex-col px-6 py-4">
      <SidebarTrigger />
      <div class="flex-1">
        <slot />
      </div>
    </main>
  </SidebarProvider>
</template>
