<template>
  <v-lazy-image
    :src="src"></v-lazy-image>
</template>

<script>
  import Vue from 'vue'
  import mediumZoom from 'medium-zoom'
  Vue.use(mediumZoom);

  var prevImg=null;

  export default {
    name: 'Mimage',
    props: ['src',],
    methods: {
    },
    data () {
      return {
        imageSrc: 25
      }
    },
    mounted:function(){
      var thisE = this.$el
      //alert(this.src)
      setTimeout(function(){ 
          mediumZoom(thisE)
          thisE.setAttribute("data-action","zoom");
          thisE.setAttribute("class","medium-zoom-image");
      }, 1600);
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
