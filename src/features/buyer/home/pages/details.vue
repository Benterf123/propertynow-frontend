<template>
  <div class="px-3 pb-12 pt-3">
    <div class="flex items-center justify-between">
      <h1 class="mb-3 flex items-center gap-x-3">
        <BackBtn>{{ property ? property.title : 'Property' }}</BackBtn>
        <DotsLoader v-if="apiHandle.isLoading.value" />
      </h1>
      <button class="btn md:hidden">Purchase</button>
    </div>
    <div v-if="apiHandle.isError.value" class="error mb-3">
      <p class="title">Error</p>
      <p class="capitalize">{{ apiMsg }}</p>
    </div>
    <section v-if="property" class="mt-2 md:mt-4 gap-x-4 md:flex">
      <Slideshow
        v-model:currentIndex="currentImageIdx"
        class="md:w-max-[400px] aspect-square flex-1 rounded-lg"
        :images="
          property.images.map((img, idx) => ({
            src: img,
            alt: `${property!.title}'s image number ${idx + 1}`,
          }))
        "
      />
      <div class="mt-4 md:mt-0 md:flex-1">
        <div class="grid grid-cols-6 gap-3">
          <div
            v-for="(img, i) of property.images"
            :key="img"
            role="button"
            :class="[
              'aspect-square overflow-hidden rounded border-2 transition-[opacity,padding] duration-500',
              i === currentImageIdx
                ? 'border-primary p-1 opacity-100'
                : 'border-transparent opacity-60 hover:opacity-100',
            ]"
            @click="gotoImageIdx(i)"
          >
            <img
              :src="img"
              :alt="`${property.title}'s image number ${i + 1}`"
              class="h-full w-full rounded object-cover"
            />
          </div>
        </div>
        <p class="mt-4 text-xl">{{ property.title }}</p>
        <p class="opacity-60">{{ property.description }}</p>
        <div class="mt-3 flex gap-x-8">
          <div>
            <p class="font-semibold">City</p>
            <p>{{ property.location.city }}</p>
          </div>
          <div>
            <p class="font-semibold">Neighborhood</p>
            <p>{{ property.location.neighborhood }}</p>
          </div>
        </div>
        <p class="mt-4 text-3xl"><span class="text-base">$</span>{{ property.price }}</p>
        <button class="btn mt-1">Purchase</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useApiHandle } from '@/core/api/composables'
import { DotsLoader, Slideshow } from '@/features/common/components'

import { BackBtn } from '../../common/components'
import { usePropertiesStore } from '../store'

const store = usePropertiesStore()
const { propertyApiStatus: apiStatus, propertyApiMsg: apiMsg, property } = storeToRefs(store)
const apiHandle = useApiHandle(apiStatus)

const currentImageIdx = ref(0)

const route = useRoute()
getProperty()
function getProperty() {
  const id = route.params.id as string
  store.retrieveOne(id)
}

function gotoImageIdx(idx: number) {
  currentImageIdx.value = idx
}
</script>
