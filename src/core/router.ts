import { createRouter, createWebHistory } from "vue-router";

// import {
//   isAuthTokenValid,
//   isTokenForAdmin,
// } from "@/common/functional/authToken";

import { adminRoutes } from '@/features/admin/routes';
import { authRoutes } from '@/features/auth/routes.ts';
import { homeRoutes } from '@/features/home/routes.ts';

const router = createRouter({
  history: createWebHistory(),
  routes: [
		...adminRoutes,
		...authRoutes,
		...homeRoutes,
	],
});

router.beforeEach((to) => {
  // const isTokenValid = isAuthTokenValid();
  // const isUserAdmin = isTokenForAdmin();
  // if ((!isTokenValid || !isUserAdmin) && to.name !== "login") {
  //   const query: { [propName: string]: any } = { to: to.path };
  //   if (isTokenValid && !isUserAdmin) {
  //     query["isNotAdmin"] = true;
  //   }
  //   return { name: "login", query: query };
  // }
});

export default router;
