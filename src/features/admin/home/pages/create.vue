<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="mb-4 text-xl">
        <BackBtn> Add Property</BackBtn>
      </h1>
      <button
        v-if="(images.value.value?.length ?? 0) > 2"
        class="btn sm:hidden"
        @click="addProperty"
      >
        Add Property
      </button>
    </div>
    <div v-if="apiHandle.isError.value" class="error mb-3">
      <p class="title">Error</p>
      <p class="">{{ apiMsg }}</p>
    </div>
    <form class="space-y-3" @submit.prevent="addProperty">
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <FormInputField label="Name" :field="name" />
        <FormInputField label="City" :field="city" />
        <FormInputField label="Neighbourhood" :field="neighbourhood" />
        <FormInputField label="Price ($)" type="number" :field="price" />
      </div>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
        <FormTextField label="Description" type="textarea" :field="description" />
        <FormFileField
          label="Images"
          images-class="grid grid-cols-2 gap-3"
          accept="image/*"
          :multiple="true"
          :field="images"
        />
      </div>

      <button
        type="submit"
        :class="['btn mx-auto !mt-4 block w-max', { loading: apiHandle.isLoading.value }]"
      >
        Add Property
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useApiHandle } from '@/core/api/composables'
import { Form, FormField } from '@/core/forms'
import { Validators } from '@/core/forms/validators'
import { FormFileField, FormInputField, FormTextField } from '@/features/common/components'

import BackBtn from '../../common/components/BackBtn.vue'

import type { TPropertyAddPayload } from '../services'
import { useAdminPropertiesStore } from '../store'

const store = useAdminPropertiesStore()
const { propertyAddApiStatus: apiStatus, propertyAddApiMsg: apiMsg } = storeToRefs(store)
const apiHandle = useApiHandle(apiStatus)

const form = new Form({
  name: new FormField(null, [Validators.required]),
  description: new FormField(null, [Validators.required]),
  price: new FormField(null, [Validators.required]),
  city: new FormField(null, [Validators.required]),
  neighbourhood: new FormField(null, [Validators.required]),
  images: new FormField(null, [Validators.required]),
})

async function addProperty() {
  if (!form.validate()) return

  const payload: TPropertyAddPayload = {
    title: name.value.value.value!,
    description: description.value.value.value!,
    price: price.value.value.value!,
    city: city.value.value.value!,
    neighborhood: neighbourhood.value.value.value!,
    images: images.value.value.value!,
  }
  await store.addProperty(payload)
}

const name = computed(() => form.getField<string>('name')!)
const description = computed(() => form.getField<string>('description')!)
const price = computed(() => form.getField<string>('price')!)
const city = computed(() => form.getField<string>('city')!)
const neighbourhood = computed(() => form.getField<string>('neighbourhood')!)
const images = computed(() => form.getField<File[]>('images')!)
</script>
