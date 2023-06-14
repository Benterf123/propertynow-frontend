<template>
  <div class="overflow-hidden rounded-lg">
    <img v-if="src" class="h-full w-full object-cover" :src="src" />
    <div v-else class="grid h-full w-full place-items-center bg-black/5 dark:bg-white/5">
      <PhotoIcon :class="twMerge('h-5 w-5 text-black/60 dark:text-white/60', iconClass)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { PhotoIcon } from '@heroicons/vue/24/outline'

defineProps<{ src?: string; iconClass?: string }>()
</script>
