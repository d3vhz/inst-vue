<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

import { PostCard, useGetPostList } from '~/entities/post';
import { useGetUser } from '~/entities/user';
import { useSignout } from '~/shared/api';
import { RouteName, toastMessages } from '~/shared/config';
import { parseError } from '~/shared/lib';
import { Avatar, AvatarFallback, AvatarImage, Button } from '~/shared/ui';

const route = useRoute();

const routeParams = computed(() => ({ userId: route.params.id as string }));

const userId = computed(() => route.params.id as string);

const {
  data: postData,
  isPending: isGetPostListPending,
  isError: isGetPostListError,
  error: getPostListError,
} = useGetPostList(routeParams);

const {
  data: userData,
  isPending: isGetUserPending,
  isError: isGetUserError,
  error: getUserError,
} = useGetUser(userId);

const postList = computed(() => {
  return postData.value?.posts ?? [];
});

const profile = computed(() => {
  return userData.value ?? null;
});

const router = useRouter();

const { mutateAsync: signOut, isPending: isSignOutPending } = useSignout();

const onSignOut = async () => {
  try {
    await signOut();
    toast.success(toastMessages.auth.signOut);
    router.push({ name: RouteName.SignIn });
  } catch (error) {
    toast.error(parseError(error));
  }
};
</script>

<template>
  <div class="space-y-12">
    <div class="flex items-center justify-center">
      <div v-if="isGetUserPending">...Loading</div>
      <div v-else-if="isGetUserError">Error: {{ getUserError?.message }}</div>
      <div v-else class="space-y-4">
        <div class="flex items-center gap-4">
          <Avatar size="xl">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 v-if="profile">
              {{ profile.firstName }} {{ profile.lastName }}
            </h3>
            <p class="text-muted-foreground mt-0">Software Engineer</p>
          </div>
        </div>
        <div class="flex justify-center gap-4">
          <RouterLink
            :to="{
              name: RouteName.ProfileEdit,
              params: { id: routeParams.userId },
            }"
          >
            <Button size="sm">Edit Profile</Button>
          </RouterLink>
          <Button size="sm" :disabled="isSignOutPending" @click="onSignOut">
            Logout
          </Button>
        </div>
      </div>
    </div>
    <div v-if="isGetPostListPending">...Loading</div>
    <div v-else-if="isGetPostListError">
      Error: {{ getPostListError?.message }}
    </div>
    <div v-else-if="!postList.length">No data</div>
    <div v-else class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <PostCard v-for="post in postList" :key="post.id" :post="post" />
    </div>
  </div>
</template>
