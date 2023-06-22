<template>
  <nav class="sticky top-0 z-10 bg-slate-950/70 text-white backdrop-blur-xl">
    <div class="flex items-center justify-between p-3">
      <RouterLink :to="{ name: 'home' }">PropertyNow</RouterLink>
      <ul class="flex items-center"></ul>

      <div class="flex items-center">
        <RouterLink v-if="isUserAuthed" :to="{ name: 'profile' }">
          <AvatarImage class="rounded-full bg-slate-50 p-3" />
        </RouterLink>
        <RouterLink v-else :to="{ name: 'auth' }" class="btn">Login</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { AvatarImage } from '@/features/common/components'

import { useAuthStore } from '../../auth/store'

const store = useAuthStore()
const { isUserAuthed } = storeToRefs(store)


</script>
