<template>
  <div class="transition-container">
    <img class="hero-image" src='../static/images/fbm/fbm_cover.jpg' alt='hero image'/>
    <div id="center-container" class="center-container">

      <!-- <toc :tocData='contentData'></toc> -->



       <toc tocTitle='FBM 实践与优化心得'>
        <ul class="TableOfContents">
              <li>
                <p><a href="javascript:void(0)" @click="goAnchor('#my_goal')">实践目的</a></p>
                <ul class="TableOfContents">
                  <li>
                    <p><a href="javascript:void(0)" @click="goAnchor('#first_effct')">效果初窥</a></p>
                  </li>
                </ul>
              </li>
              <li>
                <p><a href="javascript:void(0)" @click="goAnchor('#fbm_theory')">分形布朗运动概述</a></p>
                <ul class="TableOfContents">
                  <li>
                    <p><a href="javascript:void(0)" @click="goAnchor('#simplest_wave')">最简单的波</a></p>
                  </li>
                   <li>
                    <p><a href="javascript:void(0)" @click="goAnchor('#wave_add')">波的叠加</a></p>
                  </li>
                  <li>
                    <p><a href="javascript:void(0)" @click="goAnchor('#simplest_fbm')">分型布朗运动算法</a></p>
                  </li>
                  <li>
                    <p><a href="javascript:void(0)" @click="goAnchor('#fbm_2d')">一次 FBM 的二维实现</a></p>
                  </li>
 
                </ul>
              </li>

                <li>
                  <p><a href="javascript:void(0)" @click="goAnchor('#domain_wraping')">Domain Warping —— FBM 的卷曲叠加</a></p>
                  <ul class="TableOfContents">
                    <li>
                      <p><a href="javascript:void(0)" @click="goAnchor('#domain_wraping_intro')">简介</a></p>
                    </li>
                    <li>
                      <p><a href="javascript:void(0)" @click="goAnchor('#domain_wraping_basic')">基础原理</a></p>
                    </li>
                    <li>
                      <p><a href="javascript:void(0)" @click="goAnchor('#domain_wraping_idea')">FBM 卷曲概念</a></p>
                    </li>
                  </ul>
                </li>

              <li>
                <p><a href="javascript:void(0)" @click="goAnchor('#effect_analyze')">效果分析</a></p>
              </li>
              <li>
                <p><a href="javascript:void(0)" @click="goAnchor('#color_channel')">色彩通道</a></p>
              </li>

              <li>
                <p><a href="javascript:void(0)" @click="goAnchor('#warping_compare')">不同次数的卷曲对比</a></p>
              </li>
              <li>
                <p><a href="javascript:void(0)" @click="goAnchor('#warping_compare')">参考</a></p>
              </li>
              <li>
                <p><a href="javascript:void(0)" @click="goAnchor('#chooser')">材质生成器</a></p>
              </li>

        </ul>
      </toc>
      <div id="article-view" class="article-view">
            <h1 id="toc_0">{{articleTitle}}</h1>
            <strong><p><a href="https://github.com/MartinRGB/FBM_Effect_Optimization_Note" target="_blank">项目仓库</a>(后继会上传 web 和 android项目)</p></strong>

            <h2 id="my_goal">实践目的</h2>
            <p>最早开始编写 Shader 启蒙于 <a href="https://play.google.com/store/apps/details?id=com.formisk.aliquidcloud.free&hl=en_US" target="_blank">thebookofshaders</a>，那个时候仅仅能够搭建最基础的平面渲染器，在其中绘制 fragment shader，Shadertoy 和 thebookofshaders 中的效果令我叹为观止，然而性能与功耗，一直是困扰我的问题。在移动端项目探索中，基于图形学效果的交互，无疑是最高级也最高难度的。本文主要总结了实践与教训，提供了一种优化思路，以便日后复习。</p>
            <h3 id="first_effct">效果初窥</h3>
            <GLSL-Component v-if="$route.meta.keepAlive" id ="graphContainer" class="simpleEditor" data='https://gist.githubusercontent.com/MartinRGB/1148c22d7189ec2a78e32beca4ce45fd/raw/8a1642254cb66e5818e7974ba17d114b401b4ac5/fbm_secret.frag'></GLSL-Component>
            <h2 id="fbm_theory">分形布朗运动概述(Source:thebookofshaders)</h2>
            <p>最开始面对这个效果，我一头雾水，但是却被它的形状和效果所吸引。FBM 到底是什么东西呢？仔细研读 thebookofshaders，下面是引用：</p>
            <h3 id="simplest_wave">最简单的波</h3>
            <blockquote>波的两个重要特征是振幅（amplitude）和频率（frequency）。一个简单的线性波（一维）的方程如下：</blockquote>
            <GLSL-Component v-if="$route.meta.keepAlive" id ="graphContainer" class="simpleGraph" :data='waveSnippet1'></GLSL-Component>
            <h3 id="wave_add">波的叠加</h3>
            <blockquote>波的另一个有趣的特性是可以相加，这一特性的正式说法叫叠加性。调一调下面几行代码，注意我们加上那些不同振幅和频率的正弦波的时候，总的波形是如何变化的。</blockquote>
            <GLSL-Component v-if="$route.meta.keepAlive" id ="graphContainer" class="simpleGraph" :data='waveSnippet2'></GLSL-Component>
            <h3 id="simplest_fbm">分型布朗运动算法</h3>
            <blockquote>通过在循环（循环次数为 octaves，一次循环为一个八度）中叠加噪声，并以一定的倍数（lacunarity，间隙度）连续升高频率，同时以一定的比例（gain，增益）降低 噪声 的振幅，最终的结果会有更好的细节。这项技术叫“分形布朗运动（fractal Brownian Motion）”（fBM），或者“分形噪声（fractal noise）”，最简单的实现如下：</blockquote>
            <GLSL-Component v-if="$route.meta.keepAlive" id ="graphContainer" class="simpleGraph" :data='waveSnippet3'></GLSL-Component>
            <h3 id="fbm_2d">一次 FBM 的二维实现</h3>  
            <blockquote>理论上说，如果我们一直继续这个循环，不断地往上叠加噪声，就会得到一个真正的数学意义上的分形。在计算机图形领域，我们能处理的细节总是有极限的，比如物体比一个像素还小的时候，所以没有必要不断地往上叠加来制造分形的形态。有时候我们确实需要叠加很多次，但不必叠加无限次。</blockquote>
            <GLSL-Component v-if="$route.meta.keepAlive" id ="graphContainer" class="simpleEditor" data='https://gist.githubusercontent.com/MartinRGB/1148c22d7189ec2a78e32beca4ce45fd/raw/a4b95ac84d5f1d2289c2c8a39631f1337dedab9b/simplest_fbm.frag'></GLSL-Component>
            <br>
            <hr>
            <p>仔细阅读之后，便对 FBM 有了初步的了解，这个效果也即是设计师 AE 中的「分型杂色」，基于「分型杂色」效果器，可以作出很多自然效果的模拟。</p>
            <h2 id="domain_wraping">Domain Warping —— FBM 的卷曲叠加(Source:inigo quilez)</h2>
            <p>下面开始理解 FBM 叠加的概念，继续搬书。</p>
            <h3 id="domain_wraping_intro">简介</h3>
            <p>「卷曲」或者「区域扭曲」是图形学中 程序生成 材质和形体的通用手段。通常会使用这种技巧来挤压、拉伸、扭曲、弯折、加厚、变形物体。 </p>
            <p>只要你的图案或者几何体是通过空间函数定义的，便都可以采用卷曲效果。 </p>  
            <p>本文介绍的效果是一种特殊的弯曲效果，基于噪音的卷曲方法。</p>
            <img data-action="zoom" src='../static/images/fbm/domain_warping.jpg' alt="img0"/>      
            <p><caption style="">f(p) = fbm( p + fbm( p + fbm( p ) ) )</caption></p>
            <h3 id="domain_wraping_basic">基础原理</h3>
            <p>如果你的几何体或者图像效果是基于空间函数定义的。那么定义几何体需要 <i>f(x,y,z)</i> 的方式定义，图像需要 <i>f(x,y)</i> 的方式定义，我们可以将这两种定义方法 统一归类为 <i><b>f(p)</b></i>,这个函数中的 <i>p</i> 指的是位置坐标信息，定义了是空间中 几何体或者图像的体积密度。</p>
            <p>那么我们用来卷曲的函数叫 <i><b>g(p)</b></i>，我们必须在空间函数 f 执行之前进行卷曲。因此 <i>f(p) -> f(g(p))</i>。一般来说，卷曲不会太离谱，我们需要一定程度上保持物体原本的样子，因此一般来说，卷曲函数是 1.<b>基于 <i>p </i>原值的基础上</b>，2.<b>添加一个小幅度的卷曲 <i>h(p)</i></b></p>
            <i>g(p) = p + h(p)</i>
            <p>那么整体空间函数就变成了</p>
            <i>f( p + h(p) )</i>
            <p>这个方法很实用，可以用来给很多东西增加卷曲效果。下面我们主要讲基于 FBM 的图形卷曲。通过卷曲方法会产生美丽、有机的图像。</p>
            <h3 id="domain_wraping_idea">FBM 卷曲概念</h3>
            <p>1. 最简单的 fbm 效果的函数如下：</p>
            <snippet-component v-if="$route.meta.keepAlive" lan='glsl'>  float pattern( in vec2 p )
  {
    return fbm( p );
  }</snippet-component>
            <img data-action="zoom" src='../static/images/fbm/fbm1.jpg' alt="img1"/>
            <p><caption style="">f(p) = fbm(p)</caption></p>    

            <p>2. 在此基础上进行第一次卷曲：</p>

            <snippet-component v-if="$route.meta.keepAlive" lan='glsl'>  float pattern( in vec2 p )
  {
    vec2 q = vec2( fbm( p + vec2(0.0,0.0) ),
                   fbm( p + vec2(5.2,1.3) ) );

    return fbm( p + 4.0*q );
  }
