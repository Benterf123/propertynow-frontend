<template>
  <nav
    class="dark:bg-scaffold-tint/90 group sticky top-0 flex h-14 items-center gap-x-2 border-b border-slate-300 bg-white/80 px-3 backdrop-blur-xl dark:border-transparent"
  >
    <Bars3Icon class="cursor-pointer w-6 h-6 md:hidden" @click="openSidenav" />
    <router-link :to="{ name: 'admin-home' }">Admin</router-link>
		
    <button class="ml-auto" @click="logout">
      <ArrowRightOnRectangleIcon class="h-6 w-6" />
    </button>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowRightOnRectangleIcon, Bars3Icon } from '@heroicons/vue/24/outline'

import { useAuthStore } from '@/features/buyer/auth/store'

defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', minimised: boolean): void
}>()

function openSidenav() {
  emit('update:modelValue', false)
}

const authStore = useAuthStore()
const router = useRouter()
async function logout() {
  authStore.logout()
  router.replace({ name: 'auth' })
}
</script>
