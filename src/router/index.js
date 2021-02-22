import About from '../components/About.vue'
import User from '../components/UserProfile.vue'
import Home from '../components/Home.vue'

export const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: About },
  { path: '/user/:username', name: 'user', component: User }
]
