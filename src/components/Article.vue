<template>
    <div id="center-container" class="center-container">
      <div id="article-view" class="article-view">
        <h1 id="toc_0">1.砖块着色器</h1>
        
        <h2 id="toc_1">需求的总体效果：</h2>


        
        <ul>
        <li><p>独立光源</p></li>
        <li><p>漫反射(diffuse)和镜面反射(specular)</p></li>
        <li><p>建模坐标的(x,y)与砖块的水平和垂直位置相关</p></li>
        <li><p>每一行砖块错开</p></li>
        </ul>
        

        <h2 id="toc_2">基础概念：</h2>
        <p>顶点着色器中的光照模型：</p>
        
        <p><img src="http://cse.csusb.edu/tongyu/courses/cs520/images/glsl/brick-light.png" alt="fig06-02-partialbricks"/></p>
        
        
        <p>向量的模 - <code>向量 AB（AB上面有→）的长度叫做向量的模，记作|AB|(AB上有→）或|a|(a上有→)</code><br/>
        向量的点积 - <code>点积的计算方式为:  a·b=|a|·|b|cos&lt;a,b&gt;  其中|a|和|b|表示向量的模，&lt;a,b&gt;表示两个向量的夹角。</code></p>

        <h3 id="toc_3">顶点着色器</h3>
        <code-snippet v-if="$route.meta.keepAlive" bindId="CodeSnippet1" bindUrl="https://gist.githubusercontent.com/MartinRGB/aee922946fe4558a205c65ccc13ab8b6/raw/534abcf9dab6ded01bd212ba573706966aa0db87/lut.vert"></code-snippet>
        <h3 id="toc_4">片段着色器</h3>
        <code-snippet v-if="$route.meta.keepAlive" bindId="CodeSnippet2" bindUrl="https://gist.githubusercontent.com/MartinRGB/aee922946fe4558a205c65ccc13ab8b6/raw/534abcf9dab6ded01bd212ba573706966aa0db87/lut.frag"></code-snippet>
        <h3 id="toc_4">MOD 函数图表</h3>
        <GLSL-Component v-if="$route.meta.keepAlive" bindId ="graphContainer" bindClass="simpleGraph" bindUrl="https://gist.githubusercontent.com/MartinRGB/384738e7718fcfe74aa54e16a4784131/raw/a382394b478a1519ec398023ec0410f6afbc59fd/mod_test.frag"></GLSL-Component>
        <h3 id="toc_4">小试牛刀</h3>
        <GLSL-Component v-if="$route.meta.keepAlive" id ="graphContainer2" class="codeAndCanvas" data="https://gist.githubusercontent.com/MartinRGB/29b5c9b50f35278e0ca42b67bce3c4a0/raw/bd10f0cc92bb6a4d4ec2a7ba3d44b6bc2283ad05/circle.frag"></GLSL-Component>
        <h2 id="toc_5">最终结果</h2>
        <three-canvas v-if="$route.meta.keepAlive"></three-canvas>
        <h2 id="参考">参考</h2>
        <ul>
          <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator" target="_blank" rel="noopener noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator</a></li>
          <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters" target="_blank" rel="noopener noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters</a></li>
          <li><a href="http://stackoverflow.com/questions/33898512/spread-operator-vs-rest-parameter-in-es2015-es6" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/33898512/spread-operator-vs-rest-parameter-in-es2015-es6</a></li>
        </ul>
        
      </div>
    </div>
</template>

<style src="../style/glslEditor.css"></style>

<script>

  
  import ThreeCanvas from './ThreeCanvas.vue'
  import CodeSnippet from './CodeSnippet.vue'
  import GLSLComponent from './GLSLComponent.vue'

  import GLSLStyle from '../assets/js/CanvasStyle.js'


  export default {
    name: 'article',
    data: function () {return {}},
    components: {ThreeCanvas,CodeSnippet,GLSLComponent},
    methods: {
      //加载完成多个 Glsl 后，一次配置元素
      initGLSLEditor:function(){
        var canvasStyle = new GLSLStyle()
        canvasStyle.load()
      },
      scrollToTop: function(){
        window.scrollTo(0, 0);
      }
    }
    ,beforeRouteEnter (to, from, next) {
      next()
    }
    ,computed: {},
    created: function () {},
    mounted:function(){
      this.glslInit = this.initGLSLEditor()
      this.scrollToTop()

    },
    destroyed:function(){
      this.glslInit()
    }
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
