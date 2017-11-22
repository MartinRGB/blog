<template>
  <div class="transition-container">
    <img class="hero-image" src='../static/images/vulkan/01.overview.jpg' alt='hero image'/>
    <div id="center-container" class="center-container">
      <div id="article-view" class="article-view">
            <h1 id="toc_0">{{articleTitle}}</h1>
            <strong><p>原文来自 <a href="https://vulkan-tutorial.com/Development_environment" target="_blank">Vulkan-Tutorial.com</a>，初次翻译开发类文章，恳请指正。</p></strong>
            <ul class="TableOfContents">
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_Windows')">Windows</a></p>
              <ul class="TableOfContents">
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_Vulkan_SDK')" >Vulkan SDK</a></p>
              </li>
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_GLFW')">GLFW</a></p>
              </li>
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_GLM')">GLM</a></p>
              </li>
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_Setting_up_Visual_Studio')">设置 Visual Studio</a></p>
              </li>
              </ul>
              </li>
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_Android')">Android</a></p>
              <ul class="TableOfContents">
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_Vulkan_Wrapper')">Vulkan Wrapper</a></p>
              </li>
              </ul>
              </li>
              <li>
                <p><a href="javascript:void(0)" @click="goAnchor('#page_Reference')">参考</a></p>
              </li>
            </ul>

            <p>本章，我们将会设置 Vulkan 应用开发环境，并安装第三方库。我们所使用的工具在 Win 和 Linux 下完全兼容，但是安装过程稍有不同，这里分开阐述。</p>
<h2 id="page_Windows">Windows</h2>
<p>如果你使用 Win 的 Visual Studio 2013|2015 进行开发，那么两个版本安装步骤基本相同，唯一不同的是 Vulkan SDK 目前的 debug 标识仅仅能兼容 2013。做练习没什么问题，但要注意这一点。</p>
<h3 id="page_Vulkan_SDK">Vulkan SDK</h3>
<p>开发 Vulkan 应用，最重要的组件是 SDK。包含了头文件、debug 工具、验证层以及 Vulkan 函数加载器。加载器查找驱动 runtime 时的函数，和 OpenGL 的 GLEW 很相似。</p>
<p>SDK 下载地址 —— <a href="https://vulkan.lunarg.com/">the LunarG website</a></p>
<p><img src="../static/images/vulkan/02/vulkan_sdk_download_buttons.png" alt=""></p>
<p>安装时要注意 SDK 的安装地址。我们还要检查下显卡和驱动是否支持 Vulkan。进入安装 SDK 的目录，打开 <strong>Bin32</strong> 目录，运行 <strong>cube.exe</strong>。效果如下</p>
<p><img src="../static/images/vulkan/02/cube_demo.png" alt=""></p>
<p>报错就升级下驱动，检查下驱动是否包含 Vulkan runtime，检查显卡是否支持。</p>
<p>这个目录下还有两个程序有用。<strong>vkjson_info.exe</strong> 在硬件使用 Vulkan 时声称 JSON 文件描述硬件兼容性。如果你不了解你显卡支持的拓展和功能到底有哪些，可以去<a href="http://vulkan.gpuinfo.org/">这个网站</a>查询。</p>
<p><strong>glslangValidator.exe</strong> 程序将刻度着色器文件 <a href="https://en.wikipedia.org/wiki/OpenGL_Shading_Language">GLSL</a> 编译为字节码。在 <a href="//vulkan-tutorial.com/Drawing_a_triangle/Graphics_pipeline_basics/Shader_modules">shader modules</a>
章节中，我们将重点讲述。<strong>Bin32</strong> 目录还包含了 Vulkan 加载器和验证层文件。<strong>Lib32</strong> 目录包含了一些库</p>
<p><strong>Doc</strong> 目录包含了 Vulkan SDK 和离线版本的一些规格信息。<strong>Include</strong> 目录包含了 Vulkan 头文件。本教程用的不多，你可以自己看一眼。</p>
<h3 id="page_GLFW">GLFW</h3>
<p>前面提到，Vulkan 是一门跨平台 API，因此不内置工具去在特定平台创建窗口并渲染。为了充分利用 Vulkan 跨平台特性，我们使用 <a href="http://www.glfw.org/">GLFW library</a> 来创建窗口，这个库支持 Win 和 Linux。有一些像  <a href="https://www.libsdl.org/">SDL</a> 的库也合适，但是 GLFW 的好处是，它能让 Vulkan 专心做渲染，不必关心特定平台的一些编程方法。 </p>
<p>最新版本的 GLFW 这里下载 —— <a href="http://www.glfw.org/download.html">official website</a>。
本教程使用 32位文件，你也可以自己选择构建 64 位模式，但要确保链接到 <strong>Bin</strong> 目录下的 Vulkan SDK 文件。下载完成后解压，我在文档下的 Visual Studio 目录中创建了一个 <code>Libraries</code> 目录。（可以提前下载 GLFW 预编译文件）</p>
<p><img class="smallimg" src="../static/images/vulkan/02/glfw_directory.png" alt=""></p>
<h3 id="page_GLM">GLM</h3>
<p>和 D12 不同，Vulkan 不包含线性代数操作库，所以我们要下载 <a href="http://glm.g-truc.net/">GLM</a>，这个库设计的不错，OpenGL 也能用。</p>
<p>GLM 只有头文件，所以我们这里下载<a href="https://github.com/g-truc/glm/releases">最新版本</a>，然后和我一样放到这里：</p>
<p><img class="smallimg" src="../static/images/vulkan/02/library_directory.png" alt=""></p>
<h3 id="page_Setting_up_Visual_Studio">设置 Visual Studio</h3>
<p>装完所有以来后，建一个基础 Vulkan VS 项目，我们写点代码看看是否工作。</p>
<p>运行t Visual Studio 创建 C++ Win32 项目.</p>
<p><img src="../static/images/vulkan/02/vs_new_cpp_project.png" alt=""></p>
<p>点击 <strong>Next</strong>, 选择 <strong>Console application</strong> 作为应用类型，确保勾选 <strong>Empty project</strong>。</p>
<p><img src="../static/images/vulkan/02/vs_application_settings.png" alt=""></p>
<p>点击 <strong>Finish</strong> 创建项目，然后添加 C++ 文件。</p>
<p><img src="../static/images/vulkan/02/vs_new_item.png" alt=""></p>
<p><img src="../static/images/vulkan/02/vs_new_source_file.png" alt=""></p>
<p>先别担心不懂，添加下列代码。下一章会讲，这里先保证能编译运行 Vulkan。</p>
<div class="top-box hide"><div class="alert-info"></div></div><pre data-original-code="#define GLFW_INCLUDE_VULKAN
#include <GLFW/glfw3.h>

