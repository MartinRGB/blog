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
                <p><a href="javascript:void(0)" @click="goAnchor('#page_MacOS')">MacOS &amp; iOS</a></p>
                  <ul class="TableOfContents">
                    <li>
                    <p><a href="javascript:void(0)" @click="goAnchor('#page_Vulkan_Main')">MoltenVK 测试</a></p>
                    </li>
                    <li>
                    <p><a href="javascript:void(0)" @click="goAnchor('#page_Vulkan_MacOS')">MacOS|iOS with Vulkan</a></p>
                    </li>
                  </ul>
              </li>
              <li>
                <p><a href="javascript:void(0)" @click="goAnchor('#page_Linux')">Linux</a></p>
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
<p id="CodeSnippet-before4">先别担心不懂，添加下列代码。下一章会讲，这里先保证能编译运行 Vulkan。</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-4" bindSpecial='fontSize:14px' :bindCode ='winCPPSnippet'></snippet-component>
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
<p>为了避免每次都添加库和头文件，你得创建个模板，2015 选择 <strong>File -&gt; Export Template...</strong>，2017 选择
<strong>Project -&gt; Export Template...</strong>。然后选择
<strong>Project template</strong> ，设置模板名称和描述。</p>
<p><img src="../static/images/vulkan/02/vs_export_template.png" alt=""></p>
<p>选择 <strong>Finish</strong> ，在新建项目 <strong>New Project</strong>
便有了模板，用它来创建一个 <strong>Hello Triangle</strong> 作为预习。</p>
<p><img src="../static/images/vulkan/02/vs_template.png" alt=""></p>
<p><a href="https://github.com/MartinRGB/100ProjectsVulkan/tree/master/0.VulkanTest(VS2015)">VS 2015 项目地址</a></p>
<p>现在准备开始下一章 <a href="//vulkan-tutorial.com/Drawing_a_triangle/Setup/Base_code">the real adventure</a>。</p>
<h2 id="page_Android">Android</h2>
<h3 id="page_Vulkan_Wrapper">NDK with Vulkan 测试</h3>
<p>这部分主要参考 LunarG Vulkan Github repo <a href="https://github.com/LunarG/VulkanSamples">VulkanSamples</a>.</p>
<p>在这之前可以查看一下 NDK API Doc 中的 <a href="https://developer.android.com/ndk/guides/graphics/getting-started.html">Vulkan 设置</a>.</p>
<ul>
<li>NDK下构建 shaderc 源码</li>
</ul>
<snippet-component v-if="$route.meta.keepAlive" lan='shell' id="CodeSnippet-5" bindSpecial='fontSize:14px' :bindCode ='shaderCSnippet'></snippet-component>
<ul>
<li>生成 Android Studio 项目</li>
</ul>
<snippet-component v-if="$route.meta.keepAlive" lan='shell' id="CodeSnippet-6" bindSpecial='fontSize:14px' :bindCode='cmakeAndroidSnippet'></snippet-component>
<p>会在 API-Samples 目录下生成一个 android 文件夹，结果如下：</p>
<img src="../static/images/vulkan/02/mac_cmake_vulkansamples.png" alt="">
<p>测试 <strong>immutable_sampler</strong> 项目:</p>
<mockup-component bindDevice='android' class="mediumimg" :bindUrl='screenAsset'></mockup-component>
<h3 id="page_Vulkan_Wrapper">Vulkan Wrapper</h3>
<ul>
  <li>
    <p>提取 LunarG 的 <a href="https://github.com/LunarG/VulkanSamples/tree/master/common">Vulkan Wrapper</a>,或者直接从源头 Google 处提取 <a href="https://github.com/googlesamples/android-vulkan-tutorials/tree/master/common/vulkan_wrapper">Vulkan Wrapper</a></p>
  </li>
    <li>
    <p>在 NDK 目录下胶水层目录 <strong>native_app_glue</strong> 外部新建 <strong>vulkan_wrapper</strong> 目录，并复制 vulkan_wrapper 文件</a></p>
  </li>
  <li>使用 Android Studio 的 无 Activity 模板新建 C++ 11 的 NDK 项目 </li>
  <li>修改 <strong>AndroidManifest.xml</strong> 文件</li>
  <snippet-component v-if="$route.meta.keepAlive" lan='xml' id="CodeSnippet" :bindUrl ='xmlSnippet'></snippet-component>
  <li>修改 <strong>CMakelist.txt</strong> 文件，链接胶水层和包裹器静态库</li>
  <snippet-component v-if="$route.meta.keepAlive" lan='txt' id="CodeSnippet-2" :bindUrl ='cmakeSnippet'></snippet-component>
  <li>注意调整文件结构，注意 <strong>build.gradle(Module:app)</strong> 中使用 <strong>CMakelist.txt</strong> 的路径位置</li>
  <li>注意调整文件结构，注意 <strong>CMakelist.txt</strong> 中使用项目内共享库的位置</li>
  <li>编写 cpp 主文件，这里使用 Google 提供的 <strong>load vulkan</strong> 案例</li>
  <snippet-component v-if="$route.meta.keepAlive" lan='txt' id="CodeSnippet-3" :bindUrl ='cppSnippet'></snippet-component>
  <li>编译运行，结果如下：</li>
  <img src="../static/images/vulkan/02/mac_android_loadvulkan.jpg" alt="">
