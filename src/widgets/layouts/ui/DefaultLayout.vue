<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="flex h-screen flex-col">
    <header class="flex h-14 items-center px-4 shadow">
      <nav class="space-x-4">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>
    <main class="flex flex-1 flex-col">
      <slot></slot>
    </main>
  </div>
</template>
