<template>

  <div id="demo">
      <div class="box green" id="greenBox">0</div>
  </div>
</template>

<script>

import { TweenMax,TweenLite, Elastic} from 'gsap';

  export default {
    name: 'gsaptest',
    data: function () {return {}},
    components: {},
    methods: {
      setAnim:function(){
        var box = document.getElementById("greenBox"),
            count = 0,
            tween;

        tween = TweenMax.to(box, 2.5, 
                            {left:"570px", 
                            repeat:20, 
                            yoyo:true,
                            onRepeat:onRepeat, 
                            repeatDelay:0.5,         
                            ease:Elastic.easeInOut});

        function onRepeat() {
          count++
          box.innerHTML = count;
          TweenLite.set(box, {backgroundColor:"hsl(" + Math.random() * 255 + ", 90%, 60%)"});
        }						
      }
    }
    ,computed: {},
    created: function () {},
    mounted:function(){
      this.setAnim()

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
    margin-top:4px;
    text-align:center;
    line-height:100px;
    color:black;
    font-size:80px;
  }

  .green{
    background-color:#6fb936;
  }
</style>
