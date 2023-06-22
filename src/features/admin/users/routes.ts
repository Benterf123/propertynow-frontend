import { RouteRecordRaw } from 'vue-router'

import IndexView from './index.vue'
import ListView from './pages/list.vue'

export const adminUserRoutes: RouteRecordRaw[] = [
  {
    path: 'users',
    component: IndexView,
    children: [
      {
        path: '',
        name: 'admin-users',
        component: ListView,
      },
    ],
  },
]
