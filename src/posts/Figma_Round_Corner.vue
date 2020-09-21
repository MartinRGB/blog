<template>
  <div class="transition-container">
    <div id="center-container" class="center-container">
      <toc tocTitle="Figma 平滑圆角绘制">
        <ul class="TableOfContents">
          <li>
            <p>
              <a href="javascript:void(0)" @click="goAnchor('#source-article')">原文</a>
            </p>
            <ul class="TableOfContents">
              <li>
                <p>
                  <a
                    href="javascript:void(0)"
                    @click="goAnchor('#the-squircle-smooth-operator')"
                  >平滑的 Squircle 圆角</a>
                </p>
              </li>
              <li>
                <p>
                  <a href="javascript:void(0)" @click="goAnchor('#from-form-to-formula')">从形式到公式</a>
                </p>
              </li>
              <li>
                <p>
                  <a href="javascript:void(0)" @click="goAnchor('#a-spanner-in-the-works')">一些问题</a>
                </p>
              </li>
              <li>
                <p>
                  <a
                    href="javascript:void(0)"
                    @click="goAnchor('#power-tools-differential-geometry-of-plane-curves')"
                  >强力工具：平面曲线的微分几何</a>
                </p>
              </li>
              <li>
                <p>
                  <a
                    href="javascript:void(0)"
                    @click="goAnchor('#geometry-is-king-arc-length-parametrization')"
                  >弧长的参数化</a>
                </p>
              </li>
              <li>
                <p>
                  <a
                    href="javascript:void(0)"
                    @click="goAnchor('#design-the-curvature-compute-the-curve')"
                  >设计曲率，进而计算曲线</a>
                </p>
              </li>
              <li>
                <p>
                  <a
                    href="javascript:void(0)"
                    @click="goAnchor('#squircles-under-the-scalpel')"
                  >用数学方法观察 Squircle 圆角</a>
                </p>
              </li>

              <li>
                <p>
                  <a
                    href="javascript:void(0)"
                    @click="goAnchor('#breakthrough-smoothing-parameterized')"
                  >平滑度的参数化</a>
                </p>
              </li>

              <li>
                <p>
                  <a
                    href="javascript:void(0)"
                    @click="goAnchor('#apotheosis-clothoid')">
                    欧拉螺线
                  </a>
                </p>
              </li>

              <li>
                <p>
                  <a
                    href="javascript:void(0)"
                    @click="goAnchor('#nothing-gold-can-stay')">
                    限制重重
                  </a>
                </p>
              </li>

              <li>
                <p>
                  <a
                    href="javascript:void(0)"
                    @click="goAnchor('#keep-it-simple-squircle')">
                    简约实现
                  </a>
                </p>
              </li>


              <li>
                <p>
                  <a
                    href="javascript:void(0)"
                    @click="goAnchor('#small-strokes-of-sqluck')">
                    微小调整
                  </a>
                </p>
              </li>
              

                            <li>
                <p>
                  <a
                    href="javascript:void(0)"
                    @click="goAnchor('#watching-the-ship-sail')">
                    总结
                  </a>
                </p>
              </li>

              <li>
                <p>
                  <a
                    href="javascript:void(0)"
                    @click="goAnchor('#conclusion')">
                    译者的数学推论
                  </a>
                </p>
              </li>

 
            </ul>
          </li>
          <li>
            <p>
              <a href="javascript:void(0)" @click="goAnchor('#reference')">资料参考</a>
            </p>
          </li>
        </ul>
      </toc>
      <div id="article-view" class="article-view">
        <h1 id="toc_0">{{articleTitle}}</h1>
        <strong>
          <p>
            原文来自
            <a
              href="https://www.figma.com/blog/desperately-seeking-squircles/"
              target="_blank"
            >Figma Blog</a>。同时也加入了本人对 Figma 平滑圆角的实时实现的探索

            <p>字数：9764</p>
            <p>阅读时长：30min</p>

            <p>涉及数学知识点：</p>
            <ul>
              <li>
                <p>贝塞尔函数</p>
              </li>
              <li>
                <p>三角函数</p>
              </li>
              <li>
                <p>反函数</p>
              </li>
              <li>
                <p>微积分基本概念</p>
              </li>
              <li>
                <p>曲率</p>
              </li>
              <li>
                <p>弧长和弧长参数化</p>
              </li>
              <li>
                <p>Taylor 级数展开</p>
              </li>
              <li>
                <p>欧拉螺线</p>
              </li>
            </ul>
          </p>
        </strong>
        <img
          class="hero-image"
          src="../static/images/figma_corners/background.jpg"
          alt="hero image"
        />
        <div class="css-1aecauc">
          <div id="source-article"></div>
          <strong><p>
            <em>本文明晰的展示了 Figma 工程师是如何通过程序挑战，寻找最完美的问题解法。</em>
          </p></strong>

          <p>
            在 1972 年，Charles Eames （查理伊姆斯）在一次著名的访谈中，探讨了
            <a
              href="https://www.hermanmiller.com/stories/why-magazine/design-q-and-a-charles-and-ray-eames/"
            >「关于设计本质的一些基础问题」</a>(译者注：Figma 链接挂了，这里换了一个)。 这些问题中的第一个问题就是：「你如何定义设计」？他的回答是「一种将元素排列组合，以达到特殊目的的规划手段」。
          </p>
          <img src="../static/images/figma_corners/Eames01.jpg" />
          <caption>伊姆斯夫妇</caption>
          <p>在后续的问题中，他的回答都非常简短俏皮。但当谈论到设计的限制时,他开始深思熟虑，严肃起来：「设计的关键点之一便是：设计师对于设计的边缘和设计的限制的了解、经验和认知；以及有了对设计限制的认知之后，他有多少意愿和热情去在限制内进行设计。」</p>
          <p>尽管我不是一个设计师 —— 我是 Figma 的工程师。然而 Eames 的评论对我的工作也非常有价值。我不是排列 UI 元素，设计产品，我是排列数学概念，形成代码表达式来实现工具功能。我实现的代码同样也要考虑到 时效、简化成本、维护、美学 等方面的限制。</p>
          <p>最近的一个项目验证了上面的这些理论。我的任务是给 Figma 添加一个类似 Apple 'squircle' 平滑圆角的功能支持。然而对此我的了解不多，我得做点调研。</p>
          <p>
            <strong>现在回顾起来，这个项目简直就是数学奥德赛，开始的失败令人焦虑，过程中出现了很多隐藏的问题和新的限制，在各种压力下探索出最终的解决方案。</strong>简而言之，每个设计师出方案的时候都有过这种体验，某种意义来说，很多设计师每天都这样。
          </p>
          <p>为了让跟我一样的数学极客能从过程中获得乐趣，也为了展示数学是如何成为解决问题的利刃，我将整个过程从零开始在下面展示。</p>
          <p>译者注：个人认为了解设计限制包括承载设计的媒介是设计师的道德，能否客观评估自己之前的设计经验在限制下是否有效 或 怎样将之前的经验转换为限制下的成果是设计师的重要能力</p>
          <h2 id="the-squircle-smooth-operator" class="css-18dxkbz">平滑的 Squircle 圆角</h2>
          <p>
            在我还没加入 Figma 之前，2013 年 6 月 10 日 Apple 发布了 iOS 7 。 其中有一些改动非常的精巧：主屏的图标看起来更圆润、有机。他们移除了直角圆角，加入了平滑圆角
            <em>squircles</em> (‘square’ 和 ‘circle’的混成词)。
          </p>
          <p>差异在哪儿？老实说，差异非常微小 —— 平滑圆角从原来直角圆角开始的地方开始弯曲，但是整个曲面上去掉了一些部分，相比直角圆角来说，从直角到弯曲的部分更加柔顺。</p>
          <p>使用数学语言来描述便是：squircle 圆角的边缘曲率是连续的，而直角圆角不是。这看似微不足道，但这种设计小细节却有很大的体验影响：squircle 圆角没有直角圆角那种人工雕琢痕迹，它的感觉就像河床上捡到的因冲刷而成形的鹅卵石，看起来统一且自然。</p>
          <figure class="css-1fy50x0">
            <img class="small_img" src="../static/images/figma_corners/01.png" />
            <caption>1.1&#8202;—&#8202;直角圆角 vs squircles 圆角: 看上去差距不大！</caption>
          </figure>
          <p>工业设计师很了解曲率对于物体感受的影响。仔细看看你手头的 Macbook,或者看看老版的 Apple 有线耳机。 你可以看到它们表面的高光是非常顺滑的。</p>
          <p>这是设计中不显山漏水的曲率连续导致的。对于苹果来说，软硬结合，从硬件到软件界面，将设计风格一统，不是什么难事。</p>

          <p>译者注：见微知著，我们的 UI 设计 正在从粗放型设计到精细型设计转变，Apple 往往在小处涵盖 自然的、逻辑通顺 的设计细节，其中包含了很多数学理论，值得我们学习。</p>
          <h2 id="from-form-to-formula" class="css-18dxkbz">从形式到公式</h2>
          <p>我们 Figma 的人当然喜欢 iOS 的设计师的这些设计。我们还觉得我们 Figma 的用户也需要这样的圆角功能。为了让用户在设计的时候能够使用平滑圆角，我们需要寻找一个精确的数学描述以便实现功能。</p>
          <p>
            幸运的是，人们从 iOS 7 发布后就开始在网络上探讨、咨询这个问题，我们肯定不是第一个吃螃蟹的人。 Marc Edwards 的
            <a
              href="https://www.cocoanetics.com/2013/06/ios-7-icon-squircle/"
            >Fundamental initial work</a> 文章中包含了一张截图，指出这个形状是从椭圆公式推导出来的，因此叫「超椭圆」。下面这个公式可以描述 圆、椭圆和超椭圆，形状取决于 变量 a, b 和 n:
          </p>
          <figure class="css-1fy50x0">
            <img class="formula_img" src="../static/images/figma_corners/02.png" />
            <caption>2.1&#8202;—&#8202;超椭圆公式</caption>
          </figure>
          <img class="small_img" src="../static/images/figma_corners/grapher_01.png" />
          <img class="small_img" src="../static/images/figma_corners/grapher_02.png" />
          <img class="small_img" src="../static/images/figma_corners/grapher_03.png" />
          <p>
            n = 2, a = 5 ,b = 3 的时候，你会在标准坐标系上获得一个 半径 x 轴 5 格，y 轴 3 格 的椭圆。n = 2 ， a = b = 1 则描绘了一个标准的单位圆。然而，如果 n > 2 的时候，结果就是超椭圆 —— 椭圆形状与图形本身的方格边框进行混合， n 越大，圆角就越来越「锐利」，在之前的网上讨论中，一般认为 Apple 的圆角形状是 n = 5 时候的形状。 如果你
            <a
              href="https://www.wolframalpha.com/input/?i=ParametricPlot%5B%7BSign%5BCos%5Bt%5D%5D+*+Abs%5BCos%5Bt%5D%5D+%5E+%282/5%29%2C+Sign%5BSin%5Bt%5D%5D+*+Abs%5BSin%5Bt%5D%5D+%5E+%282/5%29%7D%2C+%7Bt%2C+0%2C+2+*+Pi%7D%5D"
            >动手试一试</a>, 你会发现圆角形状跟 iOS 7 确实很像。
          </p>
          <p>
            如果这是真的数学描述，那我们只需要想办法用几段 Bezier 跟圆角契合上，然后做点工程上的事儿，把功能整合进 Figma 就行了。尽管如此，不幸的是有些人认真的跟进了之后，发现 超椭圆 公式实际上不完全对 ——
            <a
              href="https://applypixels.com/the-hunt-for-the-squircle/"
            >The hunt for the squircle</a> (然而，在发现之前，
            <em>已经</em>有很多人使用那个「不完全对的公式」
            到界面跟图标上了)。实际上，上边的公式不管怎么调节 n，都跟实际的 iOS 图标形状有微小的差异。
          </p>
          <p>我的探索第一次进到了死路：我们有优雅简单的公式，看起来跟 iOS 圆角也很像，但其实公式并不一样，我们想要给用户提供最正确的功能，因此还要继续探索。</p>
          <p>
            既然研究走到了死路，项目想要继续进展便需要加倍的努力，但很荣幸地、我再一次站在了别人的肩膀上得以继续探索。 Juicy Bits 的 Mike Swanson ，做了一个假想：那就是 squircle 平滑圆角是使用几段贝塞尔曲线拟合的。
            <a
              href="https://web.archive.org/web/20180707042555/http://blog.mikeswanson.com/post/62341902567/unleashing-genetic-algorithms-on-the-ios-7-icon"
            >遗传算法提炼 iOS 圆角公式</a> （译者注：网站又挂了，web archive 将就下吧），他使用遗传算法提炼了 484 次，将形状优化的跟 Apple 官方圆角形状差不多了。他得出的这个观点非常的新潮，后续跟进的 Manfred Schwind 更是直接贴出了
            <a
              href="https://www.mani.de/backstage/?p=483"
            >实现</a>。效果看上去跟 iOS 图标没差，所以现在我们已经有了两种不同的实现平滑圆角的贝塞尔方法：别人已经搞出来了,我们啥也不用干了！
          </p>
          <p>
            译者注：平方公式方法跟三角函数 360 度推点法有性能问题，这个可以参考我上一篇文章，贝塞尔方法是一个比较不错的动态绘制方案，这里补充一个关于 iOS UIKit 的平滑圆角快速实现 ——
            <a
              href="https://medium.com/fueled-engineering/continuous-rounded-corners-with-uikit-b575d50ab232"
            >Continuous Rounded Corners with UIKit</a>
            <tool-tip tips="其实就是使用 UIBezierPath 做 mask path"></tool-tip>
          </p>
          <h2 id="a-spanner-in-the-works" class="css-18dxkbz">一些问题</h2>
          <p>在我动手搬运代码到 Figma 之前，还有两个细节，需要考虑：</p>
          <p>首先，上面提到的 iOS 版本的公式在我调研的时候发现了个瑕疵 —— 圆角不是完全对称的。其中一边有一小段是直线。这个效果不是特别优雅，而且对代码实现和测试来说会导致一些复杂问题。所以只能删掉有瑕疵的这段曲线，然后把没有瑕疵的那一半曲线镜像过来。</p>
          <p>
            其次，当
            <a href="https://en.wikipedia.org/wiki/Flattening">flatten</a> 增加真实的 iOS 圆角形状的圆角值时，圆角会突然的产生变化。对于设计师来说这并不友好 —— 因为从设计师的角度来说，形状应该是具有规则的。
          </p>
          <img class="small_img" src="../static/images/figma_corners/figma_01.jpg" />
          <p>
            当增加圆角形状的圆角幅度时，最自然的变化预期应该是 从圆到直平滑的渐变，直到完全没有直线。圆角幅度越大则内切形状的圆的半径越小 —— 现在的 Figma 就是这样的。Apple 的 squircle 公式目前来说没啥帮助，因为它的平滑效果是固定某个圆度的：没办法提炼出圆度更大或者更小时的结果。我们需要的是一套可以
            <b>动态调参</b>