</snippet-component>
            <img data-action="zoom" src='../static/images/fbm/fbm2.jpg' alt="img2"/>
            <p><caption style="">f(p) = fbm(p + fbm(p))</caption></p>    

            <p>3. 在此基础上进行第二次卷曲：</p>

            <snippet-component v-if="$route.meta.keepAlive" lan='glsl'>  float pattern( in vec2 p )
  {
      vec2 q = vec2( fbm( p + vec2(0.0,0.0) ),
                     fbm( p + vec2(5.2,1.3) ) );

      vec2 r = vec2( fbm( p + 4.0*q + vec2(1.7,9.2) ),
                     fbm( p + 4.0*q + vec2(8.3,2.8) ) );

      return fbm( p + 4.0*r );
  }</snippet-component>
            <img data-action="zoom" src='../static/images/fbm/fbm3.jpg' alt="img2"/>
            <p><caption style=""> fbm(p + fbm(p + fbm(p)))</caption></p>   
            <br>
            <hr>
            <p>搬书到此结束，到这里已经获取了分析效果所需要的所有知识。</p>
            <h2 id="effect_analyze">效果分析</h2>
            <p>random、noise、fbm 函数上面已经有清晰的解释，这里不再赘述，这里主要分析 main 函数</p>
            <p>开头逐个取逐个像素点，然后正餐开始了：</p>
            <p>1.构建分型布朗运动</p>
            <snippet-component v-if="$route.meta.keepAlive" lan='glsl'>    vec2 q = vec2(0.);
    q.x = fbm( st + 0.00*u_time);
    q.y = fbm( st + vec2(1.0));</snippet-component>
            <p>2.FBM 一次卷曲</p>
            <snippet-component v-if="$route.meta.keepAlive" lan='glsl'>    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time );
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time);</snippet-component>
            <p>3.FBM 二次卷曲</p>
            <snippet-component v-if="$route.meta.keepAlive" lan='glsl'>  float f = fbm(st+r);</snippet-component>
            <p>现在开始利用三种效果（FBM、一次 FBM 卷曲、二次 FBM 卷曲）进行混合着色。</p>
            <img data-action="zoom" src='../static/images/fbm/fbm_phase.jpg' alt="img1"/>
            <p>4.（阶段1）提取 FBM 二次卷曲图像的明暗值，映射到黄绿并色彩混合</p>
            <snippet-component v-if="$route.meta.keepAlive" lan='glsl'>      color = mix(vec3(0.101961,0.619608,0.666667),
                vec3(0.666667,0.666667,0.498039),
                clamp((f*f)*4.0,0.0,1.0));</snippet-component>

            <p>5.（阶段2）提取 FBM 效果图像的明暗值，映射到上一个颜色结果和高光区域</p>
            <snippet-component v-if="$route.meta.keepAlive" lan='glsl'>      color = mix(color,
                vec3(0,0,0.164706),
                clamp(length(q),0.0,1.0));</snippet-component>

            <p>6.（阶段3）提取 FBM 一次卷曲效果 x 分量图像的明暗值，映射到上一个颜色结果和阴影区域</p>
            <snippet-component v-if="$route.meta.keepAlive" lan='glsl'>     color = mix(color,
                vec3(0.666667,1,1),
                clamp(length(r.x),0.0,1.0));</snippet-component>

            <p>7.（阶段4）利用 FBM 二次卷曲效果与上述结果颜色交集，提高对比度</p>
            <snippet-component v-if="$route.meta.keepAlive" lan='glsl'>     gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.);</snippet-component>

            <h2 id="color_channel">色彩通道</h2>
            <p>基于上面的方法，进行一定的自定义，便可以制作出绚丽的三维烟雾模拟。</p>
            <p>WebGL 跑 PC端 当然是没问题了，然而尝试移植到 Android 端，问题来了，Pixel by Pixel 的计算方式对于相对孱弱的移动端硬件来说，是性能与功耗的挑战。因此必须想办法进行优化，这是最难的。</p>
            <p>最开始是使用 java + gles，后来尝试了 cpp + gles | cpp + vulkan 的组合，然而收效甚微，毕竟问题主要是 Shader 的优化。直到我发现了这个应用并进行反编译学习，渐渐发现了一些门路：</p>
            <img data-action="zoom" src='../static/images/fbm/liquid_cloud.jpg' alt="img1"/>
            <p>这个应用主要使用 Rajawali 开源 GLES 框架开发，然而主要还是 Shader，我发现它可以在 GPU 很低端的机型上也可以跑满 60fps，查阅代码后发现了主要是通过读取材质来进行着色，忽略了 noise 和 fbm 的处理。———— 也就是说，开发者将 noise 和 fbm 算法储存在图像中，然后只需要读取着色即可。</p>
            <img data-action="zoom" src='../static/images/fbm/fbm_decompile.jpg' alt="img1"/>
            <p>上图主要使用的 RGB 通道分离算法主要使用了 Multiply混合模式</p>
            <snippet-component v-if="$route.meta.keepAlive" lan='glsl'>     #define BlendMultiply(base, blend)      (base * blend)</snippet-component>
            <p>因此：</p>
            <i> BlendMultiply(原图, 纯红) -> 红色通道</i>
            <br>
            <i> BlendMultiply(原图, 纯绿) -> 绿色通道</i>
             <br>
            <i> BlendMultiply(原图, 纯蓝) -> 蓝色通道</i>
            <p>可以观测到这个应用使用的是三个 FBM 效果进行 RGB 通道 Lighten 混合后的材质。</p>
            <p>根据之前的分析，我们主要是用了 q | r.x | f*f 进行色彩混合</p>
            <p>那么完全可以 <b>要把这三个效果图像提取出来，</b>。分别用 RGB 通道来表示，并利用 Lighten 进行混合，Lighten 的公式为：</p>
            <snippet-component v-if="$route.meta.keepAlive" lan='glsl'>     #define BlendLightenf(base, blend)      max(blend, base)</snippet-component>
            <p>直接在 Shader 中生成 RGB 混合图像</p>
            <snippet-component v-if="$route.meta.keepAlive" lan='glsl'>     gl_FragColor = vec4(BlendLightenf(BlendLightenf(q.y*GREEN,r.x*RED),f*BLUE),1.);</snippet-component>
            <p>得到结果如下：</p>
            <img data-action="zoom" src='../static/images/fbm/blend_output.png' alt="img1"/>
            <p>那么利用这张图像，采样获取三个通道后分别着色,源码如下：（可以看到仅仅是 fbm 替换为 texture2D，同时对采样坐标比例进行了缩小以便获取更多细节）</p>
            <snippet-component v-if="$route.meta.keepAlive" lan='glsl'>// Author @MartinRGB - 2019

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
varying vec2 v_texcoord;
uniform sampler2D u_tex;

