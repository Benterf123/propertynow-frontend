import type { RouteRecordRaw } from 'vue-router'

import HomeView from './index.vue'
import ListingView from './pages/listing.vue'
import DetailsView from './pages/details.vue'

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: HomeView,
    children: [
      {
        path: '',
        name: 'home',
        component: ListingView,
      },
      {
        path: ':id',
        name: 'property-details',
        component: DetailsView,
      },
    ],
  },
]
