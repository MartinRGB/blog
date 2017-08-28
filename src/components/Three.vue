<template>
    <div id="center-container" class="center-container">
      <div id="article-view" class="article-view">
            <three-component v-if="$route.meta.keepAlive"></three-component>
            <!-- <three-component v-if="$route.meta.keepAlive"></three-component> -->
      </div>
    </div>
</template>

<script>

  import ThreeComponent from './ThreeComponent.vue'

  

  export default {
    name: 'three',
    data: function () {return {

    }},
    components: {ThreeComponent},
    methods: {
      scrollToTop: function(){
        window.scrollTo(0, 0);
      }
    }
    ,computed: {},
    created: function () {},
    mounted:function(){
      this.scrollToTop()

    },
    destroyed:function(){
    }
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
