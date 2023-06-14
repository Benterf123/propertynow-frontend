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
          <h1 class="text-center text-2xl">Login</h1>
          <form @submit.prevent="login" class="mt-6 space-y-2">
            <FormInputField label="Email" class="dark" :field="email" />
            <FormInputField label="Password" type="password" class="dark" :field="password" />
            <button class="btn !mt-6 block w-full">Login</button>
          </form>
          <button class="mt-auto text-center text-primary" @click="gotoSignup">
            Signup Instead
          </button>
        </div>
        <div v-else class="flex h-full flex-col p-3">
          <h1 class="text-center text-2xl">Create Account</h1>
          <form @submit.prevent="login" class="mt-6 space-y-2">
            <FormInputField label="Email" class="dark" :field="email" />
            <FormInputField label="Password" type="password" class="dark" :field="password" />
            <button class="btn !mt-6 block w-full">Signup</button>
          </form>
          <button class="mt-auto text-center text-primary" @click="gotoLogin">
						Login Instead
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, Transition } from 'vue'
import { storeToRefs } from 'pinia'

import { Form, FormField } from '@/core/forms'
import { Validators } from '@/core/forms/validators'

import { FormInputField } from '@/features/common/components'

const form = new Form({
  email: new FormField(null, [[Validators.required, 'Email is required']]),
  password: new FormField(null, [[Validators.required, 'Password is required']])
})

const isLogin = ref(true)
function gotoLogin() {
  isLogin.value = true
}
function gotoSignup() {
  isLogin.value = false
}

async function login() {
  console.log('Login')
}

const email = computed(() => form.getField<string>('email')!)
const password = computed(() => form.getField<string>('password')!)
</script>
