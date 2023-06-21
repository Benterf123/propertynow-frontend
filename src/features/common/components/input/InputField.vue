<template>
  <div>
    <label v-if="label" :for="id">{{ label }}</label>
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :name="name || id"
        :placeholder="placeholder"
        :value="inputValue"
        :class="[
          'w-full rounded border-slate-300 bg-transparent transition focus:border-primary focus:ring-primary dark:border-slate-300/20',
          hasSuffixIcon ? 'pr-6' : '',
          inputClasses,
        ]"
        :min="min"
        :max="max"
				@input="(e) => inputChange(e as InputEvent)"
        :disabled="disabled"
      />
      <div
        ref="slotx"
        class="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2"
        :class="!hasSuffixIcon ? 'hidden' : ''"
      >
        <slot name="suffix-icon"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null
    type?: string
    id?: string
    name?: string
    label?: string
    placeholder?: string
    inputClasses?: string
    value?: string | null
    min?: string
    max?: string
    disabled?: boolean
  }>(),
  {
    modelValue: '',
    type: 'text',
    id: '',
    name: '',
    label: '',
    placeholder: '',
    value: '',
    disabled: false,
  }
)
const emit = defineEmits<{
  (e: 'update:modelValue', data: string): void
  (e: 'input', evt: InputEvent): void
}>()

function inputChange(evt: InputEvent) {
  const el = evt.target as HTMLInputElement
  const value = el.value

  emit('update:modelValue', value)
  emit('input', evt)
}

const slots = useSlots()
const hasSuffixIcon = ref()

let observer: MutationObserver | null = null
const slotx = ref<HTMLElement | null>(null)
onMounted(() => {
  observer?.disconnect()
  hasSuffixIcon.value = slots['suffix-icon'] !== undefined

  observer = new MutationObserver(() => {
    hasSuffixIcon.value = slots['suffix-icon'] !== undefined
  })
  observer.observe(slotx.value!, {
    childList: true,
    subtree: true,
  })
})
onUnmounted(() => {
  observer?.disconnect()
})

const inputValue = computed<string | number>(() => {
  return props.modelValue ?? props.value ?? ''
})
</script>
