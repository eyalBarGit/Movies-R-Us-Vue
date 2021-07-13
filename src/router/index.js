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
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/gallery/:type/:searchTitle/:year?/:page?',
    name: 'media-gallery',
    component: () => import('../views/ShowAll.vue')

  },
  {
    path: '/details/:type/:searchTitle/:year?/:page?/:id?/',
    name: 'item-page',
    component: () => import('../views/itemPage.vue')

  },
  {
    path: '/graph/:type/:searchTitle/:year?/:page?',
    name: 'graph-page',
    component: () => import('../views/GraphPage.vue')

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