#define GLM_FORCE_RADIANS
#define GLM_FORCE_DEPTH_ZERO_TO_ONE
#include <glm/vec4.hpp>
#include <glm/mat4x4.hpp>

#include <iostream>

int main() {
    glfwInit();

    glfwWindowHint(GLFW_CLIENT_API, GLFW_NO_API);
    GLFWwindow* window = glfwCreateWindow(800, 600, &quot;Vulkan window&quot;, nullptr, nullptr);

    uint32_t extensionCount = 0;
    vkEnumerateInstanceExtensionProperties(nullptr, &amp;extensionCount, nullptr);

    std::cout << extensionCount << &quot; extensions supported&quot; << std::endl;

    glm::mat4 matrix;
    glm::vec4 vec;
    auto test = matrix * vec;

    while(!glfwWindowShouldClose(window)) {
        glfwPollEvents();
    }

    glfwDestroyWindow(window);

    glfwTerminate();

    return 0;
}" data-snippet-id="ext.bbc1dc49b97da82fd34a4d1a09933466" data-snippet-saved="false" data-codota-status="done"><code class="language-c++ hljs cpp"><span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> GLFW_INCLUDE_VULKAN</span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;GLFW/glfw3.h&gt;</span></span>

<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> GLM_FORCE_RADIANS</span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> GLM_FORCE_DEPTH_ZERO_TO_ONE</span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;glm/vec4.hpp&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;glm/mat4x4.hpp&gt;</span></span>

<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;iostream&gt;</span></span>

