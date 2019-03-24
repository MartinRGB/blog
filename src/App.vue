<template>
  <div id="app">
    <header-bar id="header-bar"></header-bar>
      <transition name="fade" mode="out-in" v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter" appear>
          <router-view>
          </router-view>
      </transition>
    <footer-bar :bindNavShow='this.navShow' :bindPrevShow='this.prevShow' :bindNextShow='this.nextShow' :bindListNum='this.listNum'></footer-bar>
    <back-to-top text="↑" visibleOffset="500"></back-to-top>
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
  data: function () {
    return {
    navShow:false,
    prevShow:false,
    nextShow:false,
    //Add Num Here
    listNum:10  
    }
  },
  components: {
    FooterBar,
    HeaderBar
  },
  methods:{
    // -------------------------------------------------------
    // Router Event
    // -------------------------------------------------------
    afterEnter: function( el ) {
      this.addZoom()
    },
    beforeEnter: function(el){
      window.scrollTo(0, 0);

      //  navigation Part
      if(this.$route.name == 'Home'){
        this.navShow = false;
      }
      else{
        this.navShow = true;
      }

      var curId = this.$route.name.replace('Article','')
      if(curId == 1){
        this.prevShow = false;
        this.nextShow = true;
      }
      else if (curId == this.listNum){
        this.prevShow = true;
        this.nextShow = false;
      }
      else{
        this.prevShow = true;
        this.nextShow = true;
      }

      
    },
    routeChange: function(){
      
    }
  },
  computed: {},
  created: function () {},
  mounted:function(){


  },
  destroyed:function(){
  },
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
