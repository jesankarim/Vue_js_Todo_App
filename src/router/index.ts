import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DataView from '@/views/DataView.vue'
import AddDataView from '../views/AddDataView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/data',
      name: 'Data',
      component: DataView,
      
    },
    {
      path: '/addData',
      name: 'AddData',
      component: AddDataView,
    },
  ],
})

export default router
