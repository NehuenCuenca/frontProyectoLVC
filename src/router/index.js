import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  /* {
    path: '/articulos',
    name: 'Articulos',
    component: () => import('../views/Articulos.vue')
  },

  {
    path: '/rubros',
    name: 'Rubros',
    component: () => import('../views/Rubros.vue')
  }, */

]

const router = new VueRouter({
  routes
})

export default router
