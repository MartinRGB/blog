<template>
  <div class="transition-container">
    <div id="center-container" class="center-container">
      <toc tocTitle="Sketch 平滑圆角绘制">
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
            <em>本文主要通过分析源码<a href="https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/widget/OverScroller.java"> Overscroller.java </a> 得出</em>
          </p>

        <p>Overscroller 列表滚动效果主要有三个部分：</p>

        <ul>
        <li>ACTION_UP 的 Fling 效果</li>
        <li>ACTION_UP 后触碰边缘的 SpringBack 效果</li>
        <li>边缘 ACTION_MOVE 的阻尼效果</li>
        </ul>

        <h2 id="t-1">Fling - SPLINE</h2>

        <h3 id="t-11">逻辑分析</h3>

        <p>SplineOverScroller 在初始化时，根据预设的采样个数，构建两个数组。一个用来放置 0-1 的时间线性步进，一个用来根据减速公式构建系统0- 1的减速步进。</p>

        <p>然后根据 减速算法，获取 Spline 动画的时间和路程。</p>

        <p>在 SPLINE 的 update 中，根据当前时间和总时间的百分比，根据百分比拿取 之前减速步进数组中的数值 获取 速度系数。用速度系数获取当前的距离系数。</p>

        <p>最后用距离系数乘以路程 获得减速曲线 SPLINE 的动画效果。</p>

        <b>上升回弹曲线 SPLINE 图表分析</b>

        <img class ="small_img" src="../static/images/android_overscroller/0.jpeg" />
        <caption>SPLINE 曲线大致拟合（0-1部分） - 压缩 X 轴就是我们常见的滑动衰减曲线</caption>

        <h2 id="t-2">SpringBack - BALLSTIC - CUBIC</h2>
        <h3 id="t-21">逻辑分析 - 过量范围问题</h3>
        <img class ="small_img" src="../static/images/android_overscroller/1.jpg" />
        <p>这里过量滚动的最大范围，经与开发研究发现，问题定位在 自定义 View 中的 overScrollBy 函数中 —— 触发边界时的动态计算差值 （前一次滚动与当前滚动的差值 + 当前滚动量 = 最大过量范围），这里有一定的优化空间。</p>

        <h3 id="t-22">逻辑分析 - 回弹曲线问题</h3>

        <ul>
        <li>松手 Fling 后执行 SPLINE -&gt; 如果过量执行 BALLSTIC -&gt; 执行完成后执行 CUBIC</li>
        </ul>

        <p>原生的动画效果在 松手 Fling 后 执行 SPLINE 后，如果 Fling 范围超过了边缘范围，则会根据前面提到的过量范围 overY 进行 距离、时间 的计算，根据 速度 进行 减速度 的计算。上述数据带入 update 的公式中，进行 BALLSTIC 运动。</p>

        <p>BALLSTIC 根据时间执行完成后，根据 最高点位移，计算出 时间 距离 减速度 然后把上述数据带入 update 的公式中，进行 CUBIC 回弹。</p>

        <ul>
        <li>在边缘拖拽后松手 -&gt; 只执行 CUBIC 回弹函数。</li>
        </ul>
        <img  src="../static/images/android_overscroller/2.png" />
        <caption>GOOGLE 的 TODO</caption>

        <p>这个运动公式比较复杂，且比较难以修改，并且 Google 自己也想在回弹中增强速度变量对于动画的影响，因此计划将 BALLISTIC 与 CUBIC 废除，统一在抵达边缘后进行一个牛顿力学函数。</p>

        <b>上升回弹曲线 BALLISTIC 图表分析</b>
        <img class ="small_img" src="../static/images/android_overscroller/3.jpg" />
        <caption>当算出最后过量位移为 1000 时的大致曲线拟合</caption>

        <b>下降回弹曲线 CUBIC 图表分析：</b>

        <img class ="small_img" src="../static/images/android_overscroller/4.jpg" />
        <caption>正弦</caption>
        <b>整体动画过程图表分析：</b>
        <img class ="small_img" src="../static/images/android_overscroller/5.jpg" />
        <caption>安卓原生的 BALLISTIC（上升过程） CUBIC（下降过程） 效果接近一个 sin 曲线</caption>
        <h3 id="t-23">优化思路</h3>
        <li>直接去掉了 BALLISTIC 跟 CUBIC，在抵达边缘后，获取 SPLINE 最后的速度，传递到力学公式中，做一个 带有速度趋势开始值为 0 结束值为 0 的动画。</li>
        <li>拖拽松手情况下，开始位置为当前位置，结束位置为边缘，速度为 0</li>
        <li>根据过量的远近，速度的不同，动画曲线也呈现不同的结果。同时也不用在自定义 View 中设置过量范围了，过量范围根据速度动态改变。</li>
        </ul>
        <h3 id="t-24">隐患</h3>

        <p>某些情景下 Spring 运动时间大于肉眼观测时间，导致用户以为可以操作界面，然而第一次点击是停止滚动，第二次点击才生效。</p>

        <p>解决方案：</p>

        <ul>
        <li>通过速度设置停止阈值</li>
        <li>动画前计算时间，如果动画时间过长，则在动画后半程增加 Stiffness 来更快停止</li>
        </ul>

        <h2 id="t-3">Rubberband -阻尼拖拽优化</h2>
        <h3 id="t-31">逻辑分析</h3>
        <p>依赖自定义控件的手势变化量传入阻尼函数</p>
      </div>


    </div>
  </div>
</template>

<script>
import ToolTip from "@/components/ToolTip";
import Toc from "@/components/Toc";
import SnippetComponent from "@/components/SnippetComponent";
import CollapseComponent from "@/components/CollapseComponent";
// import axios from 'axios'

export default {
  name: "article",
  data: function() {
    return {
      articleTitle: '12.[总结]Android Overscroller 动画原理分析'
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
