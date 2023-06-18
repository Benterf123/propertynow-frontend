<template>
  <div class="flex items-center gap-x-2">
    <button class="btn-icon p-2" @click="gotoRoute">
      <ArrowLongLeftIcon class="h-5 w-5" />
    </button>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useRouter, type RouteLocationRaw } from "vue-router";

import { ArrowLongLeftIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{ to?: RouteLocationRaw }>();

const router = useRouter();
function gotoRoute() {
  (props.to && router.push(props.to)) || router.back();
}
</script>
