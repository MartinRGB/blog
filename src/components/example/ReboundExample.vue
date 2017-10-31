<template>

  <div id="Rebound">
    <div class="exampleHeader">
      <h2 class="exampleTitle">ReboundJS - Photo Scale Animation</h2>
      <div class="exampleDescription">
        This example demonstrates scaling a photo on a Rebound spring animation. You can adjust the
        tension and friction using the sliders and observe how this changes the curve of the spring
        animation. The tension and friction values are based on
        <a href="http://facebook.github.io/origami/">Origami</a>, so you can convert Origami mockups
        directly into Rebound animations. (<a href="https://github.com/facebook/rebound-js/blob/master/examples/photoScale/main.js" target="_blank">Code</a>)
      </div>
    </div>
    <div class="example-container" id="example-container">
      <div class="inner-content" id="inner-content">
        <canvas id="graph-canvas" width="600" height="600"></canvas>
        <div id="example-photo" class="photo" :style ="defaultPics" onmousedown="this.className='photo down'">
          <div class="pill">Press and Hold</div>
        </div>
      </div>
      <div class="controls">
        <div>
          <label for="tension">tension : <span id="tension_value">40</span></label>
          <input type="range" id="tension" name="tension" min="1" max="100" value="40" />
        </div>
        <div>
          <label for="friction">friction : <span id="friction_value">3</span></label>
          <input type="range" id="friction" name="friction" min="1" max="30" value="3" />
        </div>
      </div>
    </div>

    <div class="exampleHeader">
      <h2 class="exampleTitle">ReboundJS - Ball Animation</h2>
      <div class="exampleDescription">
        This example demonstrates moving a ball on a Rebound spring animation. 
      </div>
    </div>
    <div class="example-container" id="example-container">
      <div id="logo"><img style="background: aquamarine;" alt="" /></div>
    </div>
  </div>
</template>