</ul>
<p><a href="https://github.com/MartinRGB/100ProjectsVulkan/tree/master/0.VulkanTest(AS2.3)">Android Studio 2.3 项目地址</a></p>
<h2 id="page_MacOS">MacOS &amp; iOS</h2>
<p>因为很大一部分 Mac 设备显卡因素，对 Vulkan 的支持不好，需要借助 MoltenVK 使用 Metal 才能运行部分 Vulkan Demo,可以参考我 fork 的 <a href="https://github.com/MartinRGB/Vulkan" rel="nofollow">Vulkan</a> 主项目。</p>
<h3 id="page_Vulkan_Main">MoltenVK 测试</h3>
<ul>
  <li>
    <p>下载 <a href="http://www.moltengl.com/moltenvk/"> MoltenVK </a> ,解压缩。</p>
  </li>
  <li>
    <p>根据 <a href="https://github.com/MartinRGB/Vulkan/blob/master/Molten-0.18.2/MoltenVK/Demos/README_MoltenVK_Demos.md"> README </a> 运行对应的 Samples，注意其中的链接位置。</p>
  </li>
  <li>
    <p>编译运行 iOS 版本和 macOS 版本，macOS 版本 LunarG-cube 案例效果如下：</p>
  </li>
  <li><img src="../static/images/vulkan/02/macos_lunarg_test.png" alt=""></li>
</ul>
<h3 id="page_Vulkan_MacOS">MacOS|iOS with Vulkan</h3>
<ul>
  <li>
    <p>参考 <a href="https://github.com/MartinRGB/OpenGL_SuperBible_5th_macOS"> OpenGL_SuperBible_5th_macOS </a> 环境配置。</p>
  </li>
  <li>
    <p>查阅 MoltenVK 项目中的 API-Samples。</p>
  </li>
  <li>
    <p>参考 <a href="http://tatsyblog.sakura.ne.jp/wordpress/applications/graphics/1609/"> MacでVulkanを使う方法  </a></p>
  </li>
</ul>
<p>首先编译安装 glfw-3.2</p>
<snippet-component v-if="$route.meta.keepAlive" lan='shell' id="CodeSnippet-18" bindSpecial='fontSize:14px' :bindCode='glfwComplieSnippet'></snippet-component>
<p>可以在项目的外部目录新建一个 <strong>lib</strong>存放库文件，一个 <strong>external</strong> 存放头文件。</p>
<p>新建一个 macOS Cocoa 应用</p>
<img src="../static/images/vulkan/02/mac_cocoa_app.png" alt="">
<p>在 <strong>Project</strong> 中搜索 <strong>Serach Path</strong>，添加头文件和库文件的搜索路径：</p>
<img src="../static/images/vulkan/02/mac_linked_libraried.png" alt="">
<p>当然你也可以在 <strong>Preference -> Location -> Custom Paths</strong> 中，设置系统默认库位置</p>
<img src="../static/images/vulkan/02/mac_custom_location.png" alt="">
<p>在 <strong>Targets -> Linked Frameworks and Libraries</strong> 中，添加 <strong>libglfw.3.x.dylib</strong> | <strong>CoreVideo</strong> | <strong>OpenGL</strong> | <strong>Cocoa</strong> | <strong>IOKit</strong> 框架或动态库</p>
<img src="../static/images/vulkan/02/mac_linked_libraried.png" alt="">
<p>删除 <strong>AppDelegate.h | AppDelegate.m | main.m(in Supporting Files) | ViewController.h | ViewController.m</strong> 文件</p>
<p>创建一个文件，命名为 <strong>main.cpp</strong></p>
<p>我们试着运行一下下一章的 HelloWorldApplication</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-9" bindSpecial='fontSize:14px' :bindCode ='macCPPSnippet'></snippet-component>
<p>效果如下，为了保证项目整洁，我搜索库和头文件位置为 <strong>/usr/local/xxx/</strong></p>
<img src="../static/images/vulkan/02/mac_glfw_test.png" alt="">
<p>然而这这是搞定了 GLFW,我们现在需要搞掂 <a href="https://moltengl.com/moltenvk/">MoltenVK</a>,首先下载，重命名为 Molten，然后把解压文件放置入 <strong>/usr/local/include/</strong> </p>
<p>重新新建一个 macOS Cocoa 应用，重复上面 OpenGL 的步骤。不同的地方是，在 <strong>Linked Frameworks and Libraries</strong> 里面，我们还需要添加一个 <strong>IOSurface</strong> 框架，然后在 <strong>/usr/local/include/Molten/MoltenVK/macOS/</strong> 下找到 <strong> MoltenVK.framework</strong>,进行添加，结果如下：</p>
<img src="../static/images/vulkan/02/mac_vulkan_framework.png" alt="">
<p>在 Project 的 Build Setting 搜索 <strong>Other Linker Flags</strong>，填写-lgfw3</p>
<img src="../static/images/vulkan/02/Other_Linker_Flags.png" alt="">
<p>在 main.cpp 中一定要添加 <strong>#include &lt;Molten/MoltenVK/include/MoltenVK/mvk_vulkan.h&gt;</strong></p>