#define texScale 4.

void main() {
    vec2 st = v_texcoord*4.;
    // st += st * abs(sin(u_time*0.1)*3.0);
    vec3 color = vec3(0.0);

    vec2 q = vec2(0.);
    q.x = texture2D(u_tex, (st + 0.00*u_time)/texScale).x;
    q.y = texture2D(u_tex, (st + vec2(1.0))/texScale).x;

    vec2 r = vec2(0.);
    r.x = texture2D(u_tex, (st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time )/texScale).y;
    r.y = texture2D(u_tex, (st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time)/texScale).y;

    float f = texture2D(u_tex,(st+r)/texScale).z;

    color = mix(vec3(0.101961,0.619608,0.666667),
                vec3(0.666667,0.666667,0.498039),
                clamp((f*f)*4.0,0.0,1.0));

    color = mix(color,
                vec3(0,0,0.164706),
                clamp(length(q),0.0,1.0));

    color = mix(color,
                vec3(0.666667,1,1),
                clamp(length(r.x),0.0,1.0));

    gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.);
}
</snippet-component>
          <p>下面展示录屏对比，左面为材质法，右面为逐像素计算法，视频细节有损失，建议 glslEditor 中查看</p>
            <video src="../static/images/fbm/foggy_compare.mp4" controls="controls">
