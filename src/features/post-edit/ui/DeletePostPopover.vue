<script setup lang="ts">
import {
  Button,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '~/shared/ui';

const emit = defineEmits<{ (event: 'delete-post'): void }>();
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <slot />
    </PopoverTrigger>
    <PopoverContent size="top" :side-offset="10">
      <div class="space-y-4">
        <div>
          <small>Are you sure you want to delete this post?</small>
        </div>
        <div class="space-x-2">
          <PopoverClose as-child>
            <Button size="xs" variant="secondary">Cancel</Button>
          </PopoverClose>
          <PopoverClose as-child>
            <Button size="xs" @click="emit('delete-post')">Ok</Button>
          </PopoverClose>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
