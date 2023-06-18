import type { RouteRecordRaw } from 'vue-router'

import NotAllowed from './not-allowed.vue'
import NotFound from './not-found.vue'

export const errorsRoutes: RouteRecordRaw[] = [
  {
    path: '/not-allowed',
    name: 'err-not-allowed',
    component: NotAllowed,
  },
  {
    path: '/:to(.*)',
    component: NotFound,
  },
]