您的浏览器不支持 video 标签。
</video>
          <p>由此可见，这个方法是一个非常高效的方法，节省了大量的计算开销。(移动端对比下次介绍）</p>

            <h2 id="warping_compare">不同次数的卷曲对比</h2>
            <P>回顾一下，那么这个效果的原理是</p>
            <ul>
              <li><p>FBM 效果结合到 R 通道</p></li>
              <li><p>FBM 一次卷曲效果结合到 G 通道</p></li>
              <li><p>FBM 二次卷曲效果结合到 B 通道</p></li>
              <li><p>RGB通道混合三张图像</p></li>
              <li><p>利用图像采样获取噪音和 FBM 算法，进行高性能卷曲混合着色</p></li>
            </ul>
            <p>那么如果三个通道使用不同的 FBM 效果组合，又会怎样呢？这里我继续进行了一些实验。</p>
            <img data-action="zoom" src='../static/images/fbm/experiment.png' alt="img1"/>

            <p>还是非常有趣的！如果精心编写着色器代码进行调色，效果会更上一层台阶。</p>
            <h2 id="reference">参考</h2>
            <p><a href="https://thebookofshaders.com/13/?lan=ch" target="_blank">Fractal Brownian Motion</a> —— 理解 FBM 概念与原始效果</p>
            <p><a href="http://iquilezles.org/www/articles/warp/warp.htm" target="_blank">Domain Warping</a> —— 理解 FBM 卷曲次数</p>
            <p><a href="https://play.google.com/store/apps/details?id=com.formisk.aliquidcloud.free&hl=en_US" target="_blank">A Liquid Cloud</a> —— 逆向分析研究材质背后的算法</p>
            <p><a href="https://github.com/patriciogonzalezvivo/thebookofshaders/blob/master/16/blend.frag" target="_blank">Blend Mode</a> —— 图像混合的原理</p>
            <br>
            <p>感谢上述资料的作者给予的思考和指导。第二篇将总结 Android 移植和优化心得。</p>
            <h2 id="chooser">材质生成器</h2>
            <p>最后补充一个材质生成器 0 ~ 8 </p>
            <snippet-component v-if="$route.meta.keepAlive" lan='glsl'>// Author @MartinRGB - 2019

#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// ---------------------------- Util ----------------------------
#define BlendMultiply(base, blend)      (base * blend)
#define BlendLightenf(base, blend)      max(blend, base)
#define RED vec3(1.,0.,0.)
#define GREEN vec3(0.,1.,0.)
#define BLUE vec3(0.,0.,1.)


// ---------------------------- Para Setting ----------------------------
#define uBrightness 0.0
#define uGamma 1.0
#define uContrast 1.0

#define enableColorAdjust true
#define loop false
//0 ~ 8
#define texMode 0


#define col1Offset1 vec2(10.)
#define col1Offset2 vec2(-10.)
#define col2Offset1 vec2(50.)
#define col2Offset2 vec2(50.)
#define col3Offset1 vec2(0.)
#define col3Offset2 vec2(-200.)

// ---------------------------- Tex Chooser ----------------------------

#define texOutputMethod ((loop == false) ? texMode : int((sin(u_time/2.)+1.)/2.*8.))


// ---------------------------- ColorAdjust ----------------------------

vec3 brightnessContrast(vec3 value, float brightness, float contrast)
{
    return (value - 0.5) * contrast + 0.5 + brightness;
}

vec3 Gamma(vec3 value, float param)
{
    return vec3(pow(abs(value.r), param),pow(abs(value.g), param),pow(abs(value.b), param));
}

// ---------------------------- Method1 ----------------------------

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 8

float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

vec2 getQ(in vec2 st,in vec2 offset){
    vec2 q = vec2(0.);
    q.x = fbm( st + offset);
    q.y = fbm( st + vec2(1.0));
    return q;
}

vec2 getR(in vec2 st,in vec2 offset1,in vec2 offset2){
    vec2 q = vec2(0.);
    q.x = fbm( st + offset1);
    q.y = fbm( st + vec2(1.0));
    
    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15 * 4.);
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.15 * 4. + offset2);
    return r;
}

