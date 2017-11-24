<template>
  <div id="app">
    <header-bar id="header-bar"></header-bar>
      <transition name="fade" mode="out-in" v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter" appear>
          <router-view>
          </router-view>
      </transition>

      <back-to-top text="Back to top" visibleOffset="500"></back-to-top>
    <footer-bar></footer-bar>
  </div>
</template>

<style lang="stylus" src="./style/index.styl"></style>

<script>
import FooterBar from './components/FooterBar.vue'
import HeaderBar from './components/HeaderBar.vue'
import Vue from 'vue'
import UtilPlugin from './static/js/global-util-plugin.js'
Vue.use(UtilPlugin)


var count = 0;

export default {
  name: 'app',
  data: function () {return {
  }},
  components: {
    FooterBar,
    HeaderBar
  },
  methods:{
    // -------------------------------------------------------
    // Router Event
    // -------------------------------------------------------
    afterEnter: function( el ) {
      // alert(el.firstChild.firstChild.className +' Route entered' );
      window.scrollTo(0, 0);

      // alert(el.firstChild.firstChild.className)
    },
    beforeEnter: function(el){
      // alert(el.firstChild.firstChild.className +' Route entered' );
      window.scrollTo(0, 0);
    },
    routeChange: function(){
    }
  },
  computed: {},
  created: function () {},
  mounted:function(){
  },
  destroyed:function(){},
  watch: {
    // 如果路由有变化，会再次执行该方法
    "$route": "routeChange"
  }
}
    
</script>

<style>

/* Route CSS Page Transition */
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s
}


.fade-enter, .fade-leave-active {
  opacity: 0;
  transform: translateY(10px)
}

</style>
