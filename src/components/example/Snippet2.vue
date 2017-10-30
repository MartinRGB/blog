<template>
    <pre id="snippet"><code>{{ info }}</code></pre>
</template>
<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import '../assets/js/hljs.js'
  import '../assets/js/hljs-linenumbers.js'
  Vue.use(VueResource);

  // Vue.directive('highlightjs', function() {
  //   var aCodes = document.getElementsByTagName('pre');
  //   for (var i=0; i < aCodes.length; i++) {
  //       hljs.highlightBlock(aCodes[i]);
  //       //hljs.lineNumbersBlock(aCodes[i]);
  //       //
  //   }
  //   // let blocks = this.el.querySelectorAll('pre code');
  //   // Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  // })

  //
  // 组件方法
  //

  // Vue.component('new-snippet',{
  //       template: `
  //       <div v-bind:id='bindId'>
  //         <pre ><code v-bind:class='bindClass'>{{ codeInfo }}</code></pre>
  //         <button @click="request">Request</button>
  //       </div>`,
  //       data() {
  //         return{
  //           codeUrl: "../../../static/codesnippets/brickwall.vert",
  //           codeInfo: 'Requesting',
  //           bindClass: 'language-glsl',
  //           bindId: 'codeSnippet'
  //         }
  //       },
  //       methods: {
  //           request() {
  //             this.$http.get(this.codeUrl).then((response) => {
  //               // 响应成功回调
  //               this.codeInfo = response.data
  //             }, (response) => {
  //               // 响应错误回调
  //               this.codeInfo = 'Request Failed'
  //             }).then(this.highlight);       
  //           },
  //           highlight(){
  //               var aCodes = document.getElementById(this.bindId).getElementsByTagName('pre');
  //               for (var i=0; i < aCodes.length; i++) {
  //                   hljs.highlightBlock(aCodes[i]);
  //                   hljs.lineNumbersBlock(aCodes[i]);
  //               }
  //           }
            
  //       }
  // });

  export default {
    name: 'snippet',
    data() {
      return{
        url: "../../../static/codesnippets/brickwall.vert",
        info: ''
      }
    },
    methods: {
      request: function() {
        //
        // ------------- Method 1 - VueResource -------------
        //

        var _this = this;
        this.$http.get(this.url).then((response) => {
          // 响应成功回调
          //alert(response.data);
          _this.info = response.data
        }, (response) => {
          // 响应错误回调
          _this.info = 'Request Failed'
        });        

        //
        // ------------- Method 2 - XHR -------------
        //

        // var _this = this;
        // this.info = "Requesting ...";
        // var rq = new XMLHttpRequest();
        // rq.open("GET", this.url);
        // rq.onreadystatechange = function(vm) {
        //   if (this.readyState === XMLHttpRequest.DONE) {
        //     console.log(`status:${this.status}`)
        //     if (this.status === 200) {
        //       _this.info = this.responseText;
        //       //document.getElementById('codeConatiner').innerHTML = this.responseText;
      
        //       //console.log(this.responseText)
        //      // alert(this.responseText);
        //     } else {
        //       _this.info = "Request Failed";
        //       //document.getElementById('codeConatiner').innerHTML =  "Request Failed";
        //     }
        //   }
        //   else{
        //     _this.info = "Requesting ...";
        //     //document.getElementById('codeConatiner').innerHTML =  "Requesting ...";
        //   }
        // };
        // rq.send(null);

      }
      // ,highlight: function(){
      //     var aCodes = document.getElementsByTagName('pre');
      //     for (var i=0; i < aCodes.length; i++) {
      //         hljs.highlightBlock(aCodes[i]);
      //         hljs.lineNumbersBlock(aCodes[i]);
      //         //
      //     }
      // }
    },
    created:function(){
       
        //this.highlightCode = this.highlight()
    },
    mounted:function(){
       this.requestFile = this.request()
       //this.highlight()
        //this.highlightCode = this.highlight()
    },
    destroyed:function(){
        //this.requestFile()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
