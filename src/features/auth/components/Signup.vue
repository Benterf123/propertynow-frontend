<template>
  <h1 class="text-center text-2xl">Create Account</h1>
  <form @submit.prevent="signup" class="mt-6 space-y-2">
    <div class="flex gap-x-4">
      <FormInputField label="First Name" class="dark" :field="firstName" />
      <FormInputField label="Last Name" class="dark" :field="lastName" />
    </div>
    <FormInputField label="Email" class="dark" :field="email" />
    <FormInputField label="Password" type="password" class="dark" :field="password" />
    <button class="btn !mt-6 block w-full">Signup</button>
  </form>
  <button class="mt-auto text-center text-primary" @click="gotoLogin">Login Instead</button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { Form, FormField } from '@/core/forms'
import { Validators } from '@/core/forms/validators'

import { FormInputField } from '@/features/common/components'

const emit = defineEmits<{ (e: 'gotoLogin'): void }>()

const form = new Form({
  firstName: new FormField(null, [[Validators.required, 'FirstName is required']]),
  lastName: new FormField(null, [[Validators.required, 'LastName is required']]),
  email: new FormField(null, [[Validators.required, 'Email is required']]),
  password: new FormField(null, [[Validators.required, 'Password is required']])
})

function signup() {
  if (!form.validate()) return

  console.log('Signup')
}

function gotoLogin() {
  emit('gotoLogin')
}

const email = computed(() => form.getField<string>('email')!)
const password = computed(() => form.getField<string>('password')!)
const firstName = computed(() => form.getField<string>('firstName')!)
const lastName = computed(() => form.getField<string>('lastName')!)
</script>
