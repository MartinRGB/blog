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

      <toc :tocData='contentData'></toc>

      <div id="article-view" class="article-view">
            <h1 id="toc_0">{{articleTitle}}</h1>
            <strong><p>原文来自 <a href="https://vulkan-tutorial.com/Drawing_a_triangle/Setup/Validation_layers" target="_blank">Vulkan-Tutorial.com</a>，初次翻译开发类文章，恳请指正。</p></strong>

<!-- <h2>验证层</h2>

<ul class="TableOfContents">
<li>
<p><a href="javascript:void(0)" @click="goAnchor('#page_What_are_validation_layers')">什么是验证层</a></p>
</li>
<li>
<p><a href="javascript:void(0)" @click="goAnchor('#page_Using_validation_layers')">使用验证层</a></p>
</li>
<li>
<p><a href="javascript:void(0)" @click="goAnchor('#page_Message_callback')">信息回调</a></p>
</li>
<li>
<p><a href="javascript:void(0)" @click="goAnchor('#page_Configuration')">配置</a></p>
</li>
</ul> -->
<h2 id="page_What_are_validation_layers">什么是验证层</h2>
<p>Vulkan API 的设计理念是最小化驱动开销，设计声明里面也提到过默认错误检测的功能有限。因此，即便是一些很简单参数设置错误或者传入空指针都会引起表意不明，导致崩溃或未知错误。因为 Vulkan 要求你把所操作的一切都清晰表述，因此在很多地方你会犯一些小错，比如使用 GPU 新功能，比如在创建时请求逻辑设备。</p>
<p>尽管错误不容易检测，但也没必要在 API 里面加入检测功能。Vulkan 引进了一套更优雅的错误检测系统 <em><strong>Validation Layers</strong></em>。验证层是可选组件，它能在 Vulkan 函数调用中做一个<tool-tip tips='其实就是设计模式里面的观察者模式。
把需要处理的事件绑定到一个处理方法，然后这个方法就自动触发处理。'><p>钩子</p></tool-tip>，来执行一些可选操作。一般验证层的操作有：</p>
<ul>



<li>比较参数数值和定义，来检测是否误用。</li>
<li>跟踪对象的创建和销毁来检测资源泄漏。</li>
<li>根据线程调用来源来检测线程安全。</li>
<li>记录并输出每个调用及其参数。</li>
<li>记录 Vulkan 调用以便分析和重现</li>
</ul>
<p>不考虑平台的验证层函数案例如下：</p>



<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>VkResult vkCreateInstance(
    const VkInstanceCreateInfo* pCreateInfo,
    const VkAllocationCallbacks* pAllocator,
    VkInstance* instance) {

    if (pCreateInfo == nullptr || instance == nullptr) {
        log("Null pointer passed to required parameter!");
        return VK_ERROR_INITIALIZATION_FAILED;
    }

    return real_vkCreateInstance(pCreateInfo, pAllocator, instance);
}</snippet-component>

<p>这些验证层可以置入到你想要 debug 的所有功能中。你可以在 debug build 中开启验证层，在 release build 中关闭，非常棒！</p>
<p>Vulkan 不包含任何内置的验证层，但是 LunarG Vulkan
SDK 提供了一系列检测错误的验证层。而且完全<a href="https://github.com/LunarG/VulkanTools/tree/master/layers">开源</a>,
你可以查看这些验证层的功能。使用验证层是避免错误操作，避免崩溃的最佳方式。</p>
<p>只有在安装到系统后，才能使用验证层。例如，在 Vulkan SDK 安装后，LunarG 提供的验证层仅适用于 PC。</p>
<p>Vulkan 中有两种验证层类型：实例验证层和设备细节验证层。实例验证层仅仅检测 Vulkan 全局对象的调用，设备细节验证层仅仅检测 GPU 细节的调用。设备验证层目前被启用久了，意味着 VUlkan 调用目前使用实例验证层。说明文档中依然推荐开启设备级别的验证层以便检测兼容性，这需要一些程序实现。后面我们也会定义逻辑设备级别的实例验证层。

<h2 id="page_Using_validation_layers">使用验证层</h2>
<p>这个环节中，我们将使用 Vulkan SDK 中不考虑平台的验证层。跟拓展一样，验证层需要通过选择正确的验证层名称来开启。但 SDK 提供了便利，你只需要请求 <strong>VK_LAYER_LUNARG_standard_validation</strong> 这一验证层，便会开启一系列验证，而无序一个一个手写开启。</p>
<p>我们首先在程序中加入两个配置变量来开启验证层，也可以通过他们关闭。我选择了最基础的验证层，无论程序是否被编译进 debug 模式。<tool-tip tips="NDEBUG宏是Standard C中定义的宏，专门用来控制assert()的行为。如果定义了这个宏，则assert不会起作用。"><p>NDEBds</p></tool-tip>宏是 C++ 标准之一，代表 "not debug".</p>

