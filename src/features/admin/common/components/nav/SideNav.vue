<template>
  <aside
    class="fixed left-0 top-0 h-screen w-screen duration-300 md:sticky md:h-screen md:w-[280px]"
    :class="isMinimised ? 'pointer-events-none md:pointer-events-auto md:w-[64px]' : ''"
  >
    <div
      class="fixed left-0 top-0 h-screen w-screen bg-slate-600/50 backdrop-blur-md transition-opacity duration-[inherit] md:hidden"
      :class="isMinimised ? 'pointer-events-none opacity-0' : ''"
      @click="close()"
    ></div>
    <div
      class="dark:bg-scaffold-tint group relative flex h-full w-4/5 max-w-xs flex-col bg-white p-3 transition-transform duration-[inherit] md:w-full md:max-w-none md:border-r md:border-gray-200 md:pt-14 md:dark:border-transparent"
      :class="isMinimised ? '-translate-x-full md:translate-x-0' : ''"
    >
      <div
        class="dark:border-scaffold-tint dark:bg-scaffold-dark absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 scale-0 cursor-pointer rounded-full border border-gray-300 bg-white p-2 transition-transform delay-500 duration-300 hover:shadow-lg hover:delay-[0] group-hover:scale-100 md:block"
        @click="toggleSidenav"
      >
        <ArrowLeftIcon
          class="h-5 w-5 transition-transform duration-[inherit]"
          :class="isMinimised ? 'rotate-180' : ''"
        />
      </div>
      <div class="space-y-3">
        <router-link
          v-slot="{ isActive }"
          v-for="(r, i) of routes"
          :key="`route-${i}`"
          :to="r.route"
          class="relative flex space-x-3 overflow-hidden rounded p-3 transition-all hover:bg-primary/5"
          active-class="bg-primary/10 text-primary-dark pointer-events-none"
          @click="close(true)"
        >
          <component :is="isActive ? r.selectedIcon : r.icon" class="w-[21px] shrink-0" />
          <span class="flex-1">
            {{ r.name }}
          </span>
        </router-link>
      </div>
      <!-- <div class="mt-auto shrink-0 duration-[inherit]"> -->
      <!--   <RouterLink -->
      <!--     v-if="store.user" -->
      <!--     :to="{ name: 'profile' }" -->
      <!--     :class="[ -->
      <!--       'flex items-center space-x-3 overflow-hidden rounded-lg transition-all duration-[inherit]', -->
      <!--       isMinimised ? 'bg-transparent p-0' : 'bg-slate-50 p-3 dark:bg-slate-50/10' -->
      <!--     ]" -->
      <!--     active-class="!bg-primary/10 tex-primary-dark pointer-events-none" -->
      <!--   > -->
      <!--     <UserAvatar -->
      <!--       :src="store.user.avatarUrl" -->
      <!--       class="h-[42px] w-[42px] shrink-0 !rounded-full" -->
      <!--     /> -->
      <!--     <div class="flex-1 truncate"> -->
      <!--       <p class="truncate"> -->
      <!--         {{ `${store.user.lastName},  ${store.user.firstName}` }} -->
      <!--       </p> -->
      <!--       <p class="truncate text-sm opacity-50">{{ store.user.email }}</p> -->
      <!--     </div> -->
      <!--     <button class="btn-icon ml-auto"> -->
      <!--       <ChevronRightIcon /> -->
      <!--     </button> -->
      <!--   </RouterLink> -->
      <!-- </div> -->
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
	HomeIcon as HomeSolidIcon,
	MapPinIcon as LocationSolidIcon,
  UserIcon as UserSolidIcon,
  FlagIcon as TeamsSolidIcon,
  UserGroupIcon as PlayersSolidIcon
} from '@heroicons/vue/24/solid'
import {
	HomeIcon as HomeOutlineIcon,
	MapPinIcon as LocationOutlineIcon,
  ArrowLeftIcon,
  UserIcon as UserOutlineIcon,
  FlagIcon as TeamsOutlineIcon,
  UserGroupIcon as PlayersOutlineIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

// import { UserAvatar } from "@/common/components";

const props = withDefaults(defineProps<{ modelValue: boolean }>(), {
  modelValue: true
})
const emit = defineEmits<{
  (e: 'update:modelValue', minimised: boolean): void
}>()

const isMinimised = computed(() => props.modelValue)

interface IRoute {
  icon: any
  selectedIcon: any
  name: string
  route: { name: string }
}
const routes: IRoute[] = [
  {
    icon: HomeOutlineIcon,
    selectedIcon: HomeSolidIcon,
    name: 'Properties',
    route: { name: 'admin-properties' }
  },
  {
    icon: LocationOutlineIcon,
    selectedIcon: LocationSolidIcon,
    name: 'Locations',
    route: { name: 'admin-locations' }
  },
  // {
  //   icon: GamesOutlineIcon,
  //   selectedIcon: GamesSolidIcon,
  //   name: 'Games',
  //   route: { name: 'games' }
  // },
  // {
  //   icon: TeamsOutlineIcon,
  //   selectedIcon: TeamsSolidIcon,
  //   name: 'Teams',
  //   route: { name: 'teams' }
  // },
  // {
  //   icon: PlayersOutlineIcon,
  //   selectedIcon: PlayersSolidIcon,
  //   name: 'Players',
  //   route: { name: 'players' }
  // }
]

function close(onlyOnMobile = false) {
  if (onlyOnMobile) {
    if (window.innerWidth >= 768) return
  }
  emit('update:modelValue', true)
}
function toggleSidenav() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<style scoped></style>
