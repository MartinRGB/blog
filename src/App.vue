<template>
  <div id="app">
    <header-bar></header-bar>
    <transition name="fade" mode="out-in" v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter" appear>
        <router-view></router-view>
    </transition>
    <footer-bar></footer-bar>
  </div>
</template>

<style lang="stylus" src="./style/index.styl"></style>

<script>
import FooterBar from './components/FooterBar.vue'
import HeaderBar from './components/HeaderBar.vue'
import { TweenMax, Expo } from 'gsap';

export default {
  name: 'app',
  components: {
    FooterBar,
    HeaderBar
  },
  methods:{
    // -------------------------------------------------------
    // Router Event
    // -------------------------------------------------------
    afterEnter: function( el ) {
      //alert(el.firstChild.firstChild.className +' Route entered' );
      window.scrollTo(0, 0);
      // alert(el.firstChild.firstChild.className)
    },
    beforeEnter: function(el){
      //alert(el.firstChild.firstChild.className +' Route entered' );
      window.scrollTo(0, 0);
    }
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