<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>const int WIDTH = 800;
const int HEIGHT = 600;

const std::vector&lt;const char*> validationLayers = {
    "VK_LAYER_LUNARG_standard_validation"
};

#ifdef NDEBUG
    const bool enableValidationLayers = false;
#else
    const bool enableValidationLayers = true;
#endif</snippet-component>

<p>我们添加一个新函数 <strong>checkValidationLayerSupport</strong> 来检查所有请求的验证层是否可用。首先用 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkEnumerateInstanceLayerProperties.html"><strong>vkEnumerateInstanceLayerProperties</strong></a> 函数来遍历所有可用的拓展。 它的作用和前面实例化章节中 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkEnumerateInstanceExtensionProperties.html"><strong>vkEnumerateInstanceExtensionProperties</strong></a> 的作用一致。</p>

<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>bool checkValidationLayerSupport() {
    uint32_t layerCount;
    vkEnumerateInstanceLayerProperties(&layerCount, nullptr);

    std::vector&lt;VkLayerProperties> availableLayers(layerCount);
    vkEnumerateInstanceLayerProperties(&layerCount, availableLayers.data());

    return false;
}</snippet-component>

<p>下一步，检测 <strong>validationLayers</strong> 中所有的验证层是否存在于
<strong>availableLayers</strong> 的列表中。使用 <strong>strcmp</strong> 需要 include <strong>&lt;cstring&gt;</strong></p>

<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>for (const char* layerName : validationLayers) {
    bool layerFound = false;

    for (const auto& layerProperties : availableLayers) {
        if (strcmp(layerName, layerProperties.layerName) == 0) {
            layerFound = true;
            break;
        }
    }

    if (!layerFound) {
        return false;
    }
}

return true;</snippet-component>

<p>现在我们在 <strong>createInstance</strong> 使用这一函数:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>void createInstance() {
    if (enableValidationLayers &amp;&amp; !checkValidationLayerSupport()) {
        throw std::runtime_error(&quot;validation layers requested, but not available!&quot;);
    }

    ...
}</snippet-component>

<p>现在在 debug 模式下运行程序，确保无错误。如果发生错误，那么检查 Vulkan SDK 安装情况。如果不支持或仅仅少量支持验证层，那你可能需要处理 <a href="https://vulkan.lunarg.com/app/issues/578e8c8d5698c020d71580fc">这个问题</a>
(需要注册 LunarG 账号查看)。在这一页面中找到问题解决方案。</p>
<p>最后，调整 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkInstanceCreateInfo.html"><strong>VkInstanceCreateInfo</strong></a> 结构体的实例化，以便包含开启的验证层的名字:</p>

<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>if (enableValidationLayers) {
    createInfo.enabledLayerCount = static_cast&lt;uint32_t>(validationLayers.size());
    createInfo.ppEnabledLayerNames = validationLayers.data();
} else {
    createInfo.enabledLayerCount = 0;
}</snippet-component>

<p>如果检测无误，那么 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkCreateInstance.html"><strong>vkCreateInstance</strong></a> 便不会返回 <strong>VK_ERROR_LAYER_NOT_PRESENT</strong>错误，但还是要运行一下来保证无误。</p>
<h2 id="page_Message_callback">信息回调</h2>
<p>然而仅开启验证层并没有什么用，因为我们目前仅仅是开启了它，而它并没有接替我们程序目前的报错信息。为了接收验证层的信息，我们需要设置一个回调，需要<strong>VK_EXT_debug_report</strong> 这个拓展。</p>
<p>我们首先创建一个 <code>getRequiredExtensions</code> 函数，它能根据验证层的开启与否，返送需要的拓展列表:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>std::vector&lt;const char*> getRequiredExtensions() {
    std::vector&lt;const char*> extensions;

    uint32_t glfwExtensionCount = 0;
    const char** glfwExtensions;
    glfwExtensions = glfwGetRequiredInstanceExtensions(&amp;glfwExtensionCount);

    for (uint32_t i = 0; i &lt; glfwExtensionCount; i++) {
        extensions.push_back(glfwExtensions[i]);
    }

    if (enableValidationLayers) {
        extensions.push_back(VK_EXT_DEBUG_REPORT_EXTENSION_NAME);
    }

    return extensions;
}</snippet-component>
<p>GLFW 规定的拓展总会用到，通常还会添加 debug 报告拓展。注意这里我使用了 <strong>VK_EXT_DEBUG_REPORT_EXTENSION_NAME</strong> 宏，它等于字面意义上的字符串 "VK_EXT_debug_report"。使用宏可以少打字。</p>
<p>现在我们可以在 <strong>createInstance</strong> 中使用这个函数:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>auto extensions = getRequiredExtensions();
createInfo.enabledExtensionCount = static_cast&lt;uint32_t>(extensions.size());
createInfo.ppEnabledExtensionNames = extensions.data();</snippet-component>

