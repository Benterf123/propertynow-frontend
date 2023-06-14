import type { RouteRecordRaw } from "vue-router";

import AuthView from './auth.vue';

export const authRoutes: RouteRecordRaw[] = [
	{
		path: '/auth',
		name: 'auth',
		component: AuthView,
	}
]
