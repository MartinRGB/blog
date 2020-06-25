<template>
  <div class="transition-container">
    <img class="hero-image" src='../static/images/smooth_corners/sketch_corners_cover.png' alt='hero image'/>
    <div id="center-container" class="center-container">
        <toc tocTitle='Sketch 平滑圆角绘制'>
        <ul class="TableOfContents">
              <li>
                <p><a href="javascript:void(0)" @click="goAnchor('#static_method')">固定绘制</a></p>
                <ul class="TableOfContents">
                  <li>
                    <p><a href="javascript:void(0)" @click="goAnchor('#pure_static')">纯静态素材</a></p>
                  </li>
                  <li>
                    <p><a href="javascript:void(0)" @click="goAnchor('#avd_method')">Animated Vector Drawable 动画</a></p>
                    <ul class="TableOfContents">
                      <li><p><a href="javascript:void(0)" @click="goAnchor('#svg_morph')">SVG Morphing Test in Web</a></p></li>
                      <li><p><a href="javascript:void(0)" @click="goAnchor('#avd_morph_android')">AVD Morphing Test in Android</a></p></li>
                    </ul>
                  </li>
                  <li><p><a href="javascript:void(0)" @click="goAnchor('#static_question')">问题</a></p>
                  </li>
                </ul>
              </li>
              <li>
                 <p><a href="javascript:void(0)" @click="goAnchor('#dynamic_method')">动态绘制</a></p>
                  <ul class="TableOfContents">
                      <li><p><a href="javascript:void(0)" @click="goAnchor('#ios_round')">iOS 圆角的算法窥探</a></p></li>
                      <li><p><a href="javascript:void(0)" @click="goAnchor('#squircle_round')">超椭圆圆角算法</a></p></li>
                      <li><p><a href="javascript:void(0)" @click="goAnchor('#sketch_round')">Sketch 圆角算法的推理</a></p></li>       
                      <li><p><a href="javascript:void(0)" @click="goAnchor('#web_demo')">Web Demo</a></p></li>      
                      <li><p><a href="javascript:void(0)" @click="goAnchor('#android_implementaion')">Android 实现</a></p></li>   
                      <li><p><a href="javascript:void(0)" @click="goAnchor('#dynamic_question')">问题</a></p></li>              
                  </ul>
              </li>
              <li>
                 <p><a href="javascript:void(0)" @click="goAnchor('#reference')">资料参考</a></p>
              </li>
        </ul>
      </toc>
      <div id="article-view" class="article-view">
          <h1 id="toc_0">{{articleTitle}}</h1>
           <strong>
             <p><a href="https://github.com/MartinRGB/sketch-smooth-corner-android" target="_blank">Android 项目仓库</a></p>
              <p><a href="https://github.com/MartinRGB/sketch-smooth-corner-web" target="_blank">Web 项目仓库</a></p><br>
           </strong>

          <p>本文主要介绍了设计软件 Sketch 中平滑圆角的绘制方法，以安卓绘制方法探究为主，Web Canvas 主要作为快速调研的工具。 </p>
          <p>Android 圆角的绘制主要有以下两种方法</p>
          <h2 id="static_method">固定绘制</h2>
          <h3 id="pure_static">纯静态素材</h3>
          <ul>
            <li>使用 Sketch 52+ 版本，导出 SVG（支持平滑圆角）转化为 XML 提供给开发</li>
            <li>切图提供 .9png</li>
          </ul>
          <h3 id="avd_method">Animated Vector Drawable 动画</h3>
          <p>SVG动画 => AnimatedVectorDrawable XML 推荐使用 <a href="https://shapeshifter.design/" target="_blank">Shape Shifter</a> ，同时也可以将 SVG 转换为 VectorDrawable XML</p>
          <img data-action="zoom" src='../static/images/smooth_corners/sc_1.png' alt="img0"/>  
          <p><caption style="">注意：因为是矢量绘制格式，因此 导入到 Shape Shifter 里面的素材必须以 dp 为单位尺寸，不能以 px 为单位尺寸（例如 1080×2340 => 360×780 的画板，然后导出 svg 再导入 Shape Shifter)</caption></p>

          <h4 id="svg_morph">SVG Morphing Test in Web</h4>

          <iframe src='http://www.martinrgb.com/blog/static/page/svg-morphing/index.html' scrolling='no'></iframe>
          
          <h4 id="avd_morph_android">AnimatedVectorDrawable Morphing Test in Android</h4>
          <p>效果同上，Android 项目下载：<a :href='avd_morphing'>avd_morphing</a></p>
          <h3>问题</h3>
          <ul id="static_question">
            <li>目前尚没有办法在 AE 中实现平滑圆角，需要表达式支持</li>
            <li>尚没有提供复杂圆角动画的方法，Shape Shifter 只能做简单效果。</li>
          </ul>
          <h2  id="dynamic_method">动态绘制</h2>
          <p>上述提到的固定绘制方法，效果不可控，而且动画已经被定义好，若想动态绘制，需要在 canvas 中自行绘制。</p>
          <h3 id="ios_round">iOS 圆角</h3>
          <p>通过资料，获取 iOS 圆角的数学公式如下</p>
          <img data-action="zoom" src='../static/images/smooth_corners/sc_2.png' alt="img0"/>
          <p>Javascript 绘制方法如下</p>
          <collapse-component>    
          <snippet-component v-if="$route.meta.keepAlive" lan='javascript'>paint(ctx, size) {
    ctx.fillStyle = 'black'

    // n=4 时，绘制一个方圆形
    const n = 4

    let m = n
    if (n > 100) m = 100
    if (n < 0.00000000001) m = 0.00000000001
    const r = size.width / 2
    const w = size.width / 2
    const h = size.height / 2

    ctx.beginPath();

    for (let i = 0; i < (2*r+1); i++) {
      const x = (i-r) + w
      const y = (Math.pow(Math.abs(Math.pow(r,m)-Math.pow(Math.abs(i-r),m)),1/m)) + h

      if (i == 0)
        ctx.moveTo(x, y)
      else
        ctx.lineTo(x, y)
    }

    for (let i = (2*r); i < (4*r+1); i++) {
      const x = (3*r-i) + w
      const y = (-Math.pow(Math.abs(Math.pow(r,m)-Math.pow(Math.abs(3*r-i),m)),1/m)) + h
      ctx.lineTo(x, y)
    }

    ctx.closePath()
    ctx.fill()
  }</snippet-component>  
          </collapse-component>    
          <h3 id="squircle_round">超椭圆角</h3>
          <img data-action="zoom" src='../static/images/smooth_corners/sc_3.png' alt="img0"/>
          <p>另一个变种的绘制方法 JS 代码如下</p>
           <snippet-component v-if="$route.meta.keepAlive" lan='javascript'>const squircle = radius => theta => ({
  x: Math.pow(Math.abs(Math.cos(theta)), 2 / radius) * 50 * Math.sign(Math.cos(theta)) + 50,
  y: Math.pow(Math.abs(Math.sin(theta)), 2 / radius) * 50 * Math.sign(Math.sin(theta)) + 50
});</snippet-component>           
          <h3 id="sketch_round">Sketch 平滑圆角算法的推理</h3>
          <p>我们可以通过代码发现，上述两种绘制算法，都需要寻着圆周不断计算，若想保证边缘线条的平滑，要不断增加计算次数，可能会影响性能</p>
          <p>通过在 Sketch 中将不同 Radius 的平滑圆角 Flatten，获取贝塞尔曲线，发现每个圆角由<b>三段三次贝塞尔曲线构成</b>，而且位置信息跟半径有一定的规律</p>
          <img data-action="zoom" src='../static/images/smooth_corners/sc_4.jpg' alt="img0"/>
          <p><caption style="">实际上，sketch的圆角在大于 50% 最大半径后，上面的 val 的趋势会递减，然而移动端绘制的图形尺寸有限，产生的误差可以忽略不计</caption></p>
          <p>Javscript 绘制代码如下</p>
          <collapse-component>    
          <snippet-component v-if="$route.meta.keepAlive" lan='javascript'>const drawRealRoundRect = (ctx, size, r, posX, posY,tl,tr,bl,br) => {
  posX -= size.width / 2
  posY -= size.height / 2

  ctx.beginPath();

  if(size.width == size.height && r == size.width/2){
    ctx.arc(posX  + size.width/2, posY + size.height/2, r, 0, 2 * Math.PI, false);
  }
  else{
    ctx.moveTo(posX + size.width/2 , posY);
    if(!tr){
      ctx.lineTo(posX + size.width, posY);
    }
    else{

      ctx.lineTo(posX + Math.max(size.width/2,size.width - r/100*128.19), posY);
      ctx.bezierCurveTo(posX + size.width - r/100*83.62, posY,posX + size.width - r/100*67.45,posY + r/100*4.64, posX + size.width - r/100*51.16, posY + r/100*13.36);
      ctx.bezierCurveTo(posX + size.width - r/100*34.86, posY + r/100*22.07,posX + size.width - r/100*22.07,posY + r/100*34.86, posX + size.width - r/100*13.36, posY + r/100*51.16);
      ctx.bezierCurveTo(posX + size.width - r/100*4.64, posY + r/100*67.45,posX + size.width,posY + r/100*83.62, posX + size.width, posY + Math.min(size.height/2,r/100*128.19));
    }



    if(!br){
      ctx.lineTo(posX + size.width, posY + size.height);
    }
    else{
      ctx.lineTo(posX + size.width, posY + Math.max(size.height/2,size.height - r/100*128.19));
      ctx.bezierCurveTo(posX + size.width, posY + size.height - r/100*83.62,posX + size.width - r/100*4.64,posY + size.height - r/100*67.45, posX + size.width - r/100*13.36, posY + size.height -  r/100*51.16);
      ctx.bezierCurveTo(posX + size.width - r/100*22.07, posY + size.height - r/100*34.86,posX + size.width - r/100*34.86,posY + size.height - r/100*22.07, posX + size.width - r/100*51.16, posY + size.height - r/100*13.36);
      ctx.bezierCurveTo(posX + size.width - r/100*67.45, posY + size.height - r/100*4.64,posX + size.width - r/100*83.62,posY + size.height, posX + Math.max(size.width/2,size.width - r/100*128.19), posY + size.height);

    }

    if(!bl){
      ctx.lineTo(posX, posY + size.height);
    }
    else{
      ctx.lineTo(posX + Math.min(size.width/2,r/100*128.19), posY + size.height);
      ctx.bezierCurveTo(posX +  r/100*83.62, posY + size.height,posX + r/100*67.45,posY + size.height - r/100*4.64, posX + r/100*51.16, posY + size.height -  r/100*13.36);
      ctx.bezierCurveTo(posX +  r/100*34.86, posY + size.height - r/100*22.07,posX + r/100*22.07,posY + size.height - r/100*34.86, posX + r/100*13.36, posY + size.height - r/100*51.16);
      ctx.bezierCurveTo(posX  + r/100*4.64, posY + size.height - r/100*67.45,posX ,posY + size.height - r/100*83.62, posX , posY + Math.max(size.height/2,size.height - r/100*128.19));
    }

    if(!tl){
      ctx.lineTo(posX, posY);
    }
    else{
      ctx.lineTo(posX, posY + Math.min(size.height/2,r/100*128.19));
      ctx.bezierCurveTo(posX, posY + r/100*83.62,posX + r/100*4.64,posY + r/100*67.45, posX + r/100*13.36, posY + r/100*51.16);
      ctx.bezierCurveTo(posX +  r/100*22.07, posY + r/100*34.86,posX + r/100*34.86,posY +  r/100*22.07, posX + r/100*51.16, posY + r/100*13.36);
      ctx.bezierCurveTo(posX  + r/100*67.45, posY +  r/100*4.64,posX + r/100*83.62 ,posY, posX + Math.min(size.width/2,r/100*128.19), posY);
      
    }
    
    
    ctx.closePath();      
  }
}</snippet-component>
          </collapse-component>    
          <p>Java 版本如下</p>
          <collapse-component>
          <snippet-component v-if="$route.meta.keepAlive" lan='java'>package com.example.martinrgb.roundconrner.view.smooth;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.View;

