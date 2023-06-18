import type { RouteRecordRaw } from 'vue-router'

import { adminHomeRoutes } from './home/routes'

import AdminView from './index.vue'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: AdminView,
    children: [...adminHomeRoutes]
  }
]
