<template>
  <div class="transition-container">
    <img class="hero-image" src='../static/images/vulkan/01.overview.jpg' alt='hero image'/>
    <div id="center-container" class="center-container">
      <div id="article-view" class="article-view">
            <h1 id="toc_0">{{articleTitle}}</h1>
            <strong><p>原文来自 <a href="https://vulkan-tutorial.com/Drawing_a_triangle/Setup" target="_blank">Vulkan-Tutorial.com</a>，初次翻译开发类文章，恳请指正。</p></strong>
            <h2>基础代码测试</h2>
    
    <ul class="TableOfContents">
<li>
<p><a href="javascript:void(0)" @click="goAnchor('#page_General_structure')">一般结构</a></p>
</li>
<li>
<p><a href="javascript:void(0)" @click="goAnchor('#page_Resource_management')">资源管理</a></p>
</li>
<li>
<p><a href="javascript:void(0)" @click="goAnchor('#page_Integrating_GLFW')">整合 GLFW</a></p>
</li>
</ul>
<h2 id="page_General_structure">一般结构</h2>
<p>在之前的章节中，完成了 Vulkan 项目的配置和测试，本章我们直接码代码：</p>
<div class="top-box hide"><div class="alert-info"></div></div><pre data-original-code="#include <vulkan/vulkan.h>
#include <iostream>
#include <stdexcept>
#include <functional>

class HelloTriangleApplication {
public:
    void run() {
        initVulkan();
        mainLoop();
        cleanup();
    }

private:
    void initVulkan() {}

    void mainLoop() {}

    void cleanup() {}
};

int main() {
    HelloTriangleApplication app;

    try {
        app.run();
    } catch (const std::runtime_error&amp; e) {
        std::cerr << e.what() << std::endl;
        return EXIT_FAILURE;
    }

    return EXIT_SUCCESS;
}" data-snippet-id="ext.45d2e26feaf2a117191fe24bfaf716fd" data-snippet-saved="false" data-codota-status="done"><code class="language-c++ hljs cpp"><span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;vulkan/vulkan.h&gt;</span></span>

<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;stdexcept&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;functional&gt;</span></span>

<span class="hljs-keyword">class</span> HelloTriangleApplication {
<span class="hljs-keyword">public</span>:
    <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">run</span><span class="hljs-params">()</span> </span>{
        initVulkan();
        mainLoop();
        cleanup();
    }

<span class="hljs-keyword">private</span>:
    <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">initVulkan</span><span class="hljs-params">()</span> </span>{}

    <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">mainLoop</span><span class="hljs-params">()</span> </span>{}

    <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">cleanup</span><span class="hljs-params">()</span> </span>{}
};

<span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">main</span><span class="hljs-params">()</span> </span>{
    HelloTriangleApplication app;

    <span class="hljs-keyword">try</span> {
        std::clog &lt;&lt;"运行成功"&lt;&lt; std::endl;
        uint32_t extensionCount = 0;
        std::cout &lt;&lt; extensionCount &lt;&lt; " extensions supported" &lt;&lt; std::endl;
        app.run();
    } <span class="hljs-keyword">catch</span> (<span class="hljs-keyword">const</span> <span class="hljs-built_in">std</span>::runtime_error&amp; e) {
        <span class="hljs-built_in">std</span>::<span class="hljs-built_in">cerr</span> &lt;&lt; e.what() &lt;&lt; <span class="hljs-built_in">std</span>::<span class="hljs-built_in">endl</span>;
        <span class="hljs-keyword">return</span> EXIT_FAILURE;
    }

    <span class="hljs-keyword">return</span> EXIT_SUCCESS;
}</code></pre>
<p>首先我们要 include 在 LunarG SDK 中的 Vulkan 头文件，这个头文件提供了 函数、结构、枚举。 <strong>stdexcept</strong> 和 <strong>iostream</strong> 头文件用来显示错误。 <strong>functional</strong> 头文件用来资源管理。</p>
<p>这个程序本身会包裹进一个类，然后被存储为 Vulkan 对象，这个类会作为私有类成员，然后会被注入函数，上述功能我们会通过调用 <strong>initVulkan</strong> 函数来实现。一旦一切准备就绪，我们进入主循环开始帧渲染。我们会在 <strong>mainLoop</strong>
 函数中填写 loop ，迭代执行直至窗口关闭或 <strong>mainLoop</strong> return。我们还要确保使用过的资源解除分配，这一功能在 <strong>cleanup</strong> 函数中实现。</p>
