import { RouteRecordRaw } from "vue-router";

import AuthView from './index.vue';

export const adminAuthRoutes: RouteRecordRaw[] = [
	{
		path: 'auth',
		name: 'admin-auth',
		component: AuthView,
	}
]
