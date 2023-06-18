<template>
  <div class="px-3 pb-12 pt-3">
    <h1 class="mb-3 flex items-center gap-x-3">
      <BackBtn>{{ property ? property.title : 'Property' }}</BackBtn>
      <DotsLoader v-if="apiHandle.isLoading.value" />
    </h1>
    <div v-if="apiHandle.isError.value" class="error mb-3">
      <p class="title">Error</p>
      <p>{{ apiMsg }}</p>
    </div>
    <section v-if="property" class="mt-4 flex gap-4">
      <div class="md:w-max-[400px] group relative aspect-square flex-1 overflow-hidden rounded-lg">
        <div
          ref="slideshow"
          class="absolute inset-0 flex transition-transform duration-1000"
          @mouseenter="clearTimer"
          @mouseleave="setupTimer"
        >
          <img
            ref="slideshowImg"
            v-for="(img, i) of property.images"
            :key="`show-${img}`"
            :src="img"
            :alt="`${property.title}'s image number ${i + 1}`"
            class="h-full w-full shrink-0 bg-slate-50 object-cover"
          />
        </div>
        <div
          class="absolute left-0 top-1/2 flex w-full -translate-y-1/2 justify-between gap-x-4 text-white duration-300"
        >
          <div class="group/button flex-1 duration-[inherit]">
            <button
              :class="[
                'block w-full flex-1 -translate-x-full rounded-r-full bg-black/60 p-2 transition-transform duration-[inherit]',
                'group-hover/button:!-translate-x-1/2 group-hover:-translate-x-3/4',
              ]"
              @click="prevImg"
            >
              <ArrowLongLeftIcon class="ml-auto h-6 w-6" />
            </button>
          </div>
          <div class="group/button flex-1 duration-[inherit]">
            <button
              :class="[
                'block w-full flex-1 translate-x-full rounded-l-full bg-black/60 p-2 transition-transform duration-[inherit]',
                'group-hover/button:!translate-x-1/2 group-hover:translate-x-3/4',
              ]"
              @click="nextImg"
            >
              <ArrowLongRightIcon class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      <div class="flex-1">
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
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/24/outline'

import { useApiHandle } from '@/core/api/composables'
import { DotsLoader } from '@/features/common/components'

import { BackBtn } from '@/features/common/components'

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

const slideshow = ref<HTMLDivElement | null>(null)
const slideshowImg = ref<HTMLImageElement[] | null>(null)
function handleImageTransition() {
  const el = slideshowImg.value![0]
  const size = el.getBoundingClientRect().width
  slideshow.value!.style.transform = `translateX(-${currentImageIdx.value * size}px)`
}

let interval: number
function setupTimer() {
  clearInterval(interval)
  interval = setInterval(nextImg, 15000)
}
function clearTimer() {
  clearInterval(interval)
}

function prevImg() {
  const idx = currentImageIdx.value
  currentImageIdx.value = (idx - 1) % property.value!.images.length
  handleImageTransition()
}
function nextImg() {
  const idx = currentImageIdx.value
  currentImageIdx.value = (idx + 1) % property.value!.images.length
  handleImageTransition()
}
function gotoImageIdx(idx: number) {
  currentImageIdx.value = idx
  handleImageTransition()
  setupTimer()
}

onMounted(() => {
  setupTimer()
})
onUnmounted(() => {
  clearInterval(interval)
})
</script>
