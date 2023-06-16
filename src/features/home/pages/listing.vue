<template>
  <div>
    <header class="h-[calc(100vh-64px)] bg-slate-950 text-white">
      <div class="c-container absolute inset-0 top-0 flex items-center px-3">
        <h1 class="w-2/5 text-6xl font-light">You House is Waiting For You!</h1>
      </div>
    </header>
    <div class="relative">
      <div
        class="absolute left-1/2 mx-auto grid w-max -translate-x-1/2 -translate-y-1/2 grid-cols-3 items-center gap-x-4 rounded-lg bg-white/80 p-6 shadow-xl shadow-black/5 backdrop-blur-md"
      >
        <div>
          <p class="flex gap-x-2">
            City
            <ChevronDownIcon class="h-6 w-6" />
          </p>
          <p class="opacity-60">{{ selectedCity }}</p>
        </div>
        <div>
          <p class="flex gap-x-2">
            Price
            <ChevronDownIcon class="h-6 w-6" />
          </p>
          <div class="flex gap-x-1">
            <InputField v-model="minPrice" name="minPrice" placeholder="min" class="w-20" />
            <InputField v-model="maxPrice" name="maxPrice" placeholder="max" class="w-20" />
          </div>
        </div>
        <button class="btn flex items-center gap-x-3 !px-4 !py-3" @click="getProperties">
          <MagnifyingGlassIcon class="h-6 w-6" />
          Search
        </button>
      </div>
    </div>
    <main class="bg-primary/0">
      <div class="c-container pt-24">
        <div
          v-if="apiHandle.isError.value"
          class="error mx-auto mb-3 w-max bg-red-50 first-letter:capitalize md:max-w-[580px]"
        >
          <p>{{ apiMsg }}</p>
          <button class="btn mt-4" @click="getProperties">Retry</button>
        </div>
        <div v-else class="c-container grid grid-cols-2 p-3 pt-24 md:grid-cols-3 lg:grid-cols-4">
          <div v-for="property of properties" :key="`property-${property.id}`">
            <div
              class="relative h-48 rounded-lg bg-gradient-to-b from-transparent from-40% to-primary/30 p-3"
            >
              <img
                class="absolute left-1/2 h-full w-[calc(100%-4*0.25rem)] -translate-x-1/2 -translate-y-6 rounded-lg object-cover shadow-lg"
                :src="property.image"
                :alt="property.title"
              />
            </div>
            <div class="mt-2">
              <p class="text-lg opacity-60">{{ property.title }}</p>
              <p>{{ property.price }}</p>
              <button class="btn">Buy</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

import { usePropertiesStore } from '../store'
import { useApiHandle } from '@/core/api/composables'
import { InputField } from '@/features/common/components'

const store = usePropertiesStore()
const { propertiesApiStatus: apiStatus, propertiesApiMsg: apiMsg, properties } = storeToRefs(store)
const apiHandle = useApiHandle(apiStatus)

const minPrice = ref(100)
const maxPrice = ref(10000)

getProperties()
function getProperties() {
  store.retrieveAll({
    page: 1,
    limit: 100
  })
}

const selectedCity = 'Kigali'
const selectedPrice = '$5000'
</script>
