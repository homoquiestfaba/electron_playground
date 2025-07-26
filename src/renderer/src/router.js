import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import QRView from './views/QRView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/qr', component: QRView }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})
