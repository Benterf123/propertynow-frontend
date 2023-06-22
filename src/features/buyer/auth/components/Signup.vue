<template>
  <h1 class="mb-6 text-center text-2xl">Create Account</h1>
  <p v-if="apiHandle.isError.value" class="error mb-3 bg-red-50 first-letter:capitalize">
    {{ apiMsg }}
  </p>
  <form class="space-y-2" @submit.prevent="signup">
    <div class="flex gap-x-4">
      <FormInputField label="First Name" class="dark" :field="firstName" />
      <FormInputField label="Last Name" class="dark" :field="lastName" />
    </div>
    <FormInputField label="Email" type="email" class="dark" :field="email" />
    <FormInputField label="Password" type="password" class="dark" :field="password" />
    <button :class="['btn !mt-6 block w-full', { loading: apiHandle.isLoading.value }]">
      Signup
    </button>
  </form>
  <button class="mx-auto mt-auto block w-max text-center text-primary" @click="() => gotoLogin()">
    Login Instead
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { Form, FormField } from '@/core/forms'
import { Validators } from '@/core/forms/validators'
import { FormInputField } from '@/features/common/components'
import { useApiHandle } from '@/core/api/composables'

import { useAuthStore } from '../store'
import type { ISignupPayload } from '../services'
import { IApiRequestStatus } from '@/core/api'

const emit = defineEmits<{ (e: 'gotoLogin', email?: string): void }>()

const store = useAuthStore()
const { signupApiStatus: apiStatus, signupApiMsg: apiMsg } = storeToRefs(store)
const apiHandle = useApiHandle(apiStatus)

const form = new Form({
  firstName: new FormField(null, [[Validators.required, 'FirstName is required']]),
  lastName: new FormField(null, [[Validators.required, 'LastName is required']]),
  email: new FormField(null, [[Validators.required, 'Email is required']]),
  password: new FormField(null, [[Validators.required, 'Password is required']]),
})

async function signup() {
  if (!form.validate()) return

  const payload: ISignupPayload = {
    first_name: firstName.value.value.value!,
    last_name: lastName.value.value.value!,
    email: email.value.value.value!,
    password: password.value.value.value!,
  }
  await store.signup(payload)

  if (apiStatus.value !== IApiRequestStatus.Success) return

  form.reset()
  gotoLogin(payload.email)
}

function gotoLogin(email?: string) {
  emit('gotoLogin', email)
}

const email = computed(() => form.getField<string>('email')!)
const password = computed(() => form.getField<string>('password')!)
const firstName = computed(() => form.getField<string>('firstName')!)
const lastName = computed(() => form.getField<string>('lastName')!)
</script>
