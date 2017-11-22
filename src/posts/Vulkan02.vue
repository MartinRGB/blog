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

            <p>In this chapter we'll set up your environment for developing Vulkan applications
and install some useful libraries. All of the tools we'll use, with the
exception of the compiler, are compatible with both Windows and Linux, but the
steps for installing them differ a bit, which is why they're described
separately here.</p>
<h2 id="page_Windows">Windows</h2>
<p>If you're developing for Windows, then I will assume that you are using Visual
Studio 2013 or 2015 to compile your code. The steps are the same for both
versions, but the Vulkan SDK currently only includes debug symbols that are
compatible with Visual Studio 2013. That isn't really a problem in practice, but
it's something that you may wish to take into account.</p>
<h3 id="page_Vulkan_SDK">Vulkan SDK</h3>
<p>The most important component you'll need for developing Vulkan applications is
the SDK. It includes the headers, standard validation layers, debugging tools
and a loader for the Vulkan functions. The loader looks up the functions in the
driver at runtime, similarly to GLEW for OpenGL - if you're familiar with that.</p>
<p>The SDK can be downloaded from <a href="https://vulkan.lunarg.com/">the LunarG website</a>
using the buttons at the bottom of the page. You don't have to create an
account, but it will give you access to some additional documentation that may
be useful to you.</p>
<p><img src="../static/images/vulkan/02/vulkan_sdk_download_buttons.png" alt=""></p>
<p>Proceed through the installation and pay attention to the install location of
the SDK. The first thing we'll do is verify that your graphics card and driver
properly support Vulkan. Go to the directory where you installed the SDK, open
the <code>Bin32</code> directory and run the <code>cube.exe</code> demo. You should see the following:</p>
<p><img src="../static/images/vulkan/02/cube_demo.png" alt=""></p>
<p>If you receive an error message then ensure that your drivers are up-to-date,
include the Vulkan runtime and that your graphics card is supported. See the
<a href="//vulkan-tutorial.com/Introduction">introduction chapter</a> for links to drivers from the major
vendors.</p>
<p>There are two other programs in this directory that will be useful for
development. The <code>vkjson_info.exe</code> program generates a JSON file with a detailed
description of the capabilities of your hardware when using Vulkan. If you are
wondering what support is like for extensions and other optional features among
the graphics cards of your end users, then you can use <a href="http://vulkan.gpuinfo.org/">this website</a>
to view the results of a wide range of GPUs.</p>
<p>The <code>glslangValidator.exe</code> program will be used to compile shaders from the
human-readable <a href="https://en.wikipedia.org/wiki/OpenGL_Shading_Language">GLSL</a> to
bytecode. We'll cover this in depth in the <a href="//vulkan-tutorial.com/Drawing_a_triangle/Graphics_pipeline_basics/Shader_modules">shader modules</a>
chapter. The <code>Bin32</code> directory also contains the binaries of the Vulkan loader
and the validation layers, while the <code>Lib32</code> directory contains the libraries.</p>
<p>The <code>Doc</code> directory contains useful information about the Vulkan SDK and an
offline version of the entire Vulkan specification. Lastly, there's the
<code>Include</code> directory that contains the Vulkan headers. Feel free to explore the
other files, but we won't need them for this tutorial.</p>
<h3 id="page_GLFW">GLFW</h3>
<p>As mentioned before, Vulkan by itself is a platform agnostic API and does not
include tools for creating a window to display the rendered results. To benefit
from the cross-platform advantages of Vulkan and to avoid the horrors of Win32,
we'll use the <a href="http://www.glfw.org/">GLFW library</a> to create a window, which
supports both Windows and Linux. There are other libraries available for this
purpose, like <a href="https://www.libsdl.org/">SDL</a>, but the advantage of GLFW is that
it also abstracts away some of the other platform-specific things in Vulkan
besides just window creation.</p>
<p>You can find the latest release of GLFW on the <a href="http://www.glfw.org/download.html">official website</a>.
In this tutorial we'll be using the 32-bit binaries, but you can of course also
choose to build in 64 bit mode. In that case make sure to link with the Vulkan
SDK binaries in the <code>Bin</code> directory. After downloading it, extract the archive
to a convenient location. I've chosen to create a <code>Libraries</code> directory in the
Visual Studio directory under documents.</p>
<p><img class="smallimg" src="../static/images/vulkan/02/glfw_directory.png" alt=""></p>
<h3 id="page_GLM">GLM</h3>
<p>Unlike DirectX 12, Vulkan does not include a library for linear algebra
operations, so we'll have to download one. <a href="http://glm.g-truc.net/">GLM</a> is a
nice library that is designed for use with graphics APIs and is also commonly
used with OpenGL.</p>
<p>GLM is a header-only library, so just download the <a href="https://github.com/g-truc/glm/releases">latest version</a>
and store it in a convenient location. You should have a directory structure
similar to the following now:</p>
<p><img class="smallimg" src="../static/images/vulkan/02/library_directory.png" alt=""></p>
<h3 id="page_Setting_up_Visual_Studio">Setting up Visual Studio</h3>
<p>Now that you've installed all of the dependencies we can set up a basic Visual
Studio project for Vulkan and write a little bit of code to make sure that
everything works.</p>
<p>Start Visual Studio and create a new C++ Win32 project.</p>
<p><img src="../static/images/vulkan/02/vs_new_cpp_project.png" alt=""></p>
<p>Click <code>Next</code>, select <code>Console application</code> as application type and make sure
that <code>Empty project</code> is checked.</p>
<p><img src="../static/images/vulkan/02/vs_application_settings.png" alt=""></p>
<p>Press <code>Finish</code> to create the project and add a C++ source file. You should
already know how to do that, but the steps are included here for completeness.</p>
<p><img src="../static/images/vulkan/02/vs_new_item.png" alt=""></p>
<p><img src="../static/images/vulkan/02/vs_new_source_file.png" alt=""></p>
<p>Now add the following code to the file. Don't worry about trying to
understand it right now; we're just making sure that you can compile and run
Vulkan applications. We'll start from scratch in the next chapter.</p>
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
<p>Let's now configure the project to get rid of the errors. Open the project
properties dialog and ensure that <code>All Configurations</code> is selected, because most
of the settings apply to both <code>Debug</code> and <code>Release</code> mode.</p>
<p><img class="mediumimg" src="../static/images/vulkan/02/vs_open_project_properties.png" alt=""></p>
<p><img src="../static/images/vulkan/02/vs_all_configs.png" alt=""></p>
<p>Go to <code>C++ -&gt; General -&gt; Additional Include Directories</code> and press <code>&lt;Edit...&gt;</code>
in the dropdown box.</p>
<p><img src="../static/images/vulkan/02/vs_cpp_general.png" alt=""></p>
<p>Add the header directories for Vulkan, GLFW and GLM:</p>
<p><img src="../static/images/vulkan/02/vs_include_dirs.png" alt=""></p>
<p>Next, open the editor for library directories:</p>
<p><img src="../static/images/vulkan/02/vs_link_settings.png" alt=""></p>
<p>And add the locations of the object files for Vulkan and GLFW:</p>
<p><img src="../static/images/vulkan/02/vs_link_dirs.png" alt=""></p>
<p>Go to <code>Linker -&gt; Input</code> and press <code>&lt;Edit...&gt;</code> in the <code>Additional Dependencies</code>
dropdown box.</p>
<p><img src="../static/images/vulkan/02/vs_link_input.png" alt=""></p>
<p>Enter the names of the Vulkan and GLFW object files:</p>
<p><img src="../static/images/vulkan/02/vs_dependencies.png" alt=""></p>
<p>You can now close the project properties dialog. If you did everything right
then you should no longer see any more errors being highlighted in the code.</p>
<p>Press <code>F5</code> to compile and run the project and you should see a command prompt
and a window pop up like this:</p>
<p><img src="../static/images/vulkan/02/vs_test_window.png" alt=""></p>
<p>The number of extensions should be non-zero. Congratulations, you're all set for
playing with Vulkan!</p>
<p>To avoid having to repeat this work all over again every time, you can create a
template from it. Select <code>File -&gt; Export Template...</code> in Visual Studio 2015 or
<code>Project -&gt; Export Template...</code> in Visual Studio 2017. Then select
<code>Project template</code> and fill in a nice name and description for the template.</p>
<p><img src="../static/images/vulkan/02/vs_export_template.png" alt=""></p>
<p>Press <code>Finish</code> and you should now have a handy template in the <code>New Project</code>
dialog!  Use it to create a <code>Hello Triangle</code> project as preparation for the next
chapter.</p>
<p><img src="../static/images/vulkan/02/vs_template.png" alt=""></p>
<p>You are now all set for <a href="//vulkan-tutorial.com/Drawing_a_triangle/Setup/Base_code">the real adventure</a>.</p>
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
