<script setup lang="ts">
import { PanelLeft } from '@lucide/vue';
import type { HTMLAttributes } from 'vue';

import { cn } from '~/shared/lib';

import { Button } from '../../button';
import { useSidebar } from '../lib';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

const { toggleSidebar } = useSidebar();
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    variant="ghost"
    size="icon"
    :class="cn('h-7 w-7 rounded-md', props.class)"
    @click="toggleSidebar"
  >
    <PanelLeft />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
