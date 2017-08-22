<template>
  <div id="header" class="header">
    <div class="linkCon">
      <router-link to="/"><a class="link">{{title}}</a></router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header',
    data () {
      return {
        title: 'OpenGL Online Notes'
      }
    }
  }
</script>
