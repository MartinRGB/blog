<template>
  <div class="transition-container">
    <div id="center-container" class="center-container">
      <div id="article-view" class="article-view">
          <h1 id="toc_0">{{articleTitle}}</h1>
          <h2 id="toc_1">需求的总体效果：</h2>
            <ul>
            <li><p>独立光源</p></li>
            <li><p>漫反射(diffuse)和镜面反射(specular)</p></li>
            <li><p>建模坐标的(x,y)与砖块的水平和垂直位置相关</p></li>
            <li><p>每一行砖块错开</p></li>
          </ul>
          <h2 id="toc_2">基础概念：</h2>
            <p>顶点着色器中的光照模型：</p>
            <p><img src='../static/images/bricks_light.jpg' alt="fig06-02-partialbricks"/>
            <caption>Lighting Model Concept - 光照模型</caption></p>
            <!-- <p><img src='http://cse.csusb.edu/tongyu/courses/cs520/images/glsl/brick-light.png' alt="fig06-02-partialbricks"/></p>
            <caption>Lighting Model Concept - 光照模型</caption></p> -->
            <p>向量的模 - <code>向量 AB（AB上面有→）的长度叫做向量的模，记作|AB|(AB上有→）或|a|(a上有→)</code><br/>
            向量的点积 - <code>点积的计算方式为:  a·b=|a|·|b|cos&lt;a,b&gt;  其中|a|和|b|表示向量的模，&lt;a,b&gt;表示两个向量的夹角。</code></p>
            <!-- <mathjax-component :bindFunc="MathFunc"></mathjax-component>
            <mathjax-component :bindFunc="MathFunc2"></mathjax-component> -->
            <h3 id="toc_3">顶点着色器</h3>
              <snippet-component v-if="$route.meta.keepAlive" id="CodeSnippet" :bindUrl ='vertSnippet'></snippet-component>
              <!-- <snippet-component v-if="$route.meta.keepAlive" lan='javascript' id="CodeSnippet3" bindUrl ='https://raw.githubusercontent.com/MartinRGB/OpenGL_Online_Notes/master/docs/js/utils.js'></snippet-component> -->
            <h3 id="toc_4">片段着色器</h3>
              <snippet-component v-if="$route.meta.keepAlive" id="CodeSnippet2" :bindUrl ='fragSnippet'></snippet-component>
            <h3 id="toc_4">MOD 函数图表</h3>
              <GLSL-Component v-if="$route.meta.keepAlive" id ="graphContainer" class="simpleGraph" :data='graphSnippet'></GLSL-Component>
            <h3 id="toc_4">小试牛刀</h3>
              <GLSL-Component v-if="$route.meta.keepAlive" id ="graphContainer2" class="simpleEditor" :data='editorSnippet'></GLSL-Component>
          <h2 id="toc_5">最终结果</h2>
            
            <three-component v-if="$route.meta.keepAlive" bindId="brickContainer" :bindModel='ThreeModel0' :bindMaterial='ThreeMaterial0' :bindUniform='ShaderUniform0'></three-component>
          <!-- <h2 id="参考">参考</h2>
            <ul>
              <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator" target="_blank" rel="noopener noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator</a></li>
              <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters" target="_blank" rel="noopener noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters</a></li>
              <li><a href="http://stackoverflow.com/questions/33898512/spread-operator-vs-rest-parameter-in-es2015-es6" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/33898512/spread-operator-vs-rest-parameter-in-es2015-es6</a></li>
            </ul> -->
          <!-- <h2 id="mobile">移动端开发效果</h2>
              <mockup-component :bindDevice='DeviceType0' :bindUrl='ScreenAsset1'></mockup-component>
              <mockup-component :bindDevice='DeviceType1' bindUrl='https://raw.githubusercontent.com/cozyplanes/wallpaper/master/walls/javascript_this.png'></mockup-component> -->
      </div>
    </div>
  </div>
</template>

<script>

  import ThreeComponent from '@/components/ThreeComponent'
  import * as THREE from 'three'

  import shader0 from '../static/shaders/brickwall.json'
  import texture0 from '../static/textures/dirt.jpg'
  import model0 from '../static/models/teapot.json'

  import GLSLComponent from '@/components/GLSLComponent'
  
  import graphFile from '../static/codesnippets/brickwallGraph.frag'
  import editorFile from '../static/codesnippets/brickfrag.frag'

  import SnippetComponent from '@/components/SnippetComponent'

  import vertFile from '../static/codesnippets/brickwall.vert'
  import fragFile from '../static/codesnippets/brickwall.frag'
  // import fragFile from '../static/codesnippets/brickwall.js'

  import MathjaxComponent from '@/components/MathjaxComponent'
  import MathFile from '../static/codesnippets/mathfunc.txt'
  import MockupComponent from '@/components/MockupComponent'
  import asset0 from '../static/mockups/device_test.jpg'
  import asset1 from '../static/mockups/device_test.mp4'
  
  // import axios from 'axios'

  export default {
    name: 'article',
    data: function () {return {
      articleTitle:'2.砖块着色器',

      vertSnippet:vertFile,
      fragSnippet:fragFile,
      
      graphSnippet:graphFile,
      editorSnippet:'https://raw.githubusercontent.com/MartinRGB/vue_threejs_test/master/src/static/codesnippets/brickfrag.frag',

      Threemodel1:new THREE.BoxGeometry( 2, 2, 2 ),
      ThreeMaterial1:texture0,
      ThreeModel0:new THREE.BoxGeometry( 2, 2, 2 ), //Model0
      ThreeMaterial0:shader0,
      ShaderUniform0:{
        TextureMap:THREE.ImageUtils.loadTexture(texture0),
        BrickPct:new THREE.Vector2(0.9,0.85),
        BrickColor:new THREE.Vector3(1.,0.3,0.2),
        MortarColor:new THREE.Vector3(0.85,0.85,0.85),
        BrickSize:new THREE.Vector2(0.3,0.15),
        LightPosition:new THREE.Vector3(0.,0.,4.)
      },

      MathFunc:MathFile,
      MathFunc2: String.raw`1 +  \frac{q^2}{(1-q)}+\frac{q^6}{(1-q)(1-q^2)}+\cdots =
    \prod_{j=0}^{\infty}\frac{1}{(1-q^{5j+2})(1-q^{5j+3})},
     \quad\quad \text{for $|q|<1$}.`,

      DeviceType0:'iOS',
      DeviceType1:'android',
      ScreenAsset0:asset0,
      ScreenAsset1:asset1
    }},
    components: {MathjaxComponent,ThreeComponent,SnippetComponent,GLSLComponent,MockupComponent},
    methods: {},
    computed: {},
    created: function () {},
    mounted:function(){},
    destroyed:function(){}
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