public class SketchRealSmoothRect extends View {

    private float WIDTH = 400;
    private float HEIGHT = 400;
    private float SKETCH_ROUND_RECT_RADIUS = 100f;
    private float mCenterX = 0;
    private float mCenterY = 0;
    private Paint mPaint;
    private boolean ROUND_TL = true,ROUND_TR = true,ROUND_BL = true,ROUND_BR = true;
    private boolean isSquare = true;

    public SketchRealSmoothRect(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);

        mCenterX = w * 1.0f / 2;
        mCenterY = h * 1.0f / 2;
    }

    private void init() {
        mPaint = new Paint();
        mPaint.setStyle(Paint.Style.FILL);
        mPaint.setStrokeWidth(12);
        mPaint.setColor(Color.rgb(253,86,85));
    }

    public float getRoundRadius() {
        return SKETCH_ROUND_RECT_RADIUS;
    }

    public void setRoundRadius(float radius){
        this.SKETCH_ROUND_RECT_RADIUS = radius;
        this.invalidate();
    }

    public float getRectWidth() {
        return WIDTH;
    }

    public void setRectWidth(float WIDTH) {
        this.WIDTH = WIDTH;
        this.invalidate();
    }

    public float getRectHeight() {
        return HEIGHT;
    }

    public void setRectHeight(float HEIGHT) {
        this.HEIGHT = HEIGHT;
        this.invalidate();
    }

    public boolean isSquare() {
        return isSquare;
    }

    public void setIsSquare(boolean square) {
        isSquare = square;
        this.invalidate();
    }

    public void setRectRoundEnable(boolean tl,boolean tr,boolean bl,boolean br){
        this.ROUND_TL = tl;
        this.ROUND_TR = tr;
        this.ROUND_BL = bl;
        this.ROUND_BR = br;
        this.invalidate();
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        canvas.translate(0, 0);
        mPaint.setAntiAlias(true);
        Path path;
        if(isSquare){
            if(SKETCH_ROUND_RECT_RADIUS == WIDTH/2){
                canvas.drawCircle(mCenterX,mCenterY,SKETCH_ROUND_RECT_RADIUS,mPaint);
            }
            else{
                path = SketchRealSmoothRect(0, 0, WIDTH , WIDTH , SKETCH_ROUND_RECT_RADIUS,SKETCH_ROUND_RECT_RADIUS,
                        ROUND_TL,ROUND_TR,ROUND_BL,ROUND_BR);
                canvas.drawPath(path,mPaint);
            }
        }
        else{
            path = SketchRealSmoothRect(0, 0, WIDTH , HEIGHT , SKETCH_ROUND_RECT_RADIUS,SKETCH_ROUND_RECT_RADIUS,
                    ROUND_TL,ROUND_TR,ROUND_BL,ROUND_BR);
            canvas.drawPath(path,mPaint);
        }


    }

    public Path SketchRealSmoothRect(
            float left, float top, float right, float bottom, float rx, float ry,
            boolean tl, boolean tr, boolean bl, boolean br
    ){

        Path path = new Path();
        if (rx < 0) rx = 0;
        if (ry < 0) ry = 0;
        float width = right - left;
        float height = bottom - top;
        float posX = mCenterX - width/2;
        float posY = mCenterY - height/2;

        float r = rx;

        path.moveTo(posX + width/2 , posY);
        if(!tr){
            path.lineTo(posX + width, posY);
        }
        else{

            path.lineTo(posX + Math.max(width/2,width - r/100.0f*128.19f), posY);
            path.cubicTo(posX + width - r/100.f*83.62f, posY,posX + width - r/100.f*67.45f,posY + r/100.f*4.64f, posX + width - r/100.f*51.16f, posY + r/100.f*13.36f);
            path.cubicTo(posX + width - r/100.f*34.86f, posY + r/100.f*22.07f,posX + width - r/100.f*22.07f,posY + r/100.f*34.86f, posX + width - r/100.f*13.36f, posY + r/100.f*51.16f);
            path.cubicTo(posX + width - r/100.f*4.64f, posY + r/100.f*67.45f,posX + width,posY + r/100.f*83.62f, posX + width, posY + Math.min(height/2,r/100.f*128.19f));
        }


        if(!br){
            path.lineTo(posX + width, posY + height);
        }
        else{
            path.lineTo(posX + width, posY + Math.max(height/2,height - r/100.f*128.19f));
            path.cubicTo(posX + width, posY + height - r/100.f*83.62f,posX + width - r/100.f*4.64f,posY + height - r/100.f*67.45f, posX + width - r/100.f*13.36f, posY + height -  r/100.f*51.16f);
            path.cubicTo(posX + width - r/100.f*22.07f, posY + height - r/100.f*34.86f,posX + width - r/100.f*34.86f,posY + height - r/100.f*22.07f, posX + width - r/100.f*51.16f, posY + height - r/100.f*13.36f);
            path.cubicTo(posX + width - r/100.f*67.45f, posY + height - r/100.f*4.64f,posX + width - r/100.f*83.62f,posY + height, posX + Math.max(width/2,width - r/100.f*128.19f), posY + height);

        }


        if(!bl){
            path.lineTo(posX, posY + height);
        }
        else{
            path.lineTo(posX + Math.min(width/2,r/100.f*128.19f), posY + height);
            path.cubicTo(posX +  r/100.f*83.62f, posY + height,posX + r/100.f*67.45f,posY + height - r/100.f*4.64f, posX + r/100.f*51.16f, posY + height -  r/100.f*13.36f);
            path.cubicTo(posX +  r/100.f*34.86f, posY + height - r/100.f*22.07f,posX + r/100.f*22.07f,posY + height - r/100.f*34.86f, posX + r/100.f*13.36f, posY + height - r/100.f*51.16f);
            path.cubicTo(posX  + r/100.f*4.64f, posY + height - r/100.f*67.45f,posX ,posY + height - r/100.f*83.62f, posX , posY + Math.max(height/2,height - r/100.f*128.19f));

        }

        if(!tl){
            path.lineTo(posX, posY);
        }
        else{
            path.lineTo(posX, posY + Math.min(height/2,r/100.f*128.19f));
            path.cubicTo(posX, posY + r/100.f*83.62f,posX + r/100.f*4.64f,posY + r/100.f*67.45f, posX + r/100.f*13.36f, posY + r/100.f*51.16f);
            path.cubicTo(posX +  r/100.f*22.07f, posY + r/100.f*34.86f,posX + r/100.f*34.86f,posY +  r/100.f*22.07f, posX + r/100.f*51.16f, posY + r/100.f*13.36f);
            path.cubicTo(posX  + r/100.f*67.45f, posY +  r/100.f*4.64f,posX + r/100.f*83.62f ,posY, posX + Math.min(width/2,r/100.f*128.19f), posY);

        }



        path.close();

        return path;
    }

    public float getMAXRadius(float width,float height){
        float minBorder;
        if(width > height){
            minBorder = height;
        }
        else{
            minBorder = width;
        }
        return minBorder/2.f;
    }
    private float getRadiusInMaxRange(float width,float height,float radius){
        float realRadius = Math.min(radius,getMAXRadius(width,height));
        return realRadius;
    }
}</snippet-component>
          </collapse-component>
          <p>来对比一下实现的效果</p>
          <img data-action="zoom" src='../static/images/smooth_corners/sc_5.jpg' alt="img0"/>
          <p>一些不足的地方需要注意：</p>
          <ul>
            <li>95% 以上时，圆角效果跟 Sketch 有略微误差。</li>
            <li>如果使用圆角，并开启某几个边绘制直角时，圆角与直角的衔接处，开启超大圆角时由于绘制时强制把绘制起点和终点卡在 1/2，会导致看起来不如 Sketch 里面的平滑</li>
            <li>当圆角半径为 最大半径时，圆度比 Sketch 平滑圆角更圆（应该也是由于递减引起的）</li>
          </ul>
          <h3 id="web_demo">Web Demo</h3>
          <iframe src='http://www.martinrgb.com/blog/static/page/smooth-corners/index.html' scrolling='no'></iframe>
          <h3 id="android_implementaion">Android Demo</h3>
           <video src="../static/images/smooth_corners/round_corners_video.mp4" style="width: 50%;height: 50%;display: -webkit-box;margin: 0 auto;" controls="true"></video>
          <h3 id="dynamic_question">问题</h3>
          <p>动态重绘方法适合需要动态控制圆角的交互，计算量较大导致功耗问题，如果仅仅是动画或者静态素材，请使用静态绘制方法</p>
          <h2 id="reference">资料参考</h2>
          <ul>
            <li><a href="https://www.johndcook.com/blog/2018/02/13/squircle-curvature/" target="_blank">Apple design, squircles, and curvature</a></li>

            <li><a href="https://medium.com/@zubryjs/squircles-bringing-ios-7s-solution-to-rounded-rectangles-to-css-9fc35779aa65" target="_blank">Squircles: Bringing iOS 7’s solution to rounded rectangles to CSS</a></li>

            <li><a href="http://iamvdo.me/en/blog/smooth-corners-with-css-houdini" target="_blank">Smooth corners with CSS Houdini</a></li>
          </ul>

      </div>
    </div>
  </div>
</template>

<script>

  import ToolTip from '@/components/ToolTip'
  import Toc from '@/components/Toc'
  import AVDMorphingFile from '../static/zip/avd_morphing.zip'
  import SnippetComponent from '@/components/SnippetComponent'
  import CollapseComponent from '@/components/CollapseComponent'
  // import axios from 'axios'

  export default {
    name: 'article',
    data: function () {return {
      articleTitle:'10.[总结]Sketch 平滑圆角在 Android 和 Web 中的绘制',
      avd_morphing:AVDMorphingFile
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
</style>
