import type { RouteRecordRaw } from 'vue-router'

import { adminAuthRoutes } from './auth/routes'
import { adminHomeRoutes } from './home/routes'

import AdminView from './index.vue'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: AdminView,
    children: [...adminAuthRoutes, ...adminHomeRoutes]
  }
]
