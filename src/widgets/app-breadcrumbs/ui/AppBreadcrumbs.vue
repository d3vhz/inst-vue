<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/shared/ui';

import type { IBreadcrumb } from '../model';

defineProps<{
  items: IBreadcrumb[];
}>();
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <template v-for="{ title, path } in items" :key="title">
          <BreadcrumbLink v-if="path" :href="path">{{ title }}</BreadcrumbLink>
          <BreadcrumbPage v-else>{{ title }}</BreadcrumbPage>
          <BreadcrumbSeparator v-if="path" />
        </template>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
