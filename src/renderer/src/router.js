import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import QRView from './views/QRView.vue'
import Roman from './views/Roman.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/qr', component: QRView },
  { path: '/roman', component: Roman }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})
