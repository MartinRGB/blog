const canvas = document.querySelector('#playground')
const ctx    = canvas.getContext('2d')
ctx.imageSmoothingEnabled = true;
// canvas.width  = window.innerWidth
// canvas.height = window.innerHeight

const halfWidth  = canvas.width / 2
const halfHeight = canvas.height / 2


// ################################## Upload Image ##################################

var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var imgOnLoad = false;
var drawing = new Image();
var scaleRatio = 1;


window.addEventListener("load", drawDefault, true);

function drawDefault(){                     
    imgOnLoad = false;
    drawing.src = "images/default_icns.png"; // can also be a remote URL e.g. http://           
    drawing.onload = function(){
      imgOnLoad = true;
    };            

}                 

function handleImage(e){
  var reader = new FileReader();
  imgOnLoad = false;
  reader.onload = function(event){
      drawing = new Image();
      drawing.onload = function(){
          imgOnLoad = true;
          rendering()
      }
      drawing.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);     
}


// ################################## Dat GUI ##################################

var isControl = false;

var params = {
  loadFile : function() { 
    document.getElementById('imageLoader').click();
  }
};

const options = {
  n: 4,
  r: 60,
  percentage: 40,
  radius:53,
  // r_percentage:97.4,
  width: 300,
  height: 300,
  round_position_x:0,
  round_position_y:0,
  img_position_x:0,
  img_position_y:0,
  tl:true,
  tr:true,
  bl:true,
  br:true,
  open_real:true,
  open_round:false,
  open_smooth:false,
  open_squircles:false,
  is_fill:false,
  is_img:true,
}

var radiusThereShold = 100;

var gui0,gui1,gui2,gui3,gui4,gui5,gui6,gui7,gui8,gui9,gui10,gui11,gui12,gui13,gui14,gui15,gui16,gui17,gui18,gui19,gui20;


const gui = new dat.GUI( { autoPlace: true, width: 300 } );
gui.close();

gui19 = gui.add(options, 'open_real').name("「Sketch 圆角正解」");
gui20 = gui.add(options, 'radius', 0, 100).step(.2).name("圆角半径百分比");
gui14 = gui.add(options, 'open_smooth').name("开启「平滑圆角」- Sketch Smooth Corner");
gui0 = gui.add(options, 'n', 2, 40).step(.2).name("平滑圆角指数");
gui13 = gui.add(options, 'open_round').name("开启「直角圆角」 - Sketch Round Corner");
gui1 = gui.add(options, 'r', 0, 100).step(.5).name("直角圆角百分比")
gui15 = gui.add(options, 'open_squircles').name("开启「超椭圆角」- G2 曲率 | 超椭圆");
gui2 = gui.add(options, 'percentage', 0, 100).step(.5).name("超椭圆角百分比")
// gui.add(options, 'r_percentage', 0, 100).step(.2)
gui9 = gui.add(options, 'tl').name("「左上」圆角");
gui10 = gui.add(options, 'tr').name("「右上」圆角");
gui11 =gui.add(options, 'bl').name("「左下」圆角");
gui12 = gui.add(options, 'br').name("「右上」圆角");
gui16 = gui.add(options, 'is_fill').name("开启填充");
gui18 = gui.add(options, 'is_img').name("开启图片");
gui3 =gui.add(options, 'width', 0, 1080).step(5).name("宽度 - px")
gui4 = gui.add(options, 'height', 0, 1080).step(5).name("高度 - px")
gui5 = gui.add(options, 'round_position_x', -1200, 1200).step(2).name("圆角矩形 X 轴 - px")
gui6 = gui.add(options, 'round_position_y', -1200, 1200).step(2).name("圆角矩形 Y 轴 - px")
gui7 = gui.add(options, 'img_position_x', -1200, 1200).step(2).name("图片 X 轴 - px")
gui8 = gui.add(options, 'img_position_y', -1200, 1200).step(2).name("图片 Y 轴 -")
gui17 = gui.add(params, 'loadFile').name('上传图片');

var guiN = [gui0,gui1,gui2,gui3,gui4,gui5,gui6,gui7,gui8,gui9,gui10,gui11,gui12,gui13,gui14,gui15,gui16,gui17,gui18,gui19,gui20]

for (let i = 0; i < guiN.length; i++) {
    
  guiN[i].onChange(function(value){
    // loop()
    isControl = true;
    rendering();
  });

  guiN[i].onFinishChange(function(value) {
    // Fires when a controller loses focus.
    isControl = false;
  });
}

