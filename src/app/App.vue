<script setup lang="ts">
import { Toaster } from '~/shared/ui';

import 'vue-sonner/style.css';
import './styles/global.css';
</script>

<template>
  <RouterView />
  <Toaster rich-colors />
</template>
