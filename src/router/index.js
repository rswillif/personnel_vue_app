import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import PersonsView from '@/components/PersonsView'
import CompanyView from '@/components/CompanyView'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/persons-view',
      name: 'PersonsView',
      component: PersonsView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/company-view',
      name: 'CompanyView',
      component: CompanyView,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

export default router