// ################################## Round Corner Functions ##################################

const drawRectSmoothCorners = (ctx, size, n, posX, posY,tl,tr,bl,br) => {
  if(size.width>=size.height){
    drawWidthSmoothCorners(ctx, size, n, posX, posY,tl,tr,bl,br)
  }
  else{
    drawHeightSmoothCorners(ctx, size, n, posX, posY,tl,tr,bl,br)
  }
}



const drawWidthSmoothCorners = (ctx, size, n, posX, posY,tl,tr,bl,br) => {
  let m = n
  if (n > radiusThereShold) m = radiusThereShold
  if (n < 0.00000000001) m = 0.00000000001
  
  var mCenterX = posX;
  var mCenterY = posY;

  const rx = size.width / 2 
  const ry = size.height / 2  
  var ratioY = ry/rx

  ctx.beginPath();
  const startX = (-rx)  + mCenterX
  const startY = (Math.pow(Math.abs(Math.pow(ry,m)-Math.pow(Math.abs(-ry),m)),1/m))*(ratioY) + mCenterY
  ctx.moveTo(startX, startY)

  //bl
  for (let i = 0; i < ry; i+=0.025) {
    
      var x = (i-rx) + mCenterX 
      var y = (Math.pow(Math.abs(Math.pow(rx,m)-Math.pow(Math.abs(i*(1/ratioY)-rx),m)),1/m))*(ratioY)+ mCenterY
  
      if(!bl){
        ctx.lineTo(mCenterX-rx, mCenterY+ry);
      }
      else{
        ctx.lineTo(x, y);
      }
    
  }


  //br
  for (let i = ry; i > 0; i-=0.025) {
    var x = (rx-i)  + mCenterX 
    var y = (Math.pow(Math.abs(Math.pow(rx,m)-Math.pow(Math.abs(rx-i*(1/ratioY)),m)),1/m))*(ratioY)+ mCenterY

    if(!br){
      ctx.lineTo(mCenterX+rx, mCenterY+ry);
    }
    else{
      ctx.lineTo(x, y);
    }
  }

  //tr
  for (let i = 0; i < rx; i+=0.025) {
    const x = (rx-i)*(ratioY)  + mCenterX + (rx -ry)
    const y = (-Math.pow(Math.abs(Math.pow(rx,m)-Math.pow(Math.abs(rx-i),m)),1/m))*(ratioY)  + mCenterY

    if(!tr){
      ctx.lineTo(mCenterX + rx,mCenterY-ry);
    }
    else{
      ctx.lineTo(x, y);
    }
  }

  //tr
  for (let i = rx; i > 0; i-=0.025) {
    const x = (i - rx)*(ratioY)  + mCenterX - (rx -ry)
    const y = (-Math.pow(Math.abs(Math.pow(rx,m)-Math.pow(Math.abs(i - rx),m)),1/m))*(ratioY)  + mCenterY

    if(!tl){
      ctx.lineTo(mCenterX-rx, mCenterY-ry);
    }
    else{
      ctx.lineTo(x, y);
    }
  }

  ctx.closePath()
}

