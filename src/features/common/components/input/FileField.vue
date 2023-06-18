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
      <div v-if="images.length" :class="twMerge('h-full w-full', imagesClass)">
        <div v-for="(image, i) of images" :key="`image-${i}`" class="relative w-full h-full">
          <img
            :src="image.src"
            :class="['rounded object-cover h-full w-full']"
          />
          <button
            class="absolute bottom-1 left-1 rounded-full border border-slate-100 bg-white/70 p-2 backdrop-blur [&>.icon]:hover:-rotate-180"
            @click.prevent.stop="removeImageAtIdx(i)"
          >
            <XMarkIcon class="icon h-5 w-5 transition-transform duration-200" />
          </button>
        </div>
      </div>
      <div
        v-else
        class="text-center opacity-60 transition-opacity group-hover:opacity-100"
        @click.prevent.stop="input?.click()"
      >
        <PhotoIcon class="mx-auto h-10 w-10 opacity-70" />
        <p class="mt-1">Click or drop image to upload</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref} from 'vue'
import { twMerge } from 'tailwind-merge'
import { PhotoIcon, XMarkIcon } from '@heroicons/vue/24/outline'

export interface IProps {
  id?: string
  label?: string
  multiple?: boolean
  accept?: string
	imagesClass?: string
}

withDefaults(defineProps<IProps>(), {
  multiple: false,
	imagesClass: '',
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
