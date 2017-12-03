<template>
  <div class="transition-container">
    <img class="hero-image" src='../static/images/vulkan/01.overview.jpg' alt='hero image'/>
    <!-- <main>
        <div class="content">
            <canvas class="scene scene--full" id="scene"></canvas>
            <div class="content__inner">
                <p class="content__title">Vulkan Tutorial</p>
            </div>
        </div>
    </main> -->
    <div id="center-container" class="center-container">
      <div id="article-view" class="article-view">
            <h1 id="toc_0">{{articleTitle}}</h1>
            <strong><p>原文来自 <a href="https://vulkan-tutorial.com/Drawing_a_triangle/Setup" target="_blank">Vulkan-Tutorial.com</a>，初次翻译开发类文章，恳请指正。</p></strong>
            <h2>I.基础代码测试</h2>
    
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
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-1" bindSpecial='fontSize:14px' :bindCode ='snippet1'></snippet-component>
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
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-2" bindSpecial='fontSize:14px' :bindCode ='snippet2'></snippet-component>
<p>这样，我们就能使用 GLFW 中的一些定义，同时也能自动加载 Vulkan 头文件。添加一个 <strong>initWindow</strong> 函数，在  <strong>run</strong> 中在其他调用之前调用。我们将在这个函数中初始化 GLFW 并创建窗口。</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-3" bindSpecial='fontSize:14px' :bindCode ='snippet3'></snippet-component>
<p>在 <strong>initWindow</strong> 中首先调用 <strong>glfwInit()</strong> 来初始化 GLFW 库。因为 GLFW 最初的设计目的是创建 OpenGL 上下文，我们需要随后调用一些方法，告诉他不要创建 OpenGL 上下文:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-4" bindSpecial='fontSize:14px' :bindCode ='snippet4'></snippet-component>
<p>因为处理缩放窗口的功能还有一些其他注意，因此这里先不表，我们先直接关闭掉：</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-5" bindSpecial='fontSize:14px' :bindCode ='snippet5'></snippet-component>
<p>现在来实际创建窗口，添加 <strong>GLFWwindow* window;</strong>
私有类成员来储存指向他的引用，并初始化窗口:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-6" bindSpecial='fontSize:14px' :bindCode ='snippet6'></snippet-component>
<p>头三个参数描述了，宽、高、窗口标题。第四个参数让你选择是否在其他指定显示器上显示。最后一个参数和 OpenGL 相关。</p>
<p>建议头俩参数使用常量，而不是直接输入数值，因为以后可能更改。因此我在 <strong>HelloTriangleApplication</strong> 类上面定义这俩常量：</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-7" bindSpecial='fontSize:14px' :bindCode ='snippet7'></snippet-component>
<p>然后在窗口创建调用更改为：</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-8" bindSpecial='fontSize:14px' :bindCode ='snippet8'></snippet-component>
<p>现在 <strong>initWindow</strong> 如下显示：</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-9" bindSpecial='fontSize:14px' :bindCode ='snippet9'></snippet-component>
<p>为了让应用在窗口关闭或出现错误之前都可以运行，我们需要添加 <strong>mainLoop</strong> 函数:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-10" bindSpecial='fontSize:14px' :bindCode ='snippet10'></snippet-component>
<p>代码本身就说明了他的含义。他会一直循环，并且检测事件，直到应用关闭。也是在这个循环里面，我们稍后会调用其他函数渲染每一帧。</p>
<p>一旦窗口关闭，我们需要清理资源并销毁 GLFW，我们这么写 <strong>cleanup</strong> 代码:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-11" bindSpecial='fontSize:14px' :bindCode ='snippet11'></snippet-component>
<p>运行程序，你会发现有一个窗口，标题为 <strong>Vulkan</strong> ，现在我们有了 Vulkan 应用的骨架，试着运行你的第一个 Vulkan 项目吧。
<p></p>