const drawHeightSmoothCorners = (ctx, size, n, posX, posY,tl,tr,bl,br) => {
  let m = n
  if (n > radiusThereShold) m = radiusThereShold
  if (n < 0.00000000001) m = 0.00000000001
  
  var mCenterX = posX;
  var mCenterY = posY;

  const rx = size.width / 2 
  const ry = size.height / 2  

  ctx.beginPath();
  const startX = (-rx)  + mCenterX
  const startY = (Math.pow(Math.abs(Math.pow(ry,m)-Math.pow(Math.abs(-ry),m)),1/m)) + mCenterY
  ctx.moveTo(startX, startY)

  //bl
  for (let i = 0; i < rx; i+=0.005) {
    
      var x = (i-rx) + mCenterX 
      var y = (Math.pow(Math.abs(Math.pow(rx,m)-Math.pow(Math.abs(i-rx),m)),1/m))+ mCenterY + (ry-rx)
  
      if(!bl){
        ctx.lineTo(mCenterX-rx, mCenterY+ry);
      }
      else{
        ctx.lineTo(x, y);
      }
    
  }

  //br
  for (let i = rx; i > 0; i-=0.005) {
    var x = (rx-i)  + mCenterX 
    var y = (Math.pow(Math.abs(Math.pow(rx,m)-Math.pow(Math.abs(rx-i),m)),1/m))+ mCenterY + (ry-rx)

    if(!br){
      ctx.lineTo(mCenterX+rx, mCenterY+ry);
    }
    else{
      ctx.lineTo(x, y);
    }
  }

  //tr
  for (let i = 0; i < rx; i+=0.005) {
    const x = (rx-i)  + mCenterX 
    const y = (-Math.pow(Math.abs(Math.pow(rx,m)-Math.pow(Math.abs(rx-i),m)),1/m)) + mCenterY - (ry-rx)

    if(!tr){
      ctx.lineTo(mCenterX + rx,mCenterY-ry);
    }
    else{
      ctx.lineTo(x, y);
    }
  }

  //tr
  for (let i = rx; i > 0; i-=0.005) {
    const x = (i - rx)  + mCenterX
    const y = (-Math.pow(Math.abs(Math.pow(rx,m)-Math.pow(Math.abs(i - rx),m)),1/m))  + mCenterY - (ry-rx)

    if(!tl){
      ctx.lineTo(mCenterX-rx, mCenterY-ry);
    }
    else{
      ctx.lineTo(x, y );
    }
  }

  ctx.closePath()
}

const drawRoundRect = (ctx, size, r, posX, posY,tl,tr,bl,br) => {
  posX -= size.width / 2
  posY -= size.height / 2

  // r = Math.min(r,Math.min(size.width,size.height)/2)
    
  ctx.beginPath();
  ctx.moveTo(posX + r, posY);
  if(!tr){
    ctx.lineTo(posX + size.width, posY);
  }
  else{


    ctx.lineTo(posX + size.width - r, posY);
    ctx.bezierCurveTo(posX + size.width - r + getSKRoundRadius(r) , posY,posX + size.width,posY + r - getSKRoundRadius(r), posX + size.width, posY + r);
    // ctx.lineTo(posX + size.width - r, posY);
    // ctx.quadraticCurveTo(posX + size.width, posY, posX + size.width, posY + r);
  }



  if(!br){
    ctx.lineTo(posX + size.width, posY + size.height);
  }
  else{
    ctx.lineTo(posX + size.width, posY + size.height - r);
    ctx.bezierCurveTo(posX+ size.width, posY + size.height - r + getSKRoundRadius(r), posX + size.width - r + getSKRoundRadius(r),posY + size.height,posX+ size.width - r, posY + size.height);
    // ctx.lineTo(posX + size.width, posY + size.height - r);
    // ctx.quadraticCurveTo(posX+ size.width, posY + size.height, posX+ size.width - r, posY + size.height);
  }

  if(!bl){
    ctx.lineTo(posX, posY + size.height);
  }
  else{
    ctx.lineTo(posX + r, posY + size.height);
    ctx.bezierCurveTo(posX + r - getSKRoundRadius(r), posY + size.height,posX, posY + size.height - r + getSKRoundRadius(r), posX, posY + size.height - r);
    // ctx.lineTo(posX + r, posY + size.height);
    // ctx.quadraticCurveTo(posX, posY + size.height, posX, posY + size.height - r);
  }

  if(!tl){
    ctx.lineTo(posX, posY);
  }
  else{
    ctx.lineTo(posX, posY + r);
    ctx.bezierCurveTo(posX, posY + r - getSKRoundRadius(r),posX + r - getSKRoundRadius(r),posY, posX+ r, posY);
    // ctx.lineTo(posX, posY + r);
    // ctx.quadraticCurveTo(posX, posY, posX+ r, posY);
  }
  
  ctx.closePath();      
}


