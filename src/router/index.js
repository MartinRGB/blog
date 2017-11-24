import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
// Define yourself import above this
// Use Shell Import article component here;
import Vulkan02 from '@/posts/Vulkan02' 
import Vulkan01 from '@/posts/Vulkan01' 
import Guide from '@/posts/Guide' 
import Brick from '@/posts/Brick' 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {keepAlive: false}
    },
    // Define yourself routes above this
    // Use Shell Export article component here;
   ,{path: '/Vulkan02/:id/:name',name: 'Vulkan02',component: Vulkan02,meta: {keepAlive: true}} 
   ,{path: '/Vulkan01',name: 'Vulkan01',component: Vulkan01,meta: {keepAlive: true}} 
   ,{path: '/Guide',name: 'Guide',component: Guide,meta: {keepAlive: true}} 
   ,{path: '/Brick',name: 'Brick',component: Brick,meta: {keepAlive: true}} 
  ]
})