<p>运行期间如果出现错误，我们会抛出 <strong>std::runtime_error</strong> 异常，同时带有错误描述信息，错误信息会传回 <strong>main</strong> 函数，然后通过命令行打印出来。例如我们通过这个功能，可以查询某个需要的插件 extension 功能是否支持。</p>
<p>下面的每个章节，我们都会添加新的函数，这下函数都会被 <strong>initVulkan</strong> 调用，因此在 <strong>cleanup</strong> 中也需要相应的释放。</p>
<h2 id="page_Resource_management">资源管理</h2>
<p>我们通过 <strong>malloc</strong> 来分配的每个内存块都需要通过 <strong>free</strong> 来释放,同样的，每个 Vulkan 对象的创建也需要在使用完成后相应的销毁。在现代 C++ 中，可以实现自动的资源管理，通过 <strong>&lt;memory&gt;</strong> 头文件中的实用方法就可以实现, 但是本教程中使用了一一对应的分配和杰出方法。毕竟 Vulkan 的特点就是要清晰描述每一个操作，避免错误，因此我们要在对象的生命周期内，把一切都清晰描述出来，这样也有利于理解 API 原理。</p>
<p>在学完本教程后，你也可以通过覆盖 <strong>std::shared_ptr</strong> 的方法来实现自动管理。例如，在大型 Vulkan 项目中，通过使用 <a href="https://en.wikipedia.org/wiki/Resource_Acquisition_Is_Initialization">RAII</a> 来减少繁琐的步骤，但是在学习过程中，我们有必要条分缕析，把一切都弄明白。</p>
<p>Vulkan 对象要么通过 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkCreateXXX.html"><strong>vkCreateXXX</strong></a> 来实现, 要么通过分配给其他对象来实现 —— <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkAllocateXXX.html"><strong>vkAllocateXXX</strong></a>。在确保对象不再使用后，要销毁对象及其副本，通过 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkDestroyXXX.html"><strong>vkDestroyXXX</strong></a> 和 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkFreeXXX.html"><strong>vkFreeXXX</strong></a> 实现。这些函数的参数根据对象的类型不尽相同，但有一种参数是共享的 ——  <strong>pAllocator</strong>。这是一个可选参数，能够从自定义内存分配器中获取毁掉。本教程忽略这一参数，传入 <strong>nullptr</strong> 作为参数</p>
<h2 id="page_Integrating_GLFW">整合 GLFW</h2>
<p>Vulkan 可以实现很不错的离屏渲染功能，但是如果能展示一些效果，教程会更有趣，因为我们需要整合 GLFW。首先我们要把 <strong>#include &lt;vulkan/vulkan.h&gt;</strong> 替换为：</p>
<div class="top-box hide"><div class="alert-info"></div></div><pre data-original-code="#define GLFW_INCLUDE_VULKAN
#include <GLFW/glfw3.h>
"data-snippet-id="ext.71b03322cbc8c45f00c153646baf5e3f" data-snippet-saved="false" data-codota-status="done"><code class="language-c++ hljs cpp"><span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> GLFW_INCLUDE_VULKAN</span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;GLFW/glfw3.h&gt;</span></span></code></pre>
<p>这样，我们就能使用 GLFW 中的一些定义，同时也能自动加载 Vulkan 头文件。添加一个 <strong>initWindow</strong> 函数，在  <strong>run</strong> 中在其他调用之前调用。我们将在这个函数中初始化 GLFW 并创建窗口。</p>
<div class="top-box hide"><div class="alert-info"></div></div><pre data-original-code="void run() {
    initWindow();
    initVulkan();
    mainLoop();
    cleanup();
}

private:
    void initWindow() {

    }
" data-snippet-id="ext.9d5a961312f1cb3fa6cc1f63ff9d1673" data-snippet-saved="false" data-codota-status="done"><code class="language-c++ hljs cpp"><span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">run</span><span class="hljs-params">()</span> </span>{
    initWindow();
    initVulkan();
    mainLoop();
    cleanup();
}

<span class="hljs-keyword">private</span>:
    <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">initWindow</span><span class="hljs-params">()</span> </span>{}</code></pre>
