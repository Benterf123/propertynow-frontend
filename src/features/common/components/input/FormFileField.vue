<template>
  <div>
    <FileField
      :id="id"
      :label="label"
      :accept="accept"
      :multiple="multiple"
      :images-class="imagesClass"
      @input="handleFiles"
    />
    <div v-if="field.errors" class="mt-1 text-sm text-red-500">
      <span v-for="(error, i) of field.errors.value" :key="`error-${i}`" class="block">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormField } from '@/core/forms'

import FileField from './FileField.vue'

export interface IProps {
  field: FormField
  id?: string
  label?: string
  accept?: string
  multiple?: boolean
  imagesClass?: string
}
const props = withDefaults(defineProps<IProps>(), {})

function handleFiles(files: File[]): void {
  const field = props.field
  field.value.value = files
}
</script>

<style scoped></style>
