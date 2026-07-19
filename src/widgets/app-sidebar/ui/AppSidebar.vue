<script setup lang="ts">
import { RouterLink } from 'vue-router';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/shared/ui';

import { menuItems } from '../config/index.ts';

import UserDropdownMenu from './UserDropdownMenu.vue';
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Inst</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="{ title, routeName, icon } in menuItems"
              :key="title"
            >
              <SidebarMenuButton as-child :tooltip="title">
                <RouterLink :to="{ name: routeName }">
                  <component :is="icon" />
                  <span>{{ title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <UserDropdownMenu />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
