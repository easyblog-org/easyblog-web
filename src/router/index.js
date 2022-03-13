import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView'
import LoginView from '@/views/LoginView'
import RegisterView from '@/views/RegisterView'
import GetBackPasswordView from '@/views/GetBackPasswordView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: RegisterView
  },
  {
    path: '/get-back-password',
    name: 'GetBackPasswordView',
    component: GetBackPasswordView
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
