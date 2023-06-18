<template>
  <div>
    <div class="mb-2 flex items-center justify-between">
      <div class="flex items-center gap-x-2">
        <h2>Properties</h2>
        <DotsLoader v-if="apiHandle.isLoading.value" />
      </div>
      <router-link
        :to="{ name: 'admin-properties-add' }"
        class="btn-icon flex items-center gap-x-2"
      >
        <PlusIcon class="h-5 w-5" />
      </router-link>
    </div>
    <div v-if="apiHandle.isError.value" class="error mb-3">
      <p class="title">Error</p>
      <p>{{ apiMsg }}</p>
    </div>
    <DataTable
      :headers="[
        {
          text: 'Name',
          value: 'title',
        },
        {
          text: 'Description',
          value: 'description',
        },
        {
          text: 'Price',
          value: 'price',
        },
      ]"
      :items="properties"
      @item-click="gotoProperty"
    >
      <template #grid-item="property">
        <div class="cursor-pointer rounded-lg text-center duration-[inherit]">
          <AvatarImage
            class="prop-hover:opacity-100 h-[100px] w-full opacity-60 transition-opacity duration-[inherit]"
            iconClass="w-10 h-10"
          />
          <div class="p-3 pt-0">
            <p class="mt-2">{{ property.title }}</p>
            <p class="truncate text-sm opacity-80">{{ property.price }}</p>
          </div>
        </div>
      </template>
      <template #list-item-value="{ itemKey, value, item: property }">
        <div v-if="itemKey === 'title'" class="flex min-w-[150px] items-center gap-x-2">
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
import { storeToRefs } from 'pinia'
import { RouterLink, useRouter } from 'vue-router'
import { PlusIcon } from '@heroicons/vue/20/solid'

import { useApiHandle } from '@/core/api/composables'
import { DotsLoader } from '@/features/common/components'
import type Property from '@/features/home/models/property.model'

import { useAdminPropertiesStore } from '../store'
import DataTable from '../../common/components/table/DataTable.vue'
import AvatarImage from '../../common/components/AvatarImage.vue'

const store = useAdminPropertiesStore()
const { propertiesApiStatus: apiStatus, propertiesApiMsg: apiMsg, properties } = storeToRefs(store)
const apiHandle = useApiHandle(apiStatus)

getProperties()
function getProperties() {
  store.retrieveAll({
    page: 0,
    limit: 1000,
  })
}

const router = useRouter()
function gotoProperty(property: Property) {
  router.push({ name: 'admin-property-details', params: { id: property.id } })
}
</script>
