<script setup lang="ts">
import {
  Button,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '~/shared/ui';

defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{ (event: 'close'): void }>();
</script>

<template>
  <Popover :open="isOpen">
    <PopoverTrigger>
      <slot />
    </PopoverTrigger>
    <PopoverContent side="right" :side-offset="10" class="w-fit">
      <div class="space-y-2">
        <div>
          <small>Heads up! You can update your profile here.</small>
        </div>
        <PopoverClose as-child>
          <Button size="xs" @click="emit('close')">Close</Button>
        </PopoverClose>
      </div>
    </PopoverContent>
  </Popover>
</template>
