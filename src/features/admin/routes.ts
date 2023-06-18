import type { RouteRecordRaw } from 'vue-router'

import { adminHomeRoutes } from './home/routes'

import AdminView from './index.vue'
import NotFound from '../errors/not-found.vue'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: AdminView,
    children: [
      ...adminHomeRoutes,
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
