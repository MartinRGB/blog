<template>
  <div class="home">
    <div class="transition-container">
      <div class="center-container">
        <div id="list" class ="list-view">
          <h2>Environment ,Style Test & Lab</h2>
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
  }
}
</script>

<style scoped>
</style>
