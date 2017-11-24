// This is your plugin object. It can be exported to be used anywhere.


import Vue from 'vue'
import BackToTop from 'vue-backtotop'
import SmoothScroll from 'smooth-scroll'
var scroll = new SmoothScroll();
Vue.use(BackToTop);

const UtilPlugin = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install(Vue, options) {
    // We call Vue.mixin() here to inject functionality into all components.
  	Vue.mixin({
      // Anything added to a mixin will be injected into all components.
      // In this case, the mounted() method runs when the component is added to the DOM.
      mounted() {
      },
      methods:{
        goAnchor(selector){
          var anchor = this.$el.querySelector(selector)
          var navbarHeight = 69;
          var distanceY = anchor.offsetTop - anchor.offsetHeight - navbarHeight;
          scroll.animateScroll( distanceY );
          //window.scroll(0,distanceY)
          //window.scroll({ top: distanceY, left: 0, behavior: 'fast' });
        },

      }
    });
  }
};

export default UtilPlugin;