<p>运行程序，确保没有收到 <strong>VK_ERROR_EXTENSION_NOT_PRESENT</strong> 错误。因为验证层的存在，所以我们不需要检测这个拓展是否存在。</p>
<p>现在我们来看一下这个回调函数。利用 <strong>PFN_vkDebugReportCallbackEXT</strong> 原型，添加一个静态成员函数叫做  <strong>debugCallback</strong>。 <strong>VKAPI_ATTR</strong> 和 <strong>VKAPI_CALL</strong> 确保函数签名正确，Vulakn 便可以调用。</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>static VKAPI_ATTR VkBool32 VKAPI_CALL debugCallback(
    VkDebugReportFlagsEXT flags,
    VkDebugReportObjectTypeEXT objType,
    uint64_t obj,
    size_t location,
    int32_t code,
    const char* layerPrefix,
    const char* msg,
    void* userData) {

    std::cerr &lt;&lt; &quot;validation layer: &quot; &lt;&lt; msg &lt;&lt; std::endl;

    return VK_FALSE;
};</snippet-component>

<p>第一个参数定义了信息的类型，信息类型可以是以下几种:</p>
<ul>
<li>
<code>VK_DEBUG_REPORT_INFORMATION_BIT_EXT</code>
</li>
<li>
<code>VK_DEBUG_REPORT_WARNING_BIT_EXT</code>
</li>
<li>
<code>VK_DEBUG_REPORT_PERFORMANCE_WARNING_BIT_EXT</code>
</li>
<li>
<code>VK_DEBUG_REPORT_ERROR_BIT_EXT</code>
</li>
<li>
<code>VK_DEBUG_REPORT_DEBUG_BIT_EXT</code>
</li>
</ul>
<p> <strong>objType</strong> 向信息指定了对象的类型。例如，如果 <strong>obj</strong> 是一种 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkPhysicalDevice.html"><strong>VkPhysicalDevice</strong></a>，那么 <strong>objType</strong> 将会是
<strong>VK_DEBUG_REPORT_OBJECT_TYPE_DEVICE_EXT</strong>。起效的原因是，在 Vulkan 内部，所有的句柄都是定义类型为 <strong>uint64_t</strong>。<strong>msg</strong> 参数包含了指向信息本身的指针。最后，<strong>userData</strong> 参数将你自己的数据传递到回调中。</p>
<p>回调函数返回一个布尔值，来决定 Vulkan 调用出发的验证层信息是否该被忽略。如果回调返送 true，那么回调中止，出现 <strong>VK_ERROR_VALIDATION_FAILED_EXT</strong> 错误。这通常仅用来检测验证层本身，因为你应该永远返送 <strong>VK_FALSE</strong>。</p>
<p>上述代码描述了回调函数，但令人吃惊的是，Vulkan 中即便是 debug 回调，也由一个句柄控制，需要清晰的创建和销毁。在<strong>instance</strong> 下面，给这个句柄添加一个类成员:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>VkDebugReportCallbackEXT callback;</snippet-component>


<p>现在添加一个 <strong>setupDebugCallback</strong> 函数，从而在 <strong>initVulkan</strong> 中，在 <strong>createInstance</strong>后调用:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>void initVulkan() {
    createInstance();
    setupDebugCallback();
}

void setupDebugCallback() {
    if (!enableValidationLayers) return;

}</snippet-component>

<p>我们需要填写一个结构体，来描述这个回调:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>VkDebugReportCallbackCreateInfoEXT createInfo = {};
createInfo.sType = VK_STRUCTURE_TYPE_DEBUG_REPORT_CALLBACK_CREATE_INFO_EXT;
createInfo.flags = VK_DEBUG_REPORT_ERROR_BIT_EXT | VK_DEBUG_REPORT_WARNING_BIT_EXT;
createInfo.pfnCallback = debugCallback;</snippet-component>