<p>现在我们回头试一下 Windows 的 <a href="javascript:void(0)" @click="goAnchor('#CodeSnippet-before4')">案例</a></p>
<img src="../static/images/vulkan/02/mac_vulakn_final1.png" alt="">

<h2 id="page_Linux">Linux</h2>
<p>个人较少使用 Linux ，因此也不翻译 Linux 部分 </p>
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
                <p><a href="https://github.com/googlesamples/android-vulkan-tutorials">android-vulkan-tutorials
</a> —— Google 提供的案例2</p>
              </li>
              <li>
                <p><a href="https://github.com/LunarG/VulkanSamples">VulkanSamples
</a> —— LunarG Vulkan Samples</p>
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
  import MockupComponent from '@/components/MockupComponent'
  import assetFile from '../static/images/vulkan/02/mac_android_immutable.png'
  import xmlFile from 'file-loader!../static/codesnippets/vulkan/02/AndroidManifest.xml'
  import cmakeFile from '../static/codesnippets/vulkan/02/CMakeLists.txt'
  import cppFile from '../static/codesnippets/vulkan/02/native-lib.cpp'

  export default {
    name: 'vulkan02',
    data: function () {return {
      articleTitle:'4.[译] Vulkan 入门系列 —— 开发环境',
      screenAsset:assetFile,
      xmlSnippet:xmlFile,
      shaderCSnippet:"$ ${ndk_root}" + `/sources/third_party/shaderc
$ ../../../ndk-build NDK_PROJECT_PATH=. APP_BUILD_SCRIPT=Android.mk APP_STL:=gnustl_static APP_ABI=all NDK_TOOLCHAIN_VERSION:=clang libshaderc_combined -j16`,
      cmakeAndroidSnippet:`$ cd YOUR_DEV_DIRECTORY/VulkanSamples/API-Samples
$ cmake -DANDROID=ON`,
      glfwComplieSnippet:`$ cd YOUR_DEV_DIRECTORY/glfw-x.x
$ mkdir glfw-build
$ cd glfw-build
$ cmake ../
$ make
$ make install
$ cmake -DBUILD_SHARED_LIBS=ON .
$ make
$ make install`,
      winCPPSnippet:String.raw`#define GLFW_INCLUDE_VULKAN
#include <GLFW/glfw3.h>

#define GLM_FORCE_RADIANS
#define GLM_FORCE_DEPTH_ZERO_TO_ONE
#include <glm/vec4.hpp>
#include <glm/mat4x4.hpp>

#include <iostream>

int main() {
    glfwInit();

    glfwWindowHint(GLFW_CLIENT_API, GLFW_NO_API);
    GLFWwindow* window = glfwCreateWindow(800, 600, "Vulkan window", nullptr, nullptr);

    uint32_t extensionCount = 0;
    vkEnumerateInstanceExtensionProperties(nullptr, &extensionCount, nullptr);

    std::cout << extensionCount << " extensions supported" << std::endl;

    glm::mat4 matrix;
    glm::vec4 vec;
    auto test = matrix * vec;

    while(!glfwWindowShouldClose(window)) {
        glfwPollEvents();
    }

    glfwDestroyWindow(window);

    glfwTerminate();

    return 0;
}`,
      macCPPSnippet:String.raw`#define GLFW_INCLUDE_VULKAN
#include <GLFW/glfw3.h>

#include <iostream>
#include <stdexcept>

const int WIDTH = 800;
const int HEIGHT = 600;

class HelloTriangleApplication {
public:
    void run() {
        initWindow();
        initVulkan();
        mainLoop();
        cleanup();
    }

private:
    GLFWwindow* window;

    void initWindow() {
        glfwInit();

        glfwWindowHint(GLFW_CLIENT_API, GLFW_NO_API);
        glfwWindowHint(GLFW_RESIZABLE, GLFW_FALSE);

        window = glfwCreateWindow(WIDTH, HEIGHT, "Vulkan", nullptr, nullptr);
    }

    void initVulkan() {

    }

    void mainLoop() {
        while (!glfwWindowShouldClose(window)) {
            glfwPollEvents();
        }
    }

    void cleanup() {
        glfwDestroyWindow(window);

        glfwTerminate();
    }
};

int main() {
    HelloTriangleApplication app;

    try {
        app.run();
    } catch (const std::runtime_error& e) {
        std::cerr << e.what() << std::endl;
        return EXIT_FAILURE;
    }

    return EXIT_SUCCESS;
}`,
      cmakeSnippet:cmakeFile,
      cppSnippet:cppFile
    }},
    components: {SnippetComponent,MockupComponent},
    methods: {},
    computed: {},
    created: function () {},
    mounted:function(){
      // alert(this.$route.params.name)
      // alert(this.$route.name)
    },
    destroyed:function(){}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
