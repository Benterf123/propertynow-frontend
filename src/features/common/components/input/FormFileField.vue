<template>
  <FileField :id="id" :label="label" :accept="accept" @input="handleFiles" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormField } from '@/core/forms'

import FileField from './FileField.vue'

export interface IProps {
  field: FormField
  id?: string
  label?: string
  accept?: string
}
const props = withDefaults(defineProps<IProps>(), {})

function handleFiles(files: File[]): void {
  const field = props.field
  field.value.value = files
}
</script>

<style scoped></style>