<code-modal>
  <a slot="link">C++ code</a>
  <div slot="header"></div>
  <div slot="body">
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-12" bindSpecial='fontSize:14px' :bindCode ='snippet12'></snippet-component>
  </div>
</code-modal>

            <h2>II.实例化</h2>
    
    <ul class="TableOfContents">
<li>
<p><a href="javascript:void(0)" @click="goAnchor('#page_Creating_an_instance')">创建实例</a></p>
</li>
<li>
<p><a href="javascript:void(0)" @click="goAnchor('#page_Checking_for_extension_support')">检测拓展支持</a></p>
</li>
<li>
<p><a href="javascript:void(0)" @click="goAnchor('#page_Cleaning_up')">清理</a></p>
</li>
</ul>
<h2 id="page_Creating_an_instance">创建实例</h2>
<p>The very first thing you need to do is initialize the Vulkan library by creating
an <em>instance</em>. The instance is the connection between your application and the
Vulkan library and creating it involves specifying some details about your
application to the driver.</p>
<p>Start by adding a <code>createInstance</code> function and add a call to it in the
<code>initVulkan</code> function.</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-13" bindSpecial='fontSize:14px' :bindCode ='snippet13'></snippet-component>
<p>Additionally add a class member to hold the handle to the instance:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-14" bindSpecial='fontSize:14px' :bindCode ='snippet14'></snippet-component>
<p>Now, to create an instance we'll first have to fill in a struct with some
information about our application. This data is technically optional, but it may
provide some useful information to the driver to optimize for our specific
application, for example because it uses a well-known graphics engine with
certain special behavior. This struct is called <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkApplicationInfo.html"><code>VkApplicationInfo</code></a>:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-15" bindSpecial='fontSize:14px' :bindCode ='snippet15'></snippet-component>
<p>As mentioned before, many structs in Vulkan require you to explicitly specify
the type in the <code>sType</code> member. This is also one of the many structs with a
<code>pNext</code> member that can point to extension information in the future. We're
using default initialization here to leave it as <code>nullptr</code>.</p>
<p>A lot of information in Vulkan is passed through structs instead of function
parameters and we'll have to fill in one more struct to provide sufficient
information for creating an instance. This next struct is not optional and tells
the Vulkan driver which global extensions and validation layers we want to use.
Global here means that they apply to the entire program and not a specific
device, which will become clear in the next few chapters.</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-16" bindSpecial='fontSize:14px' :bindCode ='snippet16'></snippet-component>
<p>The first two parameters are straightforward. The next two layers specify the
desired global extensions. As mentioned in the overview chapter, Vulkan is a
platform agnostic API, which means that you need an extension to interface with
the window system. GLFW has a handy built-in function that returns the
extension(s) it needs to do that which we can pass to the struct:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-17" bindSpecial='fontSize:14px' :bindCode ='snippet17'></snippet-component>
<p>The last two members of the struct determine the global validation layers to
enable. We'll talk about these more in-depth in the next chapter, so just leave
these empty for now.</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-18" bindSpecial='fontSize:14px' :bindCode ='snippet18'></snippet-component>
<p>We've now specified everything Vulkan needs to create an instance and we can
finally issue the <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkCreateInstance.html"><code>vkCreateInstance</code></a> call:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-19" bindSpecial='fontSize:14px' :bindCode ='snippet19'></snippet-component>
<p>As you'll see, the general pattern that object creation function parameters in
Vulkan follow is:</p>
<ul>
<li>Pointer to struct with creation info</li>
<li>Pointer to custom allocator callbacks, always <code>nullptr</code> in this tutorial</li>
<li>Pointer to the variable that stores the handle to the new object</li>
</ul>
<p>If everything went well then the handle to the instance was stored in the
<a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkInstance.html"><code>VkInstance</code></a> class member. Nearly all Vulkan functions return a value of type
<a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkResult.html"><code>VkResult</code></a> that is either <code>VK_SUCCESS</code> or an error code. To check if the
instance was created successfully, we don't need to store the result and can
just use a check for the success value instead:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-20" bindSpecial='fontSize:14px' :bindCode ='snippet20'></snippet-component>
<p>Now run the program to make sure that the instance is created successfully.</p>
<h2 id="page_Checking_for_extension_support">检测拓展支持</h2>
<p>If you look at the <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkCreateInstance.html"><code>vkCreateInstance</code></a> documentation then you'll see that one of
the possible error codes is <code>VK_ERROR_EXTENSION_NOT_PRESENT</code>. We could simply
specify the extensions we require and terminate if that error code comes back.
That makes sense for essential extensions like the window system interface, but
what if we want to check for optional functionality?</p>
<p>To retrieve a list of supported extensions before creating an instance, there's
the <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkEnumerateInstanceExtensionProperties.html"><code>vkEnumerateInstanceExtensionProperties</code></a> function. It takes a pointer to a
variable that stores the number of extensions and an array of
<a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkExtensionProperties.html"><code>VkExtensionProperties</code></a> to store details of the extensions. It also takes an
optional first parameter that allows us to filter extensions by a specific
validation layer, which we'll ignore for now.</p>
<p>To allocate an array to hold the extension details we first need to know how
many there are. You can request just the number of extensions by leaving the
latter parameter empty:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-21" bindSpecial='fontSize:14px' :bindCode ='snippet21'></snippet-component>
<p>Now allocate an array to hold the extension details (<code>include &lt;vector&gt;</code>):</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-22" bindSpecial='fontSize:14px' :bindCode ='snippet22'></snippet-component>
<p>Finally we can query the extension details:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-23" bindSpecial='fontSize:14px' :bindCode ='snippet23'></snippet-component>
<p>Each <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkExtensionProperties.html"><code>VkExtensionProperties</code></a> struct contains the name and version of an
extension. We can list them with a simple for loop (<code>\t</code> is a tab for
indentation):</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-24" bindSpecial='fontSize:14px' :bindCode ='snippet24'></snippet-component>
<p>You can add this code to the <code>createInstance</code> function if you'd like to provide
some details about the Vulkan support. As a challenge, try to create a function
that checks if all of the extensions returned by
<code>glfwGetRequiredInstanceExtensions</code> are included in the supported extensions
list.</p>
<h2 id="page_Cleaning_up">清理</h2>
<p>The <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkInstance.html"><code>VkInstance</code></a> should be only destroyed right before the program exits. It can
be destroyed in <code>cleanup</code> with the <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkDestroyInstance.html"><code>vkDestroyInstance</code></a> function:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-25" bindSpecial='fontSize:14px' :bindCode ='snippet25'></snippet-component>
<p>The parameters for the <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkDestroyInstance.html"><code>vkDestroyInstance</code></a> function are straightforward. As
mentioned in the previous chapter, the allocation and deallocation functions
in Vulkan have an optional allocator callback that we'll ignore by passing
<code>nullptr</code> to it. All of the other Vulkan resources that we'll create in the
following chapters should be cleaned up before the instance is destroyed.</p>
<p>Before continuing with the more complex steps after instance creation, it's time
to evaluate our debugging options by checking out <a href="//vulkan-tutorial.com/Drawing_a_triangle/Setup/Validation_layers">validation layers</a>.</p>
<code-modal>
  <a slot="link">C++ code</a>
  <div slot="header"></div>
  <div slot="body">
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-26" bindSpecial='fontSize:14px' :bindCode ='snippet26'></snippet-component>
  </div>
