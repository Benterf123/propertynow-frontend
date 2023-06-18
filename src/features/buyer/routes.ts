import { RouteRecordRaw } from 'vue-router'

import IndexView from './index.vue'
import { authRoutes } from './auth/routes'
import { homeRoutes } from './home/routes'

export const buyerRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: IndexView,
		children: [
			...authRoutes,
			...homeRoutes,
		]
  },
]
