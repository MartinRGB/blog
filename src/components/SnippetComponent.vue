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
    props: ['bindUrl','lan'],
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
          }, (response) => {
            // 响应错误回调
            this.codeInfo = 'Request Failed'
          }).then(this.highlight);       
        
        },
        // ----------------------------------------
        // HighLight Snippet
        // ----------------------------------------
        highlight:function(){
            var aCodes = this.$el.getElementsByTagName('pre');
            for (var i=0; i < aCodes.length; i++) {
                hljs.highlightBlock(aCodes[i]);
                hljs.lineNumbersBlock(aCodes[i]);
            }
        }
    },
    mounted:function(){
      this.request()
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
