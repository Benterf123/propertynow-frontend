<template>
  <nav class="c-container sticky top-0 z-50 bg-slate-950 text-white">
    <div class="c-container flex items-center justify-between p-3">
      <RouterLink :to="{ name: 'home' }">PropertyNow</RouterLink>
      <ul class="flex items-center"></ul>

      <div class="flex items-center">
        <RouterLink :to="{ name: 'auth' }" class="btn">Login</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>
