<template>

  <div id="GSAP">
    <div class="boxExample">
      <h2 class="exampleTitle">GSAP - Counter Repeat Animation</h2>
        <div class="exampleDescription">
          This example demonstrates moving a box on a GSAP ease animation.
        </div>
      <div class="box" id="box"></div>
    </div>
    <div class="visualizerExampple">
      <div class="ease-visualizer" data-ease="Power2.easeOut">
      <div class="load-conatiner hidden" id ="load-container">
        <h2>GreenSock Ease Visualizer</h2>
        <div class="ease-instructions">
          <h2>Hints</h2>
          <p>Add point: ALT-CLICK on line</p>
          <p>Toggle smooth/corner: ALT-CLICK anchor</p>
          <p>Get handle from corner anchor: ALT-DRAG</p>
          <p>Toggle select: SHIFT-CLICK anchor</p>
          <p>Delete anchor: press DELETE key</p>
          <p>Undo: CTRL-Z</p>
        </div>
        <div class="ease_selector">
          <div class="ease_selector_wrap">
            <div class="ease_class">
              <div class="ease_type">Power0 (Linear)</div>
              <button class="Power0 easeOut"><span>easeNone</span></button>
              <button class="Power0 easeInOut"><span>easeNone</span></button>
              <button class="Power0 easeIn"><span>easeNone</span></button>
            </div>
            <div class="ease_class">
              <div class="ease_type">Power1</div>
              <button class="Power1 easeOut"><span>easeOut</span></button>
              <button class="Power1 easeInOut"><span>easeInOut</span></button>
              <button class="Power1 easeIn"><span>easeIn</span></button>
            </div>
            <div class="ease_class">
              <div class="ease_type">Power2</div>
              <button class="Power2 easeOut"><span>easeOut</span></button>
              <button class="Power2 easeInOut"><span>easeInOut</span></button>
              <button class="Power2 easeIn"><span>easeIn</span></button>
            </div>
            <div class="ease_class">
              <div class="ease_type">Power3</div>
              <button class="Power3 easeOut"><span>easeOut</span></button>
              <button class="Power3 easeInOut"><span>easeInOut</span></button>
              <button class="Power3 easeIn"><span>easeIn</span></button>
            </div>
            <div class="ease_class">
              <div class="ease_type">Power4</div>
              <button class="Power4 easeOut"><span>easeOut</span></button>
              <button class="Power4 easeInOut"><span>easeInOut</span></button>
              <button class="Power4 easeIn"><span>easeIn</span></button>
            </div>
            <div class="ease_class">
              <div class="ease_type">Back</div>
              <button class="Back easeOut tall"><span>easeOut</span></button>
              <button class="Back easeInOut tall"><span>easeInOut</span></button>
              <button class="Back easeIn tall"><span>easeIn</span></button>
            </div>
            <div class="ease_class">
              <div class="ease_type">Elastic</div>
              <button class="Elastic easeOut tall"><span>easeOut</span></button>
              <button class="Elastic easeInOut tall"><span>easeInOut</span></button>
              <button class="Elastic easeIn tall"><span>easeIn</span></button>
            </div>
            <div class="ease_class">
              <div class="ease_type">Bounce</div>
              <button class="Bounce easeOut"><span>easeOut</span></button>
              <button class="Bounce easeInOut"><span>easeInOut</span></button>
              <button class="Bounce easeIn"><span>easeIn</span></button>
            </div>
            <div class="ease_class">
              <div class="ease_type">Other</div>
              <button class="RoughEase"><span>RoughEase</span></button>
              <button class="SlowMo"><span>SlowMo</span></button>
              <button class="SteppedEase"><span>SteppedEase</span></button>
            </div>
            <div class="ease_class">
              <div class="ease_type">Circ</div>
              <button class="Circ easeOut"><span>easeOut</span></button>
              <button class="Circ easeInOut"><span>easeInOut</span></button>
              <button class="Circ easeIn"><span>easeIn</span></button>
            </div>
            <div class="ease_class">
              <div class="ease_type">Expo</div>
              <button class="Expo easeOut"><span>easeOut</span></button>
              <button class="Expo easeInOut"><span>easeInOut</span></button>
              <button class="Expo easeIn"><span>easeIn</span></button>
            </div>
            <div class="ease_class">
              <div class="ease_type">Sine</div>
              <button class="Sine easeOut"><span>easeOut</span></button>
              <button class="Sine easeInOut"><span>easeInOut</span></button>
              <button class="Sine easeIn"><span>easeIn</span></button>
            </div>
          </div>
        </div>

        <div class="visualization graph">
          <div class="fluidwrap">
            <div class="graphwrap">
              <svg class="svg graph_wrap_inner" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet" xml:space="preserve">
                <defs>
                  <clipPath id="graph_path">
                    <rect x="0" y="-1" width="500" height="1000" />
                  </clipPath>
                  <clipPath id="graph_path_reveal">
                    <rect x="0" y="-200" width="0" height="1000" />
                  </clipPath>
                </defs>
                <svg>
                  <rect class="graph_bg" x="0" y="-150" width="500" height="650" rx="0.2" ry="0.2" clip-path="url(#graph_path)" />
                  <g class="graph_lines" clip-path="url(#graph_path)"></g>
                  <line class="graph_linear" x1="0" y1="500" x2="500" y2="0" />
                  <line class="graph_line graph_linex" x1="0" y1="499.5" x2="500" y2="499.5" />
                  <line class="graph_line graph_liney" x1="0.5" y1="0" x2="0.5"  y2="500" />
                  <path class="graph_path" d="M1,499 L499,501" clip-path="url(#graph_path)" />

                  <path class="graph_path_reveal" d="M1,499 L499,501" clip-path="url(#graph_path_reveal)" />
                </svg>
              </svg>
            <svg class="svg" id="custom_edit_container" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet" xml:space="preserve">
              <g>
              <rect width="500" height="500" class="ease_template_bg"></rect>
              <path class="ease_template" d=""></path>
              </g>
            </svg>
            </div>

            <div class="progress">
              <div class="progress_bar horizontal"><div class="progress_fill"></div><div class="label">progress</div></div>
              <div class="progress_bar vertical"><div class="progress_fill"></div><div class="progress_joint"></div><div class="label">value</div></div>
              <div class="progress_number">0.00</div>
            </div>
          </div>
        </div>

        <div class="visualization clock" style="display: none;">
          <div class="fluidwrap">
            <div class="clock_guide"></div>
            <div class="clock_linear"></div>
            <div class="clock_ease"><div class="clock_joint"></div></div>
            <div class="clock_joint"></div>
          </div>
        </div>

        <div class="visualization box" style="display: none;">
          <div class="fluidwrap">
            <div class="boxwrap">
              <div class="boxbox box_power0">Power0</div>
              <div class="boxbox box_power1">Power1</div>
              <div class="boxbox box_power2">Power2</div>
              <div class="boxbox box_power3">Power3</div>
              <div class="boxbox box_power4">Power4</div>
              <div class="boxbox box_custom"></div>
            </div>
          </div>
        </div>


        <div class="ease_menu" style="color: #626262;">
          <div class="ease_class">Power0</div>
          <div class="ease_class">Power1</div>
          <div class="ease_class">Power2</div>
          <div class="ease_class">Power3</div>
          <div class="ease_class">Power4</div>
          <div class="ease_class">Back</div>
          <div class="ease_class">Elastic</div>
          <div class="ease_class">Bounce</div>
          <!-- <div class="ease_class">Rough</div>
          <div class="ease_class">SlowMo</div>
          <div class="ease_class">Stepped</div> -->
          <div class="ease_class">Circ</div>
          <div class="ease_class">Expo</div>
          <div class="ease_class">Sine</div>
          <div class="ease_class" style="color:#72a5d8;">Custom</div>
          <div class="ease_type_section">Type: <select class="ease_type_quick_select editable" data-type="ease_type_quick">
            <option value="easeIn">easeIn</option>
            <option value="easeInOut">easeInOut</option>
            <option value="easeOut" selected="selected">easeOut</option>
          </select></div>
        </div>

        <div class="controls">
            <button class="go">Run</button>
        </div>

        <div class="command">
          <div class='comment'>// click and modify the underlined values</div>

          <div><span class="class">TweenLite</span>.to(<select class="target_select" data-type="target">
              <option value="graph" selected="selected">graph</option>
              <option value="clock">clock</option>
              <option value="box">box</option>
            </select>, <select class="number duration editable" data-type="duration">
              <option value="0.5">0.5&#160;&#160;&#160;&#160;</option>
              <option value="1">1</option>
              <option value="2.5" selected="selected">2.5</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>, { </div>

          <div><!-- easeline --><pre>  </pre>ease: <select class="main_ease_class_select" data-type="main_ease_class">
              <option value="Back">Back</option>
              <option value="Bounce">Bounce</option>
              <option value="Circ">Circ</option>
              <option value="Elastic">Elastic</option>
              <option value="Expo">Expo</option>
              <option value="Power0">Linear/Power0</option>
              <option value="Power1">Quad/Power1</option>
              <option value="Power2" selected="selected">Cubic/Power2</option>
              <option value="Power3">Quart/Power3</option>
              <option value="Power4">Strong/Quint/Power4</option>
              <option value="Sine">Sine</option>
              <option value="RoughEase">RoughEase</option>
              <option value="SlowMo">SlowMo</option>
              <option value="SteppedEase">SteppedEase</option>
              <option value="CustomEase">Custom</option>
            </select>.<!-- start basic --><span class="main_ease_type basic_ease elastic_ease back_ease"><select class="basic_ease_type_select elastic_ease back_ease" data-type="main_basic_ease_type">
                <option value="easeIn">easeIn</option>
                <option value="easeInOut">easeInOut</option>
                <option value="easeOut" selected="selected">easeOut</option>
              </select><span class="main_ease_type basic_ease">,</span></span><!-- start linear --><span class="main_ease_type linear_ease">easeNone,</span><!-- start rough --><span class="main_ease_type rough_ease">ease.config({ <div><pre>    </pre>template: <select class="rough_ease_class_select" data-type="rough_ease_class">
              <option value="Back">Back</option>
              <option value="Bounce">Bounce</option>
              <option value="Circ">Circ</option>
              <option value="Elastic">Elastic</option>
              <option value="Expo">Expo</option>
              <option value="Power0" selected="selected">Linear/Power0</option>
              <option value="Power1">Quad/Power1</option>
              <option value="Power2">Cubic/Power2</option>
              <option value="Power3">Quart/Power3</option>
              <option value="Power4">Strong/Quint/Power4</option>
              <option value="Sine">Sine</option>
            </select>.<span class="rough_ease_type rough_basic_ease"><select class="rough_ease_type_select" data-type="rough_basic_ease_type">
                <option value="easeIn">easeIn</option>
                <option value="easeInOut">easeInOut</option>
                <option value="easeOut" selected="selected">easeOut</option>
              </select></span><span class="rough_ease_type rough_linear_ease">easeNone</span>, </div><div><pre>    </pre>strength: <select class="number rough_strength editable" data-type="rough_strength">
              <option value="0.2">0.2&#160;&#160;&#160;&#160;</option>
              <option value="0.5">0.5</option>
              <option value="1" selected="selected">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
            </select>, </div><div><pre>    </pre>points: <select class="number rough_points editable" data-type="rough_points">
              <option value="10">10&#160;&#160;&#160;&#160;</option>
              <option value="20" selected="selected">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>, </div><div><pre>    </pre>taper: <select class="rough_taper_select" data-type="rough_taper">
                <option value='"none"' selected="selected">none</option>
                <option value='"in"'>in</option>
                <option value='"out"'>out</option>
                <option value='"both"'>both</option>
              </select>, </div><div><pre>    </pre>randomize: <input type="checkbox" checked="checked" class="rough_randomize_checkbox" data-type="rough_randomize" />, </div><div><pre>    </pre>clamp: <input type="checkbox" class="rough_clamp_checkbox" data-type="rough_clamp" /></div><div><pre>  </pre>}),</div></span><!-- start slowmo --><span class="main_ease_type slowmo_ease">ease.config(<select class="number slowmo_ratio editable" data-type="slowmo_ratio">
              <option value="0.1">0.1&#160;&#160;&#160;&#160;</option>
              <option value="0.3">0.3</option>
              <option value="0.5">0.5</option>
              <option value="0.7" selected="selected">0.7</option>
              <option value="0.9">0.9</option>
            </select>, <select class="number slowmo_power editable" data-type="slowmo_power">
              <option value="0.1">0.1&#160;&#160;&#160;&#160;</option>
              <option value="0.4">0.4</option>
              <option value="0.7" selected="selected">0.7</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>, <input type="checkbox" class="slowmo_yoyo_checkbox" data-type="slowmo_yoyo" />),</span><!-- start stepped --><span class="main_ease_type stepped_ease">config(<select class="number stepped_steps editable" data-type="stepped_steps">
              <option value="2">2&#160;&#160;&#160;&#160;&#160;</option>
              <option value="6">6</option>
              <option value="12" selected="selected">12</option>
              <option value="20">20</option>
              <option value="40">40</option>
            </select>),</span><!-- start Elastic --><span class="main_ease_type elastic_ease">.config(<select class="number elastic_amplitude editable" data-type="elastic_amplitude">
            <option value="1" selected="selected">1&#160;&#160;&#160;&#160;</option>
            <option value="1.2">1.2</option>
            <option value="1.5">1.5</option>
            <option value="1.75">1.75</option>
            <option value="2">2</option>
            <option value="2.5">2.5</option>
          </select>, <select class="number elastic_period editable" data-type="elastic_period">
            <option value="0.1">0.1&#160;&#160;&#160;&#160;</option>
            <option value="0.2">0.2</option>
            <option value="0.3" selected="selected">0.3</option>
            <option value="0.4">0.4</option>
            <option value="0.5">0.5</option>
            <option value="0.75">0.75</option>
            <option value="1">1</option>
          </select>),</span><!-- start Back --><span class="main_ease_type back_ease">.config(<select class="number back_amount editable" data-type="back_amount">
            <option value="1">1&#160;&#160;&#160;&#160;</option>
            <option value="1.4">1.4</option>
            <option value="1.7" selected="selected">1.7</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>),</span><!-- start custom --><span class="main_ease_type custom_ease">create("custom", "<span contenteditable="true" spellcheck="true" class="string custom_path">"0"</span>"),</span> <!-- close ease line --></div>

          <div class="prop prop_graph"><pre>  </pre>y: <span class="number">-500</span> </div>
          <div class="prop prop_clock"><pre>  </pre>rotation: <span class="number">360</span> </div>
          <div class="prop prop_box"><pre>  </pre>x: <span class="string">"400%"</span> </div>

          <div>});</div>
          <div class="comment descriptions">
            <div class="Back"></div>
            <div class="Bounce"></div>
            <div class="Circ"></div>
            <div class="Elastic"></div>
            <div class="Expo"></div>
            <div class="Power0"></div>
            <div class="Power1"></div>
            <div class="Power2"></div>
            <div class="Power3"></div>
            <div class="Power4"></div>
            <div class="RoughEase"></div>
            <div class="Sine"></div>
            <div class="SlowMo"></div>
            <div class="SteppedEase"></div>
            <div class="Custom"></div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>

  import { TweenMax,TweenLite, Elastic} from 'gsap';

  import jQuery from 'jquery'
