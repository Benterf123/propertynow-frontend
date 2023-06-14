<template>
  <div class="flex gap-x-1">
    <div
      v-for="d of dots"
      :key="`dot-${d}`"
      class="dot h-2 w-2 rounded-full bg-gray-300"
      :style="`animation-delay: ${(d - 1) * 0.1}s`"
    ></div>
  </div>
</template>

<script setup lang="ts">
const dots = 3
</script>

<style scoped>
.dot {
  animation: dot 1.3s linear alternate infinite;
}

@keyframes dot {
  from,
  20% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateY(-30%) scale(1.25);
    opacity: 0.35;
  }
  80%,
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
</style>
