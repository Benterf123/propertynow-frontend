<template>
  <nav class="sticky top-0 z-50 bg-slate-950/70 text-white backdrop-blur-xl">
    <div class="flex items-center justify-between p-3">
      <RouterLink :to="{ name: 'home' }">PropertyNow</RouterLink>
      <ul class="flex items-center"></ul>

      <div class="flex items-center">
        <button
          v-if="isUserAuthed"
          :class="['btn-text bg-transparent text-white', { loading: isLoggingOut }]"
          @click="logout"
        >
          Logout
        </button>
        <RouterLink v-else :to="{ name: 'auth' }" class="btn">Login</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { delay } from '@/common/functional';
import { useAuthStore } from '../../auth/store'

const store = useAuthStore()
const { isUserAuthed } = storeToRefs(store)

const isLoggingOut = ref(false)
async function logout() {
  isLoggingOut.value = true
	
	await delay(500);
	store.logout()

  isLoggingOut.value = false
}
</script>
