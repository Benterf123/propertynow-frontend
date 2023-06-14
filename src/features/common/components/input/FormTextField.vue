<template>
  <div class="mb-3">
    <label v-if="label" :for="inputId">{{ label }}</label>
    <textarea
      :id="inputId"
      :rows="rows"
      :name="name || id"
      :placeholder="placeholder"
      :value="(field.value.value as string)"
      :autocomplete="autocomplete"
      class="w-full rounded border-gray-300 transition focus:border-primary focus:ring-primary"
      @input="inputChange"
      @blur="validateOnKeypress ? field.validate() : null"
    />
    <div v-if="field.errors" class="mt-1 text-sm text-red-500">
      <span v-for="(error, i) of field.errors.value" :key="`error-${i}`" class="block">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FormField } from '@/core/forms'

export interface IProps {
  field: FormField
  type?: string
  id?: string
  name?: string
  label?: string
  placeholder?: string
  autocomplete?: string
  rows?: number
  validateOnKeypress?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'text',
  id: undefined,
  name: undefined,
  label: undefined,
  placeholder: '',
  errors: '',
  rows: 4,
  autocomplete: 'off',
  validateOnKeypress: true,
})

function inputChange(evt: Event) {
  const el = evt.target as HTMLInputElement
  const value = el.value

  const field = props.field
  field.value.value = value

  if (props.validateOnKeypress) field.validate()
}

const inputId = computed<string>(() => {
  let id = props.id ?? props.name
  if (!id && props.label) id = props.label.toLowerCase()

  return id ?? ''
})
</script>
