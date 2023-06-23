<template>
  <div>
    <header class="h-[calc(100vh-64px)] bg-slate-950 text-white">
      <div class="absolute inset-0 bg-red-50">
        <Slideshow v-model:currentIndex="imgIdx" class="h-full w-full" :images="images" />
        <div
          class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/60 to-transparent md:bg-gradient-to-r"
        />
      </div>
      <div class="absolute inset-0 top-0 flex items-center justify-between bg-slate-950/10 px-3">
        <div class="relative text-center md:text-left">
          <h1 class="text-6xl font-light md:w-3/5 lg:w-2/5">Your House is Waiting For You!</h1>
          <a href="#properties" class="btn mt-12 inline-block">View Properties</a>
          <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 translate-y-full sm:hidden">
            <div class="mx-auto h-20 w-[2px] rounded-t-full bg-white" />
            <div
              class="aspect-square h-5 rounded-full border-2 border-white bg-white/10 backdrop-blur-sm"
              @click="gotoNextImage"
              role="button"
            />
          </div>
        </div>
        <button
          class="group relative hidden h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white text-white backdrop-blur-sm md:block"
          @click="gotoNextImage"
        >
          <div
            :class="[
              'absolute left-[calc(3*0.25rem+2px)] top-1/2 flex -translate-y-1/2 items-center gap-x-[calc(3*0.25rem+2px)] transition-transform duration-300',
              'hover:translate-x-0 group-hover:-translate-x-[calc(8*0.25rem+2px)]',
            ]"
          >
            <ArrowLongRightIcon class="h-5 w-5" />
            <ArrowLongRightIcon class="h-5 w-5" />
          </div>
        </button>
      </div>
    </header>
    <div :class="['relative', { 'pointer-not-allowed': properties.length === 0 }]">
      <div
        :class="[
          'absolute left-1/2 mx-auto grid w-[calc(100%-3*0.25rem)] -translate-x-1/2 -translate-y-1/2 grid-cols-3 gap-x-4 rounded-lg bg-white/80 px-6 py-4 shadow-xl shadow-black/5 backdrop-blur-md md:w-max',
          { 'pointer-events-none': properties.length === 0 },
        ]"
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
        <button
          class="btn flex items-center justify-center gap-x-3 !px-4 !py-3"
          @click="getProperties"
        >
          <MagnifyingGlassIcon class="h-6 w-6" />
          Search
        </button>
      </div>
    </div>
    <main class="px-3 pt-24">
      <div id="properties" class="">
        <div v-if="apiHandle.isLoading.value" class="flex items-center gap-x-3">
          <p>Fetching properties...</p>
          <DotsLoader />
        </div>
        <div
          v-else-if="apiHandle.isError.value"
          class="error mx-auto mb-3 bg-red-50 first-letter:capitalize md:max-w-[580px]"
        >
          <p>{{ apiMsg }}</p>
          <button class="btn mt-4" @click="getProperties">Retry</button>
        </div>
        <div v-else-if="properties.length === 0" class="text-center">
          <p>There are no properties in the system at this time. Please come back later.</p>
        </div>
        <div v-else class="grid grid-cols-2 gap-x-4 gap-y-10 py-3 md:grid-cols-3 lg:grid-cols-4">
          <RouterLink
            v-for="property of properties"
            :key="`property-${property.id}`"
            :to="{ name: 'property-details', params: { id: property.id } }"
          >
            <div
              class="group relative h-48 rounded-lg bg-gradient-to-b from-transparent from-40% to-primary/30 p-3"
            >
              <AvatarImage
                :src="property.image"
                :class="[
                  'absolute left-1/2 h-full w-[calc(100%-4*0.25rem)] -translate-x-1/2 -translate-y-6 rounded-lg object-cover shadow-lg',
                  'overflow-hidden',
                ]"
                iconClass="w-20 h-20"
                imgClass="transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="mt-2">
              <div class="flex items-start justify-between">
                <p class="">{{ property.title }}</p>
                <p class="text-xl font-light">
                  <span class="text-sm">$</span> {{ property.price }}
                </p>
              </div>
              <p class="truncate text-sm opacity-60">{{ property.description }}</p>
              <button class="btn-text mx-auto mt-2 block">Purchase</button>
            </div>
          </RouterLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ArrowLongRightIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

import { useApiHandle } from '@/core/api/composables'
import { DotsLoader, AvatarImage, InputField, Slideshow } from '@/features/common/components'

import { usePropertiesStore } from '../store'

const images = [
  {
    src: '/images/hero-1.jpg',
    alt: 'white concrete house near green tree during daytime',
  },
  {
    src: '/images/hero-2.jpg',
    alt: 'gray wooden house',
  },
  {
    src: '/images/hero-3.jpg',
    alt: 'brown black wooden house',
  },
]

const imgIdx = ref(Math.floor(Math.random() * images.length))
function gotoNextImage() {
  imgIdx.value = (imgIdx.value + 1) % images.length
}

const store = usePropertiesStore()
const { propertiesApiStatus: apiStatus, propertiesApiMsg: apiMsg, properties } = storeToRefs(store)
const apiHandle = useApiHandle(apiStatus)

const minPrice = ref(10001)
const maxPrice = ref(1000000)

getProperties()
function getProperties() {
  store.retrieveAll({
    page: 1,
    limit: 100,
  })
}

const selectedCity = 'Kigali'
</script>
