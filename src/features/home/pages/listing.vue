<template>
  <div>
    <header class="h-[calc(100vh-64px)] bg-slate-950 text-white">
      <div class="c-container absolute inset-0 top-0 flex items-center px-3">
        <h1 class="w-2/5 text-6xl font-light">You House is Waiting For You!</h1>
      </div>
    </header>
    <div class="relative">
      <div
        class="absolute shadow-xl shadow-black/5 left-1/2 mx-auto grid w-max -translate-x-1/2 -translate-y-1/2 grid-cols-3 items-center gap-x-4 rounded-lg bg-white/80 p-6 backdrop-blur-md"
      >
        <div>
          <p class="flex gap-x-2">
            City
            <ChevronDownIcon class="h-6 w-6" />
          </p>
          <p class="opacity-60">{{ selectedCity }}</p>
        </div>
        <div>
          <p class="flex gap-x-2">
            Price
            <ChevronDownIcon class="h-6 w-6" />
          </p>
          <p class="opacity-60">{{ selectedPrice }}</p>
        </div>
        <button class="btn flex items-center gap-x-3 !px-4 !py-3">
          <MagnifyingGlassIcon class="h-6 w-6" />
          Search
        </button>
      </div>
    </div>
    <main class="bg-primary/0">
      <div class="c-container p-3 pt-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="property of properties" :key="`property-${property.id}`">
          <div class="h-48 relative rounded-lg p-3 bg-gradient-to-b from-transparent from-40% to-primary/30">
            <img class="h-full w-[calc(100%-4*0.25rem)] absolute left-1/2 -translate-y-6 -translate-x-1/2 object-cover shadow-lg rounded-lg" :src="property.image" :alt="property.name" />
          </div>
					<div class="mt-2">
						<p class="opacity-60 text-lg">{{ property.name }}</p>
						<p>{{ property.price }}</p>
						<button class="btn">Buy</button>
					</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

const selectedCity = 'Kigali'
const selectedPrice = '$5000'

const properties = [
  {
    id: 1,
    image: 'https://picsum.photos/500/300',
    name: 'Sugushu Topi',
    price: '$300'
  }
]
</script>
