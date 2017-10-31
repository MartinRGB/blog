<template>
  <div class="transition-container">
    <div id="center-container" class="center-container">
      <div id="article-view" class="article-view">
            <h1 id="toc_0">{{articleTitle}}</h1>
            <h2>设置标题</h2>
            <p>因为使用了 Shell 脚本来填充列表和排序，所以若想文章有序，必须在单文件组件文章中设置<code>articleTitle:</code></p>
            <p>因为使用了 Shell 脚本来填充列表和排序，所以若想文章有序，必须在单文件组件文章中设置<code>articleTitle:</code></p>

            <h2>导入图片</h2>
            <p>本地图片需要放置到 <code>src/static/xxxx</code> 中：</p>
            <snippet-component v-if="$route.meta.keepAlive" lan='html' :bindCode ='imgImportSnippet'></snippet-component>
            <img src='../static/images/img0.jpeg' alt="img0"/>
            <p><caption>图片示例</caption></p>

            <h2>代码高亮 - SnippetComponent</h2>
            <strong><p>基于 <a href="https://highlightjs.org/" target="_blank">highlightjs</a></p></strong>
            <strong><snippet-component v-if="$route.meta.keepAlive" lan='javascript' :bindCode ='importSnippetComponent'></snippet-component></strong>

            <p>在 <code>v-if</code> 中设置 <code>$route.meta.keepAlive</code> 是否缓存</p>
            <p>在 <code>lan</code> 中设置高亮语言类型</p>
            <p>在 <code>:bindUrl</code> 中设置绑定的代码文件</p>
            <p>在 <code>:bindCode</code> 中设置绑定的代码字符串</p>
            <p>设置 <code>id</code></p>
            <h3>使用外部资源</h3>
            <snippet-component v-if="$route.meta.keepAlive" lan='html' :bindCode ='codeImportSnippet0'></snippet-component>
            <h3>使用本地资源</h3>
            <p>首先在单文件组件文章中导入本地代码文件 <code>import vertFile from 'src/static/xxx'</code></p>
            <p>然后在 <code>data</code> 中绑定数据 <code>vertSnippet:vertFile</code></p>
            <snippet-component v-if="$route.meta.keepAlive" lan='html' :bindCode ='codeImportSnippet1'></snippet-component>
            <h3>仅高亮少量代码</h3>
            <p>在 <code>data</code> 中自定义代码字符串 <code>codeSnippet:"xxx"</code></p>
            <snippet-component v-if="$route.meta.keepAlive" lan='html' :bindCode ='codeImportSnippet2'></snippet-component>
            <snippet-component v-if="$route.meta.keepAlive" id="CodeSnippet" :bindUrl ='vertSnippet'></snippet-component>
            <p><caption>高亮示例</caption></p>

            <h2>LaTex 数学公式 - MathjaxComponent</h2>
            <strong><p>基于 <a href="https://github.com/mathjax/MathJax" target="_blank">MathJax</a></p></strong>
            <strong><snippet-component v-if="$route.meta.keepAlive" lan='javascript' :bindCode ='importMathjaxComponent'></snippet-component></strong>
            <p>在 <code>:bindFunc</code> 中设置绑定的本地公式文件或字符串</p>
            <h3>使用本地文件</h3>
            <p>首先在单文件组件文章中导入本地代码文件 <code>import mathFile from 'src/static/xxx'</code></p>
            <p>然后在 <code>data</code> 中绑定数据 <code>mathFunc:mathFile</code></p>
            <snippet-component v-if="$route.meta.keepAlive" lan='html' :bindCode ='mathImportSnippet0'></snippet-component>
            <h3>直接使用字符串</h3>
            <p>在 <code>data</code> 中自定义代码字符串 <code>mathFunc:String.raw`xxx`</code></p>
            <snippet-component v-if="$route.meta.keepAlive" lan='html' :bindCode ='mathImportSnippet0'></snippet-component>
            <mathjax-component :bindFunc="MathFunc"></mathjax-component>
            <p><caption>公式示例</caption></p>

            <h2>GLSLCanvas - GLSLComponent</h2>
            <strong><p>基于 <a href="https://github.com/patriciogonzalezvivo/glslCanvas" target="_blank">glslCanvas</a> 和 <a href="https://github.com/patriciogonzalezvivo/glslEditor" target="_blank">glslEditor</a></p></strong>
            <strong><snippet-component v-if="$route.meta.keepAlive" lan='javascript' :bindCode ='importGLSLComponent'></snippet-component></strong>
            <p>在 <code>v-if</code> 中设置 <code>$route.meta.keepAlive</code> 是否缓存</p>
            <p>class 设置为 <code>simpleGraph</code> 生成图表 Canvas</p>
            <p>class 设置为 <code>simpleEditor</code> 生成编辑器带预览 Canvas</p>
            <p>如果使用本地资源文件，在 <code>:data</code> 中设置绑定的代码文件（后缀需为.frag)</p>
            <p>如果使用外部资源文件，在 <code>data</code> 中设置绑定的地址（后缀需为.frag)</p>
            <p>设置 <code>id</code></p>
            <h3>生成图表</h3>
            <p>首先在单文件组件文章中导入本地代码文件 <code>import fragFile from 'src/static/xxx'</code></p>
            <p>然后在 <code>data</code> 中绑定数据 <code>graphSnippet:fragFile</code></p>
            <snippet-component v-if="$route.meta.keepAlive" lan='html' :bindCode ='glslImportSnippet0'></snippet-component>
            <GLSL-Component v-if="$route.meta.keepAlive" id ="graphContainer" class="simpleGraph" :data='graphSnippet'></GLSL-Component>
            <p><caption>图表示例</caption></p>
            <h3>生成编辑器</h3>
            <p>首先在单文件组件文章中导入本地代码文件 <code>import fragFile from 'src/static/xxx'</code></p>
            <p>然后在 <code>data</code> 中绑定数据 <code>editorSnippet:fragFile</code></p>
            <snippet-component v-if="$route.meta.keepAlive" lan='html' :bindCode ='glslImportSnippet1'></snippet-component>
            <h3>使用外部资源</h3>
            <p>直接在在 <code>data</code> 中设置绑定的地址</code></p>
            <snippet-component v-if="$route.meta.keepAlive" lan='html' :bindCode ='glslImportSnippet2'></snippet-component>
            <GLSL-Component v-if="$route.meta.keepAlive" id ="graphContainer" class="simpleEditor" data='https://gist.githubusercontent.com/MartinRGB/1148c22d7189ec2a78e32beca4ce45fd/raw/c35d0259d42d4ffd899d2729cdd8b8c4db1ff33a/frag_liquid.frag'></GLSL-Component>
            <p><caption>使用外部资源示例 - 效果来自 ShaderToy</caption></p>

            <h2>ThreeJS - ThreeComponent</h2>
            <strong><p>基于 <a href="https://github.com/mrdoob/three.js" target="_blank">threeJS</a></p></strong>
            <strong><snippet-component v-if="$route.meta.keepAlive" lan='javascript' :bindCode ='importThreeComponent'></snippet-component></strong>

            <three-component v-if="$route.meta.keepAlive" :bindModel='ThreeModel' :bindMaterial='ThreeMaterial' :bindUniform='ShaderUniform'></three-component>
            <GSAP-example></GSAP-example>
            <rebound-example></rebound-example>
            <snippet-component v-if="$route.meta.keepAlive" lan='html' id="CodeSnippet1" :bindUrl ='htmlSnippet'></snippet-component>
            <div v-html="rawHTML"></div>
            <list-transition></list-transition>
      </div>
    </div>
  </div>
