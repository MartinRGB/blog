// This is your plugin object. It can be exported to be used anywhere.


import Vue from 'vue'
import BackToTop from 'vue-backtotop'
import SmoothScroll from 'smooth-scroll'
import mediumZoom from 'medium-zoom'
var scroll = new SmoothScroll();
Vue.use(BackToTop);

var prevImg=null;

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

        addZoom(){
          if(prevImg !=null){
            const zoom = mediumZoom(prevImg)
            zoom.detach()
          }

          var nowImg = this.$el.querySelectorAll('[data-action="zoom"]')
          if(nowImg.length !=0){
            mediumZoom(nowImg)
            prevImg = nowImg
          }
          else{
            prevImg=null
          }
        }

      }
    });
  }
};

export default UtilPlugin;