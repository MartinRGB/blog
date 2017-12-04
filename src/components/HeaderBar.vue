<template>
  <div id="header" class="header">
    <div class="linkCon">
      <router-link to="/"><a class="link">Martin‘s Graphic Notes</a></router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header',
    data () {
      return {
        // title: 'MartinRGB' + &#39; + 's Graphic Notes '
      }
    }
  }
</script>
