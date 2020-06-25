<template>
  <div class="transition-container">
    <div id="center-container" class="center-container">
      <toc tocTitle="Sketch 平滑圆角绘制">
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
                  <a href="javascript:void(0)" @click="goAnchor('#a-spanner-in-the-works')">计划有变</a>
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p>
              <a href="javascript:void(0)" @click="goAnchor('#static_method')">动态绘制</a>
            </p>
            <ul class="TableOfContents">
              <li>
                <p>
                  <a href="javascript:void(0)" @click="goAnchor('#svg_morph')">iOS 圆角的算法窥探</a>
                </p>
              </li>
              <li>
                <p>
                  <a href="javascript:void(0)" @click="goAnchor('#avd_morph_android')">超椭圆远郊算法</a>
                </p>
              </li>
              <li>
                <p>
                  <a
                    href="javascript:void(0)"
                    @click="goAnchor('#avd_morph_android')"
                  >Sketch 圆角算法的推理</a>
                </p>
              </li>
              <li>
                <p>
                  <a href="javascript:void(0)" @click="goAnchor('#avd_morph_android')">Web Demo</a>
                </p>
              </li>
              <li>
                <p>
                  <a href="javascript:void(0)" @click="goAnchor('#avd_morph_android')">Android 实现</a>
                </p>
              </li>
              <li>
                <p>
                  <a href="javascript:void(0)" @click="goAnchor('#avd_morph_android')">问题</a>
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p>
              <a href="javascript:void(0)" @click="goAnchor('#static_method')">资料参考</a>
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
          </p>
        </strong>
        <img
          class="hero-image"
          src="../static/images/figma_corners/background.jpg"
          alt="hero image"
        />
        <div class="css-1aecauc">
          <div id="source-article"></div>
          <p>
            <em>本文明晰的展示了 Figma 工程师是如何通过程序挑战，寻找最完美的问题解法。</em>
          </p>

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
            幸运的事，人们从 iOS 7 发布后就开始在网络上探讨、咨询这个问题，我们肯定不是第一个吃螃蟹的人。 Marc Edwards 的
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
            >The hunt for the squircle</a>  (然而，在发现之前，<em>已经</em>有很多人使用那个「不完全对的公式」
             到界面跟图标上了)。实际上，上边的公式不管怎么调节 n，都跟实际的 iOS 图标形状有微小的差异。
          </p>
          <p>我的探索第一次进到了死路：我们有优雅简单的公式，看起来跟 iOS 圆角也很像，但其实公式并不一样，我们想要给用户提供最正确的功能，因此还要继续探索。</p>
          <p>
            既然研究走到了死路，项目想要继续进展便需要加倍的努力，但很荣幸地、我再一次站在了别人的肩膀上得以继续探索。  Juicy Bits 的 Mike Swanson ，做了一个假想：那就是 squircle 平滑圆角是使用几段贝塞尔曲线拟合的。
            <a
              href="https://web.archive.org/web/20180707042555/http://blog.mikeswanson.com/post/62341902567/unleashing-genetic-algorithms-on-the-ios-7-icon"
            >遗传算法提炼 iOS 圆角公式</a> （译者注：网站又挂了，web archive 将就下吧），他使用遗传算法提炼了 484 次，将形状优化的跟 Apple 官方圆角形状差不多了。他得出的这个观点非常的新潮，后续跟进的 Manfred Schwind 更是直接贴出了
            <a
              href="https://www.mani.de/backstage/?p=483"
            >实现</a>。效果看上去跟 iOS 图标没差，所以现在我们已经有了两种不同的实现平滑圆角的贝塞尔方法：别人已经搞出来了,我们啥也不用干了！
          </p>
          <p>译者注：平方公式方法跟三角函数 360 度推点法有性能问题，这个可以参考我上一篇文章，贝塞尔方法是一个比较不错的动态绘制方案，这里补充一个关于 iOS UIKit 的平滑圆角快速实现 —— <a href="https://medium.com/fueled-engineering/continuous-rounded-corners-with-uikit-b575d50ab232">Continuous Rounded Corners with UIKit</a> <tool-tip tips="其实就是使用 UIBezierPath 做 mask path"></tool-tip></p>
          <h2 id="a-spanner-in-the-works" class="css-18dxkbz">
            计划有变
          </h2>
          <p>在我动手搬运代码到 Figma 之前，还有两个细节，需要考虑：</p>
          <p>首先，上面提到的 iOS 版本的公式在我调研的时候发现了个瑕疵 —— 圆角不是完全对称的。其中一边有一小段是直线。这个效果不是特别优雅，而且对代码实现和测试来说会导致一些复杂问题。所以只能删掉有瑕疵的这段曲线，然后把没有瑕疵的那一半曲线镜像过来。</p>
          <p>其次，当 <a href="https://en.wikipedia.org/wiki/Flattening">flatten</a> 增加真实的 iOS 圆角形状的圆角值时，圆角会突然的产生变化。对于设计师来说这并不友好 —— 因为从设计师的角度来说，形状应该是具有规则的。</p>
                   <img class="small_img" src="../static/images/figma_corners/figma_01.jpg" />
          <p>当增加圆角形状的圆角幅度时，最自然的变化预期应该是 从圆到直平滑的渐变，直到完全没有直线。圆角幅度越大则内切形状的圆的半径越小 —— 现在的 Figma 就是这样的。Apple 的 squircle 公式目前来说没啥帮助，因为它的平滑效果是固定某个圆度的：没办法提炼出圆度更大或者更小时的结果。我们需要的是一套可以<b>动态调参</b>的平滑方案，然后让其中的某个参数跟苹果的圆角方案一致。

          </p>
          <p>这样做的附加好处是，如果我们能动态调节形状从 矩形 到 圆角矩形的过程。那么 Figma 中其他形状的角也可以用同样的方案来增加圆度：星性、多边形，甚至是随机的钢笔工具形状。因此相比于简单复刻 iOS 的圆角，制作一个动态可调参的圆角方案更有价值，功能上也更完整。我们的工具要能够给予设计师不同形状绘制能力的支持，其中也包括平滑圆角的支持。</p>
          <p>如果是要按可调参的方案来做，让参数范围中的某个参数值所呈现的圆角刚好跟 iOS 7 的形状契合，这个方案的限制点来了 —— 调参范围是什么？这个范围非常难去定义。看来需要一些数学计算了。</p>
          <h2 id="power-tools-differential-geometry-of-plane-curves" class="css-18dxkbz">
            <a
              href="#power-tools-differential-geometry-of-plane-curves"
              class="css-1bs7qd7"
            >Power tools: Differential geometry of plane curves</a>
          </h2>
          <p>
            Before diving into parameterizing squircles, let’s take a step back and dust off some formal tools that will help us analyze what’s going on. First of all, we need to settle on
            <em>how</em> we’ll describe a squircle. When discussing superellipses before, we used an equation involving x and y, where all the points (x, y) in the plane which satisfy the equation implicitly trace out the superellipse. This is elegant when the equation is simple, but real squircles are a patchwork of Bézier curves spliced together, which leads to unmanageably messy implicit equations.
          </p>
          <p>We can deal with this complication by using a more explicit approach: take a single variable t, restrict it to a finite interval, and map each value which t can take on that interval to a distinct point on the squircle perimeter (Bézier curves themselves are almost always represented this way, in fact). If we concentrate on just one of the corners, thereby restricting our analysis to a curved line with a clear beginning and end, we can choose the mapping between t and the corner such that t = 0 corresponds to the beginning of the line, t = 1 corresponds to the end of the line, and smoothly sliding t between 0 to 1 smoothly traces out the round part of the corner. In mathematical language, we will describe our corner by the path r(t), which is structured as</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/3ZE02wZUsUGA264O0s4i0U/bbe46750592152166ff96ee22347616d/squircles_3.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/3ZE02wZUsUGA264O0s4i0U/bbe46750592152166ff96ee22347616d/squircles_3.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/3ZE02wZUsUGA264O0s4i0U/bbe46750592152166ff96ee22347616d/squircles_3.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/3ZE02wZUsUGA264O0s4i0U/bbe46750592152166ff96ee22347616d/squircles_3.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/3ZE02wZUsUGA264O0s4i0U/bbe46750592152166ff96ee22347616d/squircles_3.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/3ZE02wZUsUGA264O0s4i0U/bbe46750592152166ff96ee22347616d/squircles_3.png?w=736"
              alt="squircles 3"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>4.1&#8202;—&#8202;Plane curve bijection with [0,1]</figcaption>
          </figure>
          <p>where x(t) and y(t) are separate functions of t for the x and y components of r. We can think of r(t) as a kind of path history, say for a trip you’d take in your car. At every time t between when you begin and when you arrive, you can evaluate r(t) to get your car’s position along your route. From the path r(t) we can differentiate to get the velocity v(t) and acceleration a(t):</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/6IqgWQTmk8S2csU0g22oEw/9c5000a66cbeba5400a22b0d6d4b69da/squircles_4.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/6IqgWQTmk8S2csU0g22oEw/9c5000a66cbeba5400a22b0d6d4b69da/squircles_4.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/6IqgWQTmk8S2csU0g22oEw/9c5000a66cbeba5400a22b0d6d4b69da/squircles_4.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/6IqgWQTmk8S2csU0g22oEw/9c5000a66cbeba5400a22b0d6d4b69da/squircles_4.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/6IqgWQTmk8S2csU0g22oEw/9c5000a66cbeba5400a22b0d6d4b69da/squircles_4.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/6IqgWQTmk8S2csU0g22oEw/9c5000a66cbeba5400a22b0d6d4b69da/squircles_4.png?w=736"
              alt="squircles 4"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>4.2&#8202;—&#8202;Plane curve velocity and acceleration</figcaption>
          </figure>
          <p>Finally, the mathematical curvature, which plays a starring role in our story, can in turn be expressed in terms of the velocity and acceleration:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/2FGI0JGU2ku2aoMuioK4Ca/6169e682e804e246f67b08618a29e43e/squircles_5.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/2FGI0JGU2ku2aoMuioK4Ca/6169e682e804e246f67b08618a29e43e/squircles_5.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/2FGI0JGU2ku2aoMuioK4Ca/6169e682e804e246f67b08618a29e43e/squircles_5.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/2FGI0JGU2ku2aoMuioK4Ca/6169e682e804e246f67b08618a29e43e/squircles_5.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/2FGI0JGU2ku2aoMuioK4Ca/6169e682e804e246f67b08618a29e43e/squircles_5.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/2FGI0JGU2ku2aoMuioK4Ca/6169e682e804e246f67b08618a29e43e/squircles_5.png?w=736"
              alt="squircles 5"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>4.3&#8202;—&#8202;Unsigned curvature of plane curves</figcaption>
          </figure>
          <p>But what does this formula really mean? Though it may look a bit complicated, curvature has a straightforward geometric construction, originally due to Cauchy:</p>
          <ol start="1" class="css-oqx1ti">
            <li>
              The center of curvature C at any point P along the curve lies at the intersection of the line normal to the curve at P and another normal line taken infinitesimally close to P. (As a side note, the circle centered at C as constructed above is called the
              <em>osculating circle</em> at P, from the Latin verb
              <em>osculare</em>, meaning ‘to kiss’. 😙 Isn’t that great?)
            </li>
            <li>The radius of curvature R is the distance between C and P.</li>
            <li>The curvature κ is the inverse of R.</li>
          </ol>
          <p>As constructed above, the curvature κ is nonnegative and doesn’t distinguish between rightward and leftward turns. Since we do care about this, we form the signed curvature k from κ by assigning a positive sign if the path is turning right, and a negative sign if the path is turning left. This concept too has an analogue in the car picture: at any point t, the signed curvature k(t) is just the angle through which the steering wheel has been turned at time t, with plus signs used for turns to the right and minus signs for turns to the left.</p>
          <h2 id="geometry-is-king-arc-length-parametrization" class="css-18dxkbz">
            <a
              href="#geometry-is-king-arc-length-parametrization"
              class="css-1bs7qd7"
            >Geometry is king: Arc length parametrization</a>
          </h2>
          <p>
            With curvature introduced, we have a last couple wrinkles to iron out. First, consider for a moment two cars driving along a squircle corner shaped route; one car keeps speeding up and then braking the entire way (🤢), while the other car smoothly speeds up then coasts down to a halt at the end. These two different ways of driving will yield very different path histories even though the exact same route was taken. We only care about the shape of the corner, not how any one driver negotiated it&#8202;—&#8202;so how can we separate the two? The key is to use not time to label the points in the history, but rather the cumulative distance traveled, or arc length. So instead of answering questions like ‘where was the car ten minutes into its trip?’, we’d rather answer ‘where was the car ten
            <em>miles</em> into its trip?’. This way of describing paths, the arc length parameterization, captures their geometry alone.
          </p>
          <p>If we have some path history r(t) in hand, we can always extract the arc length s as a function of t from the path by integrating its speed, as follows:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/5Lv7b9Xn1eOkImUgaS8smK/d14bddd7d234f287c2d3cdad345ad3f5/squircles_6.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/5Lv7b9Xn1eOkImUgaS8smK/d14bddd7d234f287c2d3cdad345ad3f5/squircles_6.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/5Lv7b9Xn1eOkImUgaS8smK/d14bddd7d234f287c2d3cdad345ad3f5/squircles_6.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/5Lv7b9Xn1eOkImUgaS8smK/d14bddd7d234f287c2d3cdad345ad3f5/squircles_6.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/5Lv7b9Xn1eOkImUgaS8smK/d14bddd7d234f287c2d3cdad345ad3f5/squircles_6.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/5Lv7b9Xn1eOkImUgaS8smK/d14bddd7d234f287c2d3cdad345ad3f5/squircles_6.png?w=736"
              alt="squircles 6"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>5.1&#8202;—&#8202;Arc length integral</figcaption>
          </figure>
          <p>If we can invert this relationship to find t(s), then we can substitute this for t in our path history r(t) to get the desired arc length parameterization r(s). The arc length parameterization of a path is equivalent to a path history made by a car driving at unit speed, so unsurprisingly the velocity v(s) is always a unit vector, and the acceleration a(s) is always perpendicular to the velocity. Consequently, the arc length parameterized version of curvature simplifies to just the magnitude of acceleration,</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/7en7Dd302WoMsiWWYeWG2c/2d454ce1b215a8ee631aa067fda0f9f6/squircles_7.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/7en7Dd302WoMsiWWYeWG2c/2d454ce1b215a8ee631aa067fda0f9f6/squircles_7.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/7en7Dd302WoMsiWWYeWG2c/2d454ce1b215a8ee631aa067fda0f9f6/squircles_7.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/7en7Dd302WoMsiWWYeWG2c/2d454ce1b215a8ee631aa067fda0f9f6/squircles_7.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/7en7Dd302WoMsiWWYeWG2c/2d454ce1b215a8ee631aa067fda0f9f6/squircles_7.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/7en7Dd302WoMsiWWYeWG2c/2d454ce1b215a8ee631aa067fda0f9f6/squircles_7.png?w=736"
              alt="squircles 7"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>5.2&#8202;—&#8202;Curvature in the arc-length parametrization</figcaption>
          </figure>
          <p>and we can tack on the appropriate right or left handed sign to form the signed curvature k(s). Most of the complication in the more general curvature definition was evidently there just to cancel out the non-geometric content in the path history. Curvature is, after all, a purely geometric quantity, so it’s really pleasing to see it look simple in the geometric parameterization.</p>
          <h2 id="design-the-curvature-compute-the-curve" class="css-18dxkbz">
            <a
              href="#design-the-curvature-compute-the-curve"
              class="css-1bs7qd7"
            >Design the curvature, compute the curve</a>
          </h2>
          <p>Now for the other wrinkle: we’ve just seen how to go from a path-history description of a curve r(t) to its arc length parameterization r(s), and how to extract the signed curvature k(s) from it. But can we do the reverse? Can we design a curvature profile and from it derive the parent curve? Let’s consider the car analogy again&#8202;—&#8202;suppose that as we were driving at constant unit speed along a route, we recorded the position of the steering wheel continuously throughout the journey. If we took that steering data and gave it later to another driver, they’d be able to reconstruct the route perfectly, so long as they played back the steering wheel positions properly and drove exactly the same speed. So we see intuitively that we have enough information to reconstruct the parent curve, but how does the computation look mathematically? It’s a little bit hairy, but it’s still possible, thanks to Euler, using the arc length parameterization&#8202;—&#8202;if we choose a coordinate system such that the curve starts at the origin and has its initial heading directed along the x axis, then x(s) and y(s) can be reconstructed from k(s) as follows:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/63uDAdyprOMqC0GAGoe6QW/6d52d5b7b36d94faf7a1906b756486bb/squircles_8.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/63uDAdyprOMqC0GAGoe6QW/6d52d5b7b36d94faf7a1906b756486bb/squircles_8.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/63uDAdyprOMqC0GAGoe6QW/6d52d5b7b36d94faf7a1906b756486bb/squircles_8.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/63uDAdyprOMqC0GAGoe6QW/6d52d5b7b36d94faf7a1906b756486bb/squircles_8.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/63uDAdyprOMqC0GAGoe6QW/6d52d5b7b36d94faf7a1906b756486bb/squircles_8.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/63uDAdyprOMqC0GAGoe6QW/6d52d5b7b36d94faf7a1906b756486bb/squircles_8.png?w=736"
              alt="squircles 8"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>6.1&#8202;—&#8202;Recovering a curve from its curvature</figcaption>
          </figure>
          <br />
          <p>Last, note the argument of the sine and cosine functions above: it is the integral of the signed curvature. Normally, the arguments supplied to trigonometric functions are angles measured in radians, and that turns out to be true in this case as well: the integral from a to b of the signed curvature is the heading at b minus the heading at a. Thus, if we start with a square and sand off the corner in whatever crazy way we want, then measure the curvature over the part we sanded and integrate up the result, we’ll always get π/2.</p>
          <h2 id="squircles-under-the-scalpel" class="css-18dxkbz">
            <a href="#squircles-under-the-scalpel" class="css-1bs7qd7">Squircles under the scalpel</a>
          </h2>
          <p>Now that we are wrinkle-free, let’s see what happens when we apply these analytical tools to some real shapes. We’ll start with a corner of a rounded rectangle which has a corner radius of one, plotting first the corner itself and then the curvature as a function of arc length:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/533aeh5Jheggauskkk0Wm2/74d4aa3a138419323c62b48058522ae7/squircles_9.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/533aeh5Jheggauskkk0Wm2/74d4aa3a138419323c62b48058522ae7/squircles_9.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/533aeh5Jheggauskkk0Wm2/74d4aa3a138419323c62b48058522ae7/squircles_9.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/533aeh5Jheggauskkk0Wm2/74d4aa3a138419323c62b48058522ae7/squircles_9.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/533aeh5Jheggauskkk0Wm2/74d4aa3a138419323c62b48058522ae7/squircles_9.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/533aeh5Jheggauskkk0Wm2/74d4aa3a138419323c62b48058522ae7/squircles_9.png?w=736"
              alt="squircles 9"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>7.1&#8202;—&#8202;Rounded rectangle curvature analysis</figcaption>
          </figure>
          <p>We repeat this process now for the real Apple squircle corners to look at their curvatures, which is very different and very enlightening:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/1iw2WdinDS8YWe440KYq60/c35dfd6bd406f11c1ff073bfe16aa711/squircles_10.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/1iw2WdinDS8YWe440KYq60/c35dfd6bd406f11c1ff073bfe16aa711/squircles_10.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/1iw2WdinDS8YWe440KYq60/c35dfd6bd406f11c1ff073bfe16aa711/squircles_10.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/1iw2WdinDS8YWe440KYq60/c35dfd6bd406f11c1ff073bfe16aa711/squircles_10.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/1iw2WdinDS8YWe440KYq60/c35dfd6bd406f11c1ff073bfe16aa711/squircles_10.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/1iw2WdinDS8YWe440KYq60/c35dfd6bd406f11c1ff073bfe16aa711/squircles_10.png?w=736"
              alt="squircles 10"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>7.2&#8202;—&#8202;iOS 7 squircle curvature analysis</figcaption>
          </figure>
          <p>The curvature looks quite jagged, but this is not necessarily bad. As we’ll see later, there’s a tradeoff between having a smooth curvature plot and having a small number of Bézier curves, and the iOS corner only uses three. Generally, designers would rather deal with fewer Bézier curves at the expense of having a mathematically perfect curvature profile. These details aside, we can kind of squint at the plot on the right and see a general picture emerge: the curvature ramps up, flattens in the middle, and then ramps back down.</p>
          <h2 id="breakthrough-smoothing-parameterized" class="css-18dxkbz">
            <a
              href="#breakthrough-smoothing-parameterized"
              class="css-1bs7qd7"
            >Breakthrough: Smoothing parameterized</a>
          </h2>
          <p>Bingo! In that last observation lies the key to how we can parameterize the smoothing of our squircle corner. At zero smoothing, we want a curvature profile like the rounded rectangle: tabletop shaped. As smoothing slowly increases, we want the height of the tabletop to stay fixed while its cliff edges start turning into steep slopes, yielding an isosceles trapezoidal curvature profile (still with a total area of π/2, of course). As smoothing approaches its maximum, we want the flat part of the trapezoid to disappear, leaving us with a broad isosceles triangular profile whose peak height is that of the original tabletop.</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/3KPOuAFAYg66yeS44WwUsS/cc290cade7838c1d1cfb79db571bd13b/squircles_11.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/3KPOuAFAYg66yeS44WwUsS/cc290cade7838c1d1cfb79db571bd13b/squircles_11.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/3KPOuAFAYg66yeS44WwUsS/cc290cade7838c1d1cfb79db571bd13b/squircles_11.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/3KPOuAFAYg66yeS44WwUsS/cc290cade7838c1d1cfb79db571bd13b/squircles_11.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/3KPOuAFAYg66yeS44WwUsS/cc290cade7838c1d1cfb79db571bd13b/squircles_11.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/3KPOuAFAYg66yeS44WwUsS/cc290cade7838c1d1cfb79db571bd13b/squircles_11.png?w=736"
              alt="squircles 11"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>8.1&#8202;—&#8202;Curvature profiles for various values of the smoothing parameter</figcaption>
          </figure>
          <p>Let’s try to express this sketch of a curvature profile in mathematical terms, using ξ as a smoothing parameter which varies between zero and one. Foreseeing use with other shapes whose corners aren’t right angles, we also introduce the angle θ which is the turning angle of the corner&#8202;—&#8202;π/2 in the case of squares. Putting both together, we can define a piecewise function in three parts, one for the ramp up, one for the flat top, and one for the ramp down:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/11ZKQdRz4GIguQE2cOkIKy/37e717038363439a40978b0d118ccd3b/squircles_12.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/11ZKQdRz4GIguQE2cOkIKy/37e717038363439a40978b0d118ccd3b/squircles_12.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/11ZKQdRz4GIguQE2cOkIKy/37e717038363439a40978b0d118ccd3b/squircles_12.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/11ZKQdRz4GIguQE2cOkIKy/37e717038363439a40978b0d118ccd3b/squircles_12.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/11ZKQdRz4GIguQE2cOkIKy/37e717038363439a40978b0d118ccd3b/squircles_12.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/11ZKQdRz4GIguQE2cOkIKy/37e717038363439a40978b0d118ccd3b/squircles_12.png?w=736"
              alt="squircles 12"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>8.2&#8202;—&#8202;Squircle curvature profile parameterization</figcaption>
          </figure>
          <p>Notice that the first and third pieces (the ramps) disappear as ξ tends to zero, and that the middle piece (the flat top) disappears as ξ tends to one. We showed above how we can go from a curvature profile to a parent curve, so let’s try it out on the first equation above, which describes a line whose curvature starts at zero and steadily increases as we walk along it. We’ll do the easy interior integral first:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/1CLDwJCUxuQc6I4oeQ0uOm/cf6b51213a18db8502a42a0c4ed65839/squircles_13.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/1CLDwJCUxuQc6I4oeQ0uOm/cf6b51213a18db8502a42a0c4ed65839/squircles_13.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/1CLDwJCUxuQc6I4oeQ0uOm/cf6b51213a18db8502a42a0c4ed65839/squircles_13.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/1CLDwJCUxuQc6I4oeQ0uOm/cf6b51213a18db8502a42a0c4ed65839/squircles_13.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/1CLDwJCUxuQc6I4oeQ0uOm/cf6b51213a18db8502a42a0c4ed65839/squircles_13.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/1CLDwJCUxuQc6I4oeQ0uOm/cf6b51213a18db8502a42a0c4ed65839/squircles_13.png?w=736"
              alt="squircles 13"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>8.3&#8202;—&#8202;First integral of 6.1 as applied to equations 8.2</figcaption>
          </figure>
          <p>Great, so far so good! We can keep chugging along to form the next couple of integrals:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/6uJKRiuqLmCY6McU2G28U4/fb2bea31832257a92dc2bfea7fc4c125/squircles_14.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/6uJKRiuqLmCY6McU2G28U4/fb2bea31832257a92dc2bfea7fc4c125/squircles_14.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/6uJKRiuqLmCY6McU2G28U4/fb2bea31832257a92dc2bfea7fc4c125/squircles_14.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/6uJKRiuqLmCY6McU2G28U4/fb2bea31832257a92dc2bfea7fc4c125/squircles_14.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/6uJKRiuqLmCY6McU2G28U4/fb2bea31832257a92dc2bfea7fc4c125/squircles_14.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/6uJKRiuqLmCY6McU2G28U4/fb2bea31832257a92dc2bfea7fc4c125/squircles_14.png?w=736"
              alt="squircles 14"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>8.4&#8202;—&#8202;Second integral of 6.1 as applied to equations 8.2 (Fresnel integral)</figcaption>
          </figure>
          <p>
            Alas, here we hit a bump, as these integrals aren’t quite as easy. If you have heard about the connection between trigonometric functions and exponentials, you might guess that these integrals are related to the error function, which can’t be expressed in terms of elementary functions. The same is true of these integrals. So what do we do? It is beyond the scope of this post to justify (see
            <a
              href="https://math.stackexchange.com/questions/83721/when-can-a-sum-and-integral-be-interchanged"
            >this math exchange post</a> for a clue as to how you would), but in this case we can substitute in the Taylor expansions for sine and cosine, then swap the sum and the integral to obtain:
          </p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/4dSlcqfh4s4WO8ukM2s4ue/86f419eaf04d8339b08b6a5d15fcfaf6/squircles_15.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/4dSlcqfh4s4WO8ukM2s4ue/86f419eaf04d8339b08b6a5d15fcfaf6/squircles_15.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/4dSlcqfh4s4WO8ukM2s4ue/86f419eaf04d8339b08b6a5d15fcfaf6/squircles_15.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/4dSlcqfh4s4WO8ukM2s4ue/86f419eaf04d8339b08b6a5d15fcfaf6/squircles_15.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/4dSlcqfh4s4WO8ukM2s4ue/86f419eaf04d8339b08b6a5d15fcfaf6/squircles_15.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/4dSlcqfh4s4WO8ukM2s4ue/86f419eaf04d8339b08b6a5d15fcfaf6/squircles_15.png?w=736"
              alt="squircles 15"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>8.5&#8202;—&#8202;Fresnel integral series expansions</figcaption>
          </figure>
          <p>This looks nigh-impenetrable in its series form, so let’s take a step further and explicitly write out the first few terms in each series with all simplifying multiplication performed. This delivers the following few terms for the x and y parts of the shape:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/5yva6JQaSQei4UUC0IgkAU/476d0211289aa065e47a7dcbabde9d84/squircles_16.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/5yva6JQaSQei4UUC0IgkAU/476d0211289aa065e47a7dcbabde9d84/squircles_16.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/5yva6JQaSQei4UUC0IgkAU/476d0211289aa065e47a7dcbabde9d84/squircles_16.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/5yva6JQaSQei4UUC0IgkAU/476d0211289aa065e47a7dcbabde9d84/squircles_16.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/5yva6JQaSQei4UUC0IgkAU/476d0211289aa065e47a7dcbabde9d84/squircles_16.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/5yva6JQaSQei4UUC0IgkAU/476d0211289aa065e47a7dcbabde9d84/squircles_16.png?w=736"
              alt="squircles 16"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>8.6&#8202;—&#8202;Explicit low-order (n &lt; 3) parts of 8.3</figcaption>
          </figure>
          <h2 id="apotheosis-clothoid" class="css-18dxkbz">
            <a href="#apotheosis-clothoid" class="css-1bs7qd7">Apotheosis clothoid</a>
          </h2>
          <p>This is a concrete result! We can actually plot this pair of equations (given some reasonable choices for ξ, θ and R) to get a path as a function of s. If we had access to arbitrarily many terms and could compute the sums, we’d see that as s increases, the curve begins to spiral in on itself, though this happens far from the domain we’re interested in, which is the flatter ramp-up section.</p>
          <p>Echoing a sentiment from an earlier point in the post, we’re not the first to tread here, either. Owing to its linear curvature, which is very useful, many have stumbled on this curve in the past&#8202;—&#8202;it is known as an Euler spiral, cornu, or a clothoid, and it finds a lot of use in designing tracks for vehicles, including roads and roller-coasters.</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/6ZIk5tntV6cmuCkSoKUUuS/3753ef6b9b67e5f89fd79f339a471d49/squircles_17.gif?w=368 368w, //images.ctfassets.net/1khq4uysbvty/6ZIk5tntV6cmuCkSoKUUuS/3753ef6b9b67e5f89fd79f339a471d49/squircles_17.gif?w=491 491w, //images.ctfassets.net/1khq4uysbvty/6ZIk5tntV6cmuCkSoKUUuS/3753ef6b9b67e5f89fd79f339a471d49/squircles_17.gif?w=736 736w"
              src="//images.ctfassets.net/1khq4uysbvty/6ZIk5tntV6cmuCkSoKUUuS/3753ef6b9b67e5f89fd79f339a471d49/squircles_17.gif?w=736"
              alt="squircles 17"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>9.1&#8202;—&#8202;Clothoid spiral up to s = 5</figcaption>
          </figure>
          <p>Using the just the n &lt; 10 part of the expansion as given in 8.5, we finally have all the pieces necessary to make our first artifact. The expansion represents the sloping (first) part of equation 8.2&#8202;—&#8202;it’s easy to adapt it to the falling (third) part, and we’ll bridge these sloping portions with a circular arc for the flat (second) part. This method delivers a mathematically perfect squircle corner that exactly follows the curvature design we first introduced in equations 8.2. Here is the curvature analysis performed for a clothoid squircle corner with ξ = 0.4:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/2iuNpUaBEAOkSeMOo046ku/9c4188a46b5334ed3443199020451e57/squircles_18.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/2iuNpUaBEAOkSeMOo046ku/9c4188a46b5334ed3443199020451e57/squircles_18.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/2iuNpUaBEAOkSeMOo046ku/9c4188a46b5334ed3443199020451e57/squircles_18.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/2iuNpUaBEAOkSeMOo046ku/9c4188a46b5334ed3443199020451e57/squircles_18.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/2iuNpUaBEAOkSeMOo046ku/9c4188a46b5334ed3443199020451e57/squircles_18.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/2iuNpUaBEAOkSeMOo046ku/9c4188a46b5334ed3443199020451e57/squircles_18.png?w=736"
              alt="squircles 18"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>9.2&#8202;—&#8202;Squircle corner at ξ = 0.4 using ninth-order clothoids and circular arcs</figcaption>
          </figure>
          <p>Though it feels good to have obtained this elegant shape, we must realize this is only an ideal version. This exact shape won’t work for several reasons, first among which is the fact that the center of curvature of the circular portion moves as a function of the smoothing parameter ξ&#8202;—&#8202;ideally, it would remain fixed.</p>
          <p>More importantly, the power of the arc length s in the terms we’ve kept to produce the plots can be as high as nine. In Figma, continuous paths must be representable by cubic Bézier curves (of which quadratic Bézier curves and lines are special cases) and this limits us to keeping only cubic and lower order terms. This means that the series above for x(s) and y(s) must each be truncated to a single term. It’s hard to have much confidence that such a drastic truncation will retain the properties we like.</p>
          <p>Sadly, discarding higher-order terms is not sufficient&#8202;—&#8202;the resulting construction performs very poorly when ξ is large. We can see this below in the figure drawn for ξ = 0.9:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/4IPrr77TYQq6ysoEEkSmWI/4a29a88284e3450586123745dc66f405/squircles_19.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/4IPrr77TYQq6ysoEEkSmWI/4a29a88284e3450586123745dc66f405/squircles_19.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/4IPrr77TYQq6ysoEEkSmWI/4a29a88284e3450586123745dc66f405/squircles_19.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/4IPrr77TYQq6ysoEEkSmWI/4a29a88284e3450586123745dc66f405/squircles_19.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/4IPrr77TYQq6ysoEEkSmWI/4a29a88284e3450586123745dc66f405/squircles_19.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/4IPrr77TYQq6ysoEEkSmWI/4a29a88284e3450586123745dc66f405/squircles_19.png?w=736"
              alt="squircles 19"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>9.3 — Squircle corner at ξ = 0.9 using third-order clothoids and circular arcs</figcaption>
          </figure>
          <p>This shape is clearly unusable. It seems three orders isn’t enough to keep the curvature increasing throughout the ramp up and ramp down sections of the parameterization, meaning that we have a ton of accumulated error by the time we get to the circular section. Sadly, this means that all of our clothoid results are unusable, and we have to go back to the drawing board.</p>
          <h2 id="nothing-gold-can-stay" class="css-18dxkbz">
            <a href="#nothing-gold-can-stay" class="css-1bs7qd7">Nothing gold can stay</a>
          </h2>
          <p>Let’s take a step back, consider our constraints again, and try to extract what we can from the previous efforts before heading off in a new direction.</p>
          <p>First, we know that the perfect clothoid construction has exactly the curvature profile we need, but the center of curvature of the central circular section changes location as a function of the smoothing parameter ξ. This is undesirable because our current on-canvas rectangle rounding UI uses a dot right at the center of curvature which a user can drag to set the corner radius. It might feel a bit weird if that dot moved as the smoothing varied. Also, the iOS shape’s central section is right where it would be if it were just a rounded rectangle, further implying total independence of the center’s location from ξ. So we can keep the same basic curvature design goal and add the constraint that the circular section keep a fixed center of curvature as ξ varies.</p>
          <p>Second, we know that designers don’t want the construction of the squircle corner to be too complicated. Apple’s squircle (after removing the weird tiny straight part) has only one Bézier curve connecting its circular section to the incoming edge, so maybe we can construct the same type of thing?</p>
          <p>Thirdly, we have a somewhat arcane technical constraint which isn’t apparent at the outset, but that becomes a major implementation issue. To approach this, let’s consider a square, 100px by 100px, which has vanilla corner rounding applied for a corner radius of 20px. This means that each side of the square’s perimeter has 60px of straight track. If we flatten the square into a squashed rectangle so that it’s 80px by 100px, then the straight section of the short side will be only 40px long. What happens when we flatten the square so much that we run out of straight section? Or if we flatten it more, so that the rectangle is, say, 20px by 100px? Figma’s present behavior is to figure out the largest value of corner rounding we have room to apply and then draw the shape using that instead. Our 20px by 100px rectangle would thus have 10px of rounding applied.</p>
          <div class="css-1gmtsx3">
            <blockquote class="css-1m2040m">
              <p>If smoothing corners with radius R and parameter ξ consumes p pixels, then the function p(R,ξ) must be invertible to ξ(R,p).</p>
            </blockquote>
          </div>
          <p>Any smoothing process we might use to create a squircle will eat up even more of the straight edge than simple rounding does. Imagine the case above again, a 100px by 100px rectangle, apply 20px of rounding, and then apply some smoothing procedure which removes 12 more pixels from the straight sides. This leaves us with a 36px budget in the straight section for flattening. What happens when flattening the rectangle to 60px by 100px? It seems almost obvious, by analogy, that we should back off the smoothing until the budget is balanced and the straight portion is exactly consumed. But how do we compute the value of ξ which satisfies a specific pixel consumption budget? We must be able to do this quickly or we can’t implement the feature.</p>
          <p>Again, this problem has a very precise mathematical articulation: If smoothing corners with radius R and parameter ξ consumes p pixels, then the function p(R,ξ) must be invertible to ξ(R,p). This is a somewhat hidden constraint which would also have ruled out a high order clothoid series solution.</p>
          <p>Finally, we have a usability constraint, which is that changing the smoothing should actually do something perceptible to the shape. If we yank the smoothing parameter ξ back and forth between zero and one, it better make a visible difference! Imagine we did all this work for something that people can barely see&#8202;—&#8202;it’s unacceptable. This is fundamentally a requirement of usefulness, and as such it’s obviously the strongest constraint.</p>
          <h2 id="keep-it-simple-squircle" class="css-18dxkbz">
            <a href="#keep-it-simple-squircle" class="css-1bs7qd7">Keep it simple, squircle</a>
          </h2>
          <p>Let’s try the most direct thing we can think of that meets the constraints listed above and just try to pick a single parameterized Bézier curve that takes the circular portion and links it up to the straight side. The figure below shows a type of Bézier curve suitable for this purpose:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/13MkZpNGeuAqKG06EgC6iO/b8b7f1094aa0a0e6624e8af9e0868b69/squircles_20.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/13MkZpNGeuAqKG06EgC6iO/b8b7f1094aa0a0e6624e8af9e0868b69/squircles_20.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/13MkZpNGeuAqKG06EgC6iO/b8b7f1094aa0a0e6624e8af9e0868b69/squircles_20.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/13MkZpNGeuAqKG06EgC6iO/b8b7f1094aa0a0e6624e8af9e0868b69/squircles_20.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/13MkZpNGeuAqKG06EgC6iO/b8b7f1094aa0a0e6624e8af9e0868b69/squircles_20.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/13MkZpNGeuAqKG06EgC6iO/b8b7f1094aa0a0e6624e8af9e0868b69/squircles_20.png?w=736"
              alt="squircles 20"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>11.1&#8202;—&#8202;Cubic Bézier control points for the ramp-up part of the squircle</figcaption>
          </figure>
          <p>A few of its properties merit further explanation. First, control points 1, 2 and 3 all fall in a line. This ensures that the curvature at point 1, which connects to the straight part of the squircle, is exactly zero. Generally speaking, if we define a coordinate system and associate point 1 with P1, point 2 with P2, and so on, the curvature at point 1 is given by:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/62KnCjdgSQkkkMI2gYAsku/502fd2e5fbd863c104b72fe01cd35e39/squircles_21.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/62KnCjdgSQkkkMI2gYAsku/502fd2e5fbd863c104b72fe01cd35e39/squircles_21.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/62KnCjdgSQkkkMI2gYAsku/502fd2e5fbd863c104b72fe01cd35e39/squircles_21.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/62KnCjdgSQkkkMI2gYAsku/502fd2e5fbd863c104b72fe01cd35e39/squircles_21.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/62KnCjdgSQkkkMI2gYAsku/502fd2e5fbd863c104b72fe01cd35e39/squircles_21.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/62KnCjdgSQkkkMI2gYAsku/502fd2e5fbd863c104b72fe01cd35e39/squircles_21.png?w=736"
              alt="squircles 21"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>11.2&#8202;—&#8202;Unsimplified curvature at point 1 from figure 11.1</figcaption>
          </figure>
          <p>We can see, reassuringly, that the cross product vanishes when points 1–3 are collinear. This same formula can be applied to point 4 by labeling in reverse; doing so and plugging in the geometry and the labels in the figure gives the following for the curvature there:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/50j31hJBSwooYkEGsa4wAa/8c4db762b4430334675a4be4cf735816/squircles_22.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/50j31hJBSwooYkEGsa4wAa/8c4db762b4430334675a4be4cf735816/squircles_22.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/50j31hJBSwooYkEGsa4wAa/8c4db762b4430334675a4be4cf735816/squircles_22.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/50j31hJBSwooYkEGsa4wAa/8c4db762b4430334675a4be4cf735816/squircles_22.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/50j31hJBSwooYkEGsa4wAa/8c4db762b4430334675a4be4cf735816/squircles_22.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/50j31hJBSwooYkEGsa4wAa/8c4db762b4430334675a4be4cf735816/squircles_22.png?w=736"
              alt="squircles 22"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>11.3 — Simplified curvature at point 4 from figure 11.1</figcaption>
          </figure>
          <p></p>
          <p>Ideally, this would be the same as the curvature of the circular section, or 1/R, which provides us one more constraint. Finally, the values of c and d are fixed by the fact that the end of this curve has to meet the circular portion and be tangent to it where it joins, which means the curvature constraint above just gives us the value of b:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/QzrbyVicSYGeAwGYMWSc4/6c0fb4c6b18295c3ab24c807a100a28f/squircles_23.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/QzrbyVicSYGeAwGYMWSc4/6c0fb4c6b18295c3ab24c807a100a28f/squircles_23.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/QzrbyVicSYGeAwGYMWSc4/6c0fb4c6b18295c3ab24c807a100a28f/squircles_23.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/QzrbyVicSYGeAwGYMWSc4/6c0fb4c6b18295c3ab24c807a100a28f/squircles_23.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/QzrbyVicSYGeAwGYMWSc4/6c0fb4c6b18295c3ab24c807a100a28f/squircles_23.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/QzrbyVicSYGeAwGYMWSc4/6c0fb4c6b18295c3ab24c807a100a28f/squircles_23.png?w=736"
              alt="squircles 23"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>11.4&#8202;—&#8202;Solution for b from figure 11.1 which delivers curvature continuity</figcaption>
          </figure>
          <p>If we find it important to preserve the initial linear increase in curvature (which the ideal clothoid solution featured at point 1) we can set a equal to b, which fixes all of the points on the Bézier curve and gives us a potential solution. Using these observations, we construct a simple Bézier squircle below using a smoothing of ξ = 0.6:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/4oMML8LkqQKQM4CO0eS8aM/1dac80ef877ff55153c1d8f401153102/squircles_24.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/4oMML8LkqQKQM4CO0eS8aM/1dac80ef877ff55153c1d8f401153102/squircles_24.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/4oMML8LkqQKQM4CO0eS8aM/1dac80ef877ff55153c1d8f401153102/squircles_24.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/4oMML8LkqQKQM4CO0eS8aM/1dac80ef877ff55153c1d8f401153102/squircles_24.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/4oMML8LkqQKQM4CO0eS8aM/1dac80ef877ff55153c1d8f401153102/squircles_24.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/4oMML8LkqQKQM4CO0eS8aM/1dac80ef877ff55153c1d8f401153102/squircles_24.png?w=736"
              alt="squircles 24"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
          </figure>
          <p>This looks pretty good, and it takes a lot of cues from the original clothoid calculation. Unfortunately, the variation over the full range, from ξ = 0 to 1 only makes a very subtle difference in the corner shape. Here we’ll show the corner at two zoom levels, with curves for ξ = 0.1, 0.3, 0.5, 0.7, and 0.9 shown in different colors:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/1NjeILUHqMIUeke64SsmAi/d3d0be49709a126bb11c302c31bdc53c/squircles_25.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/1NjeILUHqMIUeke64SsmAi/d3d0be49709a126bb11c302c31bdc53c/squircles_25.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/1NjeILUHqMIUeke64SsmAi/d3d0be49709a126bb11c302c31bdc53c/squircles_25.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/1NjeILUHqMIUeke64SsmAi/d3d0be49709a126bb11c302c31bdc53c/squircles_25.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/1NjeILUHqMIUeke64SsmAi/d3d0be49709a126bb11c302c31bdc53c/squircles_25.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/1NjeILUHqMIUeke64SsmAi/d3d0be49709a126bb11c302c31bdc53c/squircles_25.png?w=736"
              alt="squircles 25"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
          </figure>
          <p>This is a barely noticeable effect despite its nice mathematical properties. It’s certainly closer to being a product than the curve we got by truncating the clothoid series that we considered previously. If we could only tweak the formula a little bit to get some more variation!</p>
          <h2 id="small-strokes-of-sqluck" class="css-18dxkbz">
            <a href="#small-strokes-of-sqluck" class="css-1bs7qd7">Small strokes of sqluck</a>
          </h2>
          <p>We can take one more small step back to figure out how to proceed. Recalling that we need an invertible relationship between pixels consumed in smoothing and the smoothing parameter ξ, we can focus initially on this mapping, make it as simple as possible, and see what comes out when we try to make a parametrization of squircles from it.</p>
          <p>We know something already about how simply rounding the corners consumes pixels. I won’t walk through the trigonometry necessary, but taking a corner of opening angle θ and rounding it to have a radius of R pixels will consume q pixels of the edge from the apex of the corner, with q given as follows:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/5FXkw5IpYkmUE0CSca4UMk/f535bb08928bbf6d2dfcab1d4cb58b60/squircles_26.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/5FXkw5IpYkmUE0CSca4UMk/f535bb08928bbf6d2dfcab1d4cb58b60/squircles_26.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/5FXkw5IpYkmUE0CSca4UMk/f535bb08928bbf6d2dfcab1d4cb58b60/squircles_26.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/5FXkw5IpYkmUE0CSca4UMk/f535bb08928bbf6d2dfcab1d4cb58b60/squircles_26.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/5FXkw5IpYkmUE0CSca4UMk/f535bb08928bbf6d2dfcab1d4cb58b60/squircles_26.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/5FXkw5IpYkmUE0CSca4UMk/f535bb08928bbf6d2dfcab1d4cb58b60/squircles_26.png?w=736"
              alt="squircles 26"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>12.1&#8202;—&#8202;Segment length consumed by rounding</figcaption>
          </figure>
          <p>What if we choose p(R,ξ) based on q in just the simplest possible way, something like:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/2FNnzQnknCuaSa8meGIQcK/e333cfe33750d207fab7a9c271c01e1b/squircles_27.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/2FNnzQnknCuaSa8meGIQcK/e333cfe33750d207fab7a9c271c01e1b/squircles_27.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/2FNnzQnknCuaSa8meGIQcK/e333cfe33750d207fab7a9c271c01e1b/squircles_27.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/2FNnzQnknCuaSa8meGIQcK/e333cfe33750d207fab7a9c271c01e1b/squircles_27.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/2FNnzQnknCuaSa8meGIQcK/e333cfe33750d207fab7a9c271c01e1b/squircles_27.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/2FNnzQnknCuaSa8meGIQcK/e333cfe33750d207fab7a9c271c01e1b/squircles_27.png?w=736"
              alt="squircles 27"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>12.2&#8202;—&#8202;Segment length consumed by rounding and smoothing</figcaption>
          </figure>
          <p>All this means is that our maximum smoothing setting will consume again the length of segment that we consumed in rounding normally. Making this choice would fix the quantity a + b from the figure above. Recall that in any circumstance c and d are firmly fixed, so fixing a + b means there is one final decision to make: how large is a relative to b? Again, if we make the simplest choice, namely a = b, we have determined another modified Bézier parameterization, whose corners and curvatures we show below:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/38GqVeSfDiAesUYiWo2AIO/0cea25d99eda660ffcf62c4752dc437b/squircles_28.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/38GqVeSfDiAesUYiWo2AIO/0cea25d99eda660ffcf62c4752dc437b/squircles_28.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/38GqVeSfDiAesUYiWo2AIO/0cea25d99eda660ffcf62c4752dc437b/squircles_28.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/38GqVeSfDiAesUYiWo2AIO/0cea25d99eda660ffcf62c4752dc437b/squircles_28.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/38GqVeSfDiAesUYiWo2AIO/0cea25d99eda660ffcf62c4752dc437b/squircles_28.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/38GqVeSfDiAesUYiWo2AIO/0cea25d99eda660ffcf62c4752dc437b/squircles_28.png?w=736"
              alt="squircles 28"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>12.3&#8202;—&#8202;Corner shape and curvature profile for simple smoothing scheme</figcaption>
          </figure>
          <p>That visual variation looks promising! The curves look attractive, sanded in a way. However the curvature profile looks pretty rough. If we could just make it a bit less spiky, it might be a serious contender for a product. Despite the poor curvature profile, even this simple family of shapes has a member that looks extremely similar to the Apple version of the squircle, almost close enough to put in front of our users without a bad conscience.</p>
          <p>Now we turn to the curvature profile, our last outstanding problem. Rather than splitting the difference evenly between a and b as we did above, why don’t we give two thirds of the interval to a and the remaining third to b? This will throttle the curvature from increasing too quickly, reducing the long tails on the curvature profile and cutting at the spikes. This modification results in the following shapes:</p>
          <figure class="css-1fy50x0">
            <img
              srcset="//images.ctfassets.net/1khq4uysbvty/587jVI8OrYu2EmmmQsCYQu/bd1ef023035aa25a8db77f706e63ba55/squircles_29.png?w=368 368w, //images.ctfassets.net/1khq4uysbvty/587jVI8OrYu2EmmmQsCYQu/bd1ef023035aa25a8db77f706e63ba55/squircles_29.png?w=491 491w, //images.ctfassets.net/1khq4uysbvty/587jVI8OrYu2EmmmQsCYQu/bd1ef023035aa25a8db77f706e63ba55/squircles_29.png?w=736 736w, //images.ctfassets.net/1khq4uysbvty/587jVI8OrYu2EmmmQsCYQu/bd1ef023035aa25a8db77f706e63ba55/squircles_29.png?w=1104 1104w, //images.ctfassets.net/1khq4uysbvty/587jVI8OrYu2EmmmQsCYQu/bd1ef023035aa25a8db77f706e63ba55/squircles_29.png?w=1472 1472w"
              src="//images.ctfassets.net/1khq4uysbvty/587jVI8OrYu2EmmmQsCYQu/bd1ef023035aa25a8db77f706e63ba55/squircles_29.png?w=736"
              alt="squircles 29"
              sizes="(max-width: 736px) 100vw, 736px"
              class="css-1y33iu"
            />
            <figcaption>12.4&#8202;—&#8202;Corner shape and curvature profile for improved simple smoothing scheme</figcaption>
          </figure>
          <p>The curvature profiles are much improved, the visual degree of variation is still enough for this to be a useful product, ξ = 0.6 just about nails the iOS shape, and the nice visual character of the curves which this stunningly simple approach generates is retained. So we must ask the question&#8202;—&#8202;what’s blocking this from becoming the product? Nothing.</p>
          <h2 id="watching-the-ship-sail" class="css-18dxkbz">
            <a href="#watching-the-ship-sail" class="css-1bs7qd7">Watching the ship sail</a>
          </h2>
          <p>It’s useful here, at the end, to reflect on the process itself. Something I see borne out repeatedly in this story is the power and effectiveness of trying the simplest possible thing. Doing so will, in the worst case, give a baseline for comparison if the simplest thing ends up not working out. Evaluating it in a serious way also shines a light on the most important things we need to consider when refining the approach and moving forward. And in the best cases, like ours, the simplest thing happens to be pretty good already!</p>
          <p>Lastly, there is a meditation on the difference between a good product and a perfect one. I feel some pangs of embarrassment writing this that I was unable to come up with a better curvature profile. I’m sure I could have given more time&#8202;—&#8202;there are many avenues left to explore. Intellectually, it’s somewhat unsatisfying to have gotten such a beautiful result as the clothoid series but not to have been able to at least see a reflection of that in the spline we shipped in the end. But there’s also the wider context&#8202;—&#8202;the constraints of time when working at a small company are very real&#8202;—&#8202;and a design which violates these cannot be considered good.</p>
        </div>

        <h2>资料参考</h2>
        <ul>
          <li>
            <a
              href="https://www.johndcook.com/blog/2018/02/13/squircle-curvature/"
              target="_blank"
            >Apple design, squircles, and curvature</a>
          </li>

          <li>
            <a
              href="https://medium.com/@zubryjs/squircles-bringing-ios-7s-solution-to-rounded-rectangles-to-css-9fc35779aa65"
              target="_blank"
            >Squircles: Bringing iOS 7’s solution to rounded rectangles to CSS</a>
          </li>

          <li>
            <a
              href="http://iamvdo.me/en/blog/smooth-corners-with-css-houdini"
              target="_blank"
            >Smooth corners with CSS Houdini</a>
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
  name: "article",
  data: function() {
    return {
      articleTitle: '11.[译 + 总结]不顾一切找圆角 —— Figma 实时平滑圆角方案探究'
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