const drawRealRoundRect = (ctx, size, r, posX, posY,tl,tr,bl,br) => {
  posX -= size.width / 2
  posY -= size.height / 2

  console.log()

  //两端终点
  var ratio;
  if(r/Math.min(size.width/2,size.height/2) > 0.5){
    var percentage = ((r/Math.min(size.width/2,size.height/2)) - 0.5)/0.4
    var clampedPer = Math.min(1,percentage)
    ratio = 1 - (1 - 1.104/1.2819)*clampedPer
  }
  else{
    ratio = 1;
  }
  //两端终点的操控点
  var controlratio;
  if(r/Math.min(size.width/2,size.height/2) > 0.6){
    var percentage = ((r/Math.min(size.width/2,size.height/2)) - 0.6)/0.3
    var clampedPer = Math.min(1,percentage)
    controlratio = 1 + (0.8717/0.8362 - 1)*clampedPer
  }
  else{
    controlratio = 1;
  }

  ctx.beginPath();

  ctx.moveTo(posX + size.width/2 , posY);
  if(!tr){
    ctx.lineTo(posX + size.width, posY);
  }
  else{

    ctx.lineTo(posX + Math.max(size.width/2,size.width - r/100*128.19*ratio), posY);
    ctx.bezierCurveTo(posX + size.width - r/100*83.62*controlratio, posY,posX + size.width - r/100*67.45,posY + r/100*4.64, posX + size.width - r/100*51.16, posY + r/100*13.36);
    ctx.bezierCurveTo(posX + size.width - r/100*34.86, posY + r/100*22.07,posX + size.width - r/100*22.07,posY + r/100*34.86, posX + size.width - r/100*13.36, posY + r/100*51.16);
    ctx.bezierCurveTo(posX + size.width - r/100*4.64, posY + r/100*67.45,posX + size.width,posY + r/100*83.62*controlratio, posX + size.width, posY + Math.min(size.height/2,r/100*128.19*ratio));
  }



  if(!br){
    ctx.lineTo(posX + size.width, posY + size.height);
  }
  else{
    ctx.lineTo(posX + size.width, posY + Math.max(size.height/2,size.height - r/100*128.19*ratio));
    ctx.bezierCurveTo(posX + size.width, posY + size.height - r/100*83.62*controlratio,posX + size.width - r/100*4.64,posY + size.height - r/100*67.45, posX + size.width - r/100*13.36, posY + size.height -  r/100*51.16);
    ctx.bezierCurveTo(posX + size.width - r/100*22.07, posY + size.height - r/100*34.86,posX + size.width - r/100*34.86,posY + size.height - r/100*22.07, posX + size.width - r/100*51.16, posY + size.height - r/100*13.36);
    ctx.bezierCurveTo(posX + size.width - r/100*67.45, posY + size.height - r/100*4.64,posX + size.width - r/100*83.62*controlratio,posY + size.height, posX + Math.max(size.width/2,size.width - r/100*128.19*ratio), posY + size.height);

  }

  if(!bl){
    ctx.lineTo(posX, posY + size.height);
  }
  else{
    ctx.lineTo(posX + Math.min(size.width/2,r/100*128.19*ratio), posY + size.height);
    ctx.bezierCurveTo(posX +  r/100*83.62*controlratio, posY + size.height,posX + r/100*67.45,posY + size.height - r/100*4.64, posX + r/100*51.16, posY + size.height -  r/100*13.36);
    ctx.bezierCurveTo(posX +  r/100*34.86, posY + size.height - r/100*22.07,posX + r/100*22.07,posY + size.height - r/100*34.86, posX + r/100*13.36, posY + size.height - r/100*51.16);
    ctx.bezierCurveTo(posX  + r/100*4.64, posY + size.height - r/100*67.45,posX ,posY + size.height - r/100*83.62*controlratio, posX , posY + Math.max(size.height/2,size.height - r/100*128.19*ratio));
  }

  if(!tl){
    ctx.lineTo(posX, posY);
  }
  else{
    ctx.lineTo(posX, posY + Math.min(size.height/2,r/100*128.19*ratio));
    ctx.bezierCurveTo(posX, posY + r/100*83.62*controlratio,posX + r/100*4.64,posY + r/100*67.45, posX + r/100*13.36, posY + r/100*51.16);
    ctx.bezierCurveTo(posX +  r/100*22.07, posY + r/100*34.86,posX + r/100*34.86,posY +  r/100*22.07, posX + r/100*51.16, posY + r/100*13.36);
    ctx.bezierCurveTo(posX  + r/100*67.45, posY +  r/100*4.64,posX + r/100*83.62*controlratio ,posY, posX + Math.min(size.width/2,r/100*128.19*ratio), posY);
    
  }
  
  
  ctx.closePath();      
}

const getSKRoundRadius = (radius) =>{
  return radius/2+radius/60*Math.PI;
}



