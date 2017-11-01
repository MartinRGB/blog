<template>
  <div class="transition-container">
    <div id="center-container" class="center-container">
      <div id="article-view" class="article-view">
            <h1 id="toc_0">{{articleTitle}}</h1>
            <div v-html="rawHTML"></div>
            <snippet-component v-if="$route.meta.keepAlive" id="CodeSnippet2" :bindUrl ='htmlSnippet'></snippet-component>
            <list-transition></list-transition>
            <editor-component></editor-component>
            <template></template>
            <template2></template2>
            <template3></template3>
      </div>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource);

  import ListTransition from '@/components/example/ListTransition'
  import Template from '@/components/example/Template'
  import Template2 from '@/components/example/Template'
  import Template3 from '@/components/example/Template'
  import EditorComponent from '@/components/example/EditorComponent'

  import SnippetComponent from '@/components/SnippetComponent'

  import htmlFile from 'file-loader!../static/codesnippets/brickwall.html'
  import htmlFile2 from 'vue-html-loader!../static/codesnippets/brickwall.html'
  import htmlFile3 from 'vue-html-loader!../static/html/test.html'
  import htmlFile4 from 'vue-html-loader!../static/html/test2.html'



  export default {
    name: 'three',
    data: function () {return {
      articleTitle:'3.ThreeTest',
      htmlSnippet:htmlFile,
      rawHTML:htmlFile2,

    }},
    components: {ListTransition,Template,Template2,Template3,EditorComponent,SnippetComponent},
    methods: {},
    computed: {},
    created: function () {},
    mounted:function(){},
    destroyed:function(){}
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
