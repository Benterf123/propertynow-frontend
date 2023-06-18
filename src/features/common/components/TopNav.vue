<template>
  <nav class="c-container sticky top-0 z-50 bg-slate-950/80 text-white backdrop-blur-md">
    <div class="c-container flex items-center justify-between p-3">
      <RouterLink :to="{ name: 'home' }">PropertyNow</RouterLink>
      <ul class="flex items-center"></ul>

      <div class="flex items-center">
        <button v-if="isUserAuthed" class="btn-text text-white bg-transparent" @click="logout">Logout</button>
				<RouterLink v-else :to="{ name: 'auth' }" class="btn">Login</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/features/auth/store';

const store = useAuthStore()
const { isUserAuthed } = storeToRefs(store)

function logout() {
	store.logout()
}
</script>
