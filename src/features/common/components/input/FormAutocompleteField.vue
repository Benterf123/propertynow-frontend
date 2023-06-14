<template>
  <div class="">
    <label v-if="label" :for="inputId" class="block">
      {{ label }}
      <DotsLoader v-if="loading" class="ml-1 inline-flex" />
    </label>

    <Combobox v-model="selectedOption" :disabled="disabled">
      <div class="relative">
        <div
          class="form-input relative w-full rounded border-slate-300 bg-transparent pr-7 text-left transition focus:border-primary focus:ring-primary dark:border-slate-300/20"
        >
          <ComboboxInput
            :class="[
              'w-full border-none bg-transparent p-0 text-left focus:outline-none focus:ring-0',
              valueClass,
            ]"
            :displayValue="(opt) => (opt as IAutocompleteOption)?.value ?? ''"
            @change="query = $event.target.value"
          />
          <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute mt-2 max-h-60 w-full overflow-auto rounded-md bg-container py-1 text-base text-light shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-container-dark dark:text-dark sm:text-sm"
          >
            <div
              v-if="filteredOptions.length === 0 && query !== ''"
              class="relative cursor-default select-none px-4 py-2"
            >
              Nothing found.
            </div>

            <ComboboxOption
              v-for="option in filteredOptions"
              as="template"
              :key="option.key"
              :value="option"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-secondary/10 text-secondary': active,
                  // 'text-gray-900': !active
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ option.value }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-secondary': !active }"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>

    <div v-if="field.errors" class="mt-1 text-sm text-red-500">
      <span v-for="(error, i) of field.errors.value" :key="`error-${i}`" class="block">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRaw } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

import type { FormField } from '@/core/forms'
import { DotsLoader } from '@/features/common/components'

export interface IAutocompleteOption {
  key: IProps['field']['value']['value']
  value: string
}

export interface IProps {
  field: FormField<any>
  options?: IAutocompleteOption[] | undefined | null
  id?: string
  name?: string
  label?: string
  loading?: boolean
  placeholder?: string
  validateOnChange?: boolean
  valueClass?: string
  disabled?: boolean
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

let query = ref('')

const selectedOption = computed<IAutocompleteOption | null>({
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
let filteredOptions = computed<IAutocompleteOption[]>(() => {
  const opts = props.options
  if (!opts) return []

  return query.value === ''
    ? opts
    : opts.filter((option) =>
        option.value
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
})

const inputId = computed<string>(() => {
  let id = props.id ?? props.name
  if (!id && props.label) id = props.label.toLowerCase()

  return id ?? ''
})
</script>
