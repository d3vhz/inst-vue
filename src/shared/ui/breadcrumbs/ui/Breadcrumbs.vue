<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
        <template
          v-for="({ label, path, disabled }, index) in breadcrumbs"
          :key="label"
        >
          <BreadcrumbLink v-if="path && !disabled" :to="path">
            {{ label }}
          </BreadcrumbLink>
          <BreadcrumbPage v-else :data-disabled="disabled">
            {{ label }}
          </BreadcrumbPage>
          <BreadcrumbSeparator v-if="index !== breadcrumbs.length - 1" />
        </template>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
