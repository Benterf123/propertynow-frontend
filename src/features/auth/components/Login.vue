<template>
  <h1 class="mb-6 text-center text-2xl">Login</h1>
  <p v-if="apiHandle.isError.value" class="error mb-3 bg-red-50 first-letter:capitalize">
    {{ apiMsg }}
  </p>
  <form @submit.prevent="login" class="space-y-2">
    <FormInputField label="Email" type="email" class="dark" :field="email" />
    <FormInputField label="Password" type="password" class="dark" :field="password" />
    <button :class="['btn !mt-6 block w-full', { loading: apiHandle.isLoading.value }]">
      Login
    </button>
  </form>
  <button class="loading mt-auto text-center text-primary" @click="gotoSignup">
    Signup Instead
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { Form, FormField } from '@/core/forms'
import { Validators } from '@/core/forms/validators'
import { useApiHandle } from '@/core/api/composables'
import { FormInputField } from '@/features/common/components'

import { useAuthStore } from '../store'
import type { ILoginPayload } from '../services'

const emit = defineEmits<{ (e: 'gotoSignup'): void }>()

const store = useAuthStore()
const { loginApiStatus: apiStatus, loginApiMsg: apiMsg } = storeToRefs(store)
const apiHandle = useApiHandle(apiStatus)

const form = new Form({
  email: new FormField(null, [[Validators.required, 'Email is required']]),
  password: new FormField(null, [[Validators.required, 'Password is required']])
})

function login() {
  if (!form.validate()) return

  const payload: ILoginPayload = {
    email: email.value.value.value!,
    password: password.value.value.value!
  }

  store.login(payload)
}

function gotoSignup() {
  emit('gotoSignup')
}

const email = computed(() => form.getField<string>('email')!)
const password = computed(() => form.getField<string>('password')!)
</script>
