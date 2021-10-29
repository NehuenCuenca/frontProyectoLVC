import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//import INFOarticulos from '../components/INFOarticulos.vue'

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
    component: () => import('../components/INFOarticulos.vue')
  },

  {
    path: '/rubros',
    name: 'Rubros',
    component: () => import('../components/INFOrubros.vue')
  }, */ 
  
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
