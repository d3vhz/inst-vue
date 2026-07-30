<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useGetUser } from '~/entities/user';
import { useAuthStore } from '~/shared/api';
import { RouteName } from '~/shared/config';
import { Avatar, AvatarFallback, AvatarImage, Button } from '~/shared/ui';

const route = useRoute();

const authStore = useAuthStore();
const authUser = computed(() => authStore.user);

const { data, isPending, isError, error } = useGetUser(
  route.params.id as string
);

const user = computed(() => {
  return data.value;
});
</script>

<template>
  <div class="py-4">
    <div v-if="isPending">...Loading</div>
    <div v-else-if="isError">Error: {{ error?.message }}</div>
    <div v-else-if="!user">No data</div>
    <div v-else class="w-full space-y-4 xl:w-1/2">
      <h3>Show User</h3>
      <Avatar size="xl">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <p>
          Email: <span class="text-muted-foreground">{{ authUser.email }}</span>
        </p>
        <p class="mt-0">
          First name:
          <span class="text-muted-foreground">{{ user.firstName }}</span>
        </p>
        <p class="mt-0">
          Last name:
          <span class="text-muted-foreground">{{ user.lastName }}</span>
        </p>
        <p class="mt-0">
          Roles:
          <span class="text-muted-foreground">{{ user.roles.join(', ') }}</span>
        </p>
      </div>
      <RouterLink
        :to="{
          name: RouteName.UserEdit,
          params: { id: user.id },
        }"
      >
        <Button>Edit</Button>
      </RouterLink>
    </div>
  </div>
</template>
