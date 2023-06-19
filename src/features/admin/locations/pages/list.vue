<template>
  <div>
    <div class="mb-2 flex items-center justify-between">
      <div class="flex items-center gap-x-2">
        <h2>Locations</h2>
        <DotsLoader v-if="apiHandle.isLoading.value" />
      </div>
      <router-link
        :to="{ name: 'admin-properties-add' }"
        class="btn-icon flex items-center gap-x-2"
      >
        <PlusIcon class="h-5 w-5" />
      </router-link>
    </div>
    <Status v-if="apiHandle.isError.value" variant="error">{{ apiMsg }}</Status>
    <DataTable
      v-if="locations"
      :headers="[
        {
          text: 'City',
          value: 'city',
        },
        {
          text: 'Neighborhoods',
          value: 'neighborhoods.length',
          align: 'center',
        },
      ]"
      :items="locations"
			:has-grid-layout="false"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { PlusIcon } from '@heroicons/vue/20/solid'

import { useApiHandle } from '@/core/api/composables'
import { Status, DotsLoader } from '@/features/common/components'

import { DataTable } from '@admin/common/components/table'

import { useAdminLocationsStore } from '../store'

const store = useAdminLocationsStore()
const { locationsApiStatus: apiStatus, locationsApiMsg: apiMsg, locations } = storeToRefs(store)
const apiHandle = useApiHandle(apiStatus)

getLocations()
function getLocations() {
  store.getLocations()
}
</script>
