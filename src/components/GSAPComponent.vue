<template>

  <div id="demo">
      <div class="box green" id="greenBox">0</div>
      <!-- <div class="ease-visualizer" data-ease="Power2.easeOut"></div> -->
      <div v-html="html"></div>
  </div>
</template>

<script>

  import { TweenMax,TweenLite, Elastic} from 'gsap';
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource);
  // import '../static/js/gsap/easing/CustomEase.min.js'
  // import '../static/js/gsap/plugins/MorphSVGPlugin.min.js'
  // import '../static/js/gsap/EaseVisualizer.js'
  // import easevisualizer from 'https://raw.githubusercontent.com/MartinRGB/OpenGL_Online_Notes/master/docs/lessons/1.BrickWall.html'
  // import easevisualizer from '../static/articles/test.html'
  // import test from '../static/articles/test.html'

  export default {
    name: 'gsaptest',
    data: function () {return {
       html: '<p>Loading...</p>',
      //  bindHtml: 'https://raw.githubusercontent.com/MartinRGB/OpenGL_Online_Notes/master/docs/lessons/1.BrickWall.html'
       bindHtml:'https://raw.githubusercontent.com/MartinRGB/vue_threejs_test/master/src/static/pages/Easing-Visualizer/index.html'
    }},
    components: {},
    methods: {
      example1:function(){
        var box = document.getElementById("greenBox"),
            count = 0,
            tween;

        tween = TweenMax.to(box, 2.5, 
                            {left:"570px", 
                            repeat:20, 
                            yoyo:true,
                            onRepeat:onRepeat, 
                            repeatDelay:0.5,         
                            ease:Elastic.easeInOut});

        function onRepeat() {
          count++
          box.innerHTML = count;
          TweenLite.set(box, {backgroundColor:"hsl(" + Math.random() * 255 + ", 90%, 60%)"});
        }						
      },
      // -------------------------------------------------------
      // V-HTML Binding
      // -------------------------------------------------------
      htmlRequest:function() {
          this.$http.get(this.bindHtml).then((response) => {
            // 响应成功回调
            this.html = response.data
          }, (response) => {
            // 响应错误回调
            this.html = '<p>Request Failed<p>'
          });       
      }
    }
    ,computed: {},
    created: function () {},
    mounted:function(){
      this.example1()
      this.htmlRequest()

    },

    destroyed:function(){
    }
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #demo {
    height:100%;
    position:relative;
    /* overflow:hidden; */
  }
  .box {
    width:100px;
    height:100px;
    position:relative;
    border-radius:6px;
    margin-top:4px;
    text-align:center;
    line-height:100px;
    color:black;
    font-size:80px;
  }

  .green{
    background-color:#6fb936;
  }


</style>
