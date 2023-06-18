import type { RouteRecordRaw } from 'vue-router'

import HomeView from './index.vue'

import PropertiesHome from './p-index.vue'
import PropertiesList from './pages/list.vue'
import PropertyAdd from './pages/create.vue'
import PropertyDetails from './pages/details.vue'

export const adminHomeRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: HomeView,
    name: 'admin-home',
    redirect: { name: 'admin-properties' },
    children: [
      {
        path: 'properties',
        component: PropertiesHome,
        children: [
          {
            path: '',
            name: 'admin-properties',
            component: PropertiesList,
          },
          {
            path: 'add',
            name: 'admin-properties-add',
            component: PropertyAdd,
          },
          {
            path: ':id',
            name: 'admin-property-details',
            component: PropertyDetails,
          },
        ],
      },
    ],
  },
]
