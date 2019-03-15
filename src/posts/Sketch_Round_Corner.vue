<template>
  <div class="transition-container">
    <img class="hero-image" src='../static/images/smooth_corners/sketch_corners_cover.png' alt='hero image'/>
    <div id="center-container" class="center-container">
      <div id="article-view" class="article-view">
          <h1 id="toc_0">{{articleTitle}}</h1>
          <p>本文主要介绍了设计软件 Sketch 中平滑圆角的绘制方法，以安卓绘制方法探究为主，Web Canvas 主要作为快速调研的工具。 </p>
          <p>Android 圆角的绘制主要有以下两种方法</p>
          <h2 id="static_method">静态绘制的方法</h2>
          <h3 id="pure_static">纯静态素材</h3>
          <ul>
            <li>使用 Sketch 52+ 版本，导出 SVG（支持平滑圆角）转化为 XML 提供给开发</li>
            <li>切图提供 .9png</li>
          </ul>
          <h3 id="avd_method">Animated Vector Drawable 动画</h3>
          <p>SVG动画 => AnimatedVectorDrawable XML 推荐使用 <a href="https://shapeshifter.design/" target="_blank">Shape Shifter</a> ，同时也可以将 SVG 转换为 VectorDrawable XML</p>
          <img data-action="zoom" src='../static/images/smooth_corners/sc_1.png' alt="img0"/>  
          <p><caption style="">注意：因为是矢量绘制格式，因此 导入到 Shape Shifter 里面的素材必须以 dp 为单位尺寸，不能以 px 为单位尺寸（例如 1080×2340 => 360×780 的画板，然后导出 svg 再导入 Shape Shifter)</caption></p>

          <h3></h3>
          <h2 id="toc_2">基础概念：</h2>
            <p>顶点着色器中的光照模型：</p>
            <p><img data-action="zoom" src='../static/images/bricks_light.jpg' alt="fig06-02-partialbricks"/>
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
      </div>
    </div>
  </div>
</template>

<script>

  import ToolTip from '@/components/ToolTip'
  import Toc from '@/components/Toc'
  
  // import axios from 'axios'

  export default {
    name: 'article',
    data: function () {return {
      articleTitle:'10.[总结]Sketch 平滑圆角在 Android 和 Web 中的绘制'
    }},
    components: {ToolTip,Toc},
    methods: {},
    computed: {},
    created: function () {},
    mounted:function(){},
    destroyed:function(){}
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
caption {
    letter-spacing: 0.0em;
    font-style: italic;
}
</style>
