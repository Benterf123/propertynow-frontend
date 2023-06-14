<template>
  <div class="mx-auto flex w-fit flex-wrap gap-2">
    <button
      v-for="page of pages"
      :key="`page-i-${page}`"
      :class="[
        'grid h-9 w-9 select-none place-items-center rounded border transition-all duration-300',
        page === currentPage
          ? 'border-primary bg-primary-dark text-white dark:text-black'
          : 'cursor-pointer border-slate-300 hover:border-primary hover:bg-primary/30 dark:border-slate-300/20',
        { 'circular-loader': page === currentPage && isLoading },
      ]"
      @click="gotoPage(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    pages: number;
    page?: number;
    modelValue?: number;
    isLoading?: boolean;
  }>(),
  {
    isLoading: false,
  }
);
const emits = defineEmits<{
  (e: "update:modelValue", page: number): void;
  (e: "gotoPage", page: number): void;
}>();

const shrinkPages = computed<boolean>(() => props.pages > 4);

const startPages = computed<number>(() => Math.min(props.pages, 2));
const endPagesStart = computed<number>(() => props.pages - 2);

const currentPage = computed<number>(() => props.modelValue ?? props.page!);

function gotoPage(p: number) {
  if (props.modelValue) emits("update:modelValue", p);
  else emits("gotoPage", p);
}
</script>

<style scoped></style>
