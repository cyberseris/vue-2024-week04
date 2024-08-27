import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/todo',
      component: () => import('../views/TodoView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotfoundView.vue')
    }
  ]
})

export default router
