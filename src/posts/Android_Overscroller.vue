<template>
  <div class="transition-container">
    <div id="center-container" class="center-container">
      <toc tocTitle="Android Overscroller 动画原理分析">
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
            <em>本文主要通过分析源码<a href="https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/widget/OverScroller.java" target="_blank"> Overscroller.java </a> 得出</em>
          </p>

        <p>Overscroller 列表滚动效果主要有三个部分：</p>

        <ul>
        <li>ACTION_UP 后 Fling 效果</li>
        <li>ACTION_UP 后 Fling 抵达边缘的 SpringBack 效果</li>
        <li>边缘拉动 ACTION_MOVE 的阻尼效果和 松手后的 SpringBack 效果</li>
        </ul>

        <h2 id="t-1">Fling - SPLINE</h2>

        <h3 id="t-11">逻辑分析</h3>

        <p>SplineOverScroller 在<b>初始化</b>时，设置预设的采样个数，然后根据时间 0～1 的线性步进和减速公式，来获取值变化 0 ～ 1的<b>减速位置</b>和<b>减速时间</b>，并放入数组。(这里数据 Log 出来，形似一个减速曲线函数）</p>

                   <snippet-component v-if="$route.meta.keepAlive" lan='java'>static {
            float x_min = 0.0f;
            float y_min = 0.0f;
            for (int i = 0; i < NB_SAMPLES; i++) {
                final float alpha = (float) i / NB_SAMPLES;
                float x_max = 1.0f;
                float x, tx, coef;
                while (true) {
                    x = x_min + (x_max - x_min) / 2.0f;
                    coef = 3.0f * x * (1.0f - x);
                    tx = coef * ((1.0f - x) * P1 + x * P2) + x * x * x;
                    if (Math.abs(tx - alpha) < 1E-5) break;
                    if (tx > alpha) x_max = x;
                    else x_min = x;
                }
                // NOTICE:注意这里 —— 减速位置步进数组
                SPLINE_POSITION[i] = coef * ((1.0f - x) * START_TENSION + x) + x * x * x;
                float y_max = 1.0f;
                float y, dy;
                while (true) {
                    y = y_min + (y_max - y_min) / 2.0f;
                    coef = 3.0f * y * (1.0f - y);
                    dy = coef * ((1.0f - y) * START_TENSION + y) + y * y * y;
                    if (Math.abs(dy - alpha) < 1E-5) break;
                    if (dy > alpha) y_max = y;
                    else y_min = y;
                }
                // NOTICE:注意这里 —— 减速时间步进数组
                SPLINE_TIME[i] = coef * ((1.0f - y) * P1 + y * P2) + y * y * y;
            }
            SPLINE_POSITION[NB_SAMPLES] = SPLINE_TIME[NB_SAMPLES] = 1.0f;
}</snippet-component>           

        <p>然后根据 减速算法，获取 Spline 动画的<b>时间</b>和<b>路程</b>。</p>

                           <snippet-component v-if="$route.meta.keepAlive" lan='java'>void fling(int start, int velocity, int min, int max, int over) {
            mOver = over;
            mFinished = false;
            mCurrVelocity = mVelocity = velocity;
            mDuration = mSplineDuration = 0;
            mStartTime = AnimationUtils.currentAnimationTimeMillis();
            mCurrentPosition = mStart = start;
            if (start > max || start < min) {
                startAfterEdge(start, min, max, velocity);
                return;
            }
            mState = SPLINE;
            double totalDistance = 0.0;
        
            if (velocity != 0) {
                // NOTICE:估算时间
                mDuration = mSplineDuration = getSplineFlingDuration(velocity);
                // NOTICE:估算路程
                totalDistance = getSplineFlingDistance(velocity);
            }
            mSplineDistance = (int) (totalDistance * Math.signum(velocity));
            mFinal = start + mSplineDistance;
            // Clamp to a valid final position
            if (mFinal < min) {
                adjustDuration(mStart, mFinal, min);
                mFinal = min;
            }
            if (mFinal > max) {
                adjustDuration(mStart, mFinal, max);
                mFinal = max;
            }
        }</snippet-component>           

        <p>在 SPLINE 的 update 中，根据<b>当前时间和总时间的百分比</b>，根据百分比拿取 之前减速步进数组中的数值 获取 速度系数。用速度系数获取当前的距离系数。</p>

        <p>最后用距离系数乘以路程 获得减速曲线 SPLINE 的动画效果。</p>

<snippet-component v-if="$route.meta.keepAlive" lan='java'>
  //NOTICE:SPLINE 运动的动画函数，见下图
  case SPLINE: {
                    final float t = (float) currentTime / mSplineDuration;
                    final int index = (int) (NB_SAMPLES * t);
                    float distanceCoef = 1.f;
                    float velocityCoef = 0.f;
                    if (index < NB_SAMPLES) {
                        final float t_inf = (float) index / NB_SAMPLES;
                        final float t_sup = (float) (index + 1) / NB_SAMPLES;
                        final float d_inf = SPLINE_POSITION[index];
                        final float d_sup = SPLINE_POSITION[index + 1];
                        // NOTICE:(估算下一帧位置 - 估算当前帧位置)/(估算下一帧时间 - 估算当前帧时间） —— v(t+△t) 
                        velocityCoef = (d_sup - d_inf) / (t_sup - t_inf);
                        // NOTICE:欧拉积分的思想，S(t+△t) = S(t) + △t(v(t+△t))
                        distanceCoef = d_inf + (t - t_inf) * velocityCoef;
                    }
                    // NOTICE:将前面算出 0 ~ 1 distanceCoef 变化 乘以 估算的 mSplineDistance ,更新到 View 的滚动上。
                    distance = distanceCoef * mSplineDistance;
                    mCurrVelocity = velocityCoef * mSplineDistance / mSplineDuration * 1000.0f;
                    break;
                }</snippet-component> 
        <b>上升回弹曲线 SPLINE 图表分析</b>

        <img class ="small_img" src="../static/images/android_overscroller/0.jpeg" />
        <caption>SPLINE 曲线大致拟合（0-1部分） - 压缩 X 轴就是我们常见的滑动衰减曲线</caption>

        <b>优化思路</b>

        <p>谷歌建议使用 Android DynamicAnimation 中的 FlingAnimation 处理滑动事件，这里将 Java 的代码抽取到设计软件 AE 中进行快速模拟（左面原生 Spline 算法，右面 FlingAnimation 算法）</p>

        <video class="small_img" src="../static/video/spline_scorll.mp4" autoplay="autoplay" loop="loop"></video>
        <h2 id="t-2">SpringBack - BALLSTIC - CUBIC</h2>
        <h3 id="t-21">逻辑分析 - 过量范围问题</h3>
        <img class ="small_img" src="../static/images/android_overscroller/1.jpg" />
        <p>这里过量滚动的最大范围，第一个问题定位在 自定义 View 中的 <b>overScrollBy</b> 函数中 —— 触发边界时的动态计算差值 （前一次滚动与当前滚动的差值 + 当前滚动量 = 最大过量范围），这里有一定的优化空间。</p>
<snippet-component v-if="$route.meta.keepAlive" lan='java'>private int getScrollRange() {
        int scrollRange = 0;
        if (getChildCount() > 0) {
            View child = getChildAt(0);
            scrollRange = Math.max(0,
                    child.getHeight() - (getHeight() - mPaddingBottom - mPaddingTop));
        }
        return scrollRange;
    }
  ...
  case MotionEvent.ACTION_UP:
                /* Release the drag */
                mIsBeingDragged = false;
                mActivePointerId = INVALID_POINTER;
                recycleVelocityTracker();
                // NOTICE: scrollRange 影响 springBack 的计算
                if (mScroller.springBack(mScrollX, mScrollY, 0, 0, 0, getScrollRange())) {
                    postInvalidateOnAnimation();
                }
                break;
  </snippet-component>
        <p>这里 scrollRange 的设定会影响回弹的效果</p>
        <h3 id="t-22">逻辑分析 - 回弹曲线问题</h3>

        <ul>
        <li style="
    list-style: decimal;
">松手 Fling 后执行 SPLINE -&gt; 如果过量执行 BALLSTIC -&gt; 执行完成后执行 CUBIC
<p>原生的动画效果在 松手 Fling 后 执行 SPLINE 后，如果 Fling 范围<b>超过了边缘范围</b>，则会根据前面提到的过量范围 overY 进行 <b>距离、时间</b> 的计算，根据 <b>速度</b> 进行 <b>减速度</b> 的计算。上述数据带入 update 的公式中，进行 BALLSTIC 运动。</p>

<snippet-component v-if="$route.meta.keepAlive" lan='java'>
        boolean continueWhenFinished() {
            switch (mState) {
                case SPLINE:
                        ...
                        //NOTICE：拿到速度 减速度
                        mVelocity = (int) mCurrVelocity;
                        mDeceleration = getDeceleration(mVelocity);
                        mStartTime += mDuration;
                        // NOTICE: 滚动过程中一直检测是否抵达边缘,抵达边缘 mState = BALLSTIC
                        onEdgeReached();
                        ...
                case BALLISTIC:
                    mStartTime += mDuration;
                    startSpringback(mFinal, mStart, 0);
                    break;
                case CUBIC:
                    return false;
            }
            update();
            return true;
        }
        ...
        private void onEdgeReached() {
            // mStart, mVelocity and mStartTime were adjusted to their values when edge was reached.
            // The float cast below is necessary to avoid integer overflow.
            //NOTICE：上面的速度跟减速度拿到这里作为 BALLISTIC 运动的参数
            final float velocitySquared = (float) mVelocity * mVelocity;
            float distance = velocitySquared / (2.0f * Math.abs(mDeceleration));
            final float sign = Math.signum(mVelocity);
            if (distance > mOver) {
                // Default deceleration is not sufficient to slow us down before boundary
                 mDeceleration = - sign * velocitySquared / (2.0f * mOver);
                 distance = mOver;
            }
            mOver = (int) distance;
            mState = BALLISTIC;
            mFinal = mStart + (int) (mVelocity > 0 ? distance : -distance);
            //NOTICE:运动时间根据速度减速度进行迭代至0
            mDuration = - (int) (1000.0f * mVelocity / mDeceleration);
        }
        
        boolean update() {
            ...
            switch (mState) {
                ...
                case BALLISTIC: {
                    //NOTICE: BALLISTIC 运动的动画函数
                    final float t = currentTime / 1000.0f;
                    mCurrVelocity = mVelocity + mDeceleration * t;
                    distance = mVelocity * t + mDeceleration * t * t / 2.0f;
                    break;
                }
                ...
            }
            ...
        }
        </snippet-component> 



        <b>上升回弹曲线 BALLISTIC 图表分析</b>
        <img class ="small_img" src="../static/images/android_overscroller/3.jpg" />
        <caption>当算出最后过量位移为 1000 时的大致曲线拟合</caption></li>
           <li style="
    list-style: decimal;
">BALLSTIC 根据时间执行完成后，根据 最高点位移，计算出 <b>时间 距离 减速度</b> 然后把上述数据带入 update 的公式中，进行 CUBIC 回弹。
 <snippet-component v-if="$route.meta.keepAlive" lan='java'>private void startSpringback(int start, int end, int velocity) {
            // mStartTime has been set
            mFinished = false;
            mState = CUBIC;
            mCurrentPosition = mStart = start;
            mFinal = end;
            final int delta = start - end;
            //NOTICE:减速度
            mDeceleration = getDeceleration(delta);
            // TODO take velocity into account
            mVelocity = -delta; // only sign is used
            //NOTICE:过量范围 - 距离
            mOver = Math.abs(delta);
            //NOTICE:动画时间
            mDuration = (int) (1000.0 * Math.sqrt(-2.0 * delta / mDeceleration));
        }
        ...

        boolean update() {
            ...
            switch (mState) {
                ...
                //NOTICE:CUBIC 运动的动画函数，见下图
                case CUBIC: {
                    final float t = (float) (currentTime) / mDuration;
                    final float t2 = t * t;
                    final float sign = Math.signum(mVelocity);
                    distance = sign * mOver * (3.0f * t2 - 2.0f * t * t2); 
                    mCurrVelocity = sign * mOver * 6.0f * (- t + t2); 
                    break;
                }
                ...
            }
            ...
        }
        </snippet-component>
                <b>下降回弹曲线 CUBIC 图表分析：</b>

        <img class ="small_img" src="../static/images/android_overscroller/4.jpg" />
        <caption>正弦</caption>
</li>
<li style="
    list-style: decimal;
">在边缘拖拽后松手 -&gt; 只执行 CUBIC 回弹函数。
  <snippet-component v-if="$route.meta.keepAlive" lan='java'>//NOTICE:可以在自定义 View 中调用这个函数，以实现过边缘后的回弹回复效果
  boolean springback(int start, int min, int max) {
            mFinished = true;
            mCurrentPosition = mStart = mFinal = start;
            mVelocity = 0;
            mStartTime = AnimationUtils.currentAnimationTimeMillis();
            mDuration = 0;
            if (start < min) {
                startSpringback(start, min, 0);
            } else if (start > max) {
                startSpringback(start, max, 0);
            }
            return !mFinished;
        }</snippet-component> 
</li>
<li style="
    list-style: decimal;
">
        <b>整体动画过程图表分析：</b>
        <img class ="small_img" src="../static/images/android_overscroller/5.jpg" />
        <caption>安卓原生的 BALLISTIC（上升过程） CUBIC（下降过程） 效果接近一个 sin 曲线</caption></li>
        </ul>


        <h3 id="t-23">优化思路</h3>


        <p>BALLSTIC-CUBIC 运动分析完毕，我们再来看看 startSpringback 中，谷歌的一些问题</p>
        <img  src="../static/images/android_overscroller/2.png" />
        <caption>GOOGLE 的 TODO</caption>

        <p>这个函数公式比较复杂，且比较难以修改，并且 Google 自己也想在回弹中增强速度变量对于动画的影响，因此计划将 BALLISTIC 与 CUBIC 废除，统一在抵达边缘后进行一个牛顿力学函数。也即是 DyanmicAnimation 的 SpringAnimation。</p>

        <p>这里给出优化思路：</p>

        <li>直接去掉了 BALLISTIC 跟 CUBIC，在抵达边缘后，获取 SPLINE 最后的<b>速度</b>，传递到力学公式中，做一个 带有速度趋势开始值为 0 结束值为 0 的动画。</li>
        <li>拖拽松手情况下，<b>开始位置为当前位置，结束位置为边缘，速度为 0</b></li>
        <li>根据过量的远近，速度的不同，动画曲线也呈现不同的结果。同时也不用在自定义 View 中设置过量范围了，过量范围根据速度动态改变。</li>
        </ul>

        <p>这里将 Java 的代码抽取到设计软件 AE 中进行快速模拟，左面为 Android 原生的 SPLINE-BALLISTIC-CUBIC 模拟，右面为 SPLINE-SPRING 模拟</p>
         <video class="small_img" src="../static/video/spring_scroll.mp4" autoplay="autoplay" loop="loop"></video>

        <h3 id="t-24">隐患</h3>

        <p>某些情景下 Spring 运动时间大于肉眼观测时间，导致用户以为可以操作界面，然而第一次点击是停止滚动，第二次点击才生效。</p>

        <p>解决方案：</p>

        <ul>
        <li>通过速度设置停止阈值</li>
        <li>动画前计算时间，如果动画时间过长，则在动画后半程增加 Stiffness 或者 DampingRatio 来更快停止</li>
        </ul>

        <h2 id="t-3">Rubberband -阻尼拖拽优化</h2>
        <h3 id="t-31">逻辑分析</h3>
        <p>自定义 View 中，将手势变化量传入阻尼函数，更新 View 的移动即可，自己写个幂函数或者指数函数或者log函数都可以实现。</p>
        可以参考下 —— <a href="https://github.com/JunreyCen/blog/issues/8" target="_blank">数学的 H5 应用：拖动阻尼</a> 
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
