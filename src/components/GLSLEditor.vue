<template>
        <!-- <div v-bind:id='bindId' v-bind:class='bindClass' data="../../../static/codesnippets/hsbcolor.frag"></div> -->
         <div ></div>
</template>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource);


  export default {
    props: ['bindId','bindClass'],
    name: 'GLSLEditor',
    data () {
      return {
        // codeInfo: '',
        // codeUrl: "../../../static/codesnippets/triangles.cpp",
        // bindId: 'CodeSnippet'
      }
    }
    // ,methods: {
    //     request:function() {
    //       this.$http.get(this.bindUrl).then((response) => {
    //         // 响应成功回调
    //         this.codeInfo = response.data
    //       }, (response) => {
    //         // 响应错误回调
    //         this.codeInfo = 'Request Failed'
    //       }).then(this.highlight);       
    //     },
    //     highlight:function(){
    //         var aCodes = document.getElementById(this.bindId).getElementsByTagName('pre');
    //         for (var i=0; i < aCodes.length; i++) {
    //             hljs.highlightBlock(aCodes[i]);
    //             hljs.lineNumbersBlock(aCodes[i]);
    //         }
    //     }
    // }
    ,mounted:function(){
      //this.request()
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
