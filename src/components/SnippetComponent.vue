<template>
        <div>
          <pre v-bind:class='lan'><code>{{ codeInfo }}</code></pre>
        </div>
</template>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource);
  import '../static/js/hljs.js'
  import '../static/js/hljs-linenumbers.js'

  export default {
    props: ['bindUrl','lan','bindCode','bindSpecial'],
    name: 'SnippetComponent',
    data () {
      return {
        codeInfo: '',
      }
    },
    methods: {
        // ----------------------------------------
        // Vue Resource Request
        // ----------------------------------------
        request:function() {
          this.$http.get(this.bindUrl).then((response) => {
            // 响应成功回调
            this.codeInfo = response.data
            //nextTick 是等 响应式的数据对应的视图更新完毕之后再触发。
            this.$nextTick(function () { this.highlight() })  
          }, (response) => {
            // 响应错误回调
            this.codeInfo = 'Request Failed'
          });       
        
        },
        localBind:function() {
          this.$http.get(this.bindCode).then((response) => {
            // 响应成功回调
            this.codeInfo = this.bindCode
            this.$nextTick(function () { this.highlight() })  
          }, (response) => {
            // 响应错误回调
            this.codeInfo = this.bindCode
          });
        },
        // ----------------------------------------
        // HighLight Snippet
        // ----------------------------------------
        highlight:function(){
          
            var aCodes = this.$el.getElementsByTagName('pre');
            console.log(aCodes)
            for (var i=0; i < aCodes.length; i++) {
                hljs.highlightBlock(aCodes[i]);
                hljs.lineNumbersBlock(aCodes[i]);
            }
        }
    },
    mounted:function(){
      if(this.bindUrl !=null){
        this.request()
      }
      else if(this.bindCode !=null){
        this.localBind()

        var codeElements = this.$el.getElementsByTagName('code')
        for (var i = 0; i < codeElements.length; i++) {
          codeElements[i].style.background = 'transparent';
          codeElements[i].style.whiteSpace = 'pre-line';
          codeElements[i].style.fontSize = '12px';
          
          if(this.bindSpecial !=null){
            var str = this.bindSpecial.split(':')
            codeElements[i].style[str[0]] = str[1];
            codeElements[i].style.paddingLeft = '0px';
          }

        }

      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
