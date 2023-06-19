<template>
  <form class="flex flex-col" @submit.prevent="resetPassword">
    <FormInputField
			class="mb-3"
			name="token"
      placeholder="Token"
      :field="token"
    />
    <FormInputField
			class="mb-3"
			name="password"
      placeholder="Password"
			type="password"
      :field="password"
    />
    <FormInputField
      class="mb-3"
			name="confirmPassword"
			placeholder="Confirm Password"
			type="password"
      :field="confirmPassword"
    />
    <button class="btn-text ml-auto mt-auto flex items-center gap-x-3">
      Update Password
      <ArrowLongRightIcon class="h-5 w-5" />
    </button>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLongRightIcon } from '@heroicons/vue/20/solid'

import { Form, FormField } from '@/core/forms'
import { Validators } from '@/core/forms/validators'
import { FormInputField } from '@/features/common/components'

const form = new Form({
  token: new FormField(null, [Validators.required]),
  password: new FormField(null, [Validators.required]),
  confirmPassword: new FormField(null, [Validators.required]),
})

function resetPassword() {
  if (!form.validate()) return
}

const token = computed(() => form.getField<string>('token')!)
const password = computed(() => form.getField<string>('password')!)
const confirmPassword = computed(() => form.getField<string>('confirmPassword')!)
</script>
