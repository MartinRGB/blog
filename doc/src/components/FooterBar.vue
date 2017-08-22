<template>
  <footer class="footer">
    Copyright © {{ thisYear }} {{userName}} | Powered by <a href='https://github.com/viko16/vue-ghpages-blog' target="_blank">{{projectName}}</a>
  </footer>
</template>

<script>
  export default {
    name: 'footer',
    data () {
      return {
        thisYear: new Date().getFullYear(),
        userName: 'MartinRGB',
        projectName: 'vue-ghpages-blog' 
      }
    }
  }
</script>