<script>

  import '../../static/js/rebound.js'
  import '../../static/js/reboundutils.js'

  export default {
    name: 'reboundtest',
    data: function () {return {
       defaultPics: {
            background: "url(" + require('../../static/images/landscape.jpg') + ")",
        },
    }},
    components: {},
    methods: {
      runExample:function(){
          var springSystem = new rebound.SpringSystem();
          var spring = createSpring(springSystem, 40, 3);
          var springConfig = spring.getSpringConfig();
          var exampleContainer = document.getElementById('example-container');
          var innerContent = document.getElementById('inner-content');
          var photo = document.getElementById('example-photo');
          spring.addListener({
            el: null,
            onSpringUpdate: function(spring) {
              this.el = this.el || photo;
              var val = spring.getCurrentValue();
              val = mapValueFromRangeToRange(val, 0, -1, 1, 0.5);
              scale(this.el, val);
            }
          });

          var scalingExample = document.getElementById('scaling-example');

          var canvas = document.getElementById('graph-canvas');
          var ctx = canvas.getContext('2d');
          var graphScale = 80;

          var graphingSpringSystemListener = new GraphingSpringSystemListener()

          drawGridLines(canvas, ctx, graphScale);

          var time = 0;

          function GraphingSpringSystemListener() {
            this.height = canvas.height;
            this.width = canvas.width;
            this.lastTime = 0;
          };

          extend(GraphingSpringSystemListener.prototype, {
            onBeforeIntegrate: function() {
            },

            onAfterIntegrate: function() {
              time+=3;
              this.graphSpring(spring, 'black');

              if (time >= 600) {
                ctx.moveTo(0, canvas.height / 2);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawGridLines(canvas, ctx, graphScale);
                time = 0;
                graphingSpringSystemListener.lastTime = time;
                //done = true;
              }
              this.lastTime = time;
            },

            graphSpring: function(spring, color) {
              var x = time;
              var y = spring.getCurrentValue() * graphScale + this.height / 2;
              if (this.lastX > x) this.lastX = 1;
              ctx.beginPath();
              ctx.moveTo(this.lastTime, spring.lastY || this.height / 2);
              ctx.strokeStyle = color;
              ctx.lineWidth = 2;
              ctx.lineTo(x, y);
              ctx.stroke();
              ctx.closePath();
              spring.lastY = y;
            }
          });

          springSystem.addListener(graphingSpringSystemListener);

          photo.addEventListener(downEvt, function() {
            spring.setEndValue(-1);
          });

          document.body.addEventListener(upEvt, function() {
            spring.setEndValue(0);
          });

          var frictionControl = document.getElementById('friction');
          var frictionValue = document.getElementById('friction_value');
          var tensionControl = document.getElementById('tension');
          var tensionValue = document.getElementById('tension_value');


          var onFrictionChange = function() {
            springConfig.friction =
              rebound.OrigamiValueConverter.frictionFromOrigamiValue(frictionControl.value);
            frictionValue.innerHTML = frictionControl.value;
          };

          var onTensionChange = function() {
            springConfig.tension =
              rebound.OrigamiValueConverter.tensionFromOrigamiValue(tensionControl.value);
            tensionValue.innerHTML = tensionControl.value;
          };

          frictionControl.addEventListener('change', onFrictionChange);
          frictionControl.addEventListener('input', onFrictionChange);

          tensionControl.addEventListener('change', onTensionChange);
          tensionControl.addEventListener('input', onTensionChange);

          window.addEventListener("resize", function(){
            // photo.style.width = exampleContainer.offsetWidth/2 - 10 + 'px'
            // photo.style.height = exampleContainer.offsetWidth/2 - 10 + 'px'
            // canvas.style.height = exampleContainer.offsetWidth/2 - 10 + 'px'
            // canvas.style.left = exampleContainer.offsetWidth/2 + 10 + 'px'
            // canvas.style.height = exampleContainer.offsetWidth/2 - 10 + 'px'
          });
      },

      ballExample:function(){
        // Get a reference to the logo element.
        var el = this.$el.querySelector('#logo');
        
        // create a SpringSystem and a Spring with a bouncy config.
        var springSystem = new rebound.SpringSystem();
        var spring = springSystem.createSpring(30, 5);

        // Add a listener to the spring. Every time the physics
        // solver updates the Spring's value onSpringUpdate will
        // be called.
        spring.addListener({
          onSpringUpdate: function(spring) {
            var val = spring.getCurrentValue();
            var scaleVal = rebound.MathUtil
                        .mapValueInRange(val, 0, 1, 1, 0.9);
            var moveVal = rebound.MathUtil
                        .mapValueInRange(val, 0, 1, 1, 0.);
            scale(el, scaleVal,moveVal);
          },
          onSpringAtRest:function(spring){
            animFunc()
          }
        });

        spring.setCurrentValue(0);

        // Listen for mouse down/up/out and toggle the
        //springs endValue from 0 to 1.

        var isRight = false;
        animFunc()

        el.addEventListener('click',animFunc);

        function animFunc(){
          if(!isRight){
            spring.setEndValue(1);
            isRight = true;
          }
          else{
            spring.setEndValue(0);
            isRight = false;
          }
        }


        // Helper for scaling an element with css transforms.
        function scale(el, scaleVal,moveVal) {
          el.style.mozTransform =
          el.style.msTransform =
          el.style.webkitTransform =
          el.style.transform = 'scale3d(' +
            scaleVal + ', ' + scaleVal + ', 1)';
          el.style.left =  moveVal*570. + 'px';
        }
      }

    }
    ,computed: {},
    created: function () {},
    mounted:function(){
      this.runExample();
      this.ballExample();
    },

    destroyed:function(){
    }
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inner-content {
  position: relative;
  margin: auto;
  max-width: 610px;
}

#logo {
  display: inline-block;
  text-align: left;
  cursor: pointer;
  position: relative;
  left:0px;
  width: 100px;
}

#graph-canvas {
  max-width: 300px;
  max-height: 300px;
  box-shadow: 0px 1px 2px #888;
  left: 310px;
  position: relative;
}

.example-container {
  margin-top: 24px;
  margin-bottom: 24px;
  max-width: 670px;
}

.photo {
  -webkit-transform: scale3d(1,1,1);
  width:300px;
  height:300px;
  max-width: 300px;
  max-height: 300px;
  display: block;
  box-shadow: 0px 1px 2px #999;
  position: absolute;
  top: 0px;
  left: 0px;
  background-size: contain !important;
  /* background: url('../../static/images/landscape.jpg'); */
}

.controls {
  text-align: center;
  margin: auto;
  margin-top: 10px;
  width: 500px;
}

.controls label {
  font-weight: 300;
  font-size: 16px;
  height: 30px;
  line-height: 30px;
  padding-right: 10px;
  display: inline-block;
  width: 120px;
  text-align: right;
}

.controls input {
  width: 300px;
  height: 30px;
  vertical-align:middle;
  margin-top: -2px;
}

.pill {
  border-radius: 32px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -56px;
  margin-top: -12px;
  width: 100px;
  color: #fff;
  text-align: center;
  padding: 6px;
  font-size: 12px;
  cursor: default;
  -webkit-transition: opacity 0.3s;
  -moz-transition: opacity 0.3s;
  -ms-transition: opacity 0.3s;
  -o-transition: opacity 0.3s;
  transition: opacity 0.3s;
  opacity: 1;
}

.photo.down .pill{
  opacity: 0;
}


</style>
