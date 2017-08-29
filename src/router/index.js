import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Article from '@/components/Article'
import Three from '@/components/Three'
// import Template from '@/components/Template'
// import Template2 from '@/components/Template2'
// import Template3 from '@/components/Template3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List,
      meta: {keepAlive: false}
    },
    {
      path: '/article',
      name: 'Article',
      component: Article,
      meta: {keepAlive: true}
    },
    {
      path: '/test',
      name: 'Three',
      component: Three,
      meta: {keepAlive: true}
    }
  ]
})

  //Vue - use Method

  // var vm = new Vue({
  //     methods: {
  //         foo: function() {
  //             console.log('bar');
  //         }
  //     }
  // })

  // vm.foo()


