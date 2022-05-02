import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView'
import LoginView from '@/views/login/LoginView'
import RegisterView from '@/views/login/RegisterView'
import GetBackPasswordView from '@/views/GetBackPasswordView'
import ServiceProtocolView from '@/views/ServiceProtocolView'
import PrivacyView from '@/views/PrivacyView'
import ContactUsView from '@/views/ContactUsView'
import SitemapView from '@/views/SitemapView'
import DisclaimerView from '@/views/DisclaimerView'

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
    path: '/service',
    name: 'ServiceProtocol',
    component: ServiceProtocolView
  },
  {
    path: '/privacy',
    name: 'UserPrivacyView',
    component: PrivacyView
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
  },
  {
    path: '/contact',
    name: 'ContactUsView',
    component: ContactUsView
  },
  {
    path: '/sitemap',
    name: 'SitemapView',
    component: SitemapView
  },
  {
    path: '/disclaimer',
    name: 'DisclaimerView',
    component: DisclaimerView
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
