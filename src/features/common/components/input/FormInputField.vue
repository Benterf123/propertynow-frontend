<template>
  <div class="">
    <InputField
      v-model="value"
      :id="inputID"
      :type="type"
      :name="name || id"
      :label="label"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :min="min"
      :max="max"
      :disabled="disabled"
    />
    <div v-if="field.errors" class="mt-1 text-sm text-red-500">
      <span v-for="(error, i) of field.errors.value" :key="`error-${i}`" class="block">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, type Ref } from 'vue'
import type { FormField } from '@/core/forms'

import InputField from './InputField.vue'

export interface IProps {
  field: FormField
  type?: string
  id?: string
  name?: string
  label?: string
  placeholder?: string
  autocomplete?: string
  validateOnKeypress?: boolean
  min?: string
  max?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'text',
  id: undefined,
  name: undefined,
  label: undefined,
  placeholder: '',
  errors: '',
  autocomplete: 'off',
  validateOnKeypress: false,
  disabled: false,
})

const value = props.field.value as Ref<string | number | null>
watch(value, () => {
  const field = props.field
  props.validateOnKeypress && field.validate()
})

const inputID = computed<string>(() => {
  let id = props.id ?? props.name
  if (!id && props.label) id = props.label.toLowerCase()

  return id ?? ''
})
</script>