</template>

<script>
  import SnippetComponent from '@/components/SnippetComponent'
  import vertFile from '../static/codesnippets/brickwall.vert'
  import MathjaxComponent from '@/components/MathjaxComponent'
  import MathFile from '../static/codesnippets/mathfunc.txt'
  import GLSLComponent from '@/components/GLSLComponent'
  import graphFile from '../static/codesnippets/brickwallGraph.frag'

  import ThreeComponent from '@/components/ThreeComponent'
  
  import * as THREE from 'three'
  import shader0 from '../static/shaders/brickwall.json'
  import texture0 from '../static/textures/metal.jpg'
  import model0 from '../static/models/teapot.json'

  import GSAPExample from '@/components/example/GSAPExample'
  import ReboundExample from '@/components/example/ReboundExample'
  import ListTransition from '@/components/example/ListTransition'



  import htmlFile from 'file-loader!../static/codesnippets/brickwall.html';
  import htmlFile2 from 'vue-html-loader!../static/codesnippets/brickwall.html';
  import htmlFile3 from 'vue-html-loader!../static/html/test3.html';



  export default {
    name: 'three',
    data: function () {return {
      articleTitle:'0.使用指南',
      imgImportSnippet: "<img src='../static/images/img0.jpeg' alt=\"img0\"/>",
      importSnippetComponent:"import SnippetComponent from '@/components/SnippetComponent'",
      codeImportSnippet0: "<snippet-component v-if=\"$route.meta.keepAlive\" lan='javascript' bindUrl ='HttpUrl'></snippet-component>",
      codeImportSnippet1: "<snippet-component v-if=\"$route.meta.keepAlive\" lan='glsl' :bindUrl ='vertSnippet'></snippet-component>",
      codeImportSnippet2: "<snippet-component v-if=\"$route.meta.keepAlive\" lan='html' :bindCode ='codeSnippet'></snippet-component>",
      vertSnippet:vertFile,
      importMathjaxComponent:"import MathjaxComponent from '@/components/MathjaxComponent'",
      mathImportSnippet0: "<mathjax-component :bindFunc=\"MathFunc\"></mathjax-component>",
      MathFunc:MathFile,
      importGLSLComponent:"import GLSLComponent from '@/components/GLSLComponent'",
      graphSnippet:graphFile,
      glslImportSnippet0:"<GLSL-Component v-if=\"$route.meta.keepAlive\" id =\"graphContainer\" class=\"simpleGraph\" :data='graphSnippet'></GLSL-Component>",
      glslImportSnippet1:"<GLSL-Component v-if=\"$route.meta.keepAlive\" id =\"graphContainer\" class=\"simpleEditor\" :data='graphSnippet'></GLSL-Component>",
      glslImportSnippet2:"<GLSL-Component v-if=\"$route.meta.keepAlive\" id =\"graphContainer\" class=\"simpleEditor\" data='https://gist.githubusercontent.com/MartinRGB/1148c22d7189ec2a78e32beca4ce45fd/raw/4ecd8bd7e46a11daaaadef252a8eacc910245294/frag_dali.frag'></GLSL-Component>",
      importThreeComponent:"import ThreeComponent from '@/components/ThreeComponent'",
  

      htmlSnippet: htmlFile,
      rawHTML:htmlFile2,

      ThreeModel:model0,
      ThreeMaterial:shader0,
      ShaderUniform:{
        TextureMap:THREE.ImageUtils.loadTexture(texture0),
        BrickPct:new THREE.Vector2(0.9,0.85),
        BrickColor:new THREE.Vector3(1.,0.3,0.2)
      }
    }},
    components: {MathjaxComponent,GLSLComponent,ThreeComponent,GSAPExample,ReboundExample,SnippetComponent,ListTransition},
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
