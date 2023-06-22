import type { RouteRecordRaw } from 'vue-router'

import { adminHomeRoutes } from './home/routes'
import { adminLocationRoutes } from './locations/routes'
import { adminUserRoutes } from './users/routes'

import AdminView from './index.vue'
import NotFound from '../errors/not-found.vue'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: AdminView,
    children: [
      ...adminHomeRoutes,
			...adminLocationRoutes,
			...adminUserRoutes,

			// 404
      {
        path: ':to(.*)',
        component: NotFound,
        beforeEnter: (to) => {
          to.query['isAdmin'] = 'true'
        },
      },
    ],
  },
]
