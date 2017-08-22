<template>
    <div id="test" class="test">
        URL: <input type="text" v-model.trim="url" v-on:keyup.enter="xhr">
        <button v-on:click="xhr">XHR</button><br>
        <pre><code id="codeConatiner" class='language-glsl'>{{ info }}</code></pre>
    </div>
</template>
<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource);

  export default {
    name: 'test',
    data() {
      return{
        url: "../../../static/jsons/brickwall.json",
        info: ''
      }
    },
    methods: {
      xhr: function() {
        //
        // ------------- Method 1 - VueResource -------------
        //
        // var _this = this;
        // _this.$http.get('../../../static/codesnippets/brickwall.frag').then((response) => {
        //   // 响应成功回调
        //   //alert(response.data);
        //   _this.info = response.data
        // }, (response) => {
        //   // 响应错误回调
        //   _this.info = 'Request Failed'
        // });

        //
        // ------------- Method 2 - XHR -------------
        //

        var _this = this;
        this.info = "Requesting ...";
        var rq = new XMLHttpRequest();
        rq.open("GET", this.url);
        rq.onreadystatechange = function(vm) {
          if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
              _this.info = this.responseText;
              //document.getElementById('codeConatiner').innerHTML = this.responseText;

              //console.log(this.responseText)
            } else {
              _this.info = "Request Failed";
              //document.getElementById('codeConatiner').innerHTML =  "Request Failed";
            }
          }
          else{
            _this.info = "Requesting ...";
            //document.getElementById('codeConatiner').innerHTML =  "Requesting ...";
          }
        };

        rq.send(null);
      }
    },
    mounted:function(){
        this.requestFile = this.xhr()
    },
    destroyed:function(){
        //this.requestFile()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
