<template>
  <div class="transition-container">
    <div class="center-container">
      <div id="list" class ="list-view">

        <h2>Environment ,Style Test & Lab</h2>
        <ul>
          <router-link to="/article"><li><a >1.砖块着色器</a></li></router-link>
          
          <router-link to="/test"><li><a >2.Three Test</a></li></router-link>
          <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'list',
    data: function () {return {
    }},
  methods: {
  },
  mounted:function() {
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
