import type { RouteRecordRaw } from 'vue-router'

import IndexView from './index.vue'
import ProfileView from './pages/profile.vue'

export const userRoutes: RouteRecordRaw[] = [
  {
    path: 'profile',
    component: IndexView,
    children: [
      {
        path: '',
        name: 'profile',
        component: ProfileView,
      },
    ],
  },
]
