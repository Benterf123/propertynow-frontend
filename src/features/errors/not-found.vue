<template>
  <div class="grid-centered my-20 px-3">
    <div class="text-center md:max-w-xl">
      <div class="mx-auto w-max rounded-full bg-blue-50 p-3 text-blue-600">
        <InformationCircleIcon class="h-10 w-10" />
      </div>
      <h1 class="mt-1 text-3xl">Not Found</h1>
      <p>You might be lost. We have never seen this route</p>
      <p
        v-if="route.params.to"
        class="mx-auto w-max rounded-lg bg-slate-100 px-2 py-1 text-sm text-slate-800"
      >
        /{{ route.params.to }}
      </p>
      <div class="mt-4 flex justify-center gap-x-3">
        <router-link
          class="btn-text rounded-lg"
          :to="{ name: route.query.isAdmin ? 'admin-home' : 'home' }"
        >
          Go Home
        </router-link>
        <button class="btn" @click="router.back">Go Back</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { InformationCircleIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
</script>
