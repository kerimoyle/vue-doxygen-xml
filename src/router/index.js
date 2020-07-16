import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/help/:pageName?',
    name: 'Help',
    props: true,
    meta: {
      baseURL: '/v0.1.0'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "help" */ '../views/Help.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.path !== from.path) {
      return new Promise(resolve => {
        setTimeout(() => {
          let value = { x: 0, y: 0 }
          if (to.hash) {
            value = window.scrollTo({
              top: document.querySelector(to.hash).offsetTop,
              behavior: 'smooth'
            })
          }
          resolve(value)
        }, 500)
      })
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

export default router
