<template>
  <div class="editor-container" id="editor">
    <textarea :value="input" class="textarea" @input="update"></textarea>
    <div v-html="compiledMarkdown" class="previewarea"></div>
  </div>
</template>


<script>
  import marked from 'marked'
  import lodash from 'lodash'


  export default {
    name: 'editor',
    data () {
        return {
          input: '# hello'
        }
    },
    computed: {
      compiledMarkdown: function () {
        return marked(this.input, { sanitize: true })
      }
    },
    methods: {
      update: _.debounce(function (e) {
        this.input = e.target.value
      }, 300)
    }
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html, body {
  margin: 0;
  height: 100%;
  font-family: "Avenir", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Helvetica, Arial, sans-serif;
  color: #333;
}

.editor-container{
    max-width: 670px;
    margin: 0 auto;
    text-align: left;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 24px;
    height: 400px;
    margin-bottom: 24px;
}

textarea, #editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
  padding: 20px;
  margin-left: 5px;
}

.previewarea {
  background: #f3f5f6;
  margin-left: -5px;
}

textarea {

}

code {
  color: #f66;
}
</style>
