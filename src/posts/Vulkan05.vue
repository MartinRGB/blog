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
<p>Unfortunately just enabling the layers doesn't help much, because they currently
have no way to relay the debug messages back to our program. To receive those
messages we have to set up a callback, which requires the <code>VK_EXT_debug_report</code>
extension.</p>
<p>We'll first create a <code>getRequiredExtensions</code> function that will return the
required list of extensions based on whether validation layers are enabled or
not:</p>
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
<p>The extensions specified by GLFW are always required, but the debug report
extension is conditionally added. Note that I've used the
<code>VK_EXT_DEBUG_REPORT_EXTENSION_NAME</code> macro here which is equal to the literal
string "VK_EXT_debug_report". Using this macro lets you avoid typos.</p>
<p>We can now use this function in <code>createInstance</code>:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>auto extensions = getRequiredExtensions();
createInfo.enabledExtensionCount = static_cast&lt;uint32_t>(extensions.size());
createInfo.ppEnabledExtensionNames = extensions.data();</snippet-component>

<p>Run the program to make sure you don't receive a
<code>VK_ERROR_EXTENSION_NOT_PRESENT</code> error. We don't really need to check for the
existence of this extension, because it should be implied by the availability of
the validation layers.</p>
<p>Now let's see what a callback function looks like. Add a new static member
function called <code>debugCallback</code> with the <code>PFN_vkDebugReportCallbackEXT</code>
prototype. The <code>VKAPI_ATTR</code> and <code>VKAPI_CALL</code> ensure that the function has the
right signature for Vulkan to call it.</p>
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

<p>The first parameter specifies the type of message, which can be a combination of
any of the following bit flags:</p>
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
<p>The <code>objType</code> parameter specifies the type of object that is the subject of the
message. For example if <code>obj</code> is a <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkPhysicalDevice.html"><code>VkPhysicalDevice</code></a> then <code>objType</code> would be
<code>VK_DEBUG_REPORT_OBJECT_TYPE_DEVICE_EXT</code>. This works because internally all
Vulkan handles are typedef'd as <code>uint64_t</code>. The <code>msg</code> parameter contains the
pointer to the message itself. Finally, there's a <code>userData</code> parameter to pass
your own data to the callback.</p>
<p>The callback returns a boolean that indicates if the Vulkan call that triggered
the validation layer message should be aborted. If the callback returns true,
then the call is aborted with the <code>VK_ERROR_VALIDATION_FAILED_EXT</code> error. This
is normally only used to test the validation layers themselves, so you should
always return <code>VK_FALSE</code>.</p>
<p>All that remains now is telling Vulkan about the callback function. Perhaps
somewhat surprisingly, even the debug callback in Vulkan is managed with a
handle that needs to be explicitly created and destroyed. Add a class member for
this handle right under <code>instance</code>:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>VkDebugReportCallbackEXT callback;</snippet-component>


<p>Now add a function <code>setupDebugCallback</code> to be called from <code>initVulkan</code> right
after <code>createInstance</code>:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>void initVulkan() {
    createInstance();
    setupDebugCallback();
}

void setupDebugCallback() {
    if (!enableValidationLayers) return;

}</snippet-component>

<p>We'll need to fill in a structure with details about the callback:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>VkDebugReportCallbackCreateInfoEXT createInfo = {};
createInfo.sType = VK_STRUCTURE_TYPE_DEBUG_REPORT_CALLBACK_CREATE_INFO_EXT;
createInfo.flags = VK_DEBUG_REPORT_ERROR_BIT_EXT | VK_DEBUG_REPORT_WARNING_BIT_EXT;
createInfo.pfnCallback = debugCallback;</snippet-component>

<p>The <code>flags</code> field allows you to filter which types of messages you would like to
receive. The <code>pfnCallback</code> field specifies the pointer to the callback function.
You can optionally pass a pointer to the <code>pUserData</code> field which will be passed
along to the callback function via the <code>userData</code> parameter. You could use this
to pass a pointer to the <code>HelloTriangleApplication</code> class, for example.</p>
<p>This struct should be passed to the <code>vkCreateDebugReportCallbackEXT</code> function to
create the <code>VkDebugReportCallbackEXT</code> object. Unfortunately, because this
function is an extension function, it is not automatically loaded. We have to
look up its address ourselves using <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkGetInstanceProcAddr.html"><code>vkGetInstanceProcAddr</code></a>. We're going to
create our own proxy function that handles this in the background. I've added it
right above the <code>HelloTriangleApplication</code> class definition.</p>