</code-modal>


      </div>
    </div>
  </div>
</template>

<script>
  import SnippetComponent from '@/components/SnippetComponent'
  import MockupComponent from '@/components/MockupComponent'
  import CodeModal from '@/components/CodeModal'

//   import * as THREE from 'three' 
//   var perlin = require('../static/js/vulkan/perlin.js');
//   var TweenMax = require('../static/js/vulkan/TweenMax.min.js');
//   var demo3 = require('../static/js/vulkan/demo3.js');

  export default {
    name: 'vulkan03',
    data: function () {return {
      articleTitle:'5.[译] Vulkan 入门系列 —— 绘制三角形(设置)',
      snippet1:`#include <vulkan/vulkan.h>

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
        std::clog <<"运行成功"<< std::endl;
        uint32_t extensionCount = 0;
        std::cout << extensionCount << " extensions supported" << std::endl;
        app.run();
    } catch (const std::runtime_error& e) {
        std::cerr << e.what() << std::endl;
        return EXIT_FAILURE;
    }

    return EXIT_SUCCESS;
}`,
    snippet2:`#define GLFW_INCLUDE_VULKAN
#include <GLFW/glfw3.h>`,
    snippet3:`void run() {
    initWindow();
    initVulkan();
    mainLoop();
    cleanup();
}

private:
    void initWindow() {}`,
    snippet4:`glfwWindowHint(GLFW_CLIENT_API, GLFW_NO_API);`,
    snippet5:`glfwWindowHint(GLFW_RESIZABLE, GLFW_FALSE);`,
    snippet6:`window = glfwCreateWindow(800, 600, "Vulkan", nullptr, nullptr);`,
    snippet7:`const int WIDTH = 800;
const int HEIGHT = 600;`,
    snippet8:`window = glfwCreateWindow(WIDTH, HEIGHT, "Vulkan", nullptr, nullptr);`,
    snippet9:`void initWindow() {
    glfwInit();

    glfwWindowHint(GLFW_CLIENT_API, GLFW_NO_API);
    glfwWindowHint(GLFW_RESIZABLE, GLFW_FALSE);

    window = glfwCreateWindow(WIDTH, HEIGHT, "Vulkan", nullptr, nullptr);
}`,
    snippet10:`void mainLoop() {
    while (!glfwWindowShouldClose(window)) {
        glfwPollEvents();
    }
}`,
    snippet11:`void cleanup() {
    glfwDestroyWindow(window);

    glfwTerminate();
}`,
    snippet12:`#define GLFW_INCLUDE_VULKAN
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
    snippet13:`void initVulkan() {
    createInstance();
}`,
    snippet14:`private:
VkInstance instance;`,
    snippet15:`VkApplicationInfo appInfo = {};
appInfo.sType = VK_STRUCTURE_TYPE_APPLICATION_INFO;
appInfo.pApplicationName = "Hello Triangle";
appInfo.applicationVersion = VK_MAKE_VERSION(1, 0, 0);
appInfo.pEngineName = "No Engine";
appInfo.engineVersion = VK_MAKE_VERSION(1, 0, 0);
appInfo.apiVersion = VK_API_VERSION_1_0;`,
    snippet16:`VkInstanceCreateInfo createInfo = {};
createInfo.sType = VK_STRUCTURE_TYPE_INSTANCE_CREATE_INFO;
createInfo.pApplicationInfo = &appInfo;`,
    snippet17:`uint32_t glfwExtensionCount = 0;
const char** glfwExtensions;

glfwExtensions = glfwGetRequiredInstanceExtensions(&glfwExtensionCount);

createInfo.enabledExtensionCount = glfwExtensionCount;
createInfo.ppEnabledExtensionNames = glfwExtensions;`,
    snippet18:`createInfo.enabledLayerCount = 0;`,
    snippet19:`VkResult result = vkCreateInstance(&createInfo, nullptr, &instance);`,
    snippet20:`if (vkCreateInstance(&createInfo, nullptr, &instance) != VK_SUCCESS) {
    throw std::runtime_error("failed to create instance!");
}`,
    snippet21:`uint32_t extensionCount = 0;
vkEnumerateInstanceExtensionProperties(nullptr, &extensionCount, nullptr);`,
    snippet22:`std::vector<VkExtensionProperties> extensions(extensionCount);`,
    snippet23:`vkEnumerateInstanceExtensionProperties(nullptr, &extensionCount, extensions.data());`,
    snippet24:`std::cout << "available extensions:" << std::endl;

for (const auto& extension : extensions) {
    std::cout << "\t" << extension.extensionName << std::endl;
}
`,
    snippet25:`void cleanup() {
    vkDestroyInstance(instance, nullptr);

    glfwDestroyWindow(window);

    glfwTerminate();
}`,
    snippet26:`#define GLFW_INCLUDE_VULKAN
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

    VkInstance instance;

    void initWindow() {
        glfwInit();

        glfwWindowHint(GLFW_CLIENT_API, GLFW_NO_API);
        glfwWindowHint(GLFW_RESIZABLE, GLFW_FALSE);

        window = glfwCreateWindow(WIDTH, HEIGHT, "Vulkan", nullptr, nullptr);
    }

    void initVulkan() {
        createInstance();
    }

    void mainLoop() {
        while (!glfwWindowShouldClose(window)) {
            glfwPollEvents();
        }
    }

    void cleanup() {
        vkDestroyInstance(instance, nullptr);

        glfwDestroyWindow(window);

        glfwTerminate();
    }

    void createInstance() {
        VkApplicationInfo appInfo = {};
        appInfo.sType = VK_STRUCTURE_TYPE_APPLICATION_INFO;
        appInfo.pApplicationName = "Hello Triangle";
        appInfo.applicationVersion = VK_MAKE_VERSION(1, 0, 0);
        appInfo.pEngineName = "No Engine";
        appInfo.engineVersion = VK_MAKE_VERSION(1, 0, 0);
        appInfo.apiVersion = VK_API_VERSION_1_0;

        VkInstanceCreateInfo createInfo = {};
        createInfo.sType = VK_STRUCTURE_TYPE_INSTANCE_CREATE_INFO;
        createInfo.pApplicationInfo = &appInfo;

        uint32_t glfwExtensionCount = 0;
        const char** glfwExtensions;
        glfwExtensions = glfwGetRequiredInstanceExtensions(&glfwExtensionCount);

        createInfo.enabledExtensionCount = glfwExtensionCount;
        createInfo.ppEnabledExtensionNames = glfwExtensions;

        createInfo.enabledLayerCount = 0;

        if (vkCreateInstance(&createInfo, nullptr, &instance) != VK_SUCCESS) {
            throw std::runtime_error("failed to create instance!");
        }
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
}`

    }},
    components: {SnippetComponent,MockupComponent,CodeModal},
    methods: {
    },
    computed: {},
    created: function () {},
    mounted:function(){
        
    },
    destroyed:function(){}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.scene {
	position: absolute;
	left: calc(50% - 300px);
}

.scene--full {
	width: 100%;
	height: 100vh;
}

.content__inner {
	grid-area: 1 / 1 / 1 / 1;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	align-content: center;
}


.demo-3 {
	--color-text: #fff;
	/* --color-bg: #A9E7DA; */
	--color-bg: #fff;
	--color-link: #523bdc;
	--color-link-hover: #fff;
	--color-title: #fff;
}

main {
	position: relative;
	width: 100%;
}


.content{
	position: relative;
    display: grid;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin: 0 auto;
    height: 400px;
    overflow: hidden;
	background: #a9e7da;
	min-height: 400px;
}

.content__title {
	font-family: 'Poppins', sans-serif;
	letter-spacing: -0.025em;
	font-size: 7vw;
	color: var(--color-title);
	line-height: 1;
	margin: 0;
	position: relative;
	text-shadow: 0 10px 20px rgba(0,0,0,.2);
}

.content__title::before,
.content__title::after {
	content: '';
	position: absolute;
	width: 100px;
	height: 200px;
	background: url(../static/images/vulkan/dot.png);
	background-size: 25px;
	opacity: 0.4;
}

.content__title::before {
	top: 120%;
	right: 81%;
}

.content__title::after {
	bottom: 120%;
	left: 81%;
}

@media screen and (max-width: 55em) {
	.content__title::before,
	.content__title::after {
		width: 50px;
		height: 100px;
		background-size: 12px;
	}
}
</style>
