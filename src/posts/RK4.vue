<template>
  <div class="transition-container">
    <img class="hero-image" src='../static/images/rk4/rk4_cover.jpg' alt='hero image'/>
    <!-- <main>
        <div class="content">
            <canvas class="scene scene--full" id="scene"></canvas>
            <div class="content__inner">
                <p class="content__title">Vulkan Tutorial</p>
            </div>
        </div>
    </main> -->
    <div id="center-container" class="center-container">

      <toc :tocData='contentData'></toc>

      <div id="article-view" class="article-view">
            <h1 id="toc_0">{{articleTitle}}</h1>
            <strong><p>原文来自 <a href="https://www.haroldserrano.com/blog/visualizing-the-runge-kutta-method" target="_blank">haroldserrano.com</a>。</p></strong>

<p>游戏引擎研发的复杂之处在于算法。例如积分技术、凸面碰撞检测、多面碰撞检测。还有些算法，易于理解，却难以实践。</p>
<p>四阶龙格库塔法，在很多游戏引擎研发书籍中，通常是用数学的角度来阐述，却鲜有可视化阐述。然而算法如果有了可视化的阐述，将会提高读者对算法的理解，了解其中原理。</p>
<h2 id="page_4order_rk4">四阶龙格库塔法</h2>
<p>物理引擎的设计目标之一就是根据驱动力计算加速度、速度、位移。需要根据运动学公式来完成积分计算。而运动学公式最简单的计算方法就是欧拉函数法。</p>
<img src='../static/images/rk4/euler.jpeg' height="500" width="500"alt="euler"/>
<p><caption>Time step —— 时间步长，Slope approx —— 大约斜率</caption></p>
<p>欧拉函数根据时间间隔计算速度，并且根据 t+∆t 计算下一步速度。这个方法非常容易实现，然而并不精确。下面的图片展示了欧拉函数的缺点。虽然可以通过把 ∆t 设小，而获取更为精确的结果。然而实践中，要如何设置时间步长却需要仔细考虑。</p>
<img src='../static/images/rk4/euler2.png' alt="euler"/>
<p><caption>Slope —— 斜率，Estimate —— 预期</caption></p>
<p>龙格库塔方法采用了积分计算，能为运动学公式提供更好的精确度。跟欧拉函数不同，它在一次时间间隔内获取一次斜率，通过计算四种不同的斜率，今儿求取加权平均值。</p>
<p>这四个斜率通常被 称之为<strong>k1,k2,k3,k4</strong>，然而你的物理引擎需要在每个时间步长计算一次他们。</p>
<p>龙哥库塔的斜率计算，下面用视觉化来体现</p>

<ol>
<li>在时间间隔 t0,计算斜率 k1</li>
<li>创建一个三角形，延展 k1 到 t+∆t。</li>
<img src='../static/images/rk4/rk4_1.jpeg' alt="rk4"/>
<li>计算三角形的高度，在中点处绘制一条水平线 —— (∆t/2) k1, </li>
<li>在时间间隔 t+(1/2)∆t 处绘制垂直线。</li>
<li>在交叉点出，计算斜率 k2</li>
<img src='../static/images/rk4/rk4_2.jpeg' alt="rk4"/>
<li>从 k2 开始，创建三角形延展 k2 到 t+(3/2)∆t（距离还是∆t）</li>
<li>计算新三角形高度的一半 —— (∆t/2)k2</li>
<img src='../static/images/rk4/rk4_3.jpeg' alt="rk4"/>
<li>以原三角形的中心点为 x，新三角形高度一半 为 y。将新三角形高度一半的点移动到原三角形里。</li>
<img src='../static/images/rk4/rk4_4.jpeg' alt="rk4"/>
<li>根据此点，计算斜率 k3。</li>
<img src='../static/images/rk4/rk4_5.jpeg' alt="rk4"/>
<li>从 k3 开始，创建三角形延展 k3 到 t+(3/2)∆t（距离还是∆t）</li>
<li>寻找 k3 三角形高度的一半 —— (∆t/2)k3</li>
<img src='../static/images/rk4/rk4_6.jpeg' alt="rk4"/>
<li>以原三角形的 t+∆t 为 x，新三角形高度一半 为 y。将新三角形高度一半的点移动到原三角形里。</li>
<img src='../static/images/rk4/rk4_7.jpeg' alt="rk4"/>
<li>根据此点，计算斜率 k4。</li>
<img src='../static/images/rk4/rk4_8.jpeg' alt="rk4"/>
</ol>

<p>龙格库塔法使用这些斜率作加权平均数来获取对象更精确的斜率、速度。然后对象的位置便可基于斜率计算</p>

<img src='../static/images/rk4/rk4_9.png' alt="rk4"/>
<p>希望视觉描述 RK4 有所帮助。</p>


      </div>
    </div>
  </div>
</template>

<script>
  import ToolTip from '@/components/ToolTip'
  import Toc from '@/components/Toc'

  export default {
    name: 'Visualizing_RK4',
    data: function () {return {
      articleTitle:'8.可视化阐述龙格库塔',
      contentData:{
          title:'RK4 可视化讲解',
          list:{
            四阶龙格库塔: '#page_4order_rk4'
          }
      }

    }},
    components: {ToolTip,Toc},
    methods: {
    },
    computed: {},
    created: function () {},
    mounted:function(){
    },
    destroyed:function(){}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .float-toc{
    box-shadow: 0 4px 16px 0 rgba(0,0,0,0.08), 0 1px 4px 0 rgba(0,0,0,0.12);
    border-radius: 6px;
    display: inline-block;
    padding-left: 20px;
    padding-right: 20px;
    min-width: 140px;
    position: fixed;
    left: 40px;
    bottom: 40px;
    background: white;
    overflow: hidden;
}


.toc-left-bg {
    width: 100%;
    background: #f1f1f1;
    height: 1px;
    top: 50px;
    position: relative;
}

.toc-title{
    text-align: left;
    margin-left: 1px;
    font-weight: 500;
    font-family: "Avenir", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Helvetica, Arial, sans-serif;
}


.float-toc ul{
    padding-left: 24px;
}

.float-toc li {
    counter-increment: li;
    list-style-type:none;
}

.float-toc li p {
    margin: 0px;
    margin-top: 8px;
}

.float-toc li a {
    font-size: 12px;
    color:#333;
}


.float-toc li::before {
  content: counter(li, decimal-leading-zero);
  color:#333;
  display: inline-block; 
  width: 1em;
  margin-left: -1.3rem;
  position: absolute;
  text-align: right; 
  direction: rtl;
  font-size: 10px;
  margin-top: 3px;
  font-family: "Avenir", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Helvetica, Arial, sans-serif;
} */

.article-view img {
    width: auto;
    height: auto;
    max-width: 300px;
    display: block;
    margin: 0 auto;
}

</style>
