<template>
  <h1 class="text-center text-2xl">Login</h1>
  <form @submit.prevent="login" class="mt-6 space-y-2">
    <FormInputField label="Email" class="dark" :field="email" />
    <FormInputField label="Password" type="password" class="dark" :field="password" />
    <button class="btn !mt-6 block w-full">Login</button>
  </form>
  <button class="mt-auto text-center text-primary" @click="gotoSignup">Signup Instead</button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { Form, FormField } from '@/core/forms'
import { Validators } from '@/core/forms/validators'

import { FormInputField } from '@/features/common/components'

const emit = defineEmits<{ (e: 'gotoSignup'): void }>()

const form = new Form({
  email: new FormField(null, [[Validators.required, 'Email is required']]),
  password: new FormField(null, [[Validators.required, 'Password is required']])
})

function login() {
  if (!form.validate()) return

  console.log('Login')
}

function gotoSignup() {
  emit('gotoSignup')
}

const email = computed(() => form.getField<string>('email')!)
const password = computed(() => form.getField<string>('password')!)
</script>