float getF(in vec2 st,in vec2 offset1,in vec2 offset2,in vec2 offset3){
    vec2 q = vec2(0.);
    q.x = fbm( st + offset1);
    q.y = fbm( st + vec2(1.0));
    
    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15 * 4.);
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.15 * 4. + offset2);
    
    float f = fbm(st + r + offset3);
    return f;
}

vec3 method1(in vec2 st){
    
    // ### Change Coord Mapping & Offset
    vec3 color = vec3(0.0);

    vec2 q = vec2(0.);
    q.x = fbm( st + col1Offset1);
    q.y = fbm( st + vec2(1.0));

    
    
    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15 * 4.);
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.15 * 4. + col1Offset2);

    float f = fbm(st + r + col2Offset1);
    
    
    color = BlendLightenf(BlendLightenf(r.x*GREEN,q.y*RED),f*BLUE);
    
    

    
    if(enableColorAdjust == true){
        color.r = clamp(color.r, 0.0, 0.7);
        color.g = clamp(color.g, 0.0, 0.9);
        color = brightnessContrast(color, -uBrightness, uContrast);
        color = Gamma(color, uGamma);
    }

    return color;
}

vec3 method1Extend(in vec2 st,in int method){
    vec3 color = vec3(0.0);
    if(method == 3)
    	color = BlendLightenf(BlendLightenf(getQ(st,col1Offset1).x*GREEN,getQ(st,col3Offset1).x*RED),getQ(st,col3Offset1).y*BLUE);
    if(method == 4)
    	color = BlendLightenf(BlendLightenf(getR(st,col1Offset1,col1Offset2).y*GREEN,getR(st,col2Offset1,col2Offset2).x*RED),getR(st,col3Offset1,col3Offset2).y*BLUE);
    if(method == 5)
    	color = BlendLightenf(BlendLightenf(getF(st,col1Offset1,col1Offset2,col2Offset1)*GREEN,getF(st,col2Offset1,col2Offset2,col3Offset1)*RED),getF(st,col3Offset1,col3Offset2,col1Offset1)*BLUE);
    
    if(enableColorAdjust == true){
        color.r = clamp(color.r, 0.0, 0.7);
        color.g = clamp(color.g, 0.0, 0.9);
        color = brightnessContrast(color, -uBrightness, uContrast);
        color = Gamma(color, uGamma);
    }
 	return color;
}

