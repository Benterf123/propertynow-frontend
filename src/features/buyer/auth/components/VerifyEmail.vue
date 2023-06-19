<template>
  <form class="flex flex-col" @submit.prevent="verifyEmail">
    <FormInputField
      label="Enter your email address"
      placeholder="jane@doe.com"
      class="mb-3"
      :field="email"
    />
    <button class="btn-text ml-auto mt-auto flex items-center gap-x-3">
      Verify
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
  email: new FormField(null, [Validators.required, Validators.email]),
})

function verifyEmail() {
  if (!form.validate()) return
}

const email = computed(() => form.getField<string>('email')!)
</script>
