import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Principal',
    component: function (){ return import('../views/Principal.vue');}
  },
  {
    path: '/ventas',
    name: 'Ventas',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Ventas.vue')
    }
  },
  {
    path: '/productos',
    name: 'Productos',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Productos.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
