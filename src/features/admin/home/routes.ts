import { RouteRecordRaw } from "vue-router";

import HomeView from './index.vue'
import PropertiesList from './pages/list.vue'

export const adminHomeRoutes: RouteRecordRaw[] = [
	{
		path: '',
		component: HomeView,
		name: 'admin-home',
		redirect: { name: 'admin-properties' },
		children: [
			{
				path: 'properties',
				name: 'admin-properties',
				component: PropertiesList,
			}
		]
	}
]
