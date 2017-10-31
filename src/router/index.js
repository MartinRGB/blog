import Vue from 'vue'
import Router from 'vue-router'
// import List from '@/components/List'
import Home from '@/components/Home'

// Define yourself import above this
// Use Shell Import article component here;
import ThreeTest from '@/posts/ThreeTest' 
import Guide from '@/posts/Guide' 
import Article from '@/posts/Article' 

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
   ,{path: '/ThreeTest',name: 'ThreeTest',component: ThreeTest,meta: {keepAlive: true}} 
   ,{path: '/Guide',name: 'Guide',component: Guide,meta: {keepAlive: true}} 
   ,{path: '/Article',name: 'Article',component: Article,meta: {keepAlive: true}} 
    // {
    //   path: '/article',
    //   meta: {keepAlive: true}
    // },
    // {
    //   path: '/test',
    //   meta: {keepAlive: true}
    // },
  ]
})


