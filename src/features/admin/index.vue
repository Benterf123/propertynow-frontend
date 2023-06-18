<template>
  <div class="block md:flex">
    <SideNav v-if="!isAuthRoute" v-model="sidenavMinimised" class="z-[2] shrink-0" />
    <div class="h-screen overflow-y-auto md:flex-1">
      <TopNav v-if="!isAuthRoute" v-model="sidenavMinimised" class="z-[1]" />
      <div class="mx-auto max-w-5xl p-3">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

import TopNav from './common/components/nav/TopNav.vue'
import SideNav from './common/components/nav/SideNav.vue'

const sidenavMinimised = ref(true || window.innerWidth <= 768)
const isAuthRoute = computed<boolean>(() => {
  const route = useRouter().currentRoute.value.name
  return route == 'auth'
})
</script>

<style lang="scss" scoped></style>
