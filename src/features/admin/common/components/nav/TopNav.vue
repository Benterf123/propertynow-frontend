<template>
  <nav
    class="dark:bg-scaffold-tint/90 group sticky top-0 flex h-14 items-center gap-x-2 border-b border-slate-300 bg-white/80 px-3 backdrop-blur-xl dark:border-transparent"
  >
    <Bars3Icon class="cursor-pointer md:hidden" @click="openSidenav" />
    <router-link :to="{ name: 'admin-home' }">Admin</router-link>
		
    <button class="ml-auto" @click="logout">
      <ArrowRightOnRectangleIcon class="h-6 w-6" />
    </button>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/features/auth/store'
import { ArrowRightOnRectangleIcon, Bars3Icon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

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