<span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">main</span><span class="hljs-params">()</span> </span>{
    glfwInit();

    glfwWindowHint(GLFW_CLIENT_API, GLFW_NO_API);
    GLFWwindow* window = glfwCreateWindow(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>, <span class="hljs-string">"Vulkan window"</span>, <span class="hljs-literal">nullptr</span>, <span class="hljs-literal">nullptr</span>);

    <span class="hljs-keyword">uint32_t</span> extensionCount = <span class="hljs-number">0</span>;
    <span class="hljs-function">vkEnumerateInstanceExtensionProperties</span>(<span class="hljs-literal">nullptr</span>, &amp;extensionCount, <span class="hljs-literal">nullptr</span>);

    <span class="hljs-built_in">std</span>::<span class="hljs-built_in">cout</span> &lt;&lt; extensionCount &lt;&lt; <span class="hljs-string">" extensions supported"</span> &lt;&lt; <span class="hljs-built_in">std</span>::<span class="hljs-built_in">endl</span>;

    glm::mat4 matrix;
    glm::vec4 vec;
    <span class="hljs-keyword">auto</span> test = matrix * vec;

    <span class="hljs-keyword">while</span>(!glfwWindowShouldClose(window)) {
        glfwPollEvents();
    }

    glfwDestroyWindow(window);

    glfwTerminate();

    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}
</code></pre>
<p>现在我们来配置项目，剔除错误。打开项目属性对话框，确保勾选 <strong>All Configurations</strong> （所有配置）。既能
 <strong>Debug</strong> 又能 <strong>Release</strong>。</p>
<p><img class="mediumimg" src="../static/images/vulkan/02/vs_open_project_properties.png" alt=""></p>
<p><img src="../static/images/vulkan/02/vs_all_configs.png" alt=""></p>
<p>选择 <strong>C++ -&gt; General -&gt; Additional Include Directories</strong> （附加包含目录）选择下拉的 <strong>&lt;Edit...&gt;</strong> （编辑）。</p>
<p><img src="../static/images/vulkan/02/vs_cpp_general.png" alt=""></p>
<p>添加 Vulkan，GLFW，GLM 的头文件目录:</p>
<p><img src="../static/images/vulkan/02/vs_include_dirs.png" alt=""></p>
<p>下一步, 链接器 -&gt; 附加库目录:</p>
<p><img src="../static/images/vulkan/02/vs_link_settings.png" alt=""></p>
<p>添加 Vulkan 和 GLFW 的库目录:</p>
<p><img src="../static/images/vulkan/02/vs_link_dirs.png" alt=""></p>
<p>选择 <strong>Linker -&gt; Input</strong> （连接器 -&gt; 输入） 编辑 <strong>Additional Dependencies</strong> （附加依赖项）。</p>
<p><img src="../static/images/vulkan/02/vs_link_input.png" alt=""></p>
<p>输入 Vulkan 和 GLFW 对象文件名。:</p>
<p><img src="../static/images/vulkan/02/vs_dependencies.png" alt=""></p>
<p>现在可以关闭属性对话框，如果一切正常，就不会有高亮报错</p>
<p>按 <strong>F5</strong> 编译运行项目，会看到如下命令弹窗:</p>
<p><img src="../static/images/vulkan/02/vs_test_window.png" alt=""></p>
<p>extensions 支持数为非0（我这里11）的话，那么恭喜，可以愉快玩耍 Vulkan 了。</p>
<p>为了避免每次都添加库和头文件，你得创建个模板，2015 选择 <srong>File -&gt; Export Template...</srong>，2017 选择
<srong>Project -&gt; Export Template...</srong>。然后选择
<srong>Project template</srong> ，设置模板名称和描述。</p>
<p><img src="../static/images/vulkan/02/vs_export_template.png" alt=""></p>
<p>选择 <srong>Finish</srong> ，在新建项目 <srong>New Project</srong>
便有了模板，用它来创建一个 <srong>Hello Triangle</srong> 作为预习。</p>
<p><img src="../static/images/vulkan/02/vs_template.png" alt=""></p>
<p>现在准备开始下一章 <a href="//vulkan-tutorial.com/Drawing_a_triangle/Setup/Base_code">the real adventure</a>。</p>
<h2 id="page_Android">Android</h2>
<p>这部分主要参考 LunarG Vulkan Github repo <a href="https://github.com/LunarG/VulkanSamples">VulkanSamples</a>.</p>
<p>在这之前可以查看一下 NDK API Doc 中的 <a href="https://developer.android.com/ndk/guides/graphics/getting-started.html">Vulkan 设置</a>.</p>
<ul>
<li>Build shaderc source code inside NDK</li>
</ul>
<pre>$ cd ${ndk_root}<span class="pl-k">/</span>sources<span class="pl-k">/</span>third_party<span class="pl-k">/</span>shaderc
$ <span class="pl-c1">..</span><span class="pl-k">/</span><span class="pl-c1">..</span><span class="pl-k">/</span><span class="pl-c1">..</span><span class="pl-k">/</span>ndk<span class="pl-k">-</span>build <span class="pl-c1">NDK_PROJECT_PATH</span><span class="pl-k">=</span><span class="pl-c1">.</span> <span class="pl-c1">APP_BUILD_SCRIPT</span><span class="pl-k">=</span><span class="pl-smi">Android</span><span class="pl-k">.</span>mk <span class="pl-c1">APP_STL</span><span class="pl-k">:</span><span class="pl-k">=</span>gnustl_static <span class="pl-c1">APP_ABI</span><span class="pl-k">=</span>all <span class="pl-c1">NDK_TOOLCHAIN_VERSION</span><span class="pl-k">:</span><span class="pl-k">=</span>clang libshaderc_combined <span class="pl-k">-</span>j16</pre>
<ul>
<li>Generate Android Studio Projects</li>
</ul>
<pre>$ cd <span class="pl-c1">YOUR_DEV_DIRECTORY</span><span class="pl-k">/</span><span class="pl-smi">VulkanSamples</span><span class="pl-k">/</span><span class="pl-c1">API</span><span class="pl-k">-</span><span class="pl-smi">Samples</span>
$ cmake <span class="pl-k">-</span><span class="pl-c1">DANDROID</span><span class="pl-k">=</span><span class="pl-c1">ON</span></pre>
<h3 id="page_Vulkan_Wrapper">Vulkan Wrapper</h3>
<p>提取 Vulkan 包裹器 <a href="https://github.com/LunarG/VulkanSamples/tree/master/common">Vulkan Wrapper</a></p>