// ---------------------------- Method2 ----------------------------

vec3 method2FinColor(in vec2 st,in vec2 offset1, in vec2 offset2){

    vec3 color = vec3(0.0);
    
 	vec2 q = vec2(0.);
    q.x = fbm( st + offset1);
    q.y = fbm( st - offset1);
    
    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2) + offset2);
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8) - offset2);

    float f = fbm(st+r);
    
    color = mix(vec3(0.101961,0.619608,0.666667),
                vec3(0.666667,0.666667,0.498039),
                clamp(length(f*f)*1.0,0.0,1.0));
    
  	color = mix(color,vec3(0,0,0.164706),
                clamp(length(q.y),0.0,1.0));
    
    color = mix(color,vec3(0.666667,1,1),
                clamp(length(r.x),0.0,1.0));
    
    color = (f*f*f+.6*f*f+.5*f)*color;
    
    if(enableColorAdjust == true){
        color.r = clamp(color.r, 0.0, 0.7);
        color.g = clamp(color.g, 0.0, 0.9);

        color = brightnessContrast(color, -uBrightness, uContrast);
        color = Gamma(color, uGamma);
    
    }
    
    return color;
    
}

vec3 method2(in vec2 st){

    // ### Change Coord Mapping & Offset
    vec3 color1 = method2FinColor(st,col1Offset1,col1Offset2);
    vec3 color2 = method2FinColor(vec2(st.x,1.-st.y),col2Offset1,col2Offset2);
    vec3 color3 = method2FinColor(vec2(1.-st.x,st.y),col3Offset1,col3Offset2);
    
    vec3 color = BlendLightenf(BlendLightenf(color1*GREEN,color2*RED),color3*BLUE);
    
    return color;
}