的平滑方案，然后让其中的某个参数跟苹果的圆角方案一致。
          </p>
          <p>这样做的附加好处是，如果我们能动态调节形状从 矩形 到 圆角矩形的过程。那么 Figma 中其他形状的角也可以用同样的方案来增加圆度：星性、多边形，甚至是随机的钢笔工具形状。因此相比于简单复刻 iOS 的圆角，制作一个动态可调参的圆角方案更有价值，功能上也更完整。我们的工具要能够给予设计师不同形状绘制能力的支持，其中也包括平滑圆角的支持。</p>
          <p>如果是要按可调参的方案来做，让参数范围中的某个参数值所呈现的圆角刚好跟 iOS 7 的形状契合，这个方案的限制点来了 —— 调参范围是什么？这个范围非常难去定义。看来需要一些数学计算了。</p>
          <h2 id="power-tools-differential-geometry-of-plane-curves" class="css-18dxkbz">强力工具：平面曲线的微分几何
          </h2>

            <figure class="css-1fy50x0">
            <img class="small_img" src="../static/images/figma_corners/functions.jpg" />
            <caption>&#8202;—&#8202; Thomas Calculus</caption>
          </figure>

          <p>
            在参数化 squircle 圆角之前，让我们先介绍一些可以帮助我们分析问题的数学工具。首先我们需要解决的是，应该
            <em>怎样</em> 描述一个 squircle 圆角。我们之前讨论超椭圆问题时，我们使用了 x y 为变量的公式 —— 也即是说平面上的点(x,y)满足超椭圆的公式，就能绘制出超椭圆。当公式很简单的时候，这样做很优雅，然而真实的 squircle 圆角是由多段 贝塞尔曲线 拼接而成。如果按这个原理去实现，写出来的公式是混乱的隐函数公式。隐函数是由隐式方程所隐含定义的函数。设F（x,y）是某个定义域上的函数。如果存在定义域上的子集D，使得对每个x属于D，存在相应的y满足F(x,y)=0，则称方程确定了一个隐函数。记为y=y(x)。 (显函数是用y=f(x)来表示的函数，显函数是相对于隐函数来说的。）
          </p>
          <p>我们可以通过显函数方法来处理这一复杂问题:只取一个变量 t,将其步进间隔限制为有限，然后将步进中的t获取的函数值映射到 squircle 图形上不同的点(贝塞尔曲线也是这个原理，实际上). 如果我们只关注一个圆角，将我们的分析出来的函数用一个有清晰起点终点的曲线来表示
            t = 0 时代表线段的起点， t = 1 代表线段的终点，t 从 0 到 1 的过程平滑的进行绘制。在数学语言里，我们可以将这个圆角路径函数表述为 r(t)</p>
          <figure class="css-1fy50x0">
            <img class="small_img" src="../static/images/figma_corners/03.png" />
            <caption>4.1&#8202;—&#8202;平面曲线对射到 [0,1]</caption>
          </figure>
          <p>x(t) 与 y(t) 是不同的函数，同时构成了 r 关于 他们的函数。我们将 r(t) 当成路径。当成你开车过程中经过的路线，当你从起点到终点后，r(t)可以估算出你整个旅程的路线。我们也可以通过微分获取 速度v(t) 加速度 a(t)。</p>
          <figure class="css-1fy50x0">
           <img class="small_img" src="../static/images/figma_corners/04.png" />
            <caption>4.2&#8202;—&#8202;平面曲线的速度与加速度</caption>
          </figure>
          <p>数学中的曲率，在本文起到了直观重要的作用，曲率方程可以通过速度加速度，简化表达为:</p>
          <figure class="css-1fy50x0">
           <img  src="../static/images/figma_corners/calculus_1.jpg" />
            <caption>4.3&#8202;—&#8202;译者注：图像来源托马斯微积分第十一章</caption>
          </figure>
                    <figure class="css-1fy50x0">
           <img  src="../static/images/figma_corners/calculus_2.jpg" />
            <caption>4.4&#8202;—&#8202;译者注：图像来源托马斯微积分第十一章</caption>
          </figure>

          <figure class="css-1fy50x0">
          <img class="small_img" src="../static/images/figma_corners/05.png" />
            <caption>4.5&#8202;—&#8202;平面曲线的无符号曲率</caption>
          </figure>
          <p>但是这个公式表达了什么呢？尽管它看起来很复杂，然而曲率可以用几何构造很清晰的解释，这里引用一下柯西 Cauchy 的话:</p>
          <img class="small_img" src="../static/images/figma_corners/osculating_circle.png" />
         <caption>4.6&#8202;—&#8202;图片来自 Wiki</caption>
          
          <ol start="1" class="css-oqx1ti">
            <li>
              对曲线 C 上任一点 P，在其附近再 C 上的两个点 P1 P2 ，分别过 P1 P2 作出曲线 C 的法线，两条法线会有一个交点。当 P1 P2 无限接近于点 P 时，相应的交点有一个极限，以这个极限点为圆心，过点 P 作圆，就是曲线 C 在点 P 处的密切圆
            </li>
            <li>密切圆的半径 R 的倒数就是曲率 κ</li>
          </ol>
          <p>曲率 κ 是非负的，并且不区分方向。因此，我们需要将曲率 κ 设置为当路径向右的为正符号,向左反之。我们还是用汽车的案例来举例，对于任意点 t ，符号曲率 k(t) 表述了在任意时间里，汽车的转动率，正符号表示向右，负符号表示向左。</p>
          <h2 id="geometry-is-king-arc-length-parametrization" class="css-18dxkbz">弧长的参数化
          </h2>
          <blockquote>计算平面上一段曲线的弧长，最早也是最直接的方法是用一些直线段来作出和曲线相似的形状，以直线段的长度代替曲线的弧长。具体的方法是在曲线上选一些点，然后将这些点用线段连起来，得到一条折线。这些线段长度的和，也就是折线的长度，便近似于曲线的弧长。选取的点越密集越均匀，折线的长度就越接近曲线的弧长。但有时候折线的长度可能可以任意大，甚至趋向无限大。这样的曲线无法定义长度。但对一般的光滑曲线来说，当相邻的点之间的距离都趋于0的时候，折线的长度会趋于一个极限，也就是曲线的弧长。 —— Wiki - 弧长</blockquote>
          <br>
          <blockquote><b>Curvature</b>:the derivative of the unit tangent vector with respect to the arc-length parameter</blockquote><br>
          <blockquote><b>Arc Length Function</b>:a function  s(t)  that describes the arc length of curve  C  as a function of t </blockquote><br>
          <blockquote><b>Arc Length Parameterization</b>:a reparameterization of a vector-valued function in which the parameter is equal to the arc length </blockquote>
          <figure>
          <img class="small_img" src="../static/images/figma_corners/arc_length_calculus.png" />
            <caption>5.1&#8202;—&#8202;选取曲线上的点，连成折线，折线的长度近似于曲线的弧长。译者注：图片来自 Wiki - 弧长</caption>
          </figure>
          <p>
            我们引入了曲率的概念之后，那么还有几个问题休要考虑。首先，我们还是回到汽车的那个例子：让两辆车沿着平滑圆角的路径行驶。一辆车猛踩油门加速，然后刹车走完全程 (🤢)；另一辆车平稳加速减速走完全程。
            尽管这两辆车行驶的路径相同，然而体验完全不一样，路径中包含的信息特征也不同。回到我们的圆角研究，问题的关键在于 不要使用时间来描述 路径特征，而是使用距离的累积量或者弧长。我们通过弧长参数化来描述路径，进而获取几何信息。
          </p>
          <p>如果我们又路径信息 r(t) ,那么就可以通过 随着参数值 t 在路径上的速度积分，来获取弧长参数 s:</p>
          <figure>
          <img class="small_img" src="../static/images/figma_corners/calculus_3.jpg" />
            <caption>5.2&#8202;—&#8202;译者注：托马斯微积分第十章</caption>
          </figure>
          <figure>
          <img class="small_img" src="../static/images/figma_corners/06.png" />
            <caption>5.3&#8202;—&#8202;弧长积分</caption>
          </figure>
          <blockquote>曲线的参数都可以解释为时间，当我们把曲线上的质点运动速度（即关于时间这个参数的变化率）单位化以后，那么，由于速度变为 1，路程就与时间相当了，以时间为参数相当于以路程为参数了，最后，这个路程就被称为弧长参数。 —— 知乎《如何理解曲线的弧长参数和一般参数？》</blockquote>
          <p>如果我们通过反函数方法获取 t(s)，然后我们用来替代 r(t) 中的 t，这样就能获取到弧长参数化 r(s)。
            然后弧长参数化就等于单位为1的速度乘以时间t，<b>因为速度一直是单位时间1</b>(译者注：划重点！），因此加速度 a(s) 一直垂直于速度。因此弧长参数化中加速度与曲率的关系可以简化为：</p>
          <figure>
          <img class="small_img" src="../static/images/figma_corners/07.png" />
            <caption>5.4&#8202;—&#8202;弧长参数化中的曲率（译者注：妙啊！）</caption>
          </figure>
          <p>然后我们可以通过右和左来确定曲率 k(s) 的正负符号。显然，一般的曲率定义中的 复杂点在于 消除路径信息中的非几何内容。毕竟，曲率是纯粹的几何量，因此在几何参数化中简化的公式看起来很舒服。</p>
          <h2 id="design-the-curvature-compute-the-curve" class="css-18dxkbz">
            设计曲率，进而计算曲线
          </h2>
          <blockquote>
            欧拉螺线：
            一种曲率随着长度增长线性变化的曲线。曲率连续曲线的一种。<br>
            An Euler spiral is a curve whose curvature changes linearly with its curve length (the curvature of a circular curve is equal to the reciprocal of the radius). Euler spirals are also commonly referred to as spiros, clothoids or Cornu spirals.
          </blockquote>
          <p>那么现在我们面临另外一个问题：我们知道了如果从曲线r(t)的路径信息变为弧长参数化的r(s)，也知道了如何从其中获取符号化曲率k(s)。
            <b>那么我们能逆过来计算吗？</b> 我们可以设计一套配置好的曲率，然后通过其对父曲线进行求导？?我们再来回到汽车的场景&#8202;—&#8202;假设我们以恒定的单位速度1沿着路线行驶，
             我们记录下过程中方向盘的转动量变化。我们将这些转动信息给下一位司机，只要这位司机按照转动量以同样的速度开车，那么也能开出同样的路线。
             因此我们认为我们拿到曲率，就有足够的信息重构父曲线，那么如何用数学公式来表示呢？
             虽然有点难度，但是是可行的。感谢<b>欧拉螺线</b>&#8202;—&#8202; —— 如果我们选定一个坐标系，曲线从原点开始并有 沿 x 的初始朝向
             那么 x(s) 和 y(s) 可以用 k(s)这样表示:</p>
          <figure>
          <img class="small_img" src="../static/images/figma_corners/08.png" />
            <caption>6.1&#8202;—&#8202;从曲率逆推曲线（译者注：这个算法一看性能就不好）</caption>
          </figure>
          <p>最后，注意上面正余弦函数中的参数：参数为有正负值的曲率的积分。我们之前接触的三角函数的参数一般为角度转化的弧度，这个数学公式中的参数也是一样。
           从 a 到 b 的积分等于 b 的指向 减去 a 的指向。因此我们不管 从 a 到 b 如何变化，我们只需要对其进行积分计算，结果最后都是 π/2。（译者注：妙啊！）</p>
          <h2 id="squircles-under-the-scalpel" class="css-18dxkbz">
              用数学方法观察 Squircles 圆角 
          </h2>
          <p>现在没问题了，我们用前面的数学分析工具来观察一下 UI 中的真实形状。
            我们首先来看看直角圆角的一角，将它的圆角图形和用弧长表示的曲率绘出图表。
          <figure>
          <img class="small_img" src="../static/images/figma_corners/09.png" />
            <caption>7.2&#8202;—&#8202;直角圆角曲率分析</caption>
          </figure>
          <p>我们再来看看苹果的圆角和曲率</p>
          <figure>
          <img class="small_img" src="../static/images/figma_corners/10.png" />
            <caption>7.1&#8202;—&#8202;苹果 Squircle 圆角曲率分析</caption>
          </figure>
          <p>曲率看起来有点残次不起，但实际上的效果还不错。稍后我们就知道，我们在实际过程中要权衡选择，是要更平滑的曲率点，还是要更少的贝塞尔曲线数量。
            iOS 的圆角只用了三段。一般来说，设计师宁愿使用数量更少的贝塞尔曲线来减少开销。我们还观测到的细节是：一开始曲率上升，然后曲率保持恒定，最后曲率下降。</p>
          <h2 id="breakthrough-smoothing-parameterized" class="css-18dxkbz">
            平滑度的参数化
          </h2>
          <p>前面的图表中暗含着圆角平滑度参数化的方法。当平滑度为 0 时候，我们希望曲率图表的形状跟直角圆角的曲率一样。当平滑度缓缓增加时，我们希望线条上升抵达最高点时保持高度，直到下降 —— 这就产生了
            等腰梯形的曲率形状（当然线条围成的面积保持为 π/2）。 当平滑度达到最大值时，跟 iOS 的形状相比，要去掉不规则的形状部分。</p>
          <figure>
          <img class="small_img" src="../static/images/figma_corners/11.png" />
            <caption>8.1&#8202;—&#8202;当平滑参数值不同时，曲率图的变化</caption>
          </figure>
          <p>让我们试着把图表转化为数学公式，用 ξ 代表平滑度从 0 ～ 1 的变量。
            用 θ 表示圆角的转角&#8202;—&#8202;π/2 代表直角。
            用这些可以设计出一个分三段的分段函数，一段表示上升，一段表示扁平线，一段表示下降：</p>

          <figure>
          <img class="small_img" src="../static/images/figma_corners/12.png" />
            <caption>8.2&#8202;—&#8202;Squircle 曲率图表的参数化</caption>
          </figure>
          <p>注意第一部分和 ξ 趋于 0 的第三部分，中间部分的 ξ 趋于 1。我们前面提到过可以通过曲率逆推曲线，所以我们用第一个部分的公式来进行尝试，这段函数描述了
            一条曲线从曲率0开始，稳定增加。我们可以很容易的获取第一部分的积分：</p>
          <figure>
          <img class="small_img" src="../static/images/figma_corners/13.png" />
            <caption>8.3&#8202;—&#8202;将 6.1 的积分公式应用到 8.2</caption>
          </figure>

          <p>很好，我们可以构造下一组公式：</p>
          <figure>
          <img class="small_img" src="../static/images/figma_corners/14.png" />
            <caption>8.4&#8202;—&#8202;将 6.1 的积分公式应用到 8.2</caption>
          </figure>

          <blockquote>求和与积分可以互换条件是级数在收敛域上一致收敛且每一项连续</blockquote>
          <p>
            然而，这里数学上有点难题：如果你了解三角函数和指数函数的关系，那么你可能会觉得这段积分公式可能有误，无法
            转化为简单的公式。确实，那咋整？有兴趣的可以看一下 
            <a
              href="https://math.stackexchange.com/questions/83721/when-can-a-sum-and-integral-be-interchanged"
            >MathStackExchange</a> 的这个讨论，但是本案例中，我们使用泰勒展开式处理 sin 和 cos 然后交换 积分 和 求和:
          </p>

          <figure>
          <img class="small_img" src="../static/images/figma_corners/15.png" />
            <caption>8.5&#8202;—&#8202;Fresnel 积分级数展开</caption>
          </figure>
          <p>那我们试着将这个级数三阶展开：</p>

            <figure>
          <img class="small_img" src="../static/images/figma_corners/16.png" />
            <caption>8.6&#8202;—&#8202; 8.5 的三阶展开  </caption>
          </figure>
          <h2 id="apotheosis-clothoid" class="css-18dxkbz">
            欧拉螺线
          </h2>
          <p>得出的结果非常科学!我们可以通过给定的  ξ, θ and R，然后根据公式绘制出曲线路径。
             如果我们计算求和公式，我们会发现 s 是不断增长的，曲线的图形特征变成螺旋行驶，这一部分代表着曲率平坦上升的图表部分。</p>
          <p>这里我们再引用一下之前的引用</p>
            <blockquote>
            欧拉螺线：
            一种曲率随着长度增长线性变化的曲线。曲率连续曲线的一种。<br>
            An Euler spiral is a curve whose curvature changes linearly with its curve length (the curvature of a circular curve is equal to the reciprocal of the radius). Euler spirals are also commonly referred to as spiros, clothoids or Cornu spirals.
          </blockquote>
          <p>因为欧拉螺线的曲率线性变化，因此非常有用</p>

          <figure>
          <img class="small_img" src="../static/images/figma_corners/17.gif" />
            <caption>9.1&#8202;—&#8202; 羊角螺线到 s = 5 为止的图像  </caption>
          </figure>
          <p>我们使用 8.5 公式中 n &lt; 10 的级数展开公式，然后绘制，终于得到了我们想要的图形
            这个展开公式表示了 8.2 公式中上升（第一）部分，然后我们将其转换后变为 8。2 公式中的下降（第三）部分。
            然后我们将两个部分使用圆弧连接起来（这也就是 8.2 公式中的 第二部分）。
            这个方法在数学上构建了最完美的 squircle 圆角，弧形的绘制遵循了 8.2 公式中曲率的设计。
            这是图形和曲率分析图表，表示了 ξ = 0.4 时的欧拉螺线圆角:</p>
          <figure>
          <img class="small_img" src="../static/images/figma_corners/18.jpg" />
            <caption>9.2&#8202;—&#8202; ξ = 0.4，欧拉螺线9阶展开和圆弧构成的 Squircle 圆角 </caption>
          </figure>
          <p>尽管看上去很完美，然而我们得直到这是理想情况。
            实际应用中这个形状无法使用，首先中心圆弧部分会根据平滑度参数 ξ 变化，而我们上面这个理想状况下，是固定的。</p>
          <p>其次，弧长的阶数 s 在理想状况下我们可以搞到 9 阶，
            而 Figma中，连续的线条必须使用 三阶贝塞尔曲线(也有二阶跟直线的特例)绘制，这限制了我们的实现，必须使用小于 3 阶的方法。
            这意味着上面的公式 x(s) 和 y(s) 必须转化为单项式。
            既简化缩短公式，又保持图形特征有点难。</p>
          <p>当阶数不够，而 ξ 的值有很大的时候，效果很次。我们可以看看下面这个三阶 ξ = 0.9 时的图像:</p>


          <figure>
          <img class="small_img" src="../static/images/figma_corners/19.jpg" />
            <caption>9.3&#8202;—&#8202; ξ = 0.9，欧拉螺线3阶展开和圆弧构成的 Squircle 圆角 </caption>
          </figure>'
          '
          <p>这个怪形状很明显没法应用。看来三阶不足以保证曲率上升和下降时的线性,也就导致误差不断累积,进而导致绘制圆弧部分时的问题。看来欧拉螺线方法不可用，我们还要再看看。</p>
          <h2 id="nothing-gold-can-stay" class="css-18dxkbz">
            限制重重
          </h2>
          <p>考虑现有的限制，我们回顾一下之前的探索，看看能得到什么有意的结论，然后再开始新方向的探索。</p>
          <figure>
          <img class="small_img" src="../static/images/figma_corners/corner_drag.gif" />
            <caption>10.1&#8202;—&#8202; Figma 圆角半径的调节</caption>
          </figure>'
          <p>首先，欧拉螺线构建的圆角形状，以及其分析出的曲率图表是我们想要的结果, 
            但是曲率图表中中间部分（也即是图形中圆弧部分）会根据平滑参数 ξ 的变化而移动。
            这就有点不妙了，因为我们现有的画布上的圆角形状，选中后会在曲率中心又一个圆点操控点，用户可以通过拖拽来调节圆角半径。
            当圆角平滑度改变的时候，这个点跟着动就有点奇怪了。
            因此我们需要把 ξ 跟圆角半径调节独立开来，在调整圆角平滑度时，让调整圆角半径的结点固定。</p>
          <p>其次，设计师们也不想 squircle 圆角太过复杂。
             苹果的 squircle 圆角也是通过贝塞尔曲线将弧形部分连接起来，或许我们可以考虑同样的思路。</p>

              <figure>
          <img class="small_img" src="../static/images/figma_corners/figma_radius.png" />
            <caption>10.2&#8202;—&#8202; Figma 标注圆角</caption>
          </figure>'
          <p>第三，我们还有一些隐藏的限制，在实现上将成为主要难点。
            为了实现标准圆角，我们假设一个 100 px * 100 px 的正方形，其中圆角的圆角半径为 20 px。
            这意味着和这个圆角关联的边，flattern之后，直线部分的长度为 60 px。
            如果我们将这个正方形缩至 80 * 80，flattern 之后，那么直线部分长度就剩下了 40px
            当直线部分的长度用光了之后会发生什么呢？或者说缩小至 20 px 时呢？
            Figma 目前是确定形状所能承载的最大圆角绘制半径，通过边长与半径的比较，取最大圆角半径为边长一半，然后进行绘制。</p>
          <div class="css-1gmtsx3">
            <blockquote class="css-1m2040m">
              <p>如果圆角半径为 R，平滑参数为 ξ 的平滑圆角绘制需要 p 个像素点, 那么函数 p(R,ξ) 一定可逆为 ξ(R,p).</p>
            </blockquote>
          </div>

          <figure>
          <img class="small_img" src="../static/images/figma_corners/figma_radius_2.png" />
            <caption>10.3&#8202;—&#8202; Figma 平滑圆角</caption>
          </figure>'
          <p>而平滑圆角对于形状的处理，肯定会吃掉边长中更多的直线部分。
            想想一下下面这个案例，一个 100 px * 100 px的矩形。
            圆角半径为 20px，采用 iOS 的平滑圆角之后，会比标准圆角多占用 12px 直线的长度。那么边长就剩下 60 - 12 -12 = 36px
            当我们将矩形缩小为 60px * 60px 呢？结果显而易见。平滑圆角会根据剩余 直线边长的长度 而进行平滑，直至直线边长消耗殆尽。
            数学问题又来了，我们应该如何设计变量 ξ，让其 0 ～ 1 变化刚好满足当其为1 时，直线边长的长度消耗殆尽呢？
            这个问题不解决，我们就无法设计这个平滑度调节功能</p>
          <p>将这个问题用数学进行定义：如果 圆角半径 R 平滑参数为 ξ 的平滑圆角，涉及计算的 像素点 有 p 个, 那么函数 p(R,ξ) 一定可逆为 ξ(R,p) 。 
            这是这个功能的隐藏限制，对高阶欧拉螺线也一样。</p>
          <figure>
          <img class="small_img" src="../static/images/figma_corners/figma_tweak_radius.gif" />
            <caption>10.4&#8202;—&#8202; 调节 Figma 圆角平滑参数</caption>
          </figure>'
          <p>最后，我们还有可用性上的要求，当用户调节平滑参数时，形状的变化必须是可感知的。
            当调节平滑参数 ξ 的时候，要让用户能看到差别。
            要是我们做了这么多工作，用户却感受不到，这就很歇菜了。</p>
          <h2 id="keep-it-simple-squircle" class="css-18dxkbz">
            简约实现
          </h2>
          <strong><p>
            <em>译者注：这个部分的公式需要推导一下。</em>
          </p></strong>
          <p>让我们试一下最直接的办法，同时兼顾上面提到的限制，我们试着用单项贝塞尔曲线接管圆角部分的绘制然后将其连到直线上。下面的图表展示了 贝塞尔曲线 能够满足我们的需求：</p>


          
          <figure>
    <img class="small_img" src="../static/images/figma_corners/figma_ramp_up.png" />    
            <caption>11.0&#8202;—&#8202; Figma 平滑圆角，4 顶点 6 控制点</caption>
          </figure>'

          <figure>
          <img class="small_img" src="../static/images/figma_corners/20.png" />
            <caption>11.1&#8202;—&#8202; 贝塞尔控制点控制贝塞尔函数绘制出的曲率上升部分的圆角</caption>
          </figure>'


          <p>有几个点值得解释一下。
            首先，控制点 1 跟 2 跟 3，全部是直线边及其延长线上的点。这样做保证了 点 1 的曲率 为 0，使其能够让 平滑圆角跟直线无缝相连。
            如果我们定义一个坐标系统，控制点1 定义为 P1，控制点2 定义为 P2，那么点1的曲率可以表示为：</p>

            <figure>
          <img class="small_img" src="../static/images/figma_corners/21.png" />
            <caption>11.2&#8202;—&#8202; 依据 图 11.1，点1处未简化的曲率公式 （译者注：2/3*(a*b)/a^3，然而推导过程有待再看一下）</caption>
          </figure>

          <p>很明显，当点 1 - 2 - 3 共线时，向量叉积为0.
            我们将这个公式应用到 点 4 ，这样就能拿到点 4 的曲率:</p>

                      <figure>
          <img class="small_img" src="../static/images/figma_corners/22.png" />
            <caption>11.3&#8202;—&#8202; 依据 图 11.1，点1处简化后的曲率公式(译者注：根据11.2 替代而来，pow((c^2 + d^2),3/2) 意味着向量长度的三次方)</caption>
          </figure>
          <p></p>
          <p>三段曲线中第二段也即是曲率恒定的部分为标准圆的弧线，再根据「密切圆的半径 R 的倒数就是曲率 κ」，也就是 κ = 1/R
            也就是说 当第一段曲线跟第二段曲线相连时，c d 需要固定住将操控点 3-4 构成第二部分形状的切线。根据这个限制，我们得出 b 的值：</p>


           <figure>
          <img class="small_img" src="../static/images/figma_corners/23.png" />
            <caption>11.4&#8202;—&#8202; 依据 图 11.1，b 的解如上，保证了曲率的连续</caption>
          </figure>


          <p>保持曲率的线性增长是很有必要的（也就是说要接近理想的欧拉螺线）,我们
             可以通过改变 b 的值来调整曲线，这给了我们一个思路。通过观察，我们使用 ξ = 0.6 时的简单贝塞尔方法构建了平滑圆角：</p>
           <figure>
          <img class="small_img" src="../static/images/figma_corners/24.png" />
            <caption>11.5</caption>
          </figure>
          <p>效果看起来不错，我们推导的过程也从欧拉螺线中得到了很多启发。
             然而，当平滑系数 ξ = 0 到 ξ = 1 变化时，圆角的形状会有一些细微差别，让我们放大圆角细节，分别是 ξ = 0.1, 0.3, 0.5, 0.7 和 0.9 时的情况（用不同颜色区分）:</p>
           <figure>
          <img class="small_img" src="../static/images/figma_corners/25.png" />
            <caption>11.6</caption>
          </figure>
          <p>这个小问题几乎不可感知。从落地角度来说比欧拉螺线更具有可行性。我们还需要再调调！</p>
          <h2 id="small-strokes-of-sqluck" class="css-18dxkbz">
            微小调整
          </h2>

          <strong><p>
            <em>译者注：这个部分建议看原文，不是很理解，需要推导一下。</em>
          </p></strong>
          <p>我们还可以再探索一小步，还记得我们前头说的，平滑系数 ξ 和 涉及平滑圆角计算的边长直线的像素 p 的逆关系。我们可以通过这种映射，来尝试对平滑圆角进行参数化。</p>
          <p>
            这里就不给推导过程了，
            涉及圆角计算的 q 个边长直线像素 和圆角开角 θ 的关系可以表示为:</p>
                     <figure>
          <img class="small_img" src="../static/images/figma_corners/26.png" />
            <caption>12.1 圆角计算涉及的边长直线像素（译者注：θ = π/2 时 cosθ = 0， q = R)</caption>
          </figure>
          <p>那么涉及平滑圆角计算的边长直线像素，我们带入p(R,ξ)，基于原来的 q ，公式整理为:</p>
 
          <figure class="css-1fy50x0">  
          <img class="small_img" src="../static/images/figma_corners/27.png" />
            <caption>12.2 涉及 标准圆角 和 平滑圆角计算的边长直线像素</caption>
          </figure>
          <p>这意味着我们的最大平滑度设置会重新计算一边 已经被直角圆角计算过的像素。
            这个方法会固定住上面 11.1 图表中 a + b 的值。因为 c 跟 d 也是固定值，因此 a + b 的取值就是我们最后需要考虑的，那么 a 与 b 应该呈怎样的相关性呢？
            我们取一个最简单的方法，让 a = b，我们就获取了调整过的 贝塞尔参数化方法的平滑圆角公式，图形和曲率如下：</p>

                    <figure class="css-1fy50x0">  
          <img class="small_img" src="../static/images/figma_corners/28.png" />
            <caption>12.3 简单平滑方案下的圆角形状和曲率图表</caption>
          </figure>
          <p>视觉上还不错，曲线很好看。然而曲率图表看起来很凹凸，
            因此我们后面需要修正一下。我们先不看曲率图表，这么多平滑圆角曲线中有一条曲线跟苹果的圆角曲线很想，感觉到差不多可以让用户用的级别了。</p>

          <p>现在我们来看看曲率图表，我们最后的问题所在。
            与其像上面那样，我们可以将间隔的 2/3 给 a，剩下的 1/3 给 b。这样会防止曲率上升过快，减少了曲率图表中上升区间过长的问题。这是结果。:</p>

                              <figure class="css-1fy50x0">  
          <img class="small_img" src="../static/images/figma_corners/29.png" />
            <caption>12.4 优化平滑方案下的圆角形状和曲率图表</caption>
          </figure>
          <p>曲率图表优化效果明显，圆角图形依旧不错,ξ = 0.6 时跟 iOS 效果一致，那就准备发布吧。</p>
          <h2 id="watching-the-ship-sail" class="css-18dxkbz">
            总结
          </h2>
          <p>
             最后总结一下整体的设计流程。
             之前提到的复杂数学理论和实现方式，最后却成为了简单实现方法的思想指导和分析工具。
             最简单的实现方法虽然有缺陷，但通过与最接近真相的数学理论互相对照，便可以分析出问题所在，进而搞清楚简单方法的优化点。
             通过数学思想仔细思考问题，重新定义问题，是解决问题的利器。
             最后就像这个案例一样，优化过后的简单实现方案的效果也很好。</p>
          <p>最后,将好产品做到完美需要经历认真的思考。
            当我写下这篇文章的时候，我有些许尴尬，因为我不能提供更好的曲率图表。
            如果还能有更多的探索时间，我像尝试更多的实现方案。
            理智的讲，当我见到欧拉螺线的效果如此出众，但我却不能在实际产品中应用时，我是不满意的。
            然而在 Figma 这家小公司工作，给我的时间也很有限，如果一味的追求完美方案，不能在有限的时间、精力下给出当前最优解，这样也不好。</p>
        </div>

        <h2 id="conclusion">译者的数学推论</h2>

          <p>根据公式 12.2 和 11节 12节的内容，不难知道 <b>a 与 b，c 与 d 的关系</b>，以及<b>一个平滑圆角占用边长像素 p</b>，然后也推论出了<b>p = a + b + c + d +l</b>，以及<b>l 与平滑度和圆角半径的关系。</b> </p>
          <p>最后问题出在 b 与 c 的关系上，只要求出来，就能很快获取各种点，然而尝试了作者的公式，并不对，后来尝试进行几何解析，发现了 c(d)的快速求法，进而推导出 b 。</p>
          <p>这样基本上来说，给定 圆角半径 和 平滑度，可以快速求出所有贝塞尔顶点和操控点的位置坐标了。</p>
            <figure class="css-1fy50x0">  
          <img class="small_img" src="../static/images/figma_corners/a_b.jpg" />
            <caption>Figma 平滑圆角实际情况 —— a 与 b 的关系</caption>
          </figure>   

          <figure class="css-1fy50x0">  
          <img class="small_img" src="../static/images/figma_corners/c_d.jpg" />
            <caption>Figma 平滑圆角实际情况 —— c 与 d 与平滑百分比的关系</caption>
          </figure>   


          <figure class="css-1fy50x0">  
          <img class="small_img" src="../static/images/figma_corners/p_r.jpg" />
            <caption>Figma 平滑圆角实际情况 —— p 与 R 与平滑百分比的关系</caption>
          </figure>   

          <figure class="css-1fy50x0">  
          <img class="small_img" src="../static/images/figma_corners/l_r.jpg" />
            <caption>Figma 平滑圆角实际情况 —— 普通圆角占用的像素 与 R 与平滑百分比的关系</caption>
          </figure>   

          <!-- <figure class="css-1fy50x0">  
          <img class="hero_images" src="../static/images/figma_corners/final_conclusion.jpg" />
            <caption>译者的数学推论</caption>
          </figure>    -->


        <h2 id="reference">资料参考</h2>
        <ul>


          <li>
            <a
              href="https://www.cocoanetics.com/2013/06/ios-7-icon-squircle/"
              target="_blank">iOS 7 Icon Squircle</a>
          </li>

          <li>
            <a
              href="https://applypixels.com/blog/the-hunt-for-the-squircle"
              target="_blank">The Hunt for the Squircle</a>
          </li>

          <li>
            <a
              href="https://web.archive.org/web/20180707042555/http://blog.mikeswanson.com/post/62341902567/unleashing-genetic-algorithms-on-the-ios-7-icon"
              target="_blank">Unleashing Genetic Algorithms on the iOS 7 Icon</a>
          </li>

          <li>
            <a
              href="https://www.mani.de/backstage/?p=483"
              target="_blank">Exploring iOS 7 Rounded Corners</a>
          </li>

          <li>
            <a
              href="https://medium.com/fueled-engineering/continuous-rounded-corners-with-uikit-b575d50ab232"
              target="_blank">Continuous Rounded Corners with UIKit</a>
          </li>

          <li>
            <a
              href="https://www.whitman.edu/mathematics/calculus_online/section13.03.html"
              target="_blank"
            >Arc length and curvature</a>
          </li>

          <li>
            维基百科数学相关词条
          </li>

          <li>
          <a
              href="http://martinrgb.com/blog/#/Sketch_Round_Corner"
              target="_blank">[总结]Sketch 平滑圆角在 Android 和 Web 中的绘制</a>
          </li>

          <li>
            <a
              href="https://book.douban.com/subject/1231399/"
              target="_blank">托马斯微积分（中文第十版）</a>
          </li>


        </ul>
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
    name: 'article',
    data: function () {return {
      articleTitle:'11.[译 + 总结]不顾一切找圆角 —— Figma 实时平滑圆角方案探究',
    }},
    components: {ToolTip,Toc,SnippetComponent,CollapseComponent},
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

.center-container img{
  max-width: 100%;
  display: -webkit-box;
  margin:0 auto;
  width:auto;
}

.small_img {
  width: auto;
  height: auto;
  max-width: 300px;
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
