import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/rotate',
    },
    {
      path: '/rotate',
      name: 'rotate',
      component: () => import('@/views/RotateView.vue'),
    },
    {
      path: '/plot',
      name: 'plot',
      component: () => import('@/views/PlotView.vue'),
    },
    {
      path: '/city',
      name: 'city',
      component: () => import('@/views/CityView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchView.vue'),
    },
    {
      path: '/bridge',
      name: 'bridge',
      component: () => import('@/views/BridgeView.vue'),
    },
    {
      path: '/measure/:type',
      name: 'measure',
      component: () => import('@/views/MeasureView.vue'),
    },
  ],
})

export default router
