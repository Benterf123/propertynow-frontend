<template>
  <div>
    <Status v-if="apiHandle.isError.value" variant="error" @retry="getUsers">{{ apiMsg }}</Status>
    <DataTable
      v-if="users"
      :items="users"
      :headers="[
        {
          text: 'Email',
          value: 'email',
        },
        {
          text: 'First Name',
          value: 'firstName',
        },
        {
          text: 'Last Name',
          value: 'lastName',
        },
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useApiHandle } from '@/core/api/composables'
import { Status } from '@/features/common/components'
import { DataTable } from '@admin/common/components/table'

import { useAdminUsersStore } from '../store'

const store = useAdminUsersStore()
const { usersApiStatus: apiStatus, usersApiMsg: apiMsg, users } = storeToRefs(store)
const apiHandle = useApiHandle(apiStatus)

getUsers()
function getUsers() {
  return store.getUsers({
    page: 1,
    limit: 100,
  })
}
</script>
