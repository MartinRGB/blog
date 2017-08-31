<template>
  <div class="transition-container">
    <div id="center-container" class="center-container">
      <div id="article-view" class="article-view">
            <three-component v-if="$route.meta.keepAlive" :bindModel='ThreeModel' :bindMaterial='ThreeMaterial' :bindUniform='ShaderUniform'></three-component>
            <GSAP-example></GSAP-example>
            <rebound-example></rebound-example>
      </div>
    </div>
  </div>
</template>

<script>

  import ThreeComponent from './ThreeComponent.vue'

  import * as THREE from 'three'
  import shader0 from '../static/shaders/brickwall.json'
  import texture0 from '../static/textures/metal.jpg'
  import model0 from '../static/models/teapot.json'

  import GSAPExample from './utils/GSAPExample.vue'
  import ReboundExample from './utils/ReboundExample.vue'


  export default {
    name: 'three',
    data: function () {return {
      ThreeModel:model0,
      ThreeMaterial:shader0,
      ShaderUniform:{
        TextureMap:THREE.ImageUtils.loadTexture(texture0),
        BrickPct:new THREE.Vector2(0.9,0.85),
        BrickColor:new THREE.Vector3(1.,0.3,0.2)
      }
    }},
    components: {ThreeComponent,GSAPExample,ReboundExample},
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
