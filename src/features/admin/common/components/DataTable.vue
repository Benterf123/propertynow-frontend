<template>
  <div class="@container rounded border border-slate-300 p-3 dark:border-slate-300/10">
    <header class="flex items-center justify-between gap-x-2">
      <InputField
        v-model="query"
        type="search"
        class="flex-1 sm:max-w-[300px]"
        :placeholder="searchPlaceholder"
      >
        <template v-if="query.trim() != ''" #suffix-icon>
          <XMarkIcon class="cursor-pointer" @click="query = ''" />
        </template>
      </InputField>
      <div class="dt-actions flex items-center gap-x-2">
        <slot name="actions" />
        <button v-if="hasGridLayout" @click="toggleListMode">
          <Squares2X2Icon v-if="isListMode" />
          <ListBulletIcon v-else />
        </button>
      </div>
    </header>
    <main class="mt-4 overflow-x-auto">
      <table v-if="isListMode || !hasGridLayout" class="w-full text-left">
        <thead :key="`key-${headerRerenderTriggerKey}`">
          <tr>
            <th v-for="(header, i) in headers" :key="`header-${i}`" @click="sortHeader(header)">
              <div
                :class="[
                  'flex items-center gap-x-1',
                  {
                    'cursor-pointer select-none': header.sort !== undefined,
                    'justify-center text-center':
                      header.align === 'center' ||
                      (header.formatAsDate && header.align === undefined),
                    'justify-end text-right': header.align === 'right'
                  },
                  header.classes
                ]"
              >
                {{ header.text }}
                <ArrowLongUpIcon
                  v-if="header.sort === 'asc'"
                  class="inline-block h-5 w-5 shrink-0 stroke-2"
                />
                <ArrowLongDownIcon
                  v-else-if="header.sort === 'desc'"
                  class="inline-block h-5 w-5 shrink-0 stroke-2"
                />
              </div>
            </th>
            <th v-if="hasItemActions">Actions</th>
          </tr>
        </thead>
        <tbody ref="itemsList">
          <tr v-if="filteredItems.length === 0">
            <td colspan="5" class="text-center">No Items Found</td>
          </tr>
          <template v-else>
            <tr
              v-for="(item, i) of filteredItems"
              :key="`item-${i}`"
              :class="[
                'border-y border-slate-100 dark:border-slate-100/10',
                { 'cursor-pointer hover:bg-primary/5': onItemClick }
              ]"
              @click="onItemClick && onItemClick(item)"
            >
              <td
                v-for="(header, i) of headers"
                :key="`item-value-${i}`"
                :class="[
                  {
                    'text-center':
                      header.align === 'center' ||
                      (header.formatAsDate && header.align === undefined),
                    'text-right': header.align === 'right'
                  },
                  header.itemClasses
                ]"
              >
                <slot
                  name="list-item-value"
                  v-bind="{
                    itemKey: header.value,
                    value: getItemValue(item, header.value, header.formatAsDate),
                    item
                  }"
                >
                  {{ getItemValue(item, header.value, header.formatAsDate) }}
                </slot>
              </td>
              <td v-if="hasItemActions" class="text-center">
                <slot name="item-actions" v-bind="{ item }" />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div
        v-else
        class="@lg:grid-cols-3 @2xl:grid-cols-4 @4xl:grid-cols-5 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        <!-- <div
        v-else
        class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      > -->
        <div
          v-for="(item, i) of filteredItems"
          :key="`grid-item-${i}`"
          class="duration-200"
          @click="onItemClick && onItemClick(item)"
        >
          <slot name="grid-item" v-bind="item">
            <div
              :class="[
                'rounded-lg p-3 text-center transition-colors duration-[inherit]',
                onItemClick ? 'cursor-pointer hover:bg-primary/5' : ''
              ]"
            >
              <p class="text-semibold">
                {{ getItemValue(item, headers[0].value, headers[0].formatAsDate) }}
              </p>
              <p class="text-sm opacity-60">
                {{ getItemValue(item, headers[1].value, headers[1].formatAsDate) }}
              </p>
            </div>
          </slot>
        </div>
      </div>
    </main>
    <footer class="mt-2">
      <div class="items flex items-center justify-between">
        <p>Showing {{ filteredItems.length }} of {{ totalItems ?? items.length }}</p>
        <select
          v-if="pageSize"
          id="rowsPerPage"
          class="rounded border-slate-300 bg-transparent transition focus:border-primary focus:ring-primary dark:border-slate-300/20"
          name="rowsPerPage"
          :class="isPaginationLoading ? 'animate-pulse' : ''"
          @change="updatePageSize"
        >
          <option
            v-for="opt of pageSizeOptions"
            :key="`size-opt-${opt}`"
            :value="opt"
            :selected="opt === pageSize"
            class="dark:bg-scaffold-tint"
          >
            {{ opt }}
          </option>
        </select>
      </div>
      <div class="mx-auto mt-3 w-full">
        <Pagination
          v-if="totalPages"
          :page="currentPage"
          :pages="totalPages"
          :isLoading="isPaginationLoading"
          @goto-page="(page) => $emit('gotoPage', page)"
        />
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, useSlots, onMounted, onUnmounted } from 'vue'
import { formatRelative } from 'date-fns'
import {
  ListBulletIcon,
  Squares2X2Icon,
  XMarkIcon,
  ArrowLongUpIcon,
  ArrowLongDownIcon
} from '@heroicons/vue/24/outline'

