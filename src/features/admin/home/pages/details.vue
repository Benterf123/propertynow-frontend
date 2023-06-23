<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="mb-3 flex items-center gap-x-3">
        <BackBtn>{{ property ? property.title : 'Property' }}</BackBtn>
        <DotsLoader v-if="apiHandle.isLoading.value" />
      </h1>
      <DeleteProperty v-if="property" :property="property" />
    </div>
    <div v-if="apiHandle.isError.value" class="error mb-3">
      <p class="title">Error</p>
      <p class="">{{ apiMsg }}</p>
    </div>
    <template v-if="property">
      <div class="text-center">
        <AvatarImage
          :src="property.image"
          class="mx-auto aspect-square h-40"
          iconClass="h-20 w-20"
        />
        <div class="mx-auto mt-1 flex w-max items-center gap-x-3">
          <p class="text-3xl">{{ property.title }}</p>
          <div class="aspect-square w-2 rounded-full bg-slate-600" />
          <p class="text-3xl"><span class="text-base">$</span>{{ property.price }}</p>
        </div>
        <p class="opacity-60">{{ property.description }}</p>
      </div>
      <p class="mt-8 font-semibold">City</p>
      <p>{{ property.location.city }}</p>
      <p class="mt-2 font-semibold">Neighborhood</p>
      <p>{{ property.location.neighborhood }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useApiHandle } from '@/core/api/composables'
import { DotsLoader } from '@/features/common/components'

import BackBtn from '../../common/components/BackBtn.vue'
import AvatarImage from '../../common/components/AvatarImage.vue'
import DeleteProperty from '../components/DeleteProperty.vue'

import { useAdminPropertiesStore } from '../store'

const store = useAdminPropertiesStore()
const { propertyApiStatus: apiStatus, propertyApiMsg: apiMsg, property } = storeToRefs(store)
const apiHandle = useApiHandle(apiStatus)

const route = useRoute()
getProperty()
function getProperty() {
  const id = route.params.id as string
  store.retrieveOne(id)
}
</script>