const drawSquirclesmoothCorners = (ctx, size, rx,ry, posX, posY,tl,tr,bl,br) => {
  posX -= size.width / 2
  posY -= size.height / 2

  if (rx < 0) rx = 0;
  if (ry < 0) ry = 0;
  const width = size.width;
  const height = size.height;
  if(width > height)
      rx *= height/width;
  else
      ry *= width/height;

  ctx.beginPath();
  for(let i = 0;i<360;i += 0.01){
    var angle = (i * 2 * Math.PI / 360.0);
    var cosX =  Math.cos(angle);
    var x = Math.pow(Math.abs(cosX),rx/100)*50*Math.abs(cosX + 0.0000000001)/(cosX + 0.0000000001) + 50;
    var sinY = Math.sin(angle);
    var y = Math.pow(Math.abs(sinY),ry/100)*50*Math.abs(sinY + 0.0000000001)/(sinY + 0.0000000001) + 50;
    var percentX = x/100;
    var percentY = y/100;

    if (i == 0)
      ctx.moveTo(percentX*width+posX, percentY*height+posY);
    else if(!br && i<45){
      ctx.lineTo(width+posX, height+posY);
    }
    else if(!br && i>=45 && i<90){
      ctx.lineTo(posX+width/2, height+posY);
    }
    else if(!bl && i>=90 && i<135){
      ctx.lineTo(posX, height+posY);
    }
    else if(!bl && i>=135 && i<180){
      ctx.lineTo(posX, height/2+posY);
    }
    else if(!tl && i>=180 && i<225){
      ctx.lineTo(posX, posY);
    }
    else if(!tl && i>=225 && i<270){
      ctx.lineTo(posX+width/2, posY);
    }
    else if(!tr && i>=270 && i<315){
      ctx.lineTo(posX+width, posY);
    }
    else if(!tr && i>=315 && i<360){
      ctx.lineTo(posX+width, posY+height/2);
    }
    else
      ctx.lineTo(percentX*width+posX, percentY*height+posY);

  }
  ctx.closePath();      
}

// ################################## Rendering ##################################

const rendering = () => {
  if(!imgOnLoad){
    window.requestAnimationFrame(rendering)
  }
  else{

  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#edf0f5'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  if(options.is_img){
    ctx.drawImage(drawing,halfWidth - drawing.width/2/scaleRatio + options.img_position_x/2,halfHeight - drawing.height/2/scaleRatio + options.img_position_y/scaleRatio,drawing.width/scaleRatio,drawing.height/scaleRatio);
  }

  if(options.open_real){


    if(options.width == options.height && options.radius == 100){
      drawRoundRect(ctx, {width:options.width/scaleRatio, height: options.height/scaleRatio}, options.radius/100*Math.min(options.width/2,options.height/2)/scaleRatio,halfWidth+options.round_position_x/scaleRatio, halfHeight+options.round_position_y/scaleRatio,options.tl,options.tr,options.bl,options.br)
    }
    else{
      drawRealRoundRect(ctx, {width:options.width/scaleRatio, height: options.height/scaleRatio}, options.radius/100*Math.min(options.width/2,options.height/2)/scaleRatio,halfWidth+options.round_position_x/scaleRatio, halfHeight+options.round_position_y/scaleRatio,options.tl,options.tr,options.bl,options.br)

    }


    var realRadius = options.radius/100*Math.min(options.width/2,options.height/2)/scaleRatio;
    ctx.font = "48px PingFang serif";
    ctx.strokeText("实际圆角半径:" + Math.round(realRadius).toString() , 200, 200);
    if(!options.is_fill){
      ctx.strokeStyle = 'rgba(10, 10, 10, 0.7)'
      ctx.lineWidth=1;
      ctx.stroke()
    }
    else{
      ctx.fillStyle = 'rgba(10, 10, 10, 0.0.7)'
      ctx.fill()
    }
  }




  if(options.open_round){

    drawRoundRect(ctx, {width:options.width/scaleRatio, height: options.height/scaleRatio}, options.r/100*Math.min(options.width/2,options.height/2)/scaleRatio,halfWidth+options.round_position_x/scaleRatio, halfHeight+options.round_position_y/scaleRatio,options.tl,options.tr,options.bl,options.br)
    //Purple

    var realRadius = options.r/100*Math.min(options.width/2,options.height/2)/scaleRatio;
    ctx.font = "48px PingFang serif";
    ctx.strokeText("实际圆角半径:" + Math.round(realRadius).toString() , 200, 200);

    if(!options.is_fill){
      ctx.strokeStyle = 'rgba(238, 82, 23, 0.8)'
      ctx.lineWidth=4;
      ctx.stroke()
    }
    else{
      ctx.fillStyle = 'rgba(238, 82, 23, 0.8)'
      ctx.fill()
    }
  }

  if(options.open_squircles){
    
    drawSquirclesmoothCorners(ctx, {width:options.width/scaleRatio, height: options.height/scaleRatio}, options.percentage,options.percentage,halfWidth+options.round_position_x/scaleRatio, halfHeight+options.round_position_y/scaleRatio,options.tl,options.tr,options.bl,options.br)

    var realRadius = options.percentage/100*Math.min(options.width/2,options.height/2)/scaleRatio;
    ctx.font = "48px PingFang serif";
    ctx.strokeText("实际圆角半径:" + Math.round(realRadius).toString() , 200, 200);

    //Orange
    if(!options.is_fill){
      ctx.strokeStyle = 'rgba(27, 156, 252, 0.8)'
      ctx.lineWidth=4;
      ctx.stroke()
    }
    else{
      ctx.fillStyle = 'rgba(27, 156, 252, 0.5)'
      ctx.fill()
    }
  }

  if(options.open_smooth){

    drawRectSmoothCorners(ctx, {width: options.width/scaleRatio, height: options.height/scaleRatio}, options.n, halfWidth+options.round_position_x/scaleRatio, halfHeight+options.round_position_y/scaleRatio,options.tl,options.tr,options.bl,options.br)
    //Black



    if(!options.is_fill){
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)'
      ctx.lineWidth=4;
      ctx.stroke()
    }
    else{
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fill()
    }

  }

  console.log("looped");

}

