<script setup lang="ts">
import { isFunction } from 'es-toolkit/predicate';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import { RouteName } from '~/shared/config';
import { SidebarProvider, SidebarTrigger } from '~/shared/ui';

import { AppBreadcrumbs, type IBreadcrumb } from '../../app-breadcrumbs';
import { AppSidebar } from '../../app-sidebar';

const open = ref(true);

const route = useRoute();

const breadcrumbs = computed(() => {
  return route.matched
    .filter(({ name }) => name !== RouteName.Home)
    .map(({ meta, children, path }) => ({
      title: (isFunction(meta.title)
        ? meta.title(route.params)
        : meta.title) as IBreadcrumb['title'],
      path: (children.length ? path : null) as IBreadcrumb['path'],
    }));
});
</script>

<template>
  <SidebarProvider :open="open" @update:open="open = $event">
    <AppSidebar />
    <main class="flex h-dvh w-full flex-col px-6 py-4">
      <div class="flex items-center gap-4">
        <SidebarTrigger />
        <AppBreadcrumbs v-if="breadcrumbs.length" :items="breadcrumbs" />
      </div>
      <div class="flex-1">
        <slot />
      </div>
    </main>
  </SidebarProvider>
</template>