// ---------------------------- Method3 ----------------------------


float pattern0( in vec2 p )
{
	return fbm( p );
}

float pattern1( in vec2 p )
{
    vec2 q = vec2( fbm( p + vec2(0.0,0.0) ),
                   fbm( p + vec2(5.2,1.3) ) );

    return fbm( p + 4.0*q );
}

float pattern2( in vec2 p )
{
    vec2 q = vec2(fbm( p + vec2(0.0,0.0) ),fbm( p + vec2(5.2,1.3) ) );

    vec2 r = vec2(fbm( p + 4.0*q + vec2(1.7,9.2) ),fbm( p + 4.0*q + vec2(8.3,2.8) ) );

    return fbm( p + 4.0*r );
}

vec3 method3FinColor(in vec2 st,vec2 offset1,vec2 offset2){
    vec3 color = vec3(0.0);

    vec2 q = vec2(0.);
	q = vec2(pattern0(st ));

    
    vec2 r = vec2(0.);
    r= vec2(pattern1(st + offset1));


    float f = (fbm(st+r + offset2));
    
 	color = mix(vec3(0.101961,0.619608,0.666667),
                vec3(0.666667,0.666667,0.498039),
                clamp(length(f*f)*4.0,0.0,1.0));
    
  	color = mix(color,vec3(0,0,0.164706),
                clamp(length(q.y),0.0,1.0));
    
    color = mix(color,vec3(0.666667,1,1),
                clamp(length(r.x),0.0,1.0));
    

    if(texOutputMethod == 6)
        color = (pattern0(st + offset1))*color;
    else if(texOutputMethod == 7)
        color = (pattern1(st + offset1))*color;
    else if(texOutputMethod == 8)
        color = (pattern2(st + offset1))*color;
    else
        color = (f*f*f+.6*f*f+.5*f)*color;
    
    
    
    
    if(enableColorAdjust == true){
        color.r = clamp(color.r, 0.0, 0.7);
        color.g = clamp(color.g, 0.0, 0.9);

        color = brightnessContrast(color, -uBrightness, uContrast);
        color = Gamma(color, uGamma);
    
    }
    return color;
}


