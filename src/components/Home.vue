<template>
  <div class="home">
    <div class="transition-container">
      <div class="center-container">
        <div id="list" class ="list-view">
        
              <posts></posts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const createPosts = id => () => import('../postjs').then(m => m.default(id))

export default {
  name: 'home',
  components: {
    'posts': createPosts("posts")
  },
  methods:{
  }
}
</script>

<style scoped>
</style>
