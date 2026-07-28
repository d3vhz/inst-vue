<script setup lang="ts">
import { RouteName } from '~/shared/config';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../breadcrumb-items';
import { useBreadcrumbs } from '../composables';

const { breadcrumbs } = useBreadcrumbs();
</script>

<template>
  <Breadcrumb v-if="breadcrumbs.length">
    <BreadcrumbList>
      <BreadcrumbItem>
        <RouterLink :to="{ name: RouteName.Home }">Home</RouterLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <template
          v-for="({ label, path, disabled }, index) in breadcrumbs"
          :key="label"
        >
          <RouterLink v-if="path && !disabled" :to="path">
            {{ label }}
          </RouterLink>
          <BreadcrumbPage v-else :data-disabled="disabled">
            {{ label }}
          </BreadcrumbPage>
          <BreadcrumbSeparator v-if="index !== breadcrumbs.length - 1" />
        </template>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
