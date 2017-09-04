<template>
      <div></div>
</template>

<style src="../style/glslEditor.css"></style>

<script>
  import '../static/js/glslCanvas.js'
  import '../static/js/glslEditor.js'
  import GLSLStyle from '../static/js/CanvasStyle.js'

  var styleTriggered = false;

  var count = 0;
  var funcNum = 0;

  var bindData
  export default {
    name: 'GLSLComponent',
    data () {
      return {
        
      }
    },
    methods: {
      initGLSLEditor:function(){
          var canvasStyle = new GLSLStyle()
          canvasStyle.load()
      }
    },
    ready:function(){
    },
    created:function(){
    },
    mounted:function(){

      // Function only triggered once
      if(!styleTriggered){
        this.glslInit = this.initGLSLEditor();
        styleTriggered = true;
      }


    },
    destroyed:function(){
      styleTriggered = false;
    }
  }

</script>