// ################################## Animation Control ##################################

// var requestId;

// function renderLoop(time) {
//     requestId = undefined;
//     rendering();
//     start();
// }

// function renderStart() {
//     if (!requestId) {
//        requestId = window.requestAnimationFrame(rendering);
//     }
// }

// function renderStop() {
//     if (requestId) {
//        window.cancelAnimationFrame(requestId);
//        requestId = undefined;
//     }
//}

rendering()

// ################################## Test ##################################
const rectSmoothCornerTest1 = () =>{
    ctx.strokeStyle = '#5f27cd'
    drawSquareSmoothCorner(ctx, {width: 200, height: 200}, options.n, halfWidth-150, halfHeight,options.tl,options.tr,options.bl,options.br)
    ctx.lineWidth=2;
    ctx.stroke()

    ctx.strokeStyle = '#5f27cd'
    drawSquareSmoothCorner(ctx, {width: 200, height: 200}, options.n, halfWidth+150, halfHeight,options.tl,options.tr,options.bl,options.br)
    ctx.lineWidth=2;
    ctx.stroke()

    ctx.strokeStyle = '#5f27cd'
    drawSquareSmoothCorner(ctx, {width: 200, height: 200}, options.n, halfWidth, halfHeight- 150,options.tl,options.tr,options.bl,options.br)
    ctx.lineWidth=2;
    ctx.stroke()

    ctx.strokeStyle = '#5f27cd'
    drawSquareSmoothCorner(ctx, {width: 200, height: 200}, options.n, halfWidth, halfHeight + 150,options.tl,options.tr,options.bl,options.br)
    ctx.lineWidth=2;
    ctx.stroke()

    ctx.strokeStyle = '#ee5253'
    drawRectSmoothCorners(ctx, {width:500, height: 200}, options.n, halfWidth, halfHeight,options.tl,options.tr,options.bl,options.br)
    ctx.lineWidth=2;
    ctx.stroke()

    ctx.strokeStyle = '#ee5253'
    drawRectSmoothCorners(ctx, {width: 200, height: 500}, options.n, halfWidth, halfHeight,options.tl,options.tr,options.bl,options.br)
    ctx.lineWidth=2;
    ctx.stroke()
}

const rectSmoothCornerTest2 = () =>{
  //RED
  ctx.strokeStyle = '#ee5253'
  drawSquareSmoothCorner(ctx, {width: options.width, height: options.height}, options.n, halfWidth, halfHeight,options.tl,options.tr,options.bl,options.br)
  ctx.lineWidth=2;
  ctx.stroke()

  //Green
  ctx.strokeStyle = '#44bd32'
  drawSquareSmoothCornerPercentage(ctx, {width: options.width*1.25, height: options.height*1.25}, options.r_percentage, halfWidth, halfHeight,options.tl,options.tr,options.bl,options.br)
  ctx.lineWidth=2;
  ctx.stroke();
}


