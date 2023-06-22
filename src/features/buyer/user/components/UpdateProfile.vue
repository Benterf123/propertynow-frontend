<template>
  <Modal @close="close">
    <template #trigger="{ openModal }">
      <button class="btn-text-icon" @click="openModal">
        <PencilIcon />
        Update
      </button>
    </template>
    <template #default="{ closeModal }">
			<p class="mb-6 text-xl text-center">Update Profile</p>
			<Status v-if="apiHandle.isError.value" variant="error" :should-retry="false">{{ apiMsg }}</Status>
      <form class="space-y-2" @submit.prevent="() => update(closeModal)">
        <div class="flex gap-x-4">
          <FormInputField label="First Name" :field="firstName" />
          <FormInputField label="Last Name" :field="lastName" />
        </div>
        <FormInputField label="Email" type="email" :field="email" />

        <div class="!mt-6 flex justify-end gap-x-3">
          <button
            type="button"
            class="btn-text rounded"
            :disabled="apiHandle.isLoading.value"
            @click="closeModal"
          >
            Close
          </button>
          <button type="submit" :class="['btn', { loading: apiHandle.isLoading.value }]">
            Update
          </button>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { PencilIcon } from '@heroicons/vue/24/solid'

import { Form, FormField } from '@/core/forms'
import { useApiHandle } from '@/core/api/composables'
import { Validators } from '@/core/forms/validators'
import { Modal, FormInputField, Status } from '@/features/common/components'

import type UserModel from '../models/user.model'
import type { TUserUpdatePayload } from '../service'
import { useUserStore } from '../store'

const props = defineProps<{ user: UserModel }>()

const store = useUserStore()
const { userUpdateApiStatus: apiStatus, userUpdateApiMsg: apiMsg  } = storeToRefs(store)
const apiHandle = useApiHandle(apiStatus)

const form = new Form({
  firstName: new FormField(props.user.firstName, [[Validators.required, 'FirstName is required']]),
  lastName: new FormField(props.user.lastName, [[Validators.required, 'LastName is required']]),
  email: new FormField(props.user.email, [[Validators.required, 'Email is required']]),
})

function update(closeModal: () => void) {
  if (!form.validate()) return

  const payload: TUserUpdatePayload = {
    first_name: firstName.value.value.value!,
    last_name: lastName.value.value.value!,
    email: email.value.value.value!,
  }
  store.updateProfile(payload)

  if (!apiHandle.isSuccess.value) return
  closeModal()
}

function close() {
  form.reset()
}

const firstName = computed(() => form.getField<string>('firstName')!)
const lastName = computed(() => form.getField<string>('lastName')!)
const email = computed(() => form.getField<string>('email')!)
</script>
