<template>
  <div>
    <slot name="trigger" :openModal="openModal" />

    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-30">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-slate-500/20 backdrop-blur dark:bg-slate-900/20" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-start justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="dark:bg-scaffold-tint dark:bg-background-dark w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:border dark:border-slate-100/10"
              >
                <DialogTitle
                  as="h3"
                  class="mb-3 text-lg font-medium leading-6 text-gray-900"
                  v-if="showTitle"
                >
                  <slot name="title" />
                </DialogTitle>
                <slot :closeModal="closeModal" />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

const isOpen = ref(false)
defineProps<{ showTitle?: boolean }>()
const emit = defineEmits<{ close: [] }>()

function closeModal() {
  isOpen.value = false
  emit('close')
}
function openModal() {
  isOpen.value = true
}
</script>