const drawSquareSmoothCorner = (ctx, size, n, posX, posY,tl,tr,bl,br) => {
  let m = n
  if (n > 100) m = 100
  if (n < 0.00000000001) m = 0.00000000001
  
  var mCenterX = posX;
  var mCenterY = posY;

  const w = size.width / 2
  const h = size.height / 2

  const rx = size.width / 2 
  const ry = size.height / 2  
  var r = Math.max(rx,ry) ;

  ctx.beginPath();
  const startX = (-r)  + mCenterX
  const startY = (Math.pow(Math.abs(Math.pow(ry,m)-Math.pow(Math.abs(-ry),m)),1/m)) + mCenterY
  ctx.moveTo(startX, startY)

  for (let i = 1; i < (2*r); i+=1) {
    const x = (i-r) + mCenterX 
    //+ w + mCenterX - size.width / 2
    const y = (Math.pow(Math.abs(Math.pow(r,m)-Math.pow(Math.abs(i-r),m)),1/m))+ mCenterY;
    // + h + mCenterY - size.height / 2

    if(!bl && i<r+1){
      ctx.lineTo(mCenterX-w, mCenterY+h);
    }
    else if(!br && i>= r+1){
      ctx.lineTo(mCenterX+w, mCenterY+h);
    }
    else{
      ctx.lineTo(x, y);
    }

  }

  for (let i = (2*r); i < (4*r); i+=1) {
    const x = (3*r-i) + mCenterX 
    const y = (-Math.pow(Math.abs(Math.pow(r,m)-Math.pow(Math.abs(3*r-i),m)),1/m)) + mCenterY

    if(!tr && i<3*r+1){
      ctx.lineTo(mCenterX+w, mCenterY-h);
    }
    else if(!tl && i>= 3*r+1){
      ctx.lineTo(mCenterX-w, mCenterY-h);
    }
    else{
      ctx.lineTo(x, y);
    }
  }

  ctx.closePath()
}

const drawSquareSmoothCornerPercentage = (ctx, size, n, posX, posY,tl,tr,bl,br) => {
  let minLength = Math.min(size.width,size.height)/2
  let m = (102 - n)
  if (m > 100) m = 100
  if (m < 0.00000000001) m = 0.00000000001

  m*=minLength;

  var mCenterX = posX;
  var mCenterY = posY;

  const w = size.width / 2
  const h = size.height / 2

  const rx = size.width / 2 
  const ry = size.height / 2  
  var r = Math.max(rx,ry) ;

  ctx.beginPath();
  const startX = (-r)  + mCenterX
  const startY = (Math.pow(Math.abs(Math.pow(ry,m)-Math.pow(Math.abs(-ry),m)),1/m)) + mCenterY
  ctx.moveTo(startX, startY)
  //ctx.moveTo(mCenterX-w, mCenterY)

  for (let i = 1; i < (2*r); i+=1) {
    const x = (i-r) + mCenterX 
    //+ w + mCenterX - size.width / 2
    const y = (Math.pow(Math.abs(Math.pow(r,m/minLength)-Math.pow(Math.abs(i-r),m/minLength)),1/(m/minLength)))+ mCenterY;
    // + h + mCenterY - size.height / 2

    var percentX = x/size.width;
    var percentY = y/size.height;

    if(!bl && i<r+1){
      ctx.lineTo(mCenterX-w, mCenterY+h);
    }
    else if(!br && i>= r+1){
      ctx.lineTo(mCenterX+w, mCenterY+h);
    }
    else{
      ctx.lineTo(percentX*size.width, percentY * size.height);
    }

  }

  for (let i = (2*r); i < (4*r); i+=1) {
    const x = (3*r-i) + mCenterX 
    const y = (-Math.pow(Math.abs(Math.pow(r,m/minLength)-Math.pow(Math.abs(3*r-i),m/minLength)),1/(m/minLength))) + mCenterY

    var percentX = x/size.width;
    var percentY = y/size.height;

    if(!tr && i<3*r+1){
      ctx.lineTo(mCenterX+w, mCenterY-h);
    }
    else if(!tl && i>= 3*r+1){
      ctx.lineTo(mCenterX-w, mCenterY-h);
    }
    else{
      ctx.lineTo(percentX*size.width, percentY * size.height);
    }
  }

  ctx.closePath()
}
