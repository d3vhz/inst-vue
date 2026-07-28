<script setup lang="ts">
import {
  Button,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '~/shared/ui';

const emit = defineEmits<{ (event: 'delete-user'): void }>();
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <slot />
    </PopoverTrigger>
    <PopoverContent :side-offset="10" class="w-fit">
      <div class="space-y-2">
        <div>
          <small>Are you sure you want to delete your account?</small>
        </div>
        <div class="space-x-2">
          <PopoverClose as-child>
            <Button size="xs" variant="muted">Cancel</Button>
          </PopoverClose>
          <PopoverClose as-child>
            <Button
              size="xs"
              variant="destructive"
              @click="emit('delete-user')"
            >
              Ok
            </Button>
          </PopoverClose>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
