<template>
  <div class="group relative overflow-hidden">
    <div
      ref="slideshow"
      class="absolute inset-0 flex transition-transform duration-1000"
      @mouseenter="clearTimer"
      @mouseleave="setupTimer"
    >
      <img
        ref="slideshowImg"
        v-for="(img, i) of images"
        :key="`show-${img}`"
        :src="img.src"
        :alt="img.alt ?? `image number ${i}`"
        class="h-full w-full shrink-0 bg-slate-50 object-cover"
      />
    </div>
    <div
      v-if="buttons"
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
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/24/outline'

const props = withDefaults(
  defineProps<{
    currentIndex: number
    images: { src: string; alt?: string }[]
    buttons?: boolean
		interval?: number
  }>(),
  {
    buttons: true,
		interval: 15000,
  },
)

const emit = defineEmits<{
  'update:currentIndex': [index: number]
}>()

const currentImageIdx = computed<number>({
  get() {
    return props.currentIndex
  },
  set(idx) {
    emit('update:currentIndex', idx)
  },
})

watch(
  () => props.currentIndex,
  (idx) => {
    gotoImageIdx(idx)
  },
)

const slideshow = ref<HTMLDivElement | null>(null)
const slideshowImg = ref<HTMLImageElement[] | null>(null)
function handleImageTransition() {
  const el = slideshowImg.value![0]
  const size = el.getBoundingClientRect().width
  slideshow.value!.style.transform = `translateX(-${currentImageIdx.value * size}px)`
}

let interval: NodeJS.Timer
function clearTimer() {
  clearInterval(interval)
}
function setupTimer() {
  clearTimer()
  interval = setInterval(nextImg, props.interval)
}

function prevImg() {
  const idx = currentImageIdx.value
  currentImageIdx.value = (idx - 1) % props.images.length
}
function nextImg() {
  const idx = currentImageIdx.value
  currentImageIdx.value = (idx + 1) % props.images.length
}
function gotoImageIdx(idx: number) {
  currentImageIdx.value = idx
  handleImageTransition()
  setupTimer()
}

onMounted(setupTimer)
onUnmounted(clearTimer)
</script>