<p><strong>flags</strong> 那行让你可以过滤接收到的信息。 <strong>pfnCallback</strong> 那行定义了指向回调函数的指针。还可以可选的传一个指向  <strong>pUserData</strong> 的指针，通过 <strong>userData</strong>,也会同样的传递到回调函数中。例如，你可以使用这个方法传一个指针到 <strong>HelloTriangleApplication</strong> 类中。</p>
<p>这个结构体应该被传递到 <strong>vkCreateDebugReportCallbackEXT</strong> 函数中，来创建 <strong>VkDebugReportCallbackEXT</strong> 对象。🙅不幸的是，因为这个函数是一个拓展函数，无法自动加载，因此我们需要自己查找它的地址，通过使用 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkGetInstanceProcAddr.html"><strong>vkGetInstanceProcAddr</strong></a>。我们将创造我们自己的后台处理代理函数，我将其添加到 <strong>HelloTriangleApplication</strong> 类的定义的上方。</p>

<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>VkResult CreateDebugReportCallbackEXT(VkInstance instance, const VkDebugReportCallbackCreateInfoEXT* pCreateInfo, const VkAllocationCallbacks* pAllocator, VkDebugReportCallbackEXT* pCallback) {
    auto func = (PFN_vkCreateDebugReportCallbackEXT) vkGetInstanceProcAddr(instance, &quot;vkCreateDebugReportCallbackEXT&quot;);
    if (func != nullptr) {
        return func(instance, pCreateInfo, pAllocator, pCallback);
    } else {
        return VK_ERROR_EXTENSION_NOT_PRESENT;
    }
}</snippet-component>

<p>如果函数无法加载，那么 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkGetInstanceProcAddr.html"><strong>vkGetInstanceProcAddr</strong></a> 函数将返送 <strong>nullptr</strong>。我们现在可以调用这个函数，来创建可用的拓展对象:</p>

<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>if (CreateDebugReportCallbackEXT(instance, &amp;createInfo, nullptr, &amp;callback) != VK_SUCCESS) {
    throw std::runtime_error(&quot;failed to set up debug callback!&quot;);
}</snippet-component>

<p>倒数第二个参数，仍旧是可选的分配器回调，我们设置为 <strong>nullptr</strong>。既然 debug 回调是专门为 Vulkan 实例和验证层定制的，它需要清晰定义第一个参数。这种设计模式在其他 <em>子</em> 对象中也存在，我们来看看是否有效，运行程序，迅速关掉白色窗口，你会看到一闪而过的如下信息:</p>
<p><img data-action="zoom" src="../static/images/vulkan/05/validation_layer_test.png" alt=""></p>
<p>靠，这么快我们的程序就有 bug 了！<strong>VkDebugReportCallbackEXT</strong> 对象需要使用 <strong>vkDestroyDebugReportCallbackEXT</strong>来清理。跟 <strong>vkCreateDebugReportCallbackEXT</strong> 类似，这个函数需要清晰描述一切。创建一个代理函数，放在 <strong>CreateDebugReportCallbackEXT</strong>下方:</p>

<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>void DestroyDebugReportCallbackEXT(VkInstance instance, VkDebugReportCallbackEXT callback, const VkAllocationCallbacks* pAllocator) {
    auto func = (PFN_vkDestroyDebugReportCallbackEXT) vkGetInstanceProcAddr(instance, &quot;vkDestroyDebugReportCallbackEXT&quot;);
    if (func != nullptr) {
        func(instance, callback, pAllocator);
    }
}</snippet-component>

<p>却好这个函数既不是静态类函数，也不是类外面的函数，我们可以在 <strong>cleanup</strong> 函数中调用:</p>

<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>void cleanup() {
    DestroyDebugReportCallbackEXT(instance, callback, nullptr);
    vkDestroyInstance(instance, nullptr);

    glfwDestroyWindow(window);

    glfwTerminate();
}</snippet-component>

