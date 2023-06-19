import type { RouteRecordRaw } from 'vue-router'

import IndexView from './index.vue'
import ListView from './pages/list.vue'

export const adminLocationRoutes: RouteRecordRaw[] = [
  {
    path: 'locations',
    component: IndexView,
    children: [
      {
        path: '',
        name: 'admin-locations',
        component: ListView,
      },
    ],
  },
]