<p>在 <strong>initWindow</strong> 中首先调用 <strong>glfwInit()</strong> 来初始化 GLFW 库。因为 GLFW 最初的设计目的是创建 OpenGL 上下文，我们需要随后调用一些方法，告诉他不要创建 OpenGL 上下文:</p>
<pre><code class="language-c++ hljs cpp">glfwWindowHint(GLFW_CLIENT_API, GLFW_NO_API);
</code></pre>
<p>因为处理缩放窗口的功能还有一些其他注意，因此这里先不表，我们先直接关闭掉：</p>
<pre><code class="language-c++ hljs cpp">glfwWindowHint(GLFW_RESIZABLE, GLFW_FALSE);
</code></pre>
<p>现在来实际创建窗口，添加 <strong>GLFWwindow* window;</strong>
私有类成员来储存指向他的引用，并初始化窗口:</p>
<div class="top-box hide"><div class="alert-info"></div></div><pre data-original-code="window = glfwCreateWindow(800, 600, &quot;Vulkan&quot;, nullptr, nullptr);
" data-snippet-id="ext.0f36ef454c3b1e05801d83a520351ab8" data-snippet-saved="false" data-codota-status="done"><code class="language-c++ hljs cpp">window = glfwCreateWindow(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>, <span class="hljs-string">"Vulkan"</span>, <span class="hljs-literal">nullptr</span>, <span class="hljs-literal">nullptr</span>);
</code></pre>
<p>头三个参数描述了，宽、高、窗口标题。第四个参数让你选择是否在其他指定显示器上显示。最后一个参数和 OpenGL 相关。</p>
<p>建议头俩参数使用常量，而不是直接输入数值，因为以后可能更改。因此我在 <strong>HelloTriangleApplication</strong> 类上面定义这俩常量：</p>
<pre><code class="language-c++ hljs cpp"><span class="hljs-keyword">const</span> <span class="hljs-keyword">int</span> WIDTH = <span class="hljs-number">800</span>;
<span class="hljs-keyword">const</span> <span class="hljs-keyword">int</span> HEIGHT = <span class="hljs-number">600</span>;</code></pre>
<p>然后在窗口创建调用更改为：</p>
<div class="top-box hide"><div class="alert-info"></div></div><pre data-original-code="window = glfwCreateWindow(WIDTH, HEIGHT, &quot;Vulkan&quot;, nullptr, nullptr);
" data-snippet-id="ext.a757bf7ebc3de6dff6892bd83f3b18c0" data-snippet-saved="false" data-codota-status="done"><code class="language-c++ hljs cpp">window = glfwCreateWindow(WIDTH, HEIGHT, <span class="hljs-string">"Vulkan"</span>, <span class="hljs-literal">nullptr</span>, <span class="hljs-literal">nullptr</span>);
</code></pre>
<p>现在 <strong>initWindow</strong> 如下显示：</p>
<div class="top-box hide"><div class="alert-info"></div></div><pre data-original-code="void initWindow() {
    glfwInit();

    glfwWindowHint(GLFW_CLIENT_API, GLFW_NO_API);
    glfwWindowHint(GLFW_RESIZABLE, GLFW_FALSE);

    window = glfwCreateWindow(WIDTH, HEIGHT, &quot;Vulkan&quot;, nullptr, nullptr);
}
" data-snippet-id="ext.ffe136ff17f18e8cce35779906d0564f" data-snippet-saved="false" data-codota-status="done"><code class="language-c++ hljs cpp"><span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">initWindow</span><span class="hljs-params">()</span> </span>{
    glfwInit();

    glfwWindowHint(GLFW_CLIENT_API, GLFW_NO_API);
    glfwWindowHint(GLFW_RESIZABLE, GLFW_FALSE);

    window = glfwCreateWindow(WIDTH, HEIGHT, <span class="hljs-string">"Vulkan"</span>, <span class="hljs-literal">nullptr</span>, <span class="hljs-literal">nullptr</span>);
}</code></pre>
<p>为了让应用在窗口关闭或出现错误之前都可以运行，我们需要添加 <strong>mainLoop</strong> f函数:</p>
<div class="top-box hide"><div class="alert-info"></div></div><pre data-original-code="void mainLoop() {
    while (!glfwWindowShouldClose(window)) {
        glfwPollEvents();
    }
}
" data-snippet-id="ext.0b14146d0c024b1c9a67aa5bc327e716" data-snippet-saved="false" data-codota-status="done"><code class="language-c++ hljs cpp"><span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">mainLoop</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">while</span> (!glfwWindowShouldClose(window)) {
        glfwPollEvents();
    }
}</code></pre>
<p>代码本身就说明了他的含义。他会一直循环，并且检测事件，直到应用关闭。也是在这个循环里面，我们稍后会调用其他函数渲染每一帧。</p>
<p>一旦窗口关闭，我们需要清理资源并销毁 GLFW，我们这么写 <strong>cleanup</strong> 代码:</p>
<div class="top-box hide"><div class="alert-info"></div></div><pre data-original-code="void cleanup() {
    glfwDestroyWindow(window);

    glfwTerminate();
}
" data-snippet-id="ext.dbed02ad721469566cd8f19ed54652b8" data-snippet-saved="false" data-codota-status="done"><code class="language-c++ hljs cpp"><span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">cleanup</span><span class="hljs-params">()</span> </span>{
    glfwDestroyWindow(window);

    glfwTerminate();
}</code></pre>
<p>运行程序，你会发现有一个窗口，标题为 <strong>Vulkan</strong> ，现在我们有了 Vulkan 应用的骨架，试着运行你的第一个 Vulkan 项目吧。
<p></p>

