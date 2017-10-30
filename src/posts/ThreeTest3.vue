<template>
  <div class="transition-container">
    <div id="center-container" class="center-container">
      <div id="article-view" class="article-view">
            <h1 id="toc_0">{{articleTitle}}</h1>
            <three-component v-if="$route.meta.keepAlive" :bindModel='ThreeModel' :bindMaterial='ThreeMaterial' :bindUniform='ShaderUniform'></three-component>
            <GSAP-example></GSAP-example>
            <rebound-example></rebound-example>
            <snippet-component v-if="$route.meta.keepAlive" lan='html' id="CodeSnippet1" :bindUrl ='htmlSnippet'></snippet-component>
            <div v-html="rawHTML"></div>
            <list-transition></list-transition>
      </div>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource);

  import ThreeComponent from '@/components/ThreeComponent'
  import * as THREE from 'three'
  import shader0 from '../static/shaders/brickwall.json'
  import texture0 from '../static/textures/metal.jpg'
  import model0 from '../static/models/teapot.json'

  import GSAPExample from '@/components/example/GSAPExample'
  import ReboundExample from '@/components/example/ReboundExample'
  import ListTransition from '@/components/example/ListTransition'

  import SnippetComponent from '@/components/SnippetComponent'
  import htmlFile from 'file-loader!../static/codesnippets/brickwall.html';
  import htmlFile2 from 'vue-html-loader!../static/codesnippets/brickwall.html';
  import htmlFile3 from 'vue-html-loader!../static/html/test3.html';



  export default {
    name: 'three',
    data: function () {return {
      articleTitle:'2.ThreeTest',

      htmlSnippet: htmlFile,
      rawHTML:htmlFile2,

      ThreeModel:model0,
      ThreeMaterial:shader0,
      ShaderUniform:{
        TextureMap:THREE.ImageUtils.loadTexture(texture0),
        BrickPct:new THREE.Vector2(0.9,0.85),
        BrickColor:new THREE.Vector3(1.,0.3,0.2)
      }
    }},
    components: {ThreeComponent,GSAPExample,ReboundExample,SnippetComponent,ListTransition},
    methods: {
    }
    ,computed: {},
    created: function () {},
    mounted:function(){

    },

    destroyed:function(){
    }
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
