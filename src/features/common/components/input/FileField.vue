<template>
  <div>
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      ref="input"
      :id="id"
      type="file"
      :accept="accept"
      :multiple="multiple"
      @input="handleFiles"
      hidden
    />
    <div
      class="group grid cursor-pointer place-items-center rounded-lg border border-dashed border-slate-200 p-2 transition-all duration-200 hover:border-primary"
    >
      <div v-if="images.length" class="h-full w-full">
        <div v-for="(image, i) of images" :key="`image-${i}`" class="relative">
          <img
            :src="image.src"
            :class="['rounded object-cover', multiple ? '' : 'h-full w-full']"
          />
          <button
            class="absolute bottom-1 left-1 rounded-full border border-slate-100 bg-white/70 p-2 backdrop-blur [&>.icon]:hover:-rotate-180"
            @click="removeImageAtIdx(i)"
          >
            <XMarkIcon class="icon h-5 w-5 transition-transform duration-200" />
          </button>
        </div>
      </div>
      <div
        v-else
        class="text-center opacity-60 transition-opacity group-hover:opacity-100"
        @click="input?.click()"
      >
        <PhotoIcon class="mx-auto h-10 w-10 opacity-70" />
        <p class="mt-1">Click or drop image to upload</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { PhotoIcon, XMarkIcon } from '@heroicons/vue/24/outline'

export interface IProps {
  id?: string
  label?: string
  multiple?: boolean
  accept?: string
}

withDefaults(defineProps<IProps>(), {
  multiple: false,
})
const emit = defineEmits<{
  (evt: 'input', files: File[]): void
}>()

interface IImage {
  src: string
  file: File
}
const images = ref<IImage[]>([])
const input = ref<HTMLInputElement | null>(null)

function handleFiles(evt: Event): void {
  const files = (evt.target as HTMLInputElement).files
  if (files === null) {
    images.value = []
    return
  }

  const rawFiles = []
  for (const file of files) {
    images.value.push({
      src: URL.createObjectURL(file),
      file: file,
    })
    rawFiles.push(file)
  }

  emit('input', rawFiles)
}

function removeImageAtIdx(idx: number): void {
  images.value.splice(idx, 1)
}
</script>

<style scoped></style>
