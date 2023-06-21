<template>
  <div>
    <div class="mb-2 flex items-center justify-between">
      <div class="flex items-center gap-x-2">
        <h2>Locations</h2>
        <DotsLoader v-if="apiHandle.isLoading.value" />
      </div>
      <AddLocation />
    </div>
    <Status v-if="apiHandle.isError.value" variant="error" @retry="getLocations">
      {{ apiMsg }}
    </Status>
    <DataTable
      v-if="locations"
      :headers="[
        {
          text: 'City',
          value: 'city',
        },
        {
          text: 'Neighborhoods',
          value: 'neighborhoods',
          align: 'center',
        },
      ]"
      :items="locations"
      :has-grid-layout="false"
    >
      <template #list-item-value="{ itemKey, value }">
        <span v-if="itemKey === 'neighborhoods'">
          {{ value.join(', ') }}
        </span>
        <template v-else> {{ value }}</template>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useApiHandle } from '@/core/api/composables'
import { Status, DotsLoader } from '@/features/common/components'

import { DataTable } from '@admin/common/components/table'

import { useAdminLocationsStore } from '../store'
import AddLocation from '../components/AddLocation.vue'

const store = useAdminLocationsStore()
const { locationsApiStatus: apiStatus, locationsApiMsg: apiMsg, locations } = storeToRefs(store)
const apiHandle = useApiHandle(apiStatus)

getLocations()
function getLocations() {
  store.getLocations()
}
</script>

<style scoped lang="scss"></style>
