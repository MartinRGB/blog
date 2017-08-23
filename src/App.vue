<template>
  <div id="app">
    <header-bar></header-bar>
    <router-view></router-view>
    <footer-bar></footer-bar>
  </div>
</template>

<style lang="stylus" src="./style/index.styl"></style>

<script>
import FooterBar from './components/FooterBar.vue'
import HeaderBar from './components/HeaderBar.vue'

export default {
  name: 'app',
  components: {
    FooterBar,
    HeaderBar
  }
}
    
</script>

<style>
</style>
