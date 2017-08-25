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
            <!-- <p><img src="http://cse.csusb.edu/tongyu/courses/cs520/images/glsl/brick-light.png" alt="fig06-02-partialbricks"/></p> -->
            <!-- 图片要放在src->static->images -->
            <p><img src='../static/images/bricks_light.jpg' alt="fig06-02-partialbricks"/>
            <caption>Lighting Model Concept - 光照模型</caption></p>
            <p><img src='http://cse.csusb.edu/tongyu/courses/cs520/images/glsl/brick-light.png' alt="fig06-02-partialbricks"/></p>
            <p>向量的模 - <code>向量 AB（AB上面有→）的长度叫做向量的模，记作|AB|(AB上有→）或|a|(a上有→)</code><br/>
            向量的点积 - <code>点积的计算方式为:  a·b=|a|·|b|cos&lt;a,b&gt;  其中|a|和|b|表示向量的模，&lt;a,b&gt;表示两个向量的夹角。</code></p>

            <!-- <h3 id="toc_3">顶点着色器</h3>
              <snippet-component v-if="$route.meta.keepAlive" bindId="CodeSnippet" bindUrl="https://gist.githubusercontent.com/MartinRGB/aee922946fe4558a205c65ccc13ab8b6/raw/534abcf9dab6ded01bd212ba573706966aa0db87/lut.vert"></snippet-component>
            <h3 id="toc_4">片段着色器</h3>
              <snippet-component v-if="$route.meta.keepAlive" bindId="CodeSnippet2" bindUrl="https://gist.githubusercontent.com/MartinRGB/aee922946fe4558a205c65ccc13ab8b6/raw/534abcf9dab6ded01bd212ba573706966aa0db87/lut.frag"></snippet-component>
            <h3 id="toc_4">MOD 函数图表</h3>
              <glsl-component v-if="$route.meta.keepAlive" id ="graphContainer" class="simpleGraph" data="https://gist.githubusercontent.com/MartinRGB/384738e7718fcfe74aa54e16a4784131/raw/a382394b478a1519ec398023ec0410f6afbc59fd/mod_test.frag"></glsl-component>
            <h3 id="toc_4">小试牛刀</h3>
              <glsl-component v-if="$route.meta.keepAlive" id ="graphContainer" class="codeAndCanvas" data="https://gist.githubusercontent.com/MartinRGB/29b5c9b50f35278e0ca42b67bce3c4a0/raw/bd10f0cc92bb6a4d4ec2a7ba3d44b6bc2283ad05/circle.frag"></glsl-component>
               -->
            <h3 id="toc_3">顶点着色器</h3>
              <snippet-component v-if="$route.meta.keepAlive" id="CodeSnippet" :bindUrl ='vertSnippet'></snippet-component>

              <snippet-component v-if="$route.meta.keepAlive" lan='java' id="CodeSnippet3" :bindUrl ='cppSnippet'></snippet-component>
              
            <h3 id="toc_4">片段着色器</h3>
              <snippet-component v-if="$route.meta.keepAlive" id="CodeSnippet2" :bindUrl ='fragSnippet'></snippet-component>
            <h3 id="toc_4">MOD 函数图表</h3>
              <GLSL-Component v-if="$route.meta.keepAlive" id ="graphContainer" class="simpleGraph" :data='graphSnippet'></GLSL-Component>
            <h3 id="toc_4">小试牛刀</h3>
              <GLSL-Component v-if="$route.meta.keepAlive" id ="graphContainer2" class="simpleEditor" :data='editorSnippet'></GLSL-Component>
          <h2 id="toc_5">最终结果</h2>
            <three-component v-if="$route.meta.keepAlive"></three-component>
            <three-component v-if="$route.meta.keepAlive"></three-component>
          <h2 id="参考">参考</h2>
            <ul>
              <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator" target="_blank" rel="noopener noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator</a></li>
              <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters" target="_blank" rel="noopener noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters</a></li>
              <li><a href="http://stackoverflow.com/questions/33898512/spread-operator-vs-rest-parameter-in-es2015-es6" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/33898512/spread-operator-vs-rest-parameter-in-es2015-es6</a></li>
            </ul>
          <div v-html="html"></div>
      </div>
    </div>
</template>

<style src="../style/glslEditor.css"></style>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource);

  import ThreeComponent from './ThreeComponent.vue'
  import SnippetComponent from './SnippetComponent.vue'
  import GLSLComponent from './GLSLComponent.vue'

  import GLSLStyle from '../static/js/CanvasStyle.js'

  import vertFile from '../static/codesnippets/brickwall.vert'
  import fragFile from '../static/codesnippets/brickwall.frag'
  import graphFile from '../static/codesnippets/brickwallGraph.frag'
  import editorFile from '../static/codesnippets/hsbcolor.frag'
  import cppFile from '../static/codesnippets/ScreenSwitchUtils.java'
  

  export default {
    name: 'article',
    data: function () {return {
       vertSnippet:vertFile,
       fragSnippet:fragFile,
       graphSnippet:graphFile,
       editorSnippet:editorFile,
       cppSnippet:cppFile,
       html: '<p>Loading...</p>',
       bindHtml: 'https://raw.githubusercontent.com/MartinRGB/OpenGL_Online_Notes/master/docs/lessons/1.BrickWall.html'

    }},
    components: {ThreeComponent,SnippetComponent,GLSLComponent},
    methods: {
      // 加载完成多个 Glsl 后，一次配置元素
      initGLSLEditor:function(){
        var canvasStyle = new GLSLStyle()
        canvasStyle.load()
      },
      scrollToTop: function(){
        window.scrollTo(0, 0);
      }
      // ,request:function() {
      //     this.$http.get(this.bindHtml).then((response) => {
      //       // 响应成功回调
      //       this.html = response.data
      //     }, (response) => {
      //       // 响应错误回调
      //       this.html = 'Request Failed'
      //     });       
      // }
    }
    // ,beforeRouteEnter (to, from, next) {
    //   next()
    // }
    ,computed: {},
    created: function () {},
    mounted:function(){
      this.initGLSLEditor()
      this.scrollToTop()

      // this.request()

    },
    destroyed:function(){
    }
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
