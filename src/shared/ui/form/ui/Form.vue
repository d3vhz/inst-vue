<template>
  <form v-bind="$attrs" @submit.prevent>
    <slot />
  </form>
</template>