<code-modal>
  <a slot="link">C++ code</a>
  <div slot="header"></div>
  <div slot="body">
    <pre class="cpp" style="margin: 0; padding-left: 10px"><code class="hljs"><span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> GLFW_INCLUDE_VULKAN</span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;GLFW/glfw3.h&gt;</span></span>

<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;stdexcept&gt;</span></span>

<span class="hljs-keyword">const</span> <span class="hljs-keyword">int</span> WIDTH = <span class="hljs-number">800</span>;
<span class="hljs-keyword">const</span> <span class="hljs-keyword">int</span> HEIGHT = <span class="hljs-number">600</span>;

<span class="hljs-keyword">class</span> HelloTriangleApplication {
<span class="hljs-keyword">public</span>:
    <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">run</span><span class="hljs-params">()</span> </span>{
        initWindow();
        initVulkan();
        mainLoop();
        cleanup();
    }

<span class="hljs-keyword">private</span>:
    GLFWwindow* window;

    <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">initWindow</span><span class="hljs-params">()</span> </span>{
        glfwInit();

        glfwWindowHint(GLFW_CLIENT_API, GLFW_NO_API);
        glfwWindowHint(GLFW_RESIZABLE, GLFW_FALSE);

        window = glfwCreateWindow(WIDTH, HEIGHT, <span class="hljs-string">"Vulkan"</span>, <span class="hljs-literal">nullptr</span>, <span class="hljs-literal">nullptr</span>);
    }

    <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">initVulkan</span><span class="hljs-params">()</span> </span>{

    }

    <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">mainLoop</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">while</span> (!glfwWindowShouldClose(window)) {
            glfwPollEvents();
        }
    }

    <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">cleanup</span><span class="hljs-params">()</span> </span>{
        glfwDestroyWindow(window);

        glfwTerminate();
    }
};

<span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">main</span><span class="hljs-params">()</span> </span>{
    HelloTriangleApplication app;

    <span class="hljs-keyword">try</span> {
        app.run();
    } <span class="hljs-keyword">catch</span> (<span class="hljs-keyword">const</span> <span class="hljs-built_in">std</span>::runtime_error&amp; e) {
        <span class="hljs-built_in">std</span>::<span class="hljs-built_in">cerr</span> &lt;&lt; e.what() &lt;&lt; <span class="hljs-built_in">std</span>::<span class="hljs-built_in">endl</span>;
        <span class="hljs-keyword">return</span> EXIT_FAILURE;
    }

    <span class="hljs-keyword">return</span> EXIT_SUCCESS;
}</code></pre>


  </div>
</code-modal>


<code-modal>
  <a slot="link">2333 code</a>
  <div slot="header"></div>
  <div slot="body">
      <snippet-component v-if="$route.meta.keepAlive" lan='cpp' id="CodeSnippet-13" :bindUrl ='cppSnippet'></snippet-component>
  </div>
</code-modal>

<div  id="btn-close-modal" class="close-animatedModal" @click="highlight()"> 
              <span class="modal-default-button">
                ✕
              </span>
          </div>

      </div>
    </div>
  </div>
</template>

<script>
  import SnippetComponent from '@/components/SnippetComponent'
  import MockupComponent from '@/components/MockupComponent'
  import CodeModal from '@/components/CodeModal'
  import cppFile from '../static/codesnippets/vulkan/02/native-lib.cpp'
  export default {
    name: 'vulkan03',
    data: function () {return {
      articleTitle:'5.[译] Vulkan 入门系列 —— 绘制三角形(设置)',
      cppSnippet:cppFile
    }},
    components: {SnippetComponent,MockupComponent,CodeModal},
    methods: {
      highlight:function(){

        var aCodes = this.$el.getElementsByTagName('pre');
            for (var i=0; i < aCodes.length; i++) {
                hljs.highlightBlock(aCodes[i]);
                hljs.lineNumbersBlock(aCodes[i]);
                aCodes[i].style.fontWeight = '400';
            }
        },
    },
    computed: {},
    created: function () {},
    mounted:function(){
        //this.highlight()
    },
    destroyed:function(){}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
