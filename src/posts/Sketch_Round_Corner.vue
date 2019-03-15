<template>
  <div class="transition-container">
    <img class="hero-image" src='../static/images/smooth_corners/sketch_corners_cover.png' alt='hero image'/>
    <div id="center-container" class="center-container">
      <div id="article-view" class="article-view">
          <h1 id="toc_0">{{articleTitle}}</h1>
          <p>本文主要介绍了设计软件 Sketch 中平滑圆角的绘制方法，以安卓绘制方法探究为主，Web Canvas 主要作为快速调研的工具。 </p>
          <p>Android 圆角的绘制主要有以下两种方法</p>
          <h2 id="static_method">固定绘制的方法</h2>
          <h3 id="pure_static">纯静态素材</h3>
          <ul>
            <li>使用 Sketch 52+ 版本，导出 SVG（支持平滑圆角）转化为 XML 提供给开发</li>
            <li>切图提供 .9png</li>
          </ul>
          <h3 id="avd_method">Animated Vector Drawable 动画</h3>
          <p>SVG动画 => AnimatedVectorDrawable XML 推荐使用 <a href="https://shapeshifter.design/" target="_blank">Shape Shifter</a> ，同时也可以将 SVG 转换为 VectorDrawable XML</p>
          <img data-action="zoom" src='../static/images/smooth_corners/sc_1.png' alt="img0"/>  
          <p><caption style="">注意：因为是矢量绘制格式，因此 导入到 Shape Shifter 里面的素材必须以 dp 为单位尺寸，不能以 px 为单位尺寸（例如 1080×2340 => 360×780 的画板，然后导出 svg 再导入 Shape Shifter)</caption></p>

          <h4>SVG Morphing Test in Web</h4>

          <iframe src='http://www.martinrgb.com/blog/static/pages/svg-morphing/index.html' scrolling='no'></iframe>
          
          <h4>AnimatedVectorDrawable Morphing Test in Android</h4>

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
iframe{
    width: 1100px !important;
    transform: translate3d(-165px,0,0);
    height: 700px;
    margin: 1em auto!important;
    border: 1px solid rgba(108, 119, 130, 0.1);
    padding: 10px !important;
    overflow: hidden;
}
</style>
