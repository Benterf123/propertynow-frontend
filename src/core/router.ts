import { createRouter, createWebHistory } from 'vue-router'

import { isAuthTokenValid, isTokenValidForAdmin } from '@/common/functional/authToken'

import { adminRoutes } from '@/features/admin/routes'
import { authRoutes } from '@/features/auth/routes'
import { homeRoutes } from '@/features/home/routes'
import { errorsRoutes } from '@/features/errors/routes'

const router = createRouter({
  history: createWebHistory(),
  routes: [...adminRoutes, ...authRoutes, ...homeRoutes, ...errorsRoutes],
})

router.beforeEach((to) => {
  const isAdminRoute = (to.name as string | undefined)?.includes('admin-')
  if (!isAdminRoute) return

  const isLoggedIn = isAuthTokenValid()
  if (!isLoggedIn) return { name: 'auth', query: { to: to.path } }

  const isUserAdmin = isTokenValidForAdmin()
  if (isUserAdmin) return

  return { name: 'err-not-allowed', query: { to: to.path } }

  console.log(isAdminRoute, isUserAdmin, to)
  // const isTokenValid = isAuthTokenValid()
  // const isUserAdmin = isTokenValidForAdmin()
  // if ((!isTokenValid || !isUserAdmin) && to.name !== 'login') {
  //   const query: { [propName: string]: any } = { to: to.path }
  //   if (isTokenValid && !isUserAdmin) {
  //     query['isNotAdmin'] = true
  //   }
  //   return { name: 'login', query: query }
  // }
})

export default router
