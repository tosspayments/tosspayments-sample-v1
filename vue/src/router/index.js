import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pay',
      component: () => import('../views/CheckoutView.vue')
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('../views/SuccessView.vue')
    },
    {
      path: '/fail',
      name: 'fail',
      component: () => import('../views/FailView.vue')
    }
  ]
})

export default router
