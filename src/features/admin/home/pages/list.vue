<template>
  <div>
    <div class="mb-2 flex items-center justify-between">
      <h2>Properties</h2>
      <router-link
        :to="{ name: 'admin-properties-add' }"
        class="btn-icon flex items-center gap-x-2"
      >
        <PlusIcon class="h-5 w-5" />
      </router-link>
    </div>
    <DataTable
      :headers="[
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Price',
          value: 'price',
        },
        {
          text: 'createdAt',
          value: 'createdAt',
          formatAsDate: true,
        },
      ]"
      :items="properties"
    >
      <template #grid-item="property">
        <div class="cursor-pointer rounded-lg text-center duration-[inherit]">
          <AvatarImage
            class="prop-hover:opacity-100 h-[100px] w-full opacity-60 transition-opacity duration-[inherit]"
            iconClass="w-10 h-10"
          />
          <div class="p-3 pt-0">
            <p class="mt-2">{{ property.name }}</p>
            <p class="truncate text-sm opacity-80">{{ property.price }}</p>
          </div>
        </div>
      </template>
      <template #list-item-value="{ itemKey, value, item: property }">
        <div v-if="itemKey === 'name'" class="flex min-w-[150px] items-center gap-x-2">
          <AvatarImage class="shrink- h-10 w-10" :src="property.image" />
          <span>{{ value }}</span>
        </div>
        <template v-else>
          {{ value }}
        </template>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { PlusIcon } from '@heroicons/vue/20/solid'

import DataTable from '../../common/components/DataTable.vue'
import AvatarImage from '../../common/components/AvatarImage.vue'

const properties = [
  {
    id: 1,
    image: 'https://picsum.photos/100/100',
    name: 'Sugushu Topi',
    price: '$300',
    createdAt: new Date(),
  },
]

interface IPropertyJson {
  title: string
  description: string
  price: number
  seller_id: number
  location: {
    city: string
    neighborhood: string
  }
}
</script>
