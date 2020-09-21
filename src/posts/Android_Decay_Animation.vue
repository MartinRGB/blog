<template>
  <div class="transition-container">
    <div id="center-container" class="center-container">
      <toc tocTitle="Android 衰减类动画原理分析">
        <ul class="TableOfContents">
          <li>
            <p>
              <a href="javascript:void(0)" @click="goAnchor('#t-1')">Fling-Spline</a>
            </p>
            <ul class="TableOfContents">
              <li>
                <p>
                  <a
                    href="javascript:void(0)"
                    @click="goAnchor('#t-11')"
                  >逻辑分析</a>
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p>
              <a href="javascript:void(0)" @click="goAnchor('#t-2')">SpringBack - BALLSTIC - CUBIC
</a>
            </p>
            <ul class="TableOfContents">
              <li>
                <p>
                  <a href="javascript:void(0)" @click="goAnchor('#t-21')">逻辑分析 - 过量范围问题</a>
                </p>
              </li>
              <li>
                <p>
                  <a href="javascript:void(0)" @click="goAnchor('#t-22')">逻辑分析 - 回弹曲线问题</a>
                </p>
              </li>
              <li>
                <p>
                  <a
                    href="javascript:void(0)"
                    @click="goAnchor('#t-23')"
                  >优化思路</a>
                </p>
              </li>
              <li>
                <p>
                  <a href="javascript:void(0)" @click="goAnchor('#t-24')">隐患</a>
                </p>
              </li>

            </ul>
          </li>
          <li>
            <p>
              <a href="javascript:void(0)" @click="goAnchor('#t-3')">Rubberband -阻尼拖拽优化</a>
            </p>
              <ul class="TableOfContents">
              <li>
                <p>
                  <a
                    href="javascript:void(0)"
                    @click="goAnchor('#t-31')"
                  >逻辑分析</a>
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </toc>
      <div id="article-view" class="article-view">
        <h1 id="toc_0">{{articleTitle}}</h1>
          <p>
            <em>本文主要涉及的源码
              <ul>

                
                <li><a href="https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/widget/Scroller.java" target="_blank"> Scroller.java </a></li>
     
                <li><a href="https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/widget/OverScroller.java" target="_blank"> Overscroller.java </a></li>
     
                <li><a href="https://android.googlesource.com/platform/frameworks/support/+/a9ac247af2afd4115c3eb6d16c05bc92737d6305/dynamic-animation/src/main/java/androidx/dynamicanimation/animation/FlingAnimation.java" target="_blank"> FlingAnimation.java </a></li>
      
                <li><a href="https://android.googlesource.com/platform/frameworks/support/+/android-cts-8.0_r5/v7/recyclerview/src/android/support/v7/widget/SnapHelper.java" target="_blank"> SnapHelper.java </a></li>

              </ul>
            </em>
          </p>

          <h2 id="t-1">前言</h2>

          <figure class="css-1fy50x0">
            <video class="small_img" src="../static/video/ios_date_picker.mp4" autoplay="autoplay" loop="loop"></video>

            <img class="small_img" src="../static/images/android_decay/0.gif" />
            <caption>1.1&#8202;—&#8202;两个衰减动画一比较，高下立判，这一小细节却令人深思，iOS 的各种 Fling 衰减滚动总是舒缓，而且在一些场景下可以 <b>精确定位</b> 且 <b>刚好停止</b> 到指定列表项居中位置。Android 往往是越过指定项，然后补一个二次动画归位。</caption>
          </figure>


        <p>UI 动画设计中，反复讲究的一个词叫 'Authentic'，意即「真实」，多点触控设备经历多年发展，已经日臻完善。
          手势交互，讲究真实、物理，当用户使用手势跟屏幕交互时，真实空间（屏幕上）的手势速度被无缝传递到电子媒介中的 UI 界面上。</p>
        <p>iOS 一直多年奉行基于物理的动画原理，在手势交互类动画上广泛采用，并通过 API 来控制整体设计一致性，我本人也深受其熏陶。
          经过多年的设计实践和编程探索，去年制作了一款叫做 <a href="https://github.com/MartinRGB/Animer" target="_blank">Animer</a> 的开源动画框架，力求完善 Android 的物理动画系统。今年 MIUI 12 也发布了光锥动画系统，其中部分思想不谋合而。</p>

          <p>在做 Animer 的过程中，仔细研读了很多 Android 源码，产生了很多不一样的思考 ，本文就围绕安卓动画系统中涉及 <b>衰减动画</b> 的部分展开，通过数学和代码来分析一下 Android 衰减动画的林林总总，并给出体验优化建议。</p>


        <h2 id="t-2">指数衰减动画的原理</h2>

        <p>减速的运动曲线总是让人感觉到舒缓惬意，在日常生活中，由于我们的世界存在着各种力</p>

        <h2 id="t-3">找准定位 —— SnapHelper 的动画原理</h2>

        <h2 id="t-4">关于 FlingAnimation</h2>

        <h2 id="t-5">资料参考</h2> 

      </div>


    </div>
  </div>
</template>

<script>
import ToolTip from "@/components/ToolTip";
import Toc from "@/components/Toc";
import SnippetComponent from "@/components/SnippetComponent";
import CollapseComponent from "@/components/CollapseComponent";
import scrollVideo from '../static/video/spline_scorll.mp4'
// import axios from 'axios'

export default {
  name: "article",
  data: function() {
    return {
      articleTitle: '13.[总结]Android 衰减类动画原理分析'
    };
  },
  components: { ToolTip, Toc, SnippetComponent, CollapseComponent },
  methods: {},
  computed: {},
  created: function() {},
  mounted: function() {},
  destroyed: function() {}
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
caption {
  letter-spacing: 0em;
  font-style: italic;
}
iframe {
  width: 1100px !important;
  transform: translate3d(-165px, 0, 0);
  height: 700px;
  margin: 1em auto !important;
  border: 1px solid rgba(108, 119, 130, 0.1);
  padding: 10px !important;
  overflow: hidden;
}

.center-container img {
  max-width: 100%;
  display: -webkit-box;
  margin: 0 auto;
  width: auto;
}
.small_img {
  width: auto;
  height: auto;
  max-width: 300px !important;
  display: block;
  margin: 0 auto;
}

.formula_img {
  width: auto;
  height: auto;
  max-width: 100px;
  display: block;
  margin: 0 auto;
}
</style>
