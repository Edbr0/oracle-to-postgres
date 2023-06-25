import { createRouter, createWebHashHistory } from 'vue-router'


import {
  NotFound
} from '../pages'
import { Home } from '../layout'

const routes: any = [
  {
    path: '/',
    name: 'home',
    redirect:'/oracle-to-postgres',
  },
  {
    path: '/oracle-to-postgres',
    name: 'converter',
    component: Home,
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: { title: 'Erro 404' },
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


export default router