<p>因为很大一部分 Mac 设备显卡因素，对 Vulkan 的支持不好，需要借助 MoltenVK 才能运行部分 Vulkan Demo，这里不做表述，可以参考我 fork 的 <a href="http://www.moltengl.com/moltenvk/" rel="nofollow">Vulkan</a> 主项目。同时个人较少使用 Linux ，因此也不翻译 Linux 部分 </p>
<h2 id="page_Reference">参考</h2>
            <p>整理一些常用的 Vulkan repo 以及 tutorial 链接：</p>
            <ul>
              <li>
                <p><a href="https://github.com/MartinRGB/Vulkan_AS">Vulkan_AS</a> —— Vulkan 主项目的 Android Studio 运行版本</p>
              </li>
              <li>
                <p><a href="https://github.com/MartinRGB/VulkanTutorial-Android">VulkanTutorial-Android</a> —— 这一教程的 Android 版本</p>
              </li>
              <li>
                <p><a href="https://github.com/MartinRGB/vulkan-basic-samples">vulkan-basic-samples
</a> —— Google 提供的案例</p>
              </li>
              <li>
                <p><a href="http://jhenriques.net/development.html">Vulkan Tutorial - 101
</a> —— Jose Henriques 的教程</p>
              </li>
              <li>
                <p><a href="http://stephaniehurlburt.com/blog/2017/7/14/beginner-friendly-vulkan-tutorials">Beginner-Friendly Vulkan Tutorials
</a> —— 一些 Vulkan 教程合集</p>
              </li>
            </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import SnippetComponent from '@/components/SnippetComponent'

  export default {
    name: 'vulkan01',
    data: function () {return {
      articleTitle:'4.[译] Vulkan 入门系列 —— 开发环境'
    }},
    components: {},
    methods: {
      goAnchor(selector) {
        var anchor = this.$el.querySelector(selector)
        var navbarHeight = 68;
        //document.body.scrollTo = anchor.offsetTop
        window.scrollTo(0, anchor.offsetTop - anchor.offsetHeight - 68);
      },
      highlight:function(){
            var aCodes = this.$el.getElementsByTagName('pre');
            for (var i=0; i < aCodes.length; i++) {
                hljs.highlightBlock(aCodes[i]);
                hljs.lineNumbersBlock(aCodes[i]);
            }
      }
    },
    computed: {},
    created: function () {},
    mounted:function(){
      this.highlight()
    },
    destroyed:function(){}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
