import type { RouteRecordRaw } from 'vue-router'

import IndexView from './index.vue'
import AuthView from './pages/auth.vue'
import PasswordResetView from './pages/password-reset.vue'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: IndexView,
    children: [
      {
        path: '',
        name: 'auth',
        component: AuthView,
      },
      {
        path: 'reset-password',
        name: 'password-reset',
        component: PasswordResetView,
      },
    ],
  },
]
