<template>
      <div>
        <div v-bind:id ='bindId' v-bind:class='bindClass' :data='bindUrl'></div>
      </div>
</template>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource);
  import '../assets/js/glslCanvas.js'
  import '../assets/js/glslEditor.js'

  var bindData
  export default {
    props: ['bindId','bindClass','bindUrl'],
    name: 'GLSLComponent',
    data () {
      return {
        
      }
    },
    methods: {
      request:function() {
          var _this = this;
          this.$http.get(this.bindUrl).then((response) => {
            // 响应成功回调
            this.bindUrl = response.data

          }, (response) => {
            // 响应错误回调
            this.bindData = 'Request failed'
          });
      }
    },
    ready:function(){
    },
    created:function(){
    },
    mounted:function(){
      this.request()
      this.asyncData()
    },
    destroyed:function(){}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>


