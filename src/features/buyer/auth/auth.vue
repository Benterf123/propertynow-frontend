<template>
  <div class="w-screnn relative h-screen overflow-hidden">
    <div class="absolute inset-0">
      <img src="/images/auth-backdrop.jpg" alt="property" class="h-full w-full object-cover" />
    </div>
    <div class="absolute inset-0 bg-gradient-to-r from-black/90" />
    <div class="absolute flex flex-col text-white left-8 top-1/2 h-4/5 w-[340px] -translate-y-1/2">
      <button class="flex items-center gap-x-2" @click="$router.back()">
        <ArrowLongLeftIcon class="h-5 w-5" />
        <span>View Properties</span>
      </button>
      <div
        class="mt-4 rounded-lg border flex-1 border-white/10 bg-gradient-to-l from-black/80 to-transparent shadow-lg shadow-black backdrop-blur-md"
      >
        <Transition
          mode="out-in"
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div v-if="isLogin" class="flex h-full flex-col p-3">
						<p v-if="email" class="success bg-green-50 mb-3">
							You account has been created successfully.  Login below to continue.
						</p>
            <Login :signup-email="email" @goto-signup="gotoSignup" />
          </div>
          <div v-else class="flex h-full flex-col p-3">
            <Signup @goto-login="gotoLogin" />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Transition } from 'vue'
import { ArrowLongLeftIcon } from '@heroicons/vue/24/outline'

import Login from './components/Login.vue'
import Signup from './components/Signup.vue'

const isLogin = ref(true)
const email = ref<string | null>(null)

function gotoLogin(signupEmail?: string) {
	isLogin.value = true;
	email.value = signupEmail ?? null;
}

function gotoSignup() {
	isLogin.value = false;
	email.value = null;
}
</script>