vec3 method3(in vec2 st){
   
    // ### Change Coord Mapping & Offset
    vec3 color1 = method3FinColor(st,col1Offset1,col1Offset2);
    vec3 color2 = method3FinColor(vec2(st.x,1.-st.y),col2Offset1,col2Offset2);
    vec3 color3 = method3FinColor(vec2(1.-st.x,st.y),col3Offset1,col3Offset2);
    
    vec3 color = BlendLightenf(BlendLightenf(BlendMultiply(color1,GREEN),BlendMultiply(color2,RED)),
                                                           BlendMultiply(color3,BLUE));
    
    return color;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.y*4.;
    
    if(texOutputMethod == 0)
        gl_FragColor = vec4(method1(st),1.);
    else if (texOutputMethod == 1)
        gl_FragColor = vec4(method2(st),1.);
    else if (texOutputMethod == 2)
        gl_FragColor = vec4(method3(st),1.);
	else if (texOutputMethod == 3)
        gl_FragColor = vec4(method1Extend(st,3),1.);
	else if (texOutputMethod == 4)
    	gl_FragColor = vec4(method1Extend(st,4),1.);
 	else if (texOutputMethod == 5)
    	gl_FragColor = vec4(method1Extend(st,5),1.);
    else if (texOutputMethod == 6)
    	gl_FragColor = vec4(method3(st),1.);
    else if (texOutputMethod == 7)
    	gl_FragColor = vec4(method3(st),1.);
    else if (texOutputMethod == 8)
    	gl_FragColor = vec4(method3(st),1.);
    //gl_FragColor = gl_FragColor*vec4(BLUE,1.);
    
}
</snippet-component>


      </div>
    </div>
  </div>
</template>

<script>
  import ToolTip from '@/components/ToolTip'
  import Toc from '@/components/Toc'
  import GLSLComponent from '@/components/GLSLComponent'
  import waveFile1 from '../static/codesnippets/waveGraph1.frag'
  import waveFile2 from '../static/codesnippets/waveGraph2.frag'
  import waveFile3 from '../static/codesnippets/waveGraph3.frag'
  import SnippetComponent from '@/components/SnippetComponent'

  export default {
    name: 'Visualizing_RK4',
    data: function () {return {
      articleTitle:'9.[总结]FBM 实践与优化心得 (上） —— WebGL 篇',
      waveSnippet1:waveFile1,
      waveSnippet2:waveFile2,
      waveSnippet3:waveFile3,

    }},
    components: {ToolTip,Toc,GLSLComponent,SnippetComponent},
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
caption {
    letter-spacing: 0.0em;
    font-style: italic;
}
video{
  max-width: 100%;
}

</style>
