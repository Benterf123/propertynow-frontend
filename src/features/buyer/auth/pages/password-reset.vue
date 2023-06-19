<template>
  <div class="px-3">
    <div class="mx-auto mt-20 md:max-w-xl">
      <button
        class="btn-text flex items-center gap-x-3 border border-slate-200 bg-transparent text-slate-700"
      >
        <ArrowLongLeftIcon class="h-5 w-5" />
        Go Home
      </button>
      <div
        class="mt-3 rounded-lg border border-primary-dark/10 shadow-xl shadow-primary-dark/5"
      >
        <h1 class="mt-3 text-center text-2xl font-light">Reset You Password</h1>
        <div class="px-3 mx-auto mt-2 flex gap-x-2 md:w-3/5">
          <div class="w-20 duration-300">
            <div
              :class="[
                'mx-auto w-max rounded-full p-2 transition-colors duration-[inherit]',
                currentStep === 0 ? 'bg-primary/20 text-primary-dark' : 'bg-primary',
              ]"
            >
              <AtSymbolIcon class="h-5 w-5" />
            </div>
            <p
              class="mt-1 text-center text-xs text-primary-dark opacity-60 transition-colors duration-[inherit]"
            >
              Verify Email
            </p>
          </div>
          <div
            class="mt-5 h-2 flex-1 -translate-y-[calc(0.25rem+3px)] scale-x-125 overflow-hidden rounded-full bg-slate-100"
          >
            <div
              :class="[
                'h-full w-full origin-left bg-primary transition-transform duration-500',
                currentStep === 1 ? 'scale-x-100' : 'scale-x-0',
              ]"
            />
          </div>
          <div :class="['w-20 duration-300', { 'delay-150': currentStep === 1 }]">
            <div
              :class="[
                'mx-auto w-max rounded-full p-2 transition-colors delay-[inherit] duration-[inherit]',
                currentStep === 1 ? 'bg-primary/20 text-primary-dark' : 'bg-slate-200',
              ]"
            >
              <LockClosedIcon class="h-5 w-5" />
            </div>
            <p
              :class="[
                'mt-1 text-center text-xs opacity-60 transition-colors delay-[inherit] duration-[inherit]',
                { 'text-primary-dark': currentStep === 1 },
              ]"
            >
              Password
            </p>
          </div>
        </div>
        <div class="pl-3 pb-3 mt-6 flex gap-x-3">
          <div class="hidden rounded-lg bg-slate-50 p-6 md:grid md:place-items-center">
            <img
              src="/illustrations/password-reset-email.svg"
              alt="email capture"
              class="aspect-auto w-32"
            />
          </div>
          <div class="flex-1 overflow-hidden pr-3 pb-3">
            <Transition
              mode="out-in"
              enter-active-class="transition-all duration-300"
              enter-from-class="opacity-0 translate-x-[10%]"
              enter-to-class="opacity-100 translate-x-0"
              leave-active-class="transition-all"
              leave-from-class="opacity-100 translate-x-0"
              leave-to-class="opacity-0 -translate-x-[10%]"
            >
              <VerifyEmail class="h-full" v-if="currentStep === 0" />
              <NewPassword class="h-full" v-else />
            </Transition>
          </div>
        </div>
      </div>
      <button class="btn" @click="currentStep = (currentStep + 1) % 2">Switch</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AtSymbolIcon, LockClosedIcon, ArrowLongLeftIcon } from '@heroicons/vue/20/solid'

import VerifyEmail from '../components/VerifyEmail.vue'
import NewPassword from '../components/NewPassword.vue'

const currentStep = ref(0)
</script>