<p>当你再次运行这个程序，你会发现错误消失了，如果你想要看哪个调用触发了信息，你可以在信息回调中添加断点，然后查看堆叠追踪。</p>
<h2 id="page_Configuration">配置</h2>
<p>除了 <strong>VkDebugReportCallbackCreateInfoEXT</strong> 结构体中的那些 flag，验证层还有更多的设置和操作。可以浏览 Vulkan 的 SDK，去查看 <strong>Config</strong> 目录，然后找到 <strong>vk_layer_settings.txt</strong> ，这个文件讲述了应该如何配置验证层。</p>
<p>为了配置你自己应用的验证层，可以拷贝 To configure the layer settings for your own application, copy the file to the
<strong>Debug</strong> 和 <strong>Release</strong> 目录中的这一文件，然后根据指示进行配置。但是下面的教程中，我将假设你使用默认设置。</p>
<p>这个教程中，我故意翻了一些错误来展示验证层的作用，并告诉了你“在使用 Vulkan 过程中，必须清晰明确的知道你的每一行代码的“重要性。现在可以进行下一章  <a href="//vulkan-tutorial.com/Drawing_a_triangle/Setup/Physical_devices_and_queue_families">Vulkan devices in the system</a> 了。</p>
<code-modal>
  <a slot="link">C++ code</a>
  <div slot="header"></div>
  <div slot="body">
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' class="disable-select">#define GLFW_INCLUDE_VULKAN
#include &lt;GLFW/glfw3.h>

#include &lt;iostream>
#include &lt;stdexcept>
#include &lt;vector>
#include &lt;cstring>

const int WIDTH = 800;
const int HEIGHT = 600;

const std::vector&lt;const char*> validationLayers = {
    "VK_LAYER_LUNARG_standard_validation"
};

#ifdef NDEBUG
const bool enableValidationLayers = false;
#else
const bool enableValidationLayers = true;
#endif

VkResult CreateDebugReportCallbackEXT(VkInstance instance, const VkDebugReportCallbackCreateInfoEXT* pCreateInfo, const VkAllocationCallbacks* pAllocator, VkDebugReportCallbackEXT* pCallback) {
    auto func = (PFN_vkCreateDebugReportCallbackEXT) vkGetInstanceProcAddr(instance, "vkCreateDebugReportCallbackEXT");
    if (func != nullptr) {
        return func(instance, pCreateInfo, pAllocator, pCallback);
    } else {
        return VK_ERROR_EXTENSION_NOT_PRESENT;
    }
}

void DestroyDebugReportCallbackEXT(VkInstance instance, VkDebugReportCallbackEXT callback, const VkAllocationCallbacks* pAllocator) {
    auto func = (PFN_vkDestroyDebugReportCallbackEXT) vkGetInstanceProcAddr(instance, "vkDestroyDebugReportCallbackEXT");
    if (func != nullptr) {
        func(instance, callback, pAllocator);
    }
}

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
    VkDebugReportCallbackEXT callback;

    void initWindow() {
        glfwInit();

        glfwWindowHint(GLFW_CLIENT_API, GLFW_NO_API);
        glfwWindowHint(GLFW_RESIZABLE, GLFW_FALSE);

        window = glfwCreateWindow(WIDTH, HEIGHT, "Vulkan", nullptr, nullptr);
    }

    void initVulkan() {
        createInstance();
        setupDebugCallback();
    }

    void mainLoop() {
        while (!glfwWindowShouldClose(window)) {
            glfwPollEvents();
        }
    }

    void cleanup() {
        DestroyDebugReportCallbackEXT(instance, callback, nullptr);
        vkDestroyInstance(instance, nullptr);

        glfwDestroyWindow(window);

        glfwTerminate();
    }

    void createInstance() {
        if (enableValidationLayers && !checkValidationLayerSupport()) {
            throw std::runtime_error("validation layers requested, but not available!");
        }

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

        auto extensions = getRequiredExtensions();
        createInfo.enabledExtensionCount = static_cast&lt;uint32_t>(extensions.size());
        createInfo.ppEnabledExtensionNames = extensions.data();

        if (enableValidationLayers) {
            createInfo.enabledLayerCount = static_cast&lt;uint32_t>(validationLayers.size());
            createInfo.ppEnabledLayerNames = validationLayers.data();
        } else {
            createInfo.enabledLayerCount = 0;
        }

        if (vkCreateInstance(&createInfo, nullptr, &instance) != VK_SUCCESS) {
            throw std::runtime_error("failed to create instance!");
        }
    }

    void setupDebugCallback() {
        if (!enableValidationLayers) return;

        VkDebugReportCallbackCreateInfoEXT createInfo = {};
        createInfo.sType = VK_STRUCTURE_TYPE_DEBUG_REPORT_CALLBACK_CREATE_INFO_EXT;
        createInfo.flags = VK_DEBUG_REPORT_ERROR_BIT_EXT | VK_DEBUG_REPORT_WARNING_BIT_EXT;
        createInfo.pfnCallback = debugCallback;

        if (CreateDebugReportCallbackEXT(instance, &createInfo, nullptr, &callback) != VK_SUCCESS) {
            throw std::runtime_error("failed to set up debug callback!");
        }
    }

    std::vector&lt;const char*> getRequiredExtensions() {
        std::vector&lt;const char*> extensions;

        uint32_t glfwExtensionCount = 0;
        const char** glfwExtensions;
        glfwExtensions = glfwGetRequiredInstanceExtensions(&glfwExtensionCount);

        for (uint32_t i = 0; i &lt; glfwExtensionCount; i++) {
            extensions.push_back(glfwExtensions[i]);
        }

        if (enableValidationLayers) {
            extensions.push_back(VK_EXT_DEBUG_REPORT_EXTENSION_NAME);
        }

        return extensions;
    }

    bool checkValidationLayerSupport() {
        uint32_t layerCount;
        vkEnumerateInstanceLayerProperties(&layerCount, nullptr);

        std::vector&lt;VkLayerProperties> availableLayers(layerCount);
        vkEnumerateInstanceLayerProperties(&layerCount, availableLayers.data());

        for (const char* layerName : validationLayers) {
            bool layerFound = false;

            for (const auto& layerProperties : availableLayers) {
                if (strcmp(layerName, layerProperties.layerName) == 0) {
                    layerFound = true;
                    break;
                }
            }

            if (!layerFound) {
                return false;
            }
        }

        return true;
    }

    static VKAPI_ATTR VkBool32 VKAPI_CALL debugCallback(VkDebugReportFlagsEXT flags, VkDebugReportObjectTypeEXT objType, uint64_t obj, size_t location, int32_t code, const char* layerPrefix, const char* msg, void* userData) {
        std::cerr &lt;&lt; "validation layer: " &lt;&lt; msg &lt;&lt; std::endl;

        return VK_FALSE;
    }
};

