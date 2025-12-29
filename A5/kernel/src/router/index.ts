import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue'),
    meta: {
      hideNavigation: true
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/documenti',
    name: 'documenti',
    component: () => import('../views/DocumentsPage.vue')
  },
  {
    path: '/salute',
    name: 'salute',
    component: () => import('../views/HealthPage.vue')
  },
  {
    path: '/calendario',
    name: 'calendario',
    component: () => import('../views/CalendarPage.vue')
  },
  {
    path: '/impostazioni',
    name: 'impostazioni',
    component: () => import('../views/SettingsPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
