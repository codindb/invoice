import * as VueRouter from 'vue-router'

// Pages 
import HomePage from '../pages/Home.vue'

const routes = [
   {
      path: '/',
      alias: '/home',
      name: 'Home',
      component: HomePage,
   }, 
   {
      path: '/:wrongPath(.*)',
      redirect: (to) => {
        return { name: 'Home' }
      }
   },
]

const router = VueRouter.createRouter({
   history: VueRouter.createWebHistory(),
   routes,
   // always scroll to top when using router links
   scrollBehavior(to, from, savedPosition) {
      return { top: 0 }
    },
 });
 
 export default router;