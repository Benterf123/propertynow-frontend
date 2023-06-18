<template>
  <div class="grid-centered h-screen -translate-y-20">
    <div class="text-center">
      <div class="mx-auto w-max rounded-full bg-red-50 p-3 text-red-600">
        <ExclamationTriangleIcon class="h-10 w-10" />
      </div>
      <h1 class="mt-1 text-3xl">Not Allowed</h1>
      <p>You do not have permission to access this route</p>
			<p v-if="route.query.to" class="mx-auto w-max rounded-lg text-sm text-slate-800 bg-slate-100 px-2 py-1">{{ route.query.to }}</p>
			<router-link class="btn inline-block mt-4" :to="{ name: 'home' }">Go Home</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
</script>
