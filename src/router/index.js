import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Article from '@/components/Article'
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
    }
    // ,{
    //   path: '/test1',
    //   name: 'Template',
    //   component: Template,
    //   meta: {keepAlive: true}
    // }
    // ,{
    //   path: '/test2',
    //   name: 'Template2',
    //   component: Template2,
    //   meta: {keepAlive: true}
    // }
    // ,{
    //   path: '/test3',
    //   name: 'Template3',
    //   component: Template3,
    //   meta: {keepAlive: true}
    // }
  ]
})

  var vm = new Vue({
      methods: {
          foo: function() {
              console.log('bar');
          }
      }
  })

  vm.foo()


