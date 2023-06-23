<template>
  <Modal>
    <template #trigger="{ openModal }">
      <button class="btn-icon bg-transparent" @click="openModal">
        <TrashIcon />
      </button>
    </template>
    <template #default="{ closeModal }">
      <Status v-if="apiHandle.isError.value" variant="error" :should-retry="false">
        {{ apiMsg }}
      </Status>
      <p>Are you sure you want to delete this property?</p>
      <div class="mt-4 flex gap-x-3">
        <AvatarImage class="aspect-square w-20" :src="property.image" :alt="property.title" />
        <div>
          <p>{{ property.title }}</p>
          <p class="text-sm opacity-80">{{ property.description }}</p>
        </div>
      </div>

      <div class="mt-4 flex gap-x-4 justify-end">
        <button class="btn-text rounded" :disabled="apiHandle.isLoading.value" @click="closeModal">
          Cancel
        </button>
        <button
          :class="['btn', { loading: apiHandle.isLoading.value }]"
          @click="() => deleteProperty(closeModal)"
        >
          Delete
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { TrashIcon } from '@heroicons/vue/20/solid'

import { useApiHandle } from '@/core/api/composables'
import { Property } from '@/features/common/models'
import { Modal, Status } from '@/features/common/components'
import AvatarImage from '@admin/common/components/AvatarImage.vue'

import { useAdminPropertiesStore } from '../store'

const store = useAdminPropertiesStore()
const { propertyDeleteApiStatus: apiStatus, propertyDeleteApiMsg: apiMsg } = storeToRefs(store)
const apiHandle = useApiHandle(apiStatus)

const props = defineProps<{ property: Property }>()

async function deleteProperty(closeModal: () => void) {
  await store.deleteProperty(props.property.id)
  if (!apiHandle.isSuccess.value) return

  closeModal()
}
</script>
