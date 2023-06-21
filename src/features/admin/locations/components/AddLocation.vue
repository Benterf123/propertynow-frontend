<template>
  <Modal @close="close">
    <template #trigger="{ openModal }">
      <button class="btn-icon flex items-center gap-x-2" @click="openModal">
        <PlusIcon class="h-5 w-5" />
      </button>
    </template>
    <template #default="{ closeModal }">
      <form @submit.prevent="() => addLocation(closeModal)">
        <FormInputField label="City" name="city" :field="city" />
        <div>
          <InputField
            label="Neigborhoods"
            name="neighbourhoods"
            placeholder="place1, place2"
            @input="handleNeighboursChange"
          />
          <div v-if="neighbourhoods.errors" class="mt-1 text-sm text-red-500">
            <span
              v-for="(error, i) of neighbourhoods.errors.value"
              :key="`error-${i}`"
              class="block"
            >
              {{ error }}
            </span>
          </div>
        </div>
        <div class="mt-6 flex items-center justify-end gap-x-4">
          <button
            type="button"
            class="btn-text rounded"
            :disabled="apiHandle.isLoading.value"
            @click.stop="closeModal"
          >
            Cancel
          </button>
          <button type="submit" :class="['btn rounded', { loading: apiHandle.isLoading.value }]">
            Add
          </button>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { PlusIcon } from '@heroicons/vue/20/solid'

import { Form, FormField } from '@/core/forms'
import { Validators, CompositeValidators } from '@/core/forms/validators'
import { Modal, InputField, FormInputField } from '@/features/common/components'
import type { ILocationAddPayload } from '../service'
import { useAdminLocationsStore } from '../store'
import { useApiHandle } from '@/core/api/composables'

const store = useAdminLocationsStore()
const { locationAddApiStatus: apiStatus, locationAddApiMsg: apiMsg } = storeToRefs(store)
const apiHandle = useApiHandle(apiStatus)

const form = new Form({
  city: new FormField(null, [Validators.required]),
  neighbourhoods: new FormField<string>(null, [
    Validators.required,
    [CompositeValidators.minLength(1), 'You must include atleast 1 neighbourhood'],
  ]),
})

function handleNeighboursChange(e: InputEvent) {
  const value = (e.target as HTMLInputElement).value
  neighbourhoods.value.value.value = value.split(',')
}

async function addLocation(closeModal: () => void) {
  if (!form.validate()) return

  const payload: ILocationAddPayload = {
    city: city.value.value.value!,
    neighborhoods: neighbourhoods.value.value.value!,
  }

  await store.addLocation(payload)
  if (!apiHandle.isSuccess.value) return
  closeModal()
}

function close() {
  form.reset()
}

const city = computed(() => form.getField<string>('city')!)
const neighbourhoods = computed(() => form.getField<string[]>('neighbourhoods')!)
</script>