import { InputField } from '@/features/common/components'

import Pagination from './Pagination.vue'
import { pageSizeOptions } from '../constants'

export interface IHeader {
  text: string
  value: string
  sort?: 'asc' | 'desc' | null
  classes?: string
  itemClasses?: string
  formatAsDate?: boolean
  align?: 'left' | 'center' | 'right'
}

export interface ISortField {
  name: string
  value: IHeader['sort']
}

const props = withDefaults(
  defineProps<{
    headers: IHeader[]
    items: { [propName: string]: any }[]
    searchPlaceholder?: string
    totalItems?: number
    currentPage?: number
    totalPages?: number
    pageSize?: number
    isPaginationLoading?: boolean
    hasGridLayout?: boolean
    onItemClick?: (item: any) => void
  }>(),
  {
    searchPlaceholder: 'Search item',
    isPaginationLoading: false,
    hasGridLayout: true,
    formatAsDate: false
  }
)

const emits = defineEmits<{
  (e: 'updatePageSize', size: number): void
  (e: 'gotoPage', size: number): void
  (e: 'search', query: string): void
  (e: 'sort', field: ISortField): void
}>()

const slots = useSlots()
const hasItemActions = ref(false)
let observer: MutationObserver | null = null
const itemsList = ref<HTMLElement | null>(null)
onMounted(() => {
  observer?.disconnect()
  hasItemActions.value = slots['item-actions'] !== undefined

  observer = new MutationObserver(() => {
    hasItemActions.value = slots['item-actions'] !== undefined
  })
  observer.observe(itemsList.value!, {
    childList: true,
    subtree: true
  })
})
onUnmounted(() => {
  observer?.disconnect()
})

const query = ref('')
const isListMode = ref(true)
watch(query, (value) => {
  emits('search', value)
})

const filteredItems = computed(() => {
  return props.items
})

function toggleListMode(): void {
  isListMode.value = !isListMode.value
}

function updatePageSize(e: Event): void {
  const value = (e.target as HTMLSelectElement).value
  emits('updatePageSize', +value)
}

const headerRerenderTriggerKey = ref(true)
function sortHeader(header: IHeader) {
  const mode = header.sort
  if (mode === undefined) return

  let sortMode: IHeader['sort'] = 'desc'
  if (mode === 'desc') sortMode = 'asc'
  else if (mode === 'asc') sortMode = null

  header.sort = sortMode
  headerRerenderTriggerKey.value = !headerRerenderTriggerKey.value
  emits('sort', { name: header.value, value: sortMode })
}

function getItemValue(item: Record<string, any>, key: string, formatAsDate?: boolean): any {
  const split = key.split('.')
  if (split.length === 1) {
    let returnValue = item[key]
    if (formatAsDate)
      returnValue = parseTime(returnValue)
        .split(' ')
        .map((value) => value.replace(/^(\w)/, (c) => c.toUpperCase()))
        .join(' ')
    return returnValue
  }

  return getItemValue(item[split[0]], split.slice(1).join('.'), formatAsDate)
}

function parseTime(date: Date): string {
  return formatRelative(date, new Date())
}
</script>

<style lang="scss">
.dt-actions button:not(.not-action) {
  @apply cursor-pointer rounded p-2 hover:bg-slate-50 dark:hover:bg-slate-50/10;

  svg {
    @apply h-6 w-6;
  }
}
</style>
