import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
// Define yourself import above this
// Use Shell Import article component here;
import Vulkan05 from '@/posts/Vulkan05' 
import Vulkan04 from '@/posts/Vulkan04' 
import Vulkan03 from '@/posts/Vulkan03' 
import Vulkan02 from '@/posts/Vulkan02' 
import Vulkan01 from '@/posts/Vulkan01' 
import RK4 from '@/posts/RK4' 
import Guide from '@/posts/Guide' 
import FBM from '@/posts/FBM' 
import Brick from '@/posts/Brick' 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {keepAlive: false}
    }
    // Define yourself routes above this
    // Use Shell Export article component here;
    ,{path: '/Vulkan05',name: 'Article7',component: Vulkan05,meta: {keepAlive: true}} 
    ,{path: '/Vulkan04',name: 'Article6',component: Vulkan04,meta: {keepAlive: true}} 
    ,{path: '/Vulkan03',name: 'Article5',component: Vulkan03,meta: {keepAlive: true}} 
    ,{path: '/Vulkan02',name: 'Article4',component: Vulkan02,meta: {keepAlive: true}} 
    ,{path: '/Vulkan01',name: 'Article3',component: Vulkan01,meta: {keepAlive: true}} 
    ,{path: '/RK4',name: 'Article8',component: RK4,meta: {keepAlive: true}} 
    ,{path: '/Guide',name: 'Article1',component: Guide,meta: {keepAlive: true}} 
    ,{path: '/FBM',name: 'Article9',component: FBM,meta: {keepAlive: true}} 
    ,{path: '/Brick',name: 'Article2',component: Brick,meta: {keepAlive: true}} 
  ]
})