<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>VkResult CreateDebugReportCallbackEXT(VkInstance instance, const VkDebugReportCallbackCreateInfoEXT* pCreateInfo, const VkAllocationCallbacks* pAllocator, VkDebugReportCallbackEXT* pCallback) {
    auto func = (PFN_vkCreateDebugReportCallbackEXT) vkGetInstanceProcAddr(instance, &quot;vkCreateDebugReportCallbackEXT&quot;);
    if (func != nullptr) {
        return func(instance, pCreateInfo, pAllocator, pCallback);
    } else {
        return VK_ERROR_EXTENSION_NOT_PRESENT;
    }
}</snippet-component>

<p>The <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkGetInstanceProcAddr.html"><code>vkGetInstanceProcAddr</code></a> function will return <code>nullptr</code> if the function
couldn't be loaded. We can now call this function to create the extension
object if it's available:</p>

<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>if (CreateDebugReportCallbackEXT(instance, &amp;createInfo, nullptr, &amp;callback) != VK_SUCCESS) {
    throw std::runtime_error(&quot;failed to set up debug callback!&quot;);
}</snippet-component>

<p>The second to last parameter is again the optional allocator callback that we
set to <code>nullptr</code>, other than that the parameters are fairly straightforward.
Since the debug callback is specific to our Vulkan instance and its layers, it
needs to be explicitly specified as first argument. You will also see this
pattern with other <em>child</em> objects later on. Let's see if it works... Run the
program and close the window once you're fed up with staring at the blank
window. You'll see that the following message is printed to the command prompt:</p>
<p><img data-action="zoom" src="../static/images/vulkan/05/validation_layer_test.png" alt=""></p>
<p>Oops, it has already spotted a bug in our program! The
<code>VkDebugReportCallbackEXT</code> object needs to be cleaned up with a call to
<code>vkDestroyDebugReportCallbackEXT</code>. Similarly to <code>vkCreateDebugReportCallbackEXT</code>
the function needs to be explicitly loaded. Create another proxy function right
below <code>CreateDebugReportCallbackEXT</code>:</p>

<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>void DestroyDebugReportCallbackEXT(VkInstance instance, VkDebugReportCallbackEXT callback, const VkAllocationCallbacks* pAllocator) {
    auto func = (PFN_vkDestroyDebugReportCallbackEXT) vkGetInstanceProcAddr(instance, &quot;vkDestroyDebugReportCallbackEXT&quot;);
    if (func != nullptr) {
        func(instance, callback, pAllocator);
    }
}</snippet-component>

<p>Make sure that this function is either a static class function or a function
outside the class. We can then call it in the <code>cleanup</code> function:</p>

<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>void cleanup() {
    DestroyDebugReportCallbackEXT(instance, callback, nullptr);
    vkDestroyInstance(instance, nullptr);

    glfwDestroyWindow(window);

    glfwTerminate();
}</snippet-component>

<p>When you run the program again you'll see that the error message has
disappeared. If you want to see which call triggered a message, you can add a
breakpoint to the message callback and look at the stack trace.</p>
<h2 id="page_Configuration">配置</h2>
<p>There are a lot more settings for the behavior of validation layers than just
the flags specified in the <code>VkDebugReportCallbackCreateInfoEXT</code> struct. Browse
to the Vulkan SDK and go to the <code>Config</code> directory. There you will find a
<code>vk_layer_settings.txt</code> file that explains how to configure the layers.</p>
<p>To configure the layer settings for your own application, copy the file to the
<code>Debug</code> and <code>Release</code> directories of your project and follow the instructions to
set the desired behavior. However, for the remainder of this tutorial I'll
assume that you're using the default settings.</p>
<p>Throughout this tutorial I'll be making a couple of intentional mistakes to show
you how helpful the validation layers are with catching them and to teach you
how important it is to know exactly what you're doing with Vulkan. Now it's time
to look at <a href="//vulkan-tutorial.com/Drawing_a_triangle/Setup/Physical_devices_and_queue_families">Vulkan devices in the system</a>.</p>
<code-modal>
  <a slot="link">C++ code</a>
  <div slot="header"></div>
  <div slot="body">
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++'>#define GLFW_INCLUDE_VULKAN
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
