<template>
  <div class="w-screnn relative h-screen overflow-hidden">
    <div class="absolute inset-0">
      <img src="/images/auth-backdrop.jpg" alt="property" class="h-full w-full object-cover" />
    </div>
    <div class="absolute inset-0 bg-gradient-to-r from-black/90" />
    <div
      class="absolute left-8 top-1/2 h-4/5 w-[340px] -translate-y-1/2 rounded-lg border border-white/10 bg-gradient-to-l from-black/80 to-transparent text-white shadow-lg shadow-black backdrop-blur-md"
    >
      <Transition
        mode="out-in"
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition-all duration-300"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="isLogin" class="flex h-full flex-col p-3">
          <Login @goto-signup="isLogin = false" />
        </div>
        <div v-else class="flex h-full flex-col p-3">
					<Signup @goto-login="isLogin = true" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Transition } from 'vue'

import Login from './components/Login.vue'
import Signup from './components/Signup.vue'

const isLogin = ref(true)
</script>
