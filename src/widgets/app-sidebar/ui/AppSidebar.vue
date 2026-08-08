<script setup lang="ts">
import { RouterLink } from 'vue-router';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/shared/ui';

import { useAppSidebar } from '../composables';

const { menuItems } = useAppSidebar();
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Inst</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="{ title, routeName, routeParams, icon } in menuItems"
              :key="title"
            >
              <SidebarMenuButton as-child :tooltip="title">
                <RouterLink
                  exact-active-class="text-primary"
                  :to="{ name: routeName, params: routeParams }"
                >
                  <component :is="icon" />
                  <span>{{ title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
