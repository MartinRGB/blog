<template>
      <div class="device-wrapper">
        <div class="device" id="device" data-device="iPhone6Plus" data-orientation="portrait" data-color="black">
          <div class="screen" id="screen">
            <!-- PUT CONTENTS HERE -->
              <!-- <video src="../static/mockups/device_test.mp4" autoplay="autoplay" loop="loop"></video> -->
              <!-- <img src='../static/images/bricks_light.jpg'></img> -->
            <!-- </video> -->
          </div>
          <div class="button">
            <!-- You can hook the "home button" to some JavaScript events or just remove it -->
          </div>
        </div>
      </div>

</template>

<script>

  import 'html5-device-mockups'
  import defaultPics from '../static/mockups/device_test.jpg'
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource);
  

  export default {
    props:['bindDevice','bindUrl'],
    name: 'mockup',
    data: function () {return {}},
    components: {},
    methods: {
      setAndroidDevice:function(){
        var thisDevice = this.$el.querySelector('.device')

        thisDevice.style.backgroundImage = 'url('+ require('../static/mockups/PixelWhite.png') + ')'
        var thisScreen = thisDevice.firstChild

        thisScreen.style.top = '11.489191% !important';
        thisScreen.style.left = '6.507258% !important';
        thisScreen.style.width = '87.16774% !important';
        thisScreen.style.height = '76.761489% !important';
        thisScreen.style.overflow = 'hidden';
        thisScreen.style.borderRadius = '4px';
        thisScreen.style.backgroundImage = ' !important';
      },
      setiOSDevice:function(){
        var thisDevice = this.$el.querySelector('.device')
        thisDevice.style.backgroundImage = 'url('+ require('../static/mockups/iPhone6PWhite.png') + ')'
        var thisScreen = thisDevice.firstChild

        thisScreen.style.top = '11.489191% !important';
        thisScreen.style.left = '6.532258064516129% !important';
        thisScreen.style.width = '87.29677419354838% !important';
        thisScreen.style.height = '76.86148919135309% !important';
        thisScreen.style.overflow = 'hidden';
        thisScreen.style.borderRadius = '4px';
        thisScreen.style.backgroundImage = ' !important';
      },
      setDevice:function(){
        if(this.bindDevice == 'android'){
          //alert('is android')
          this.setAndroidDevice()
        }

        else if(this.bindDevice == 'iOS'){
          //alert('is iOS')
          this.setiOSDevice()

        }
        else{
          //alert('default android')
          this.setAndroidDevice()
        }
      },
      setImg:function(assetSrc){
        var imgE = document.createElement("img");
        var thisScreen = this.$el.querySelector('.screen');
        imgE.id = 'newImg'
        imgE.src = assetSrc;
        imgE.style.width = '100%'
        thisScreen.appendChild(imgE);
      },
      setVideo:function(assetSrc){
        var videoE = document.createElement("video");
        var thisScreen = this.$el.querySelector('.screen');
        videoE.src = assetSrc;
        videoE.autoplay = 'autoplay'
        videoE.loop = 'loop'
        videoE.style.width = '100.5%'
        thisScreen.appendChild(videoE);

      },
      setAsset:function(assetUrl){
        if(this.bindUrl){
          if(this.bindUrl.split('.').pop() == 'jpg'){
            this.setImg(assetUrl)
          }
          else if(this.bindUrl.split('.').pop() == 'png'){
            this.setImg(assetUrl)
          }
          else if(this.bindUrl.split('.').pop() == 'mp4'){
            this.setVideo(assetUrl)
          }
          else if(this.bindUrl.split('.').pop() == 'webm'){
            this.setVideo(assetUrl)
          }
          else{
            this.setImg(defaultPics)
          }
        }
        else{
          this.setImg(defaultPics)
        }

      },
      requestAsset:function() {
        this.$http.get(this.bindUrl).then((response) => {
          // 响应成功回调
          this.setAsset(response.url)
        }, (response) => {
          // 响应错误回调
          this.codeInfo = 'Request Failed'
        });       
      
      }
    }
    ,computed: {},
    created: function () {},
    mounted:function(){
      this.setDevice()
      this.requestAsset()
    },
    destroyed:function(){
    }
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* .device {
  background-image:url('../static/images/PixelWhite.png') !important
}

.device .screen{
    top: 11.489191% !important;
    left: 6.507258% !important;
    width: 87.16774% !important;
    height: 76.761489% !important;
    overflow: hidden;
    border-radius: 4px;
    background-image:url('') !important;
} */

/* .device {
  background-image:url('../static/images/iPhone6PWhite.png') !important
}

.device .screen{
    top: 11.489191353082466% !important;
    left: 6.532258064516129% !important;
    width: 87.29677419354838% !important;
    height: 76.86148919135309% !important;
    overflow: hidden;
    border-radius: 3px;
    background-image:url('') !important;
} */
.device .screen{
    background-image:url('') !important;
}


.screen video {
  width:100.5%;
}

.screen img {
  width:100%;
  /* display: none; */
}
</style>
