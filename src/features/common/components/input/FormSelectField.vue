<template>
  <div class="">
    <label v-if="label" :for="inputId" class="block">
      {{ label }}
      <DotsLoader v-if="loading" class="ml-1 inline-flex" />
    </label>

    <Listbox v-model="selectedOption" :disabled="disabled">
      <div class="relative">
        <ListboxButton
          :class="[
            'form-input relative w-full rounded border-slate-300 bg-transparent pr-7 text-left transition focus:border-primary focus:ring-primary dark:border-slate-300/20',
            valueClass,
          ]"
        >
          <span v-if="selectedOption" class="block truncate">
            {{ selectedOption.value }}
          </span>
          <span v-else class="block truncate opacity-60">{{ placeholder }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            :class="[
              'absolute z-[50] mt-2 max-h-60 w-full overflow-auto rounded-md bg-container  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-container-dark sm:text-sm',
              optionsClass,
            ]"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="(opt, i) of options"
              :key="`box-opt-${i}`"
              :value="opt"
              as="template"
            >
              <li
                :class="[
                  active
                    ? 'bg-amber-100 text-amber-900'
                    : 'text-on-container dark:text-on-container-dark',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                  {{ opt.value }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <div v-if="field.errors" class="mt-1 text-sm text-red-500">
      <span v-for="(error, i) of field.errors.value" :key="`error-${i}`" class="block">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRaw, watch } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

import type { FormField } from '@/core/forms'
import { DotsLoader } from '@/features/common/components'

export interface ISelectOption {
  key: IProps['field']['value']['value']
  value: string
}

export interface IProps {
  field: FormField<any>
  options?: ISelectOption[] | undefined | null
  id?: string
  name?: string
  label?: string
  loading?: boolean
  placeholder?: string
  validateOnChange?: boolean
  valueClass?: string
  disabled?: boolean
  optionsClass?: string
}

const props = withDefaults(defineProps<IProps>(), {
  id: undefined,
  name: undefined,
  label: undefined,
  options: undefined,
  loading: false,
  placeholder: 'Pick an option...',
  validateOnChange: true,
  disabled: false,
})

const inputId = computed<string>(() => {
  let id = props.id ?? props.name
  if (!id && props.label) id = props.label.toLowerCase()

  return id ?? ''
})
const selectedOption = computed<ISelectOption | null>({
  get() {
    const opts = props.options
    if (!opts) return null

    const value = toRaw(props.field.value.value)
    return (
      opts.find((opt) => {
        const optionValue = toRaw(opt.key)
        return optionValue == value
      }) ?? null
    )
  },
  set(value) {
    let valueToSet = null
    if (value !== null) valueToSet = value.key

    const field = props.field
    field.value.value = valueToSet
  },
})
</script>
