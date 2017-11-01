<template>
  <div class="transition-container">
    <div id="center-container" class="center-container">
      <div id="article-view" class="article-view">
            <h1 id="toc_0">{{articleTitle}}</h1>
            <p><a href="https://github.com/MartinRGB/vue_shader_ghblog/" target="_blank">Repo on GitHub</a></p>
            <p>这是一个简单的、主要基于 Vue 和 ThreeJS 的着色器学习博客，之前在学习 OpenGL 的过程中，主要使用 Github Wiki 结合项目学习，但 Github Wiki 无法展示着色器效果，只能使用截图。因此决定自己动手学习制作一个能够结合 MWeb 的 GLES 学习环境。</p>
            <h2>简单结构介绍</h2>
            <p>本项目主要依托 ghpages，利用 <code>npm run deploy</code> 生成静态文件到根目录的 <code>docs</code> 中</p>
            <p><code>src/components</code> 中主要存放写笔记常用的组件</p>
            <p><code>src/postjs</code> 中利用 Shell 脚本读取本地文章，并编写列表相关文件</p>
            <p><code>src/post</code> 中主要存放文章，以便脚本读取</p>
            <p><code>src/router</code> 中利用 Shell 脚本读取本地文章，并编写路由</p>
            <p><code>src/static</code> 中存放了本地静态资源，利用 webpack 在 deploy 后，打包到 <code>docs</code> 中</p>
            <p><code>src/style</code> 中存放了样式</p>
            
            <h2>设置标题</h2>
            <p>因为使用了 Shell 脚本来填充列表和排序，所以若想文章有序，必须在单文件组件文章中设置<p style="display: inline;"><code>article<p style="text-transform: capitalize;display: inline;">t</p>itle:</code> 数字.名称</p></p>


            <h2>导入图片</h2>
            <p>本地图片需要放置到 <code>src/static/xxxx</code> 中：</p>
            <snippet-component v-if="$route.meta.keepAlive" lan='html' :bindCode ='imgImportSnippet'></snippet-component>
            <img src='../static/images/img0.jpeg' alt="img0"/>
            <p><caption>图片示例</caption></p>

            <h2>代码高亮 - SnippetComponent</h2>
            <strong><p>基于 <a href="https://highlightjs.org/" target="_blank">highlightjs</a> 请查看其使用指南或者 API 文档</p></strong>
            <strong><snippet-component v-if="$route.meta.keepAlive" lan='javascript' :bindCode ='importSnippetComponent' bindSpecial='fontSize:14px'></snippet-component></strong>
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
            <strong><p>基于 <a href="https://github.com/mathjax/MathJax" target="_blank">MathJax</a> 请查看其使用指南或者 API 文档</p></strong>
            <strong><snippet-component v-if="$route.meta.keepAlive" lan='javascript' :bindCode ='importMathjaxComponent' bindSpecial='fontSize:14px'></snippet-component></strong>
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
            <strong><p>基于 <a href="https://github.com/patriciogonzalezvivo/glslCanvas" target="_blank">glslCanvas</a> 和 <a href="https://github.com/patriciogonzalezvivo/glslEditor" target="_blank">glslEditor</a> 请查看其使用指南或者 API 文档</p></strong>
            <strong><snippet-component v-if="$route.meta.keepAlive" lan='javascript' :bindCode ='importGLSLComponent' bindSpecial='fontSize:14px'></snippet-component></strong>
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
            <p><caption>使用外部资源示例 - 效果来自 ShaderToy，忘记地址，侵删</caption></p>

            <h2>ThreeJS - ThreeComponent</h2>
            <strong><p>基于 <a href="https://github.com/mrdoob/three.js" target="_blank">threeJS</a> 请查看其使用指南或者 API 文档</p></strong>
            <strong><snippet-component v-if="$route.meta.keepAlive" lan='javascript' :bindCode ='importThreeComponent' bindSpecial='fontSize:14px'></snippet-component></strong>
            <strong><snippet-component v-if="$route.meta.keepAlive" lan='javascript' :bindCode ='importThreeComponent2' bindSpecial='fontSize:14px'></snippet-component></strong>
            <p>目前仅仅支持模型、材质、着色器自定义功能</p>
            <p>在 <code>v-if</code> 中设置 <code>$route.meta.keepAlive</code> 是否缓存</p>
            <p>在 <code>bindId</code> 中设置绑定Id (必须)</p>
            <p>在 <code>:bindModel</code> 中设置绑定模型</p>
            <p>在 <code>:bindMaterial</code> 中设置绑定材质</p>
            <p>如果 bindMaterial 为自定义 Shader，那么在 <code>:bindUniform</code> 中设置 texture 输入和 uniform 输入</p>
            <h3>使用 ThreeJS 自带材质</h3>
            <p>直接在 <code>data</code> 中绑定模型数据（具体接口请查阅 ThreeJS API Docs) <code>threeTexture:new THREE.MeshLambertMaterial( { color: 0xfff000, wireframe: false } );</code></p>
            <snippet-component v-if="$route.meta.keepAlive" lan='html' :bindCode ='threeImportSnippet0'></snippet-component>
            <h3>使用 ThreeJS 自带模型</h3>
            <p>直接在 <code>data</code> 中绑定模型数据（具体接口请查阅 ThreeJS API Docs) <code>threeModel:new THREE.BoxGeometry( 2, 2, 2 )</code></p>
            <snippet-component v-if="$route.meta.keepAlive" lan='html' :bindCode ='threeImportSnippet1'></snippet-component>
            <three-component v-if="$route.meta.keepAlive" bindId='threeContainer' :bindModel='threeModel' :bindMaterial='threeTexture'></three-component>
            <p><caption>自带模型和自带材质</caption></p>
            <h3>使用外部图片材质 (PNG | JPG)</h3>
            <p>首先在单文件组件文章中导入本地材质文件 <code>import textureFile from 'src/static/xxx'</code></p>
            <p>然后在 <code>data</code> 中绑定数据 <code>textureMap:textureFile</code></p>
            <snippet-component v-if="$route.meta.keepAlive" lan='html' :bindCode ='threeImportSnippet2'></snippet-component>
            <three-component v-if="$route.meta.keepAlive" bindId='threeContainer1' :bindModel='threeModel1' :bindMaterial='threeTexture1'></three-component>
            <p><caption>自带模型和外部材质</caption></p>
            <h3>使用外部模型 (JSON Only)</h3>
            <p>首先在单文件组件文章中导入本地模型文件 <code>import modelFile from 'src/static/xxx'</code></p>
            <p>然后在 <code>data</code> 中绑定数据 <code>threeModel:modelFile</code></p>
            <snippet-component v-if="$route.meta.keepAlive" lan='html' :bindCode ='threeImportSnippet3'></snippet-component>
            <h3>使用自定义着色器(仅采用 ShaderFrog 输出格式 JSON)</h3>
            <p>首先在单文件组件文章中导入本地着色器文件 <code>import shaderFile from 'src/static/xxx'</code></p>
            <p>然后在 <code>data</code> 中绑定数据 <code>threeTexture:shaderFile</code></p>
            <p>需要根据着色器 JSON 文件中的 Uniform，在 <code>data</code> 中绑定数据,如果需要在着色器中使用材质，那么<code>import texture0 from 'src/static/xxx'</code></p>
            <snippet-component v-if="$route.meta.keepAlive" id="CodeSnippet2" :bindUrl ='shaderExampleSnippet'></snippet-component>
            <snippet-component v-if="$route.meta.keepAlive" lan='html' :bindCode ='threeImportSnippet4'></snippet-component>
            <three-component v-if="$route.meta.keepAlive" bindId='threeContainer2' :bindModel='threeModel2' :bindMaterial='threeTexture2' :bindUniform='shaderUniform'></three-component>
            <p><caption>自定义模型和自定义着色器</caption></p>

            <h2>手机展示 - MockupComponent</h2>
            <strong><p>基于 <a href="https://github.com/pixelsign/html5-device-mockups" target="_blank">html5-device-mockups</a> 请查看其使用指南或者 API 文档</p></strong>
            <strong><snippet-component v-if="$route.meta.keepAlive" lan='javascript' :bindCode ='importMockupComponent' bindSpecial='fontSize:14px'></snippet-component></strong>
            <p>在 <code>bindDevice</code> 中设置绑定机型为 <code>android</code> 还是 <code>iOS</code>，默认安卓</p>
            <p>首先在单文件组件文章中导入本地素材文件 <code>import assetFile from 'src/static/xxx'</code></p>
            <p>然后在 <code>data</code> 中绑定数据 <code>screenAsset:assetFile</code></p>
            <snippet-component v-if="$route.meta.keepAlive" lan='html' :bindCode ='mockupImportSnippet'></snippet-component>
            <mockup-component bindDevice='android' :bindUrl='screenAsset'></mockup-component>
            <p><caption>这个效果来自“人肉安卓Stackoverflow” —— <a href="http://weibo.com/u/2834711045?topnav=1&wvr=6&topsug=1" target="_blank">Cyandev</a> 的 <a href="https://github.com/unixzii/android-SpringAnimator" target="_blank">SpringAnimator</a>,在安卓上实现了 FramerJS 的动画器</caption></p>
            
            <h2>在 Vue 中使用 GSAP 动画系统</h2>
            <strong><p>基于 <a href="https://github.com/greensock/GreenSock-JS" target="_blank">GreenSock-JS</a> 请查看其使用指南或者 API 文档,以及 <code>src/components/GSAPExample.vue</code></p></strong>
            <p>下面是案例组件实现的效果</p>
            <GSAP-example></GSAP-example>
            
            <h2>在 Vue 中使用 ReboundJS 动画系统</h2>
            <strong><p>基于 <a href="https://github.com/facebook/rebound-js" target="_blank">ReboundJS</a> 请查看其使用指南或者 API 文档,以及 <code>src/components/ReboundExample.vue</code>下面是组件效果</p></strong>
            <p>下面是案例组件实现的效果</p>
            <rebound-example></rebound-example>
            <p>感谢浩哥在 Vue 上进行的简单入门，以及 Eric 兄弟在 Shell 上的指点</p>
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
  import texture0 from '../static/images/landscape.jpg'
  import texture1 from '../static/textures/metal.jpg'
  import model0 from '../static/models/teapot.json'
  import shaderExampleFile from '../static/codesnippets/shaderexample.js'

  import MockupComponent from '@/components/MockupComponent'
  import assetFile from '../static/mockups/device_test.mp4'

  import GSAPExample from '@/components/example/GSAPExample'
  import ReboundExample from '@/components/example/ReboundExample'
  //import htmlFile from 'file-loader!../static/codesnippets/brickwall.html'
  //import htmlFile2 from 'vue-html-loader!../static/codesnippets/brickwall.html'
  //import htmlFile3 from 'vue-html-loader!../static/html/test3.html'



  export default {
    name: 'three',
    data: function () {return {
      articleTitle:'1.使用指南',
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
      glslImportSnippet2:"<GLSL-Component v-if=\"$route.meta.keepAlive\" id =\"graphContainer\" class=\"simpleEditor\" data='HttpUrl'></GLSL-Component>",
      importThreeComponent:"import ThreeComponent from '@/components/ThreeComponent'",
      importThreeComponent2:"import * as THREE from 'three'",
      threeImportSnippet0: "<three-component v-if=\"$route.meta.keepAlive\" bindId='threeContainer0' :bindModel='threeModel' :bindMaterial='threeTexture'></three-component>",
      threeImportSnippet1: "<three-component v-if=\"$route.meta.keepAlive\" bindId='threeContainer1' :bindModel='threeModel' :bindMaterial='threeTexture'></three-component>",
      threeImportSnippet2: "<three-component v-if=\"$route.meta.keepAlive\" bindId='threeContainer2' :bindModel='threeModel' :bindMaterial='textureMap'></three-component>",
      threeImportSnippet3: "<three-component v-if=\"$route.meta.keepAlive\" bindId='threeContainer3' :bindModel='threeModel' :bindMaterial='threeTexture'></three-component>",
      threeImportSnippet4: "<three-component v-if=\"$route.meta.keepAlive\" bindId='threeContainer4' :bindModel='threeModel' :bindMaterial='threeTexture' :bindUniform='shaderUniform'></three-component>",
      threeModel:new THREE.BoxGeometry( 2, 2, 2 ),
      threeTexture:new THREE.MeshLambertMaterial( { color: 0xff004b, wireframe: false } ),
      threeModel1:new THREE.SphereGeometry( 1, 16,16 ),
      threeTexture1:texture0,
      shaderExampleSnippet:shaderExampleFile,
      threeModel2:model0,
      threeTexture2:shader0,
      shaderUniform:{
        TextureMap:THREE.ImageUtils.loadTexture(texture1),
        BrickPct:new THREE.Vector2(0.9,0.85),
        BrickColor:new THREE.Vector3(1.,0.3,0.2)
      },
      importMockupComponent:"import MockupComponent from '@/components/MockupComponent'",
      mockupImportSnippet: "<mockup-component bindDevice='iOS' :bindUrl='screenAsset'></mockup-component>",
      screenAsset:assetFile
      // htmlSnippet: htmlFile,
      // rawHTML:htmlFile2,
    }},
    components: {MathjaxComponent,GLSLComponent,ThreeComponent,GSAPExample,ReboundExample,SnippetComponent,MockupComponent},
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
