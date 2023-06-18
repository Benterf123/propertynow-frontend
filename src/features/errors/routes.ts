import { RouteRecordRaw } from 'vue-router'

import NotAllowed from './not-allowed.vue'

export const errorsRoutes: RouteRecordRaw[] = [
  {
    path: '/not-allowed',
    name: 'err-not-allowed',
    component: NotAllowed,
  },
]
