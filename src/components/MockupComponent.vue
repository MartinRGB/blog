<template>
      <div class="device-wrapper">
        <div class="device" data-device="iPhone6Plus" data-orientation="portrait" data-color="black">
          <div class="screen">
            <!-- PUT CONTENTS HERE -->
              <video src="../static/mockups/device_test.mp4" autoplay="autoplay" loop="loop"></video>
              <img src="../static/mockups/device_test.jpg" ></img>
            </video>
          </div>
          <div class="button">
            <!-- You can hook the "home button" to some JavaScript events or just remove it -->
          </div>
        </div>
      </div>

</template>

<script>

  import 'html5-device-mockups'

  

  export default {
    name: 'mockup',
    data: function () {return {

    }},
    components: {},
    methods: {
    }
    ,computed: {},
    created: function () {},
    mounted:function(){

    },
    destroyed:function(){
    }
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.device {
  background-image:url('../static/mockups/PixelWhite.png') !important
}

.device .screen{
    top: 11.489191% !important;
    left: 6.507258% !important;
    width: 87.16774% !important;
    height: 76.761489% !important;
    overflow: hidden;
    border-radius: 4px;
    background-image:url('') !important;
}

.device {
  background-image:url('../static/mockups/iPhone6PWhite.png') !important
}

.device .screen{
    top: 11.489191353082466% !important;
    left: 6.532258064516129% !important;
    width: 87.29677419354838% !important;
    height: 76.86148919135309% !important;
    overflow: hidden;
    border-radius: 3px;
    background-image:url('') !important;
}



.screen video {
  width:100.5%;
  display: none;  
}

.screen img {
  width:100%;
  display: none;
}
</style>
