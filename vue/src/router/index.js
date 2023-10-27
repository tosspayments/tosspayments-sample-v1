import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pay',
      component: () => import('../views/PayView.vue')
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('../views/AuthCall.vue')
    },
    {
      path: '/fail',
      name: 'fail',
      component: () => import('../views/FailView.vue')
    },
    {
      path: '/success-view',
      name: 'success-view',
      component: () => import('../views/SuccessView.vue')
    },

  ]
})

export default router