int main() {
    HelloTriangleApplication app;

    try {
        app.run();
    } catch (const std::runtime_error& e) {
        std::cerr &lt;&lt; e.what() &lt;&lt; std::endl;
        return EXIT_FAILURE;
    }

    return EXIT_SUCCESS;
}</snippet-component>
  </div>
</code-modal>



      </div>
    </div>
  </div>
</template>

<script>
  import SnippetComponent from '@/components/SnippetComponent'
  import CodeModal from '@/components/CodeModal'
  import ToolTip from '@/components/ToolTip'
  import Toc from '@/components/Toc'

  export default {
    name: 'vulkan05',
    data: function () {return {
      articleTitle:'7.[译] Vulkan 入门系列 —— 绘制三角形 | 设置 | 验证层',
      contentData:{
          title:'Vulkan 验证层',
          list:{
            什么是验证层: '#page_What_are_validation_layers',
            使用验证层: '#page_Using_validation_layers',
            信息回调: '#page_Message_callback',
            配置:'#page_Configuration'
          }
      }

    }},
    components: {SnippetComponent,CodeModal,ToolTip,Toc},
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
/* .float-toc{
    box-shadow: 0 4px 16px 0 rgba(0,0,0,0.08), 0 1px 4px 0 rgba(0,0,0,0.12);
    border-radius: 6px;
    display: inline-block;
    padding-left: 20px;
    padding-right: 20px;
    min-width: 140px;
    position: fixed;
    left: 40px;
    bottom: 40px;
    background: white;
    overflow: hidden;
}


.toc-left-bg {
    width: 100%;
    background: #f1f1f1;
    height: 1px;
    top: 50px;
    position: relative;
}

.toc-title{
    text-align: left;
    margin-left: 1px;
    font-weight: 500;
    font-family: "Avenir", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Helvetica, Arial, sans-serif;
}


.float-toc ul{
    padding-left: 24px;
}

.float-toc li {
    counter-increment: li;
    list-style-type:none;
}

.float-toc li p {
    margin: 0px;
    margin-top: 8px;
}

.float-toc li a {
    font-size: 12px;
    color:#333;
}


.float-toc li::before {
  content: counter(li, decimal-leading-zero);
  color:#333;
  display: inline-block; 
  width: 1em;
  margin-left: -1.3rem;
  position: absolute;
  text-align: right; 
  direction: rtl;
  font-size: 10px;
  margin-top: 3px;
  font-family: "Avenir", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Helvetica, Arial, sans-serif;
} */

</style>
