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
        {
          text: 'Is Admin',
          value: 'isAdmin',
          align: 'center',
        },
      ]"
    >
      <template #list-item-value="{ itemKey, item: user, value }">
        <template v-if="itemKey === 'isAdmin'">
          <ShieldCheckIcon v-if="user.isAdmin" class="mx-auto text-secondary h-6 w-6" />
					<button v-else class="btn-text text-sm" @click="makeUserAdmin(user)">Make Admin</button>
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ShieldCheckIcon } from '@heroicons/vue/24/solid'

import { useApiHandle } from '@/core/api/composables'
import { Status } from '@/features/common/components'
import type { UserModel } from '@/features/common/models'
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

function makeUserAdmin(user: UserModel) {
	store.updateUser(user.id, {
		'account_type': 'admin',
	})
}
</script>
