import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const pageType = pageName => {
  if (pageName.startsWith('namespace')) {
    return 'namespace'
  }
  return 'class'
}

export const updateDoxygenRoute = (routeTo, next) => {
  const mainPage = routeTo.fullPath === '/help'
  const pageName = mainPage ? 'index' : routeTo.params.pageName
  const getPageById = store.getters['doxygen/getPageById']
  const existingData = getPageById(pageName)
  if (!mainPage) {
    routeTo.params.componentType = pageType(pageName)
  }
  if (existingData) {
    routeTo.params.data = existingData
    next()
  } else {
    store.dispatch('doxygen/fetchPage', pageName).then(page => {
      routeTo.params.data = page
      if (mainPage) {
        next()
      } else {
        store.dispatch('doxygen/fetchDependeePages', { pageName }).then(() => {
          next()
        })
      }
    })
  }
}

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
    path: '/help',
    name: 'Help',
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      updateDoxygenRoute(routeTo, next)
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "help" */ '../views/Help.vue')
  },
  {
    path: '/help/:pageName',
    name: 'Help Subpage',
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      updateDoxygenRoute(routeTo, next)
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "help" */ '../views/HelpSubPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
