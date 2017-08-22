import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Article from '@/components/Article'

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
      path: '/test',
      name: 'Article',
      component: Article,
      meta: {keepAlive: true}
    }
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


