import type { RouteRecordRaw } from 'vue-router'

import { authRoutes } from './auth/routes'
import { homeRoutes } from './home/routes'
import { userRoutes } from './user/routes'

import IndexView from './index.vue'

export const buyerRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: IndexView,
		children: [
			...authRoutes,
			...homeRoutes,
			...userRoutes,
		]
  },
]