import $ from 'jquery'

  import '../../static/js/CustomEase.min.js'
  import '../../static/js/MorphSVGPlugin.min.js'
  //import '../../static/js/EasingVisualizer.js'

  export default {
    name: 'gsap',
    data: function () {return {
    }},
    components: {},
    methods: {
      runExample:function(){
        var box = document.getElementById("box"),
            count = 0,
            tween;
        box.innerHTML = count
        tween = TweenMax.to(box, 2.5, 
                            {left:"570px", 
                            repeat:Infinity, 
                            yoyo:true,
                            onRepeat:onRepeat, 
                            repeatDelay:0.5,         
                            ease:Elastic.easeInOut});

        function onRepeat() {
          count++
          box.innerHTML = count;
          TweenLite.set(box, {backgroundColor:"hsl(" + Math.random() * 255 + ", 90%, 60%)"});
        }						
      },



      visualizerExample:function(){
        (function ($) {
          // var htmlLink = "js/EaseVisualizer.html";
          var htmlLink = "index.html";
          var id = 0;
          var timeline;
          var $menuEases;
          var highlightTween;
          var isLoaded;
          var _numbersExp = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig;
          var _rawPathDataExp = /\bd=["']+.*["'][\s\/>]/i;

          var defaults = {
            startEase:  "Power2",
            lightTheme: false,
            lockEase:   false
          };

          var customStrings = {
            "Power0.easeOut":   "0,0,1,1",
            "Power1.easeOut":   "0.104,0.204,0.492,1",
            "Power2.easeOut":   "M0,0,C0.126,0.382,0.282,0.674,0.44,0.822,0.632,1.002,0.818,1.001,1,1",
            "Power3.easeOut":   "M0,0,C0.083,0.294,0.182,0.718,0.448,0.908,0.579,1.001,0.752,1,1,1",
            "Power4.easeOut":   "M0,0,C0.11,0.494,0.192,0.726,0.318,0.852,0.45,0.984,0.504,1,1,1",
            "Back.easeOut":     "M0,0,C0.128,0.572,0.257,1.016,0.512,1.09,0.672,1.136,0.838,1,1,1",
            "Elastic.easeOut":  "M0,0,C0,0,0.049,0.675,0.085,1.115,0.122,1.498,0.156,1.34,0.16,1.322,0.189,1.193,0.203,1.111,0.23,0.978,0.262,0.818,0.303,0.876,0.307,0.882,0.335,0.925,0.349,0.965,0.38,1.006,0.43,1.088,0.484,1.022,0.53,0.997,0.58,0.964,0.667,1.002,0.725,1.004,0.829,1.008,1,1,1,1",
            "Bounce.easeOut":   "M0,0,C0.14,0,0.242,0.438,0.272,0.561,0.313,0.728,0.354,0.963,0.362,1,0.37,0.985,0.414,0.873,0.455,0.811,0.51,0.726,0.573,0.753,0.586,0.762,0.662,0.812,0.719,0.981,0.726,0.998,0.788,0.914,0.84,0.936,0.859,0.95,0.878,0.964,0.897,0.985,0.911,0.998,0.922,0.994,0.939,0.984,0.954,0.984,0.969,0.984,1,1,1,1",
            "Circ.easeOut":     "M0,0,C0,0.408,0.242,0.657,0.295,0.709,0.346,0.76,0.584,1,1,1",
            "Expo.easeOut":     "M0,0,C0.084,0.61,0.214,0.802,0.28,0.856,0.356,0.918,0.374,1,1,1",
            "Sine.easeOut":     "M0,0,C0.266,0.412,0.436,0.654,0.565,0.775,0.609,0.816,0.78,1,1,1",
            "Power1.easeIn":    "0.532,0,0.924,0.862",
            "Power2.easeIn":    "M0,0,C0.366,0,0.438,0.069,0.575,0.19,0.802,0.39,1,1,1,1",
            "Power3.easeIn":    "M0,0,C0.482,0,0.49,0.046,0.625,0.152,0.733,0.237,0.88,0.524,1,1",
            "Power4.easeIn":    "M0,0,C0.46,0,0.496,0.014,0.616,0.088,0.734,0.161,0.884,0.4,1,1",
            "Back.easeIn":      "M0,0,C0.104,0,0.225,-0.057,0.31,-0.082,0.38,-0.102,0.452,-0.106,0.522,-0.078,0.559,-0.063,0.633,-0.003,0.672,0.052,0.772,0.198,0.874,0.414,1,1",
            "Circ.easeIn":      "M0,0,C0.42,0,0.658,0.243,0.71,0.295,0.762,0.348,1,0.59,1,1",
            "Expo.easeIn":      "M0,0,C0.5,0,0.581,0.047,0.625,0.073,0.72,0.13,0.9,0.23,1,1",
            "Sine.easeIn":      "0.434,0.004,0.79,0.698",
            "Power1.easeInOut": "M0,0,C0.272,0,0.472,0.455,0.496,0.496,0.574,0.63,0.744,1,1,1",
            "Power2.easeInOut": "M0,0,C0.173,0,0.242,0.036,0.322,0.13,0.401,0.223,0.449,0.367,0.502,0.506,0.546,0.622,0.62,0.824,0.726,0.916,0.799,0.98,0.869,1,1,1",
            "Power3.easeInOut": "M0,0 C0.212,0 0.247,0.014 0.326,0.09 0.402,0.164 0.46,0.356 0.502,0.504 0.551,0.68 0.594,0.816 0.654,0.882 0.726,0.961 0.734,1 1,1",
            "Power4.easeInOut": "M0,0,C0.29,0,0.294,0.018,0.365,0.103,0.434,0.186,0.466,0.362,0.498,0.502,0.518,0.592,0.552,0.77,0.615,0.864,0.69,0.975,0.704,1,1,1",
            "Back.easeInOut":   "M0,0,C0.068,0,0.128,-0.061,0.175,-0.081,0.224,-0.102,0.267,-0.107,0.315,-0.065,0.384,-0.004,0.449,0.253,0.465,0.323,0.505,0.501,0.521,0.602,0.56,0.779,0.588,0.908,0.651,1.042,0.705,1.082,0.748,1.114,0.799,1.094,0.817,1.085,0.868,1.061,0.938,0.998,1,1",
            "Circ.easeInOut":   "M0,0,C0.17,0,0.286,0.085,0.32,0.115,0.394,0.18,0.498,0.3,0.5,0.5,0.502,0.706,0.608,0.816,0.645,0.852,0.67,0.877,0.794,1,1,1",
            "Expo.easeInOut":   "M0,0,C0.25,0,0.294,0.023,0.335,0.05,0.428,0.11,0.466,0.292,0.498,0.502,0.532,0.73,0.586,0.88,0.64,0.928,0.679,0.962,0.698,1,1,1",
            "Sine.easeInOut":   "M0,0,C0.2,0,0.374,0.306,0.507,0.512,0.652,0.738,0.822,1,1,1"
          };

          var customSVG = {
            "Power0.easeOut":   "M0,500 C0,500 500,0 500,0",
            "Power1.easeOut":   "M0,500 C52,398 246,0 500,0",
            "Power2.easeOut":   "M0,500 C63,309 141,163 220,89 316,-1 409,-0.499 500,0",
            "Power3.easeOut":   "M0,500 C41.5,353 91,141 224,46 289.5,-0.499 376,0 500,0",
            "Power4.easeOut":   "M0,500 C55,253 96,137 159,74 225,8 252,0 500,0",
            "Back.easeOut":     "M0,500 C64,214 128.5,-8 256,-45 336,-68 419,0 500,0",
            "Elastic.easeOut":  "M0,500 C0,500 24.5,162.5 42.5,-57.5 61,-249 78,-170 80,-161 94.5,-96.5 101.5,-55.5 115,11 131,91 151.5,62 153.5,59 167.5,37.5 174.5,17.5 190,-3 215,-44 242,-11 265,1.5 290,18 333.5,-1 362.5,-2 414.5,-4 500,0 500,0",
            "Bounce.easeOut":   "M0,500 C70,500 121,281 136,219.5 156.5,136 177,18.5 181,0 185,7.5 207,63.5 227.5,94.5 255,137 286.5,123.5 293,119 331,94 359.5,9.5 363,1 394,43 420,32 429.5,25 439,18 448.5,7.5 455.5,1 461,3 469.5,8 477,8 484.5,8 500,0 500,0",
            "Circ.easeOut":     "M0,500 C0,296 121,171.5 147.5,145.5 173,120 292,0 500,0",
            "Expo.easeOut":     "M0,500 C42,195 107,99 140,72 178,41 187,0 500,0",
            "Sine.easeOut":     "M0,500 C133,294 218,173 282.5,112.5 304.5,92 390,0 500,0",
            "Power1.easeIn":    "M0,500 C266,500 462,69 500,0",
            "Power2.easeIn":    "M0,500 C183,500 219,465.5 287.5,405 401,305 500,0 500,0",
            "Power3.easeIn":    "M0,500 C241,500 245,477 312.5,424 366.5,381.5 440,238 500,0",
            "Power4.easeIn":    "M0,500 C230,500 248,493 308,456 367,419.5 442,300 500,0",
            "Back.easeIn":      "M0,500 C52,500 112.5,528.5 155,541 190,551 226,553 261,539 279.5,531.5 316.5,501.5 336,474 386,401 437,293 500,0",
            "Circ.easeIn":      "M0,500 C210,500 329,378.5 355,352.5 381,326 500,205 500,0",
            "Expo.easeIn":      "M0,500 C250,500 290.5,476.5 312.5,463.5 360,435 450,385 500,0",
            "Sine.easeIn":      "M0,500 C217,498 395,151 500,0",
            "Power1.easeInOut": "M0,500 C136,500 236,272.5 248,252 287,185 372,0 500,0",
            "Power2.easeInOut": "M0,500 C86.5,500 121,482 161,435 200.5,388.5 224.5,316.5 251,247 273,189 310,88 363,42 399.5,10 434.5,0 500,0",
            "Power3.easeInOut": "M0,500 C106,500 123.5,493 163,455 201,418 230,322 251,248 275.5,160 297,92 327,59 363,19.5 367,0 500,0",
            "Power4.easeInOut": "M0,500 C145,500 147,491 182.5,448.5 217,407 233,319 249,249 259,204 276,115 307.5,68 345,12.5 352,0 500,0",
            "Back.easeInOut":   "M0,500 C34,500 64,530.5 87.5,540.5 112,551 133.5,553.5 157.5,532.5 192,502 224.5,373.5 232.5,338.5 252.5,249.5 260.5,199 280,110.5 294,46 325.5,-21 352.5,-41 374,-57 399.5,-47 408.5,-42.5 434,-30.5 469,1 500,0",
            "Circ.easeInOut":   "M0,500 C85,500 143,457.5 160,442.5 197,410 249,350 250,250 251,147 304,92 322.5,74 335,61.5 397,0 500,0",
            "Expo.easeInOut":   "M0,500 C125,500 147,488.5 167.5,475 214,445 233,354 249,249 266,135 293,60 320,36 339.5,19 349,0 500,0",
            "Sine.easeInOut":   "M0,500 C100,500 187,347 253.5,244 326,131 411,0 500,0"
          };

          var _createSVG = function (type, container, attributes, insertBefore) {
            var element = document.createElementNS("http://www.w3.org/2000/svg", type),
              reg = /([a-z])([A-Z])/g,
              p;
            for (p in attributes) {
              element.setAttributeNS(null, p.replace(reg, "$1-$2").toLowerCase(), attributes[p]);
            }
            if (insertBefore) {
              container.parentNode.insertBefore(element, container);
            } else {
              container.appendChild(element);
            }
            return element;
          };

          var methods = {
            init:    function (options) {
              var settings = $.extend({}, defaults, options);

              return this.each(function (index) {
                var vis = $(this);
                var data = vis.data('easeVisualizer');
                if (!data) {
                  vis.data('easeVisualizer', {
                    id:              id++,
                    settings:        settings,
                    active:          true,
                    graphTL:         null,
                    clockTL:         null,
                    boxTL:           null,
                    currentVis:      "graph",
                    currentDuration: 2.5,
                    currentEaseName: "Power2",
                    currentEase:     null,
                    editMode:        false
                  });


                  $.get(htmlLink).done(function (e) {
                    if (e === null) {
                      console.log("Error. Could not load html.");
                    } else {
                      loaded(e, vis);
                      
                    }
                  }).fail(function (e) {
                    console.log("Error. Could not load html.");
                  });
                }
              });
            },
            destroy: function () {
              return this.each(function (index) {
                var vis = $(this);
                var data = vis.data("easeVisualizer");

                if (data.graphTL) data.graphTL.kill();
                if (data.clockTL) data.clockTL.kill();
                if (data.boxTL) data.boxTL.kill();

                vis.find(".go").off("click.easeVisualizer");
                vis.find("select, input").off("change.easeVisualizer");
                vis.find(".editable").off("change.easeVisualizer");
                vis.find(".main_ease_class_label").off("mousedown.easeVisualizer");

                vis.html("").removeData().removeClass("light ease_visualizer enabled").css("margin-top", "");
              });
            }
          };

          function loaded(html, vis) {
            var data = vis.data("easeVisualizer"),
              startingEaseName, easeMenuWidth,
              i, lastIndex, customEase;

            if (data.settings.lightTheme === true) {
              vis.addClass("light");
            }


            vis.addClass("ease_visualizer").html(html);
            vis.addClass("enabled");

            //$(document.head).append("<link rel='stylesheet' href='" + cssLink + "' media='screen' type='text/css' />");

            easeMenuWidth = (vis.innerWidth() - 595) || 244;
            $menuEases = $(".ease_menu .ease_class");
            $(".ease_menu").css("width", easeMenuWidth + "px").on("click", ".ease_class", {vis: vis}, onMenuEaseClick);

            var main_ease_class_select = vis.find(".main_ease_class_select");

            // run button
            vis.find(".go").css("width", easeMenuWidth + "px").on("click.easeVisualizer", {vis: vis}, onClickRun);

            // select options
            vis.find("select, input").on("change.easeVisualizer", {vis: vis}, selectChange).each(function () {
              var t = $(this);
              t.wrap("<label class='" + t.data('type') + "_label'></label>").after("<span class='display'></span>");
            }).trigger("change");

            vis.find(".editable").attr("tabindex", "-1").on("change.easeVisualizer", function (e) {
              $(this).siblings(".display").focus();
            }).siblings(".display").attr("contenteditable", "true").attr("spellcheck", "true");

            // ease selector
            if (data.settings.lockEase !== true) {
              vis.find(".ease_selector").css({display: "none", opacity: 0}).on("click", "button", {vis: vis}, easeChange).trigger("change");
              vis.find(".main_ease_class_label").on("mousedown.easeVisualizer", {vis: vis}, showVisSelect);
            } else {
              vis.find(".ease_selector").css({display: "none", opacity: 0});
              main_ease_class_select.css("display", "none").parent().addClass('locked');
            }

            vis.find(".custom_path").on("focusout.easeVisualizer", {vis: vis}, onInputCustomPath);

            vis.find(".main_ease_class_select").css("visibility", "hidden");

            var prependElement = vis.find(".graph_lines")[0];
            

            for (i = 1; i < 13; i++) {
              _createSVG("line", prependElement, {x1: i * 50, x2: i * 50, y1: -150, y2: 500, stroke: "#222", strokeWidth: 1, vectorEffect: "non-scaling-stroke"});
              if (i !== 3) {
                _createSVG("line", prependElement, {x1: 0, x2: 500, y1: i * 50 - 150, y2: i * 50 - 150, stroke:"#222", strokeWidth: 1, vectorEffect: "non-scaling-stroke"});
              }
            }
            _createSVG("line", prependElement, {x1: 0, x2: 500, y1: 0, y2: 0, stroke: "#777", strokeWidth: 1, vectorEffect: "non-scaling-stroke"});

            isLoaded = true;


            //look in the URL for a CustomEase
            i = window.location.href.indexOf("CustomEase=");
            if (i !== -1) {
              lastIndex = window.location.href.indexOf("&", i);
              customEase = decodeURI((lastIndex !== -1) ? window.location.href.substr(i+11, lastIndex - i - 11) : window.location.href.substr(i+11));
              data.settings.startEase = "CustomEase";
              vis.find(".custom_path").text(customEase);
            } else if (data.settings.startEase === "CustomEase") { //in case "CustomEase" is selected initially but no actual ease data passed into the URL, we must first default to an ease to trace, so we use Power2.easeOut.
              main_ease_class_select.find('option[value="Power2"]').prop("selected", true).trigger("change");
            }

            data.settings.startEase = data.settings.startEase || "Power2.easeOut";
            startingEaseName = parseEaseClass(data.settings.startEase, true);
            highlightMenuEase(startingEaseName);
            main_ease_class_select.find('option[value="' + parseEaseClass(data.settings.startEase) + '"]').prop("selected", true).trigger("change");

            if (timeline) {
              timeline.delay(1.5);
            }

          }

          function parseEaseClass(name, short) {
            name = name.split(".")[0];
            if (short) {
              return (name === "RoughEase") ? "Rough" : (name === "SteppedEase") ? "Stepped" : name;
            }
            return (name === "Rough") ? "RoughEase" : (name === "Stepped") ? "SteppedEase" : (name === "Custom") ? "CustomEase" : name;
          }


          function showVisSelect(e) {
            e.preventDefault();
            e.stopPropagation();

            var vis = e.data.vis;

            window.showBasicOverlay(vis.find(".ease_selector").focus(), function () {
              hideVisSelect(vis);
            });

            return false;
          }

          function hideVisSelect(vis) {
            vis.find(".main_ease_class_label").css("visibility", "visible");
            window.hideBasicOverlay();
          }

          function onMenuEaseClick(e) {
            if (highlightMenuEase(this.textContent)) { //returns true if the ease was already selected.
              if (timeline) {
                timeline.restart();
              }
              return;
            }
            e.data.vis.find(".main_ease_class_select").find('option[value="' + parseEaseClass(this.textContent) + '"]').prop("selected", true).trigger("change");
          }


          
          function highlightMenuEase(name) {
            if (highlightTween) { //a simple, performant way to unhighlight the previous ease.
              if (highlightTween.target.textContent !== name) { //if it's the same target, it means the user clicked on the already-highlighted ease, so do nothing.
                TweenLite.to(highlightTween.target, 0.2, {backgroundColor: "rgba(0,0,0,0)", color: "#626262", clearProps: "backgroundColor,color"});
              } else {
                return true;
              }
            }
            var i = $menuEases.length;
            while (--i > -1) {
              if ($menuEases[i].textContent === name) {
                highlightTween = TweenLite.to($menuEases[i], 0.2, {backgroundColor: "#88CE02", color: "black"});
              }
            }
            $menuEases.siblings(".ease_type_section").css("visibility", (name === "Rough" || name === "Stepped" || name === "SlowMo" || name === "Power0" || name === "Custom") ? "hidden" : "visible");
          }

          function easeChange(e) {
            var vis = e.data.vis;
            var main_ease_class_select = vis.find(".main_ease_class_select");
            var basic_ease_type_select = vis.find(".basic_ease_type_select");
            var button = $(this);
            var val = button.attr("class").split(" ");

            main_ease_class_select.find('option[value="' + val[0] + '"]').prop("selected", true).trigger('change');

            if (val[1] && val[1] !== "easeNone") {
              basic_ease_type_select.find('option[value="' + val[1] + '"]').prop("selected", true).trigger('change');
            }

            highlightMenuEase(parseEaseClass(val[0], true));

            hideVisSelect(vis);
          }


          function selectChange(e) {
            var vis = e.data.vis;
            var element = $(this);
            var isSelect = element.is("select");
            var type = element.data("type");
            var value = isSelect ? element.val() : element.prop("checked");
            if (isSelect) {
              var display = element.siblings(".display").text(value);
              //var width = display.width();
              //if (width !== 0) element.width(width);
            } else {
              element.siblings(".display").text(value ? "true" : "false");
            }

            switch (type) {
              case "ease_type_quick":
                vis.find(".basic_ease_type_select").find('option[value="' + value + '"]').prop("selected", true).trigger('change');
                return;
                break;

              case "target":
                var all = vis.find(".visualization");
                var allprops = vis.find(".prop");
                switch (value) {
                  case "graph":
                    showOnly(vis.find(".graph"), all);
                    showOnly(vis.find(".prop_graph"), allprops);
                    break;

                  case "clock":
                    showOnly(vis.find(".clock"), all);
                    showOnly(vis.find(".prop_clock"), allprops);
                    break;

                  case "box":
                    showOnly(vis.find(".box"), all);
                    showOnly(vis.find(".prop_box"), allprops);
                    break;
                }
                break;

              case "main_ease_class":
                var all = vis.find(".main_ease_type");
                var data = vis.data("easeVisualizer");
                data.editMode = false;
                switch (value) {
                  case "Power0":
                    showOnly(vis.find(".linear_ease"), all);
                    break;

                  case "RoughEase":
                    showOnly(vis.find(".rough_ease"), all);
                    break;

                  case "SlowMo":
                    showOnly(vis.find(".slowmo_ease"), all);
                    break;

                  case "SteppedEase":
                    showOnly(vis.find(".stepped_ease"), all);
                    break;

                  case "Elastic":
                    showOnly(vis.find(".elastic_ease"), all);
                    break;

                  case "Back":
                    showOnly(vis.find(".back_ease"), all);
                    break;

                  case "CustomEase":
                    showOnly(vis.find(".custom_ease"), all);
                    data.editMode = true;
                    break;

                  default:
                    showOnly(vis.find(".basic_ease"), all);
                }

                checkVertical(vis);

                var descriptions = vis.find(".descriptions").children();
                showOnly(descriptions.filter("." + value), descriptions);

                vis.toggleClass("editMode", data.editMode);
                break;

              case "rough_ease_class":
                var all = vis.find(".rough_ease_type");
                switch (value) {
                  case "Power0":
                    showOnly(vis.find(".rough_linear_ease"), all);
                    break;

                  default:
                    showOnly(vis.find(".rough_basic_ease"), all);
                }
                checkVertical(vis);
                break;

              case "main_basic_ease_type":
                checkVertical(vis);
                vis.find(".ease_type_quick_select").find('option[value="' + value + '"]').prop("selected", true);
                vis.find(".ease_type_quick_select").siblings(".display").text(value);
                break;

              case "rough_basic_ease_type":
                checkVertical(vis);
                break;

              case "rough_taper":
              case "rough_randomize":
              case "rough_clamp":
              case "slowmo_yoyo":
                break;
            }

            refreshTween(vis);

            customMode(vis, (vis.data("easeVisualizer").currentEaseName === "CustomEase"));
            run(null, vis);

          }

          function customMode(vis, enabled) {
            if (vis.custom !== enabled) {
              vis.custom = enabled;
              var path = vis.find(".ease_template")[0],
                ease = vis.data("easeVisualizer").currentEase,
                text = vis.find(".custom_path")[0],
                hasError,
                onEaseError = function () {
                  hasError = true;
                };
              if (enabled) {
                path.style.visibility = "visible";
                TweenLite.fromTo(".ease-instructions", 0.3, {y: 50}, {autoAlpha: 1, y: 0, delay: 0.2});
                path.setAttribute("d", CustomEase.getSVGData(ease, {width: 500, height: 500}));
                if (vis.editor) {
                  vis.editor.enabled(true);
                  vis.editor.select();
                } else {
                  vis.editor = new PathEditor(path, {
                    draggable:  false,
                    anchorSnap: PathEditor.getSnapFunction({x: 0, y: 0, width: 500, height: 500, containY: false, gridSize: 50, radius: 5, axis: PathEditor.editingAxis}),
                    onUpdate:   function () {
                      var hadError = hasError,
                        lastX = this._bezier[0][this._bezier[0].length - 2],
                        firstX = this._bezier[0][0];
                      hasError = false;
                      text.innerHTML = this.getNormalizedSVG(500, 500, true, onEaseError);
                      hasError = (hasError || firstX > 1 || lastX < 499);
                      if (hadError !== hasError) {
                        this._selectionPath.style.stroke = hasError ? "red" : "#4e7fff";
                      }
                    },
                    handleSnap: PathEditor.getSnapFunction({x: 0, y: 0, width: 500, height: 500, containY: false, containX: false, radius: 5, axis: PathEditor.editingAxis})
                  });
                }

              } else if (vis.editor) {
                vis.editor.enabled(false);
                path.style.visibility = "hidden";
                TweenLite.to(".ease-instructions", 0.3, {autoAlpha: 0});
              }
              else{
                TweenLite.fromTo(".ease-instructions", 0.3, {y: 0},{autoAlpha: 0});
              }
            }
          }

          function onInputCustomPath(e) { //when the user manually changes the custom ease text, like pasting in a chunk of SVG.
            var vis = e.data.vis,
              data, nums, ease;
            if (vis && vis.custom) {
              // console.log("changed text", vis.find(".custom_path").text());
              data = vis.find(".custom_path").text();
              if (data.indexOf("<") !== -1) {
                nums = data.match(_rawPathDataExp);
                if (nums) {
                  data = nums[0];
                  data = PathEditor.getCubicSVGData(data.substr(3, data.length - 5));
                }
              }
              nums = data.match(_numbersExp);
              ease = CustomEase.create("custom", data, {height: (Math.abs(1 - nums[nums.length - 2]) < 0.01 ? -1 : 0)});
              vis.data("easeVisualizer").currentEase = ease;
              createGraph(vis);
              vis.find(".ease_template").attr("d", vis.find(".graph_path_reveal").attr("d"));
              vis.editor.init();
            }
          }

          function checkVertical(vis) { //Elastic.easeOut needs more room up top.
            var main_ease_class_select = vis.find(".main_ease_class_select").val();
            var basic_ease_type_select = vis.find(".basic_ease_type_select").val();
            var target_select = vis.find(".target_select").val();
            var tall = (target_select === "graph" && (main_ease_class_select === "CustomEase" || (main_ease_class_select === "Elastic" || main_ease_class_select === "Back" || (main_ease_class_select === "RoughEase" && vis.find(".rough_ease_class_select").val() === "Elastic" && vis.find(".rough_ease_type_select").val() === "easeOut"))));
            if (tall) {
              TweenLite.to(vis, 0.5, {paddingTop: 250, ease: Power2.easeInOut});
              TweenLite.to(vis.find(".ease_menu"), 0.5, {top: 250, ease: Power2.easeInOut});
              TweenLite.to(vis.find("#graph_path").find("rect"), 0.5, {attr:{y:-200}, ease:Power2.easeInOut});
            } else { //we decided not to animate BACK after going tall because it's annoying.
              TweenLite.to(vis, 0.3, { paddingTop:100, ease:Power2.easeInOut });
              TweenLite.to(vis.find(".ease_menu"), 0.3, {top:100, ease:Power2.easeInOut});
              TweenLite.to(vis.find("#graph_path").find("rect"), 0.3, {attr:{y:0}, ease:Power2.easeInOut});
            }
          }

          function refreshTween(vis) {
            var d = parseFloat(vis.find(".duration").siblings(".display").text());
            var previousEaseName = vis.data("easeVisualizer").currentEaseName;
            var type = vis.find(".basic_ease_type_select").val();
            if (isNaN(d) || d === 0) d = 2.5;
            vis.find(".duration").siblings(".display").text(d);

            var ease, c = vis.find(".main_ease_class_select").val(), t = vis.find(".target_select").val();
            switch (c) {
              case "Power0":
                ease = Power0.easeNone;
                break;

              case "RoughEase":
                var strength = parseFloat(vis.find(".rough_strength").siblings(".display").text(), 10);
                if (isNaN(strength) || strength === 0) strength = 1;
                vis.find(".rough_strength").siblings(".display").text(strength);

                var points = parseFloat(vis.find(".rough_points").siblings(".display").text(), 10);
                if (isNaN(points) || points === 0) points = 20;
                if (points > 500) points = 500;
                vis.find(".rough_points").siblings(".display").text(points);

                var rc = vis.find(".rough_ease_class_select").val();
                var template = window[rc][vis.find(".rough_ease_type_select").val()];

                ease = new RoughEase({
                  strength:  strength,
                  points:    points,
                  template:  template,
                  taper:     vis.find(".rough_taper_select").val().replace(/\"/g, ""),
                  randomize: vis.find(".rough_randomize_checkbox").prop("checked"),
                  clamp:     vis.find(".rough_clamp_checkbox").prop("checked")
                });
                break;

              case "SlowMo":
                var ratio = parseFloat(vis.find(".slowmo_ratio").siblings(".display").text(), 10);
                if (isNaN(ratio) || ratio < 0) ratio = 0.7;
                vis.find(".slowmo_ratio").siblings(".display").text(ratio);

                var power = parseFloat(vis.find(".slowmo_power").siblings(".display").text(), 10);
                if (isNaN(power) || power < 0) power = 0.7;
                vis.find(".slowmo_power").siblings(".display").text(power);

                var yoyo = vis.find(".slowmo_yoyo_checkbox").prop("checked");

                ease = new SlowMo(ratio, power, yoyo);
                break;

              case "SteppedEase":
                var steps = parseInt(vis.find(".stepped_steps").siblings(".display").text(), 10);
                if (isNaN(steps) || steps === 0) steps = 12;
                if (steps > 100) steps = 100;
                vis.find(".stepped_steps").siblings(".display").text(steps);

                ease = new SteppedEase(steps);
                break;

              case "Elastic":
                var amplitude = parseFloat(vis.find(".elastic_amplitude").siblings(".display").text()) || 1,
                  period = parseFloat(vis.find(".elastic_period").siblings(".display").text());
                vis.find(".elastic_amplitude").siblings(".display").text(amplitude);
                vis.find(".elastic_period").siblings(".display").text(period);
                ease = Elastic[type].config(amplitude, period);
                break;

              case "Back":
                var amount = parseFloat(vis.find(".back_amount").siblings(".display").text()) || 1;
                vis.find(".back_amount").siblings(".display").text(amount);
                ease = Back[type].config(amount);
                break;

              case "CustomEase":
                ease = CustomEase.create("custom", vis.find(".custom_path").text(), {height: 1});
                break;

              default:
                ease = window[c][type];
            }

            var data = vis.data("easeVisualizer");
            data.currentVis = t;
            data.currentDuration = d;
            data.currentEaseName = c;
            data.currentEaseType = type;
            data.currentEase = ease;

            if (!(c === "CustomEase" && previousEaseName !== "CustomEase") && isLoaded) {
              createGraph(vis);
            }
          }


          function onClickRun(e, vis) {
            var vis = e.data.vis;
            if (vis && vis.custom) { //if in custom editing mode, create the ease now
              refreshTween(vis);
              run(e, vis);
            }
            if (timeline) {
              timeline.restart();
            }
          }

          function run(e, vis) {
            $("div#load-container").removeClass("hidden");
            if (typeof vis === "undefined") {
              vis = e.data.vis;
              // rebuild each run
              refreshTween(vis);
            }
            var data = vis.data("easeVisualizer");
            var graphTL = data.graphTL;
            var clockTL = data.clockTL;
            var boxTL = data.boxTL;

            if (graphTL) graphTL.progress(0).kill();
            if (clockTL) clockTL.progress(0).kill();
            if (boxTL) boxTL.progress(0).kill();
            switch (data.currentVis) {
              case "graph":
                runGraphVis(vis);
                break;

              case "clock":
                runClockVis(vis);
                break;

              case "box":
                runBoxVis(vis);
                break;
            }
          }
          


          function runGraphVis(vis) {
            var data = vis.data("easeVisualizer");
            var d = data.currentDuration;
            var ease = data.currentEase;
            var offset = 0.2;
            var graphTL = timeline = new TimelineLite({delay: 0.1}); //delay slightly to give the CPU time to breathe after all the setup (avoid jank)
            graphTL.add("start", offset);

            var number = vis.find(".progress_number");
            graphTL.to({p: 0}, d, {
              ease: Linear.easeNone, p: 1, onUpdate: function () {
                number.text(this.target.p.toFixed(2));
              }
            }, "start");

            graphTL.fromTo(vis.find(".graph_line"), 0.0001, {autoAlpha: 0}, {autoAlpha: 1}, "start");

            graphTL.fromTo(vis.find("#graph_path_reveal rect"), d, {attr: {width: 0}}, {attr: {width: 500}, ease: Linear.easeNone}, "start");
            graphTL.fromTo(vis.find(".graph_liney"), d, {attr: {x1: 0, x2: 0}}, {attr: {x1: 500, x2: 500}, ease: Linear.easeNone}, "start");
            graphTL.fromTo(vis.find(".progress_joint"), d, {top: "100%"}, {top: "0%", ease: ease}, "start");
            graphTL.fromTo(vis.find(".graph_linex"), d, {attr: {y1: 500, y2: 500}}, {attr: {y1: 0, y2: 0}, ease: ease}, "start");

            graphTL.fromTo(vis.find(".horizontal .progress_fill"), d, {scaleX: 0, transformOrigin: "left center"}, {ease: Linear.easeNone, scaleX: 1}, "start");
            graphTL.fromTo(vis.find(".vertical .progress_fill"), d, {scaleY: 0, transformOrigin: "left bottom"}, {ease: ease, scaleY: 1}, "start");

            graphTL.to(vis.find(".graph_line"), 0.07, {autoAlpha: 0});

            data.graphTL = graphTL;
            return graphTL;
          }

          function runClockVis(vis) {
            var data = vis.data("easeVisualizer");
            var d = data.currentDuration;
            var ease = data.currentEase;
            var offset = 0.2;

            var clockTL = timeline = new TimelineLite();
            clockTL.add("start", offset);

            clockTL.fromTo(vis.find(".clock_ease"), d, {rotation: 0, transformOrigin: "center bottom"}, {ease: ease, rotation: 360, force3D: true}, "start");
            clockTL.fromTo(vis.find(".clock_linear"), d, {rotation: 0, transformOrigin: "center bottom"}, {ease: Linear.easeNone, rotation: 360, force3D: true}, "start");

            clockTL.fromTo(vis.find(".horizontal .progress_fill"), d, {scaleX: 0, transformOrigin: "left center"}, {ease: Linear.easeNone, scaleX: 1, force3D: true}, "start");

            data.clockTL = clockTL;
          }

          function runBoxVis(vis) {
            var data = vis.data("easeVisualizer");
            var d = data.currentDuration;
            var ease = data.currentEase;
            var easeType = data.currentEaseType;
            var offset = 0.2;

            var boxTL = timeline = new TimelineLite();
            boxTL.add("start", offset);

            boxTL.fromTo(vis.find(".box_power0"), d, {x: "0%"}, {ease: Power0.easeIn, x: "400%", force3D: true}, "start");
            boxTL.fromTo(vis.find(".box_power1"), d, {x: "0%"}, {ease: Power1[easeType] || Power1.easeOut, x: "400%", force3D: true}, "start");
            boxTL.fromTo(vis.find(".box_power2"), d, {x: "0%"}, {ease: Power2[easeType] || Power2.easeOut, x: "400%", force3D: true}, "start");
            boxTL.fromTo(vis.find(".box_power3"), d, {x: "0%"}, {ease: Power3[easeType] || Power3.easeOut, x: "400%", force3D: true}, "start");
            boxTL.fromTo(vis.find(".box_power4"), d, {x: "0%"}, {ease: Power4[easeType] || Power4.easeOut, x: "400%", force3D: true}, "start");
            boxTL.fromTo(vis.find(".box_custom"), d, {x: "0%"}, {ease: ease, x: "400%", force3D: true}, "start");

            boxTL.fromTo(vis.find(".horizontal .progress_fill"), d, {scaleX: 0, transformOrigin: "left center"}, {ease: Linear.easeNone, scaleX: 1, force3D: true}, "start");

            data.boxTL = boxTL;
          }

          function createGraph(vis) {
            var name = vis.find(".main_ease_class_select").val(),
              data = vis.data("easeVisualizer"),
              precision = (name === "SteppedEase" || name === "Bounce" || name === "Elastic") ? 3 : 1,
              ease = data.currentEase || Linear.easeNone,
              mainEase = data.currentEaseName,
              fullEaseName = mainEase + "." + data.currentEaseType,
              customString = ((fullEaseName !== "Elastic.easeOut" && mainEase !== "Back") || (fullEaseName === "Elastic.easeOut" && ease._p1 === 1 && ease._p3 === 0.075) || (mainEase === "Back" && ease._p1 === 1.7)) ? customStrings[fullEaseName] : null, //note: we created a simplified version of Elastic.easeOut and the Back eases, but only with the default configuration so if there is any customization, we should just do the auto-tracing.
              $customPath = vis.find(".custom_path"),
              path, simplified;
            if (customString) {
              $customPath.text(customString);
              path = customSVG[fullEaseName];
            } else {
              path = CustomEase.getSVGData(ease, {width: 500, height: 500, precision: precision});
              simplified = ease.rawBezier ? path : PathEditor.simplifySVG(path, {tolerance: (precision === 1) ? 3 : 1, cornerThreshold: (mainEase === "Bounce") ? 130 : (mainEase === "SteppedEase" || mainEase === "RoughEase") ? 180 : 0});
              $customPath.text(CustomEase.getSVGData(new CustomEase("custom", simplified, {height: 500}), {width: 1, height: -1, y: 1, precision: precision}));
            }
            if (isLoaded) {
              TweenLite.to(".graph_path", 0.4, {morphSVG: path});
              vis.find(".graph_path_reveal").attr("d", path);
            }
          }

          function showOnly(target, set) {
            TweenLite.set(target, {display: ""});
            TweenLite.set(set.not(target), {display: "none"});
          }

          $.fn.easeVisualizer = function (method) {
            if (methods[method]) {
              return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === 'object' || !method) {
              return methods.init.apply(this, arguments);
            } else {
              $.error('Method ' + method + ' does not exist');
            }
          };
        })(jQuery);
        /* $("#visualizer").easeVisualizer ({lightTheme :false}); */


        // adds simple showBasicOverlay() and hideBasicOverlay() methods to the window. Just pass a DOM element to showBasicOverlay()
        // and optionally a callback that should be called when the overlay closes, like showBasicOverlay(myElement, myFunction);
        // and it'll handle animating it in/out, centering it in the window, and creating a dimmed background that senses clicks
        // to close itself. It also pauses all GSAP-driven animations that were running, and then resumes them again when it closes.
        // Requires either TweenMax *or* all of the following: TweenLite, CSSPlugin, EasePack (and if you want the auto-pausing, also include TimelineLite).
        ;(function () {
          var dimmer = document.getElementById("overlay-dimmer"),
            activeOverlay, overlayZIndex, exportedRoot, overlayOnComplete;
          if (!dimmer) {
            dimmer = document.createElement("div");
            dimmer.setAttribute("id", "overlay-dimmer");
            dimmer.style.cssText = "width: 100%; height: 100%; background-color: black; opacity: 0.5; position: fixed; top: 0;left: 0; z-index: 4000; cursor: pointer; visibility: hidden;";
            TweenLite.set(dimmer, {force3D: true});
            (document.body || document.documentElement).appendChild(dimmer);
          }
          function showBasicOverlay(overlay, onComplete) {
            if (!overlay) {
              console.log("Error: no overlay argument provided to showBasicOverlay().");
              return;
            }
            if (activeOverlay) { //if there's already one open, immediately close it.
              TweenLite.set(activeOverlay, {autoAlpha: 0, display: "none"});
              if (overlayZIndex) {
                activeOverlay.style.zIndex = overlayZIndex;
              } else {
                TweenLite.set(activeOverlay, {clearProps: "zIndex"});
              }
              if (exportedRoot) {
                exportedRoot.resume();
              }
            }
            activeOverlay = overlay[0] || overlay; //in case it's a jQuery object.
            overlayZIndex = activeOverlay.style.zIndex;
            if (window.TimelineLite) {
              exportedRoot = TimelineLite.exportRoot().pause();
            }
            TweenLite.set(activeOverlay, {opacity: 0, xPercent: -50, yPercent: -50, x: 0, display: "block", zIndex: 5000, top: "50%", left: "50%", position: "fixed", maxHeight: "98%", bottom: "auto", right: "auto"});
            TweenLite.to(dimmer, 0.25, {autoAlpha: 0.6, ease: Linear.easeNone});
            TweenLite.to(activeOverlay, 0.25, {autoAlpha: 1, force3D: true});
            overlayOnComplete = onComplete;
            return false;
          }

          function hideBasicOverlay() {
            if (activeOverlay) {
              TweenLite.to(dimmer, 0.2, {autoAlpha: 0, ease: Linear.easeNone, onComplete: overlayOnComplete});
              TweenLite.set(activeOverlay, {
                autoAlpha: 0, display: "none", onComplete: function () {
                  if (overlayZIndex) {
                    activeOverlay.style.zIndex = overlayZIndex;
                  } else {
                    TweenLite.set(activeOverlay, {clearProps: "zIndex"});
                  }
                  activeOverlay = null;
                  if (exportedRoot) {
                    exportedRoot.resume();
                  }
                }
              });
            }
          }

          dimmer.onclick = hideBasicOverlay;

          window.showBasicOverlay = showBasicOverlay;
          window.hideBasicOverlay = hideBasicOverlay;

        }());

        $(".ease-visualizer").each(function () {
          var $this = $(this);
          $this.css({padding: "70px 20px 20px", borderRadius: "10px", color: "#999", backgroundColor: "#222"}).html("<p style='padding:250px 0 300px; font-size:30px; text-align:center;'>Loading...</p>").easeVisualizer({startEase: $this.data("ease") || "Power2.easeOut", lightTheme: $this.data("light")});
        });
      }
    }
    ,computed: {},
    created: function () {},
    mounted:function(){
      this.runExample()
      this.$nextTick(function () {

        this.visualizerExample()
      })
    },

    destroyed:function(){
    }
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #demo {
    height:100%;
    position:relative;
    /* overflow:hidden; */
  }
  .box {
    width:100px;
    height:100px;
    position:relative;
    border-radius:6px;
    margin-top:24px;
    margin-bottom:24px;
    text-align:center;
    line-height:100px;
    color:black;
    font-size:80px;
    background-color:#6fb936;
  }

/*----------------------------------------------*/

div.hidden
{
   display: none
}

/* .ease_visualizer .controls button{
	margin:0 !important;
} */

.ease_visualizer .ease_selector .ease_type {
	font-size: 14px !important;
}
.ease_visualizer h2 {
    z-index: 1000 !important;
}

/*----------------------------------------------*/

.custom_edit_bg {
	fill:#303030;
}
#custom_edit_container {
	top:0;
	left:0;
	overflow:visible;
}
.ease-instructions {
	position: absolute;
	top:38px;
	right: 13px;
	width: 245px;
	color: #777;
	border-bottom: 1px solid #444;
	padding-bottom: 10px;
	pointer-events: none;
	opacity: 0;
	visibility: hidden;
}
.ease-instructions p {
	font-size: 13px;
	margin: 0;
	padding: 2px 0;
}
.ease-visualizer .ease-instructions h2 {
	font-size: 17px;
	color: #aaa;
	margin:0;
	padding: 2px 0;
	position: static;
}

.ease_visualizer, .ease_visualizer * {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}
.ease_visualizer textarea:focus, .ease_visualizer input:focus, .ease_visualizer button:focus, .ease_visualizer select:focus {
	outline: 0;
}
.ease_menu {
	position: absolute;
	top: 70px;
	right: 20px;
	width:244px;
	font-size: 1.5em;
	color: #626262;
	z-index:500;
	display: inline-block;
}
.ease_visualizer h2 {
	position: absolute;
	top: 24px;
	font-size:36px;
	color: #999;
	font-weight: 400;
	padding: 0;
	margin: 0;
}
.ease_menu .ease_class:hover {
	color: #888;
  background-color: #333;
}
.ease_menu .ease_class {
	position: relative;
	padding: 2px 6px;
  border-radius: 4px;
  float: left;
  clear: both;
  cursor: pointer;
}
.ease_menu .ease_type {
	position: absolute;
	display: none;
}
.ease_menu .ease_type_quick_label {
  color: #ddd;
}
.ease_menu .ease_type_section {
	border-top: 1px solid #444;
	padding: 6px;
  clear:both;
  position: relative;
  top: 10px;
}
.ease_visualizer {
	width: 100%;
	max-width: 840px;
	padding: 0;
	padding-top: 70px;
	margin-left: auto;
	margin-right: auto;
	color: #999999;
	font-size: 13px;
	font-family: "Signika Negative", sans-serif;
	position: relative;
}

.ease_visualizer {
	visibility: hidden;
}
.ease_visualizer.enabled {
	visibility: visible;
}

.ease_visualizer a {
	color: #61AC27;
}

.ease_visualizer .go {
	width: 244px;
	z-index: 5;
}
.ease_visualizer .command {
	position: relative;
	padding: 14px;
	margin-top: 30px;
	font-size: 18px;
	line-height: 26px;
	font-family: consolas, menlo, monaco, "courier new", monospace;
	z-index: 2;
	background-color: rgba(255,255,255,0.025);
	color: #F1F2F3;
	border-radius: 6px;
}
.ease_visualizer.light .command {
	background-color: rgba(0,0,0,0.855);
}

.ease_visualizer .command pre {
	display: inline;
}

@media screen and (min-width: 950px) {
	.ease_visualizer .command div {
		display: inline;
	}
	.ease_visualizer .command pre {
		display: none;
	}
}

.ease_visualizer .command .easetype_rough .rough_easeclass,
.ease_visualizer .command .easetype_rough .rough_easetype {
	display: inline;
}

.ease_visualizer .command .number,
.ease_visualizer .command .number + .display {
	color: #FACD22;
}
.ease_visualizer .command .class,
.ease_visualizer .command .class + .display,
.ease_visualizer .command .main_ease_class_label,
.ease_visualizer .command .rough_ease_class_label {
	color: #72a5d8;
}
.ease_visualizer .command .string,
.ease_visualizer .command .string + .display,
.ease_visualizer .command .rough_taper_label {
	color: #EC7600;
}
.ease_visualizer .command .comment {
	color: #999999;
	display: block !important;
	line-height: 24px;
	margin: 5px 0;
}
.ease_visualizer .command .comment div {
	display: block;
}
.ease_visualizer .command .comment .clubgreensock {
	color: #F1F2F3;
	padding: 14px 6px 6px 6px;
	margin-top: 14px;
	border-top: 1px solid #61AC27;
}
.ease_visualizer .command .comment .clubgreensock:before {
	content: "";
	float: left;
	width: 62px;
	height: 74px;
	margin-top: -8px;
	margin-left: -6px;
	margin-right: 14px;
	background: url(https://www.greensock.com/forums/uploads/packages-0558826001407339622.png) 0 0 no-repeat;
	background-size: 62px;
}
.ease_visualizer .command .keyword,
.ease_visualizer .command .slowmo_yoyo_label,
.ease_visualizer .command .rough_randomize_label,
.ease_visualizer .command .rough_clamp_label {
	color: #93C763;
}

.ease_visualizer label {
	position: relative;
	text-decoration: underline;
	cursor: pointer;
}
.ease_visualizer label.locked {
	text-decoration: none;
	cursor: auto;
}

.ease_visualizer label input,
.ease_visualizer label select {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 1;
	font: inherit;
	font-size: inherit;
	line-height: inherit;
	height: 100%;
	width: 100%;
	color: #000000 !important;
	opacity: 0;
	background: none;
	border: none;
	padding: 0;
	margin: 0;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	cursor: pointer;
}
.ease_visualizer label input + .display {
	position: relative;
	z-index: 2;
}
.ease_visualizer label input:focus + .display,
.ease_visualizer label select:focus + .display {
	-webkit-box-shadow: 0 0 0 2px #222222, 0 0 1px 3px #FFFFFF;
	-moz-box-shadow: 0 0 0 2px #222222, 0 0 1px 3px #FFFFFF;
	box-shadow: 0 0 0 2px #222222, 0 0 1px 3px #FFFFFF;
	outline: none;
}

.ease_visualizer  span[contenteditable] {
	text-decoration: underline;
	cursor: pointer;
}
.ease_visualizer  span[contenteditable]:focus {
	-webkit-box-shadow: 0 0 0 2px #222222, 0 0 1px 3px #FFFFFF;
	-moz-box-shadow: 0 0 0 2px #222222, 0 0 1px 3px #FFFFFF;
	box-shadow: 0 0 0 2px #222222, 0 0 1px 3px #FFFFFF;
	outline: none;
}
.ease_visualizer .easeclass {
	direction: rtl;
}


.ease_visualizer .controls {
	/* margin: 10px 0; */
	position: relative;
	z-index: 5;
}
@media screen and (min-width: 720px) {
	.ease_visualizer .controls {
		/* margin-top: -16px; */
	}
}
.ease_visualizer .controls button {
	border: none;
	margin: -40px 0 0 0;
	padding: 0 24px;
	cursor: pointer;
	display: inline-block;
	line-height: 44px;
	font-size:18px;
	border-radius: 6px;
	text-transform: uppercase;
	float: right;
	position:relative;
	color: #F1F2F3;
	background-color: #414141;
	background-image: -webkit-linear-gradient(top, #575757, #414141);
	background-image: -moz-linear-gradient(top, #575757, #414141);
	background-image: -ms-linear-gradient(top, #575757, #414141);
	background-image: -o-linear-gradient(top, #575757, #414141);
	background-image: linear-gradient(to bottom, #575757, #414141);
	text-shadow: 0px 1px 0px #414141;
	-webkit-box-shadow: 0px 1px 0px #414141;
	-moz-box-shadow: 0px 1px 0px #414141;
	box-shadow: 0px 1px 0px #414141;
	-webkit-user-select: none;
	-moz-user-select: none;
	user-select: none;
}
.ease_visualizer .controls button:hover {
	background-color: #57a818;
	background-image: -webkit-linear-gradient(top, #57a818, #4d9916);
	background-image: -moz-linear-gradient(top, #57a818, #4d9916);
	background-image: -ms-linear-gradient(top, #57a818, #4d9916);
	background-image: -o-linear-gradient(top, #57a818, #4d9916);
	background-image: linear-gradient(to bottom, #57a818, #4d9916);
	text-shadow: 0px 1px 0px #32610e;
	-webkit-box-shadow: 0px 1px 0px #32610e;
	-moz-box-shadow: 0px 1px 0px #32610e;
	box-shadow: 0px 1px 0px #32610e;
}

.ease_visualizer .visualization {
	max-width: 100%;
	height: auto;
	/* margin-left: auto; */
	/* margin-right: auto; */
	z-index: 100;
}

.ease_visualizer .fluidwrap {
	height: 0;
	width: 100%;
	padding-bottom: 100%;
}

.ease_visualizer .graph {
	position: relative;
	width: 100%;
	max-width: 530px;
	-webkit-user-select: none;
	-moz-user-select: none;
	user-select: none;
}
.ease_visualizer.editMode.mousedown .graph {
	z-index: 100;
}
.ease_visualizer .graph .graphwrap {
	position: absolute;
	top: 0;
	right: 5.660377358490566%;
	bottom: 5.660377358490566%;
	left: 0;
}
	.ease_visualizer .graph .graph_wrap_inner {
		pointer-events: none;
		overflow:visible;
	}

.ease_visualizer .graph .svg {
	position: absolute;
	z-index: 1;
	width: 100%;
	height: 100%;
	cursor: default;
}
.ease_visualizer .graph .svg svg {
	overflow: visible;
}
.ease_visualizer .graph .svg .graph_bg {
	fill: #303030;
}
.ease_visualizer.light .graph .svg .graph_bg {
	fill: #DDDDDD;
}
.ease_visualizer .graph .svg .graph_linear {
	fill: none;
	stroke: #1d1d1d;
	stroke-width: 1.5px;
}
.ease_visualizer.light .graph .svg .graph_linear {
	stroke: #EDEDED;
}
.ease_visualizer .graph .svg .graph_line {
	fill: none;
	stroke: rgba(255,255,255,0.07);
	stroke-width: 1.5px;
}
.ease_visualizer.light .graph .svg .graph_line {
	stroke: rgba(0,0,0,0.1);
}
.ease_visualizer .graph .svg .graph_path, .ease_visualizer .graph .svg .ease_template {
	fill: none;
	stroke: #666666;
	stroke-width: 2px;
	stroke-linecap: round;
	stroke-linejoin: round;
}
.ease_visualizer .graph .svg .ease_template {
	stroke: #F1F2F3;
}
.ease_visualizer .graph .svg .ease_template_bg {
	fill: transparent;
}

.ease_visualizer.light .graph .svg .graph_path, .ease_visualizer.light .graph .svg .ease_template {
	stroke: #AAAAAA;
}
.ease_visualizer.light .graph .svg .ease_template {
	stroke: #CCC;
}
.ease_visualizer .graph .svg .graph_path_reveal {
	fill: none;
	stroke: #F1F2F3;
	stroke-width: 0.4px;
	stroke-linecap: round;
	stroke-linejoin: round;
}
.ease_visualizer.light .graph .svg .graph_path_reveal {
	stroke: #3C3C3C;
}

.ease_visualizer .graph .svg .control,
.ease_visualizer .graph .svg .point {
	cursor: pointer;
}
.ease_visualizer .graph .svg .point,
.ease_visualizer .graph .svg .control {
	fill: #61AC27;
	stroke: transparent;
	stroke-width: 2px;
}
.ease_visualizer .graph .svg .point {
	fill: #61AC27;
}
.ease_visualizer .graph .svg .line {
	stroke: #61AC27;
	stroke-width: 0.3px;
	stroke-dasharray: 1,0.6;
}
.ease_visualizer .graph .svg .outside .point,
.ease_visualizer .graph .svg .outside .control {
	fill: #E81146;
}
.ease_visualizer .graph .svg .outside .line {
	stroke: #E81146;
}
.ease_visualizer .graph .svg .mouse_catch {
	fill: transparent;
}
.ease_visualizer .graph .custom_edit {
	visibility: hidden;
}
.ease_visualizer.editMode .graph .custom_edit {
	visibility: visible;
}
.ease_visualizer .graph .progress {
	position: absolute;
	height: 100%;
	width: 100%;
	z-index: 0;
}
.ease_visualizer .graph .progress_bar .label {
	position: absolute;
	line-height: 30px;
}
.ease_visualizer .graph .progress_bar.horizontal .label {
	bottom: 1px;
	width: 100%;
	text-align: center;
}
.ease_visualizer .graph .progress_bar.vertical .label {
	top: 50%;
	left: 2px;
	margin-left: -50%;
	transform-origin: top left;
	-webkit-transform: matrix(0, 1, -1, 0, 0, 0);
	-moz-transform: matrix(0, 1, -1, 0, 0, 0);
	transform: matrix(0, 1, -1, 0, 0, 0);
}
.ease_visualizer .graph .progress_bar {
	position: absolute;
	background-color: #2f2f2f;
}
.ease_visualizer.light .graph .progress_bar {
	background-color: #DDDDDD;
}
.ease_visualizer .graph .progress_bar.horizontal {
	height: 2px;
	width: auto;
	top: auto;
	bottom: 0;
	left: 0;
	right: 5.660377358490566%;
}
.ease_visualizer .graph .progress_bar.vertical {
	width: 2px;
	top: 0;
	bottom: 5.660377358490566%;
	left: auto;
	right: 0;
}
.ease_visualizer .graph .progress_fill {
	height: 100%;
	width: 100%;
	background-color: #999999;
}
.ease_visualizer.light .graph .progress_fill {
	background-color: #777777;
}
.ease_visualizer .graph .progress_bar.vertical .progress_fill {
	background-color: #61AC27;
}
.ease_visualizer .graph .progress_bar.vertical .progress_joint {
	position: absolute;
	width: 10px;
	height: 10px;
	margin-left: -4px;
	margin-top: -5px;
	border-radius: 50%;
	background-color: rgb(136, 206, 2);
}
@media screen and (min-width: 560px) {
	.ease_visualizer .graph .progress_bar.vertical .progress_joint {
		width: 25px;
		height: 25px;
		margin-left: -11px;
		margin-top: -12px;
	}
}
.ease_visualizer .graph .progress_number {
	position: absolute;
	bottom: 0;
	right: -9px;
	line-height: 0.35em;
	text-align: right;
}

@media screen and (max-width: 430px) {
	.ease_visualizer .graph .progress_bar .label {
		display: none;
	}
	.ease_visualizer .graph .progress_number {
		display: none;
	}
}


.ease_visualizer .clock {
	position: relative;
	width: 100%;
	max-width: 530px;
	border-radius: 50%;

	background-color: #303030;
}
.ease_visualizer.light .clock {
	background-color: #DDDDDD;
}
.ease_visualizer .clock_ease,
.ease_visualizer .clock_linear,
.ease_visualizer .clock_guide {
	position: absolute;
	left: 50%;
	width: 2px;
	margin-left: -1px;
}
.ease_visualizer .clock_linear {
	top: 15%;
	height: 35%;
	width: 2px;
	margin-left: -1px;
	border-radius: 2px 2px 0 0;
	background-color: #999999;
}
.ease_visualizer.light .clock_linear {
	background-color: #3C3C3C;
}
.ease_visualizer .clock_ease {
	height: 50%;
	border-radius: 2px 2px 0 0;
	background-color: #61AC27;
}
.ease_visualizer .clock_guide {
	top: 0;
	height: 50%;
	background-color: #1d1d1d;
	width: 1px;
	margin-left: -0.5px;
}
.ease_visualizer.light .clock_guide {
	background-color: #EDEDED;
}
.ease_visualizer .clock_joint,
.ease_visualizer .clock_ease .clock_joint{
	position: absolute;
	width: 10px;
	height: 10px;
	top: 50%;
	left: 50%;
	margin-left: -5px;
	margin-top: -5px;
	border-radius: 50%;
	background-color: #999999;
}
.ease_visualizer.light .clock_joint {
	background-color: #3C3C3C;
}
.ease_visualizer .clock_ease .clock_joint {
	top: -1px;
	background-color: #61AC27;
}
@media screen and (min-width: 560px) {
	.ease_visualizer .clock_ease .clock_joint {
		width: 16px;
		height: 16px;
		margin-left: -8px;
		margin-top: -8px;
	}
}


.ease_visualizer .box {
	position: relative;
	width: 100%;
	max-width: 530px;
	background-color: #303030;
}
.ease_visualizer.light .box {
	background-color: #DDDDDD;
}
.ease_visualizer .box .boxwrap {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}
.ease_visualizer .boxbox {
	position: relative;
	width: 20%;
	white-space: pre;
	text-align: center;
	margin-bottom: .8%;
	border-radius: 6px;
	height: 16%;
	line-height: 24px;
	padding: 0 0.5em;
	color: #ccc;
	background-color: #666666;
  font-size: 16px;
  line-height: 80px;
}
.ease_visualizer .boxbox.box_custom {
	background-color: rgb(136, 206, 2);
}


.ease_visualizer .ease_selector {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 6;
	background-color: #222;
	overflow: auto;
	padding: 4px;
}
.ease_visualizer .ease_selector .ease_selector_wrap {
	width: 100%;
	height: auto;
	margin-left: auto;
	margin-right: auto;
	-webkit-user-select: none;
	-moz-user-select: none;
	user-select: none;
	background-color: #222222;
}
.ease_visualizer .ease_selector .ease_class {
	overflow: hidden;
	float: left;
	width: 49.5%;
	margin: 0 1% 0 0;
	position: relative;
}
.ease_visualizer .ease_selector .ease_class:nth-child(even) {
	margin: 0;
}
.ease_visualizer.light .ease_selector .ease_class {
	border-color: #DDDDDD;
}
@media screen and (max-width: 500px) {
	.ease_visualizer .ease_selector .ease_class {
		clear: left;
		width: 100%;
		margin-right: 0;
	}
}
.ease_visualizer .ease_selector input {
	display: none;
}
.ease_visualizer .ease_selector .ease_type,
.ease_visualizer .ease_selector button {
	font-family: consolas, menlo, monaco, "courier new", monospace;
	font-weight: normal;
	font-size: 12px;
	text-align: center;
	color: #FFFFFF;
}
.ease_visualizer .ease_selector .ease_type {
	position: absolute;
	z-index: 2;
	width: 100%;
	font-size: 22px;
	line-height: 34px;
	color: #fff;
}
.ease_visualizer .ease_selector button {
	border: none;
	margin: 1px 0 0 0;
	padding: 0;
	background: url(https://greensock.com/wp-content/themes/greensock/includes/EaseVisualizer/EaseVisualizer-dark.gif) 0 0 no-repeat;
	background-size: 700%;
	font-weight: bold;
	color: #3C3C3C;
	float: left;
	height: 0;
	width: 33.33333%;
	padding-bottom: 33.33333%;
	padding-top: 28px;
	position: relative;
}
.ease_visualizer .ease_selector button span {
	color: #999;
	background-color: #111;
}
.ease_visualizer .ease_selector .other button {
	width: 25%;
}
.ease_visualizer .ease_selector button:hover {
	-webkit-box-shadow: 0 0 5px #4298ED inset;
	-moz-box-shadow: 0 0 5px #4298ED inset;
	box-shadow: 0 0 5px #4298ED inset;
}
.ease_visualizer .ease_selector button:focus,
.ease_visualizer .ease_selector button:active {
	outline: 0;
	-webkit-box-shadow: 0 0 8px #4298ED inset;
	-moz-box-shadow: 0 0 8px #4298ED inset;
	box-shadow: 0 0 8px #4298ED inset;
}
.ease_visualizer .ease_selector button.Back.easeOut {
	background-position: 0% 0%;
}
.ease_visualizer .ease_selector button.Back.easeInOut {
	background-position: 16.6% 0%;
}
.ease_visualizer .ease_selector button.Back.easeIn {
	background-position: 33.3% 0%;
}

.ease_visualizer .ease_selector button.Bounce.easeOut {
	background-position: 50% 0%;
}
.ease_visualizer .ease_selector button.Bounce.easeInOut {
	background-position: 66.6% 0%;
}
.ease_visualizer .ease_selector button.Bounce.easeIn {
	background-position: 83.3% 0%;
}

.ease_visualizer .ease_selector button.Circ.easeOut {
	background-position: 100% 0%;
}
.ease_visualizer .ease_selector button.Circ.easeInOut {
	background-position: 0% 24.1%;
}
.ease_visualizer .ease_selector button.Circ.easeIn {
	background-position: 16.6% 24.1%;
}

.ease_visualizer .ease_selector button.Elastic.easeOut {
	background-position: 33.3% 24.1%;
}
.ease_visualizer .ease_selector button.Elastic.easeInOut {
	background-position: 50% 24.1%;
}
.ease_visualizer .ease_selector button.Elastic.easeIn {
	background-position: 66.6% 24.1%;
}

.ease_visualizer .ease_selector button.Expo.easeOut {
	background-position: 83.3% 24.1%;
}
.ease_visualizer .ease_selector button.Expo.easeInOut {
	background-position: 100% 24.1%;
}
.ease_visualizer .ease_selector button.Expo.easeIn {
	background-position: 0% 48.2%;
}

.ease_visualizer .ease_selector button.Power0.easeOut {
	background-position: 16.6% 48.2%;
}
.ease_visualizer .ease_selector button.Power0.easeInOut {
	background-position: 16.6% 48.2%;
}
.ease_visualizer .ease_selector button.Power0.easeIn {
	background-position: 16.6% 48.2%;
}

.ease_visualizer .ease_selector button.Power1.easeOut {
	background-position: 33.3% 48.2%;
}
.ease_visualizer .ease_selector button.Power1.easeInOut {
	background-position: 50% 48.2%;
}
.ease_visualizer .ease_selector button.Power1.easeIn {
	background-position: 66.6% 48.2%;
}

.ease_visualizer .ease_selector button.Power2.easeOut {
	background-position: 83.3% 48.2%;
}
.ease_visualizer .ease_selector button.Power2.easeInOut {
	background-position: 100% 48.2%;
}
.ease_visualizer .ease_selector button.Power2.easeIn {
	background-position: 0% 72.4%;
}

.ease_visualizer .ease_selector button.Power3.easeOut {
	background-position: 16.6% 72.4%;
}
.ease_visualizer .ease_selector button.Power3.easeInOut {
	background-position: 33.3% 72.4%;
}
.ease_visualizer .ease_selector button.Power3.easeIn {
	background-position: 50% 72.4%;
}

.ease_visualizer .ease_selector button.Power4.easeOut {
	background-position: 66.6% 72.4%;
}
.ease_visualizer .ease_selector button.Power4.easeInOut {
	background-position: 83.3% 72.4%;
}
.ease_visualizer .ease_selector button.Power4.easeIn {
	background-position: 100% 72.4%;
}

.ease_visualizer .ease_selector button.Sine.easeOut {
	background-position: 0% 96.5%;
}
.ease_visualizer .ease_selector button.Sine.easeInOut {
	background-position: 16.6% 96.5%;
}
.ease_visualizer .ease_selector button.Sine.easeIn {
	background-position: 33.3% 96.5%;
}

.ease_visualizer .ease_selector button.CustomEase {
	background-position: 50% 96.5%;
}
.ease_visualizer .ease_selector .other button.CustomEase {
	background-position: 50% 99%;
}
.ease_visualizer .ease_selector button.RoughEase {
	background-position: 66.6% 96.5%;
}
.ease_visualizer .ease_selector .other button.RoughEase {
	background-position: 66.6% 99%;
}
.ease_visualizer .ease_selector button.SlowMo {
	background-position: 83.3% 96.5%;
}
.ease_visualizer .ease_selector .other button.SlowMo {
	background-position: 83.3% 99%;
}
.ease_visualizer .ease_selector button.SteppedEase {
	background-position: 100% 96.5%;
}
.ease_visualizer .ease_selector .other button.SteppedEase {
	background-position: 100% 99%;
}

</style>
