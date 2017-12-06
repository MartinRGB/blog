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

    <toc :tocData='contentData'></toc>
    <div id="center-container" class="center-container">
      <div id="article-view" class="article-view">
            <h1 id="toc_0">{{articleTitle}}</h1>
            <strong><p>原文来自 <a href="https://vulkan-tutorial.com/Drawing_a_triangle/Setup/Instance" target="_blank">Vulkan-Tutorial.com</a>，初次翻译开发类文章，恳请指正。</p></strong>

            <h2>实例化</h2>
    
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
<p>首先要通过创建 <strong>实例化</strong> 来初始化 Vulkan 库。实例能够实现 Vulkan 库和应用的链接，通过实例化，能告知驱动你的应用所包含的自定义图形细节。</p>
<p>在 <strong>initVulkan</strong> 函数中，调用 <strong>createInstance</strong> 函数：</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-13" bindSpecial='fontSize:14px' :bindCode ='snippet13'></snippet-component>
<p>然后添加一个类成员来保留实例的句柄：</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-14" bindSpecial='fontSize:14px' :bindCode ='snippet14'></snippet-component>
<p>现在，我们需要填写结构体来描述应用信息，以便创建实例。尽管信息数据可选填，但是填写可以给提供驱动一些有用信息以便优化，比如调用一些知名引擎的特定操作。我们填写的这个结构体叫  <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkApplicationInfo.html"><strong>VkApplicationInfo</strong></a>，我们在 createInstance 函数中填写:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-15" bindSpecial='fontSize:14px' :bindCode ='snippet15'></snippet-component>
<p>前面提到过，Vulkan 中的很多结构体都需要在 <strong>sType</strong> 成员变量中清晰描述。同时很多结构带有<strong> pNext</strong> 成员变量可以指向拓展功能。这里我们就默认设置为 <strong>nullptr</strong> 来进行初始化。</p>
<p>Vulkan 中的很多信息通过结构体传输，而不是通过函数参数，我们还需要再填写一个结构体提供足够的信息来创建实例。这个结构体必填，它告诉了 Vulkan 驱动，我们需要使用哪些全局拓展和验证层。全局意味着这个结构体被应用到整个程序，而不是某个特定设备，我们之后的章节将讲述。</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-16" bindSpecial='fontSize:14px' :bindCode ='snippet16'></snippet-component>
<p>前面这两个参数非常明了易懂。下面的两个图层指定了需要的全局拓展。综述章节提到过，Vulkan API 不关心平台，这意味着你需要一个拓展来与系统连接。GLFW 内置了非常使用的函数，能够返回我们需要的拓展，我们可以把 GLFW 的返回信息传递给结构体：</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-17" bindSpecial='fontSize:14px' :bindCode ='snippet17'></snippet-component>
<p>结构体的后面这俩成员变量确定了要开启的验证层。稍后我们会详细讲解，目前先填写为空。</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-18" bindSpecial='fontSize:14px' :bindCode ='snippet18'></snippet-component>
<p>现在我们完成了 Vulkan 实例化需要的一切，现在我们可以执行 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkCreateInstance.html"><strong>vkCreateInstance</strong></a> 调用:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-19" bindSpecial='fontSize:14px' :bindCode ='snippet19'></snippet-component>
<p>在 Vulkan 中，创建对象的函数参数一般模式是：</p>
<ul>
<li>将构建信息指向结构体</li>
<li>指向自定义回调，本教程中一般填写 <strong>nullptr</strong></li>
<li>指向存储新对象句柄的变量。</li>
</ul>
<p>如果一切正常，那么实例的句柄会保存到 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkInstance.html"><strong>VkInstance</strong></a> 类成员中。几乎所有的 Vulkan 函数都会返回类型为 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkResult.html"><strong>VkResult</strong></a> 的值，要么是 <strong>VK_SUCCESS</strong> ，要么是错误代码。为了检测实例创建的结果，我们将使用以下的方法，不用存储结果，只是检测：</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-20" bindSpecial='fontSize:14px' :bindCode ='snippet20'></snippet-component>
<p>现在运行程序，确保实例创建成功，查看结果：</p>
<img data-action="zoom" src="../static/images/vulkan/04/04_mac_create_instance.png" alt=""></img>



<h2 id="page_Checking_for_extension_support">检测拓展支持</h2>
<p>如果你看了 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkCreateInstance.html"><strong>vkCreateInstance</strong></a> 的文档，你会发现，某个可能的错误代码是 <strong>VK_ERROR_EXTENSION_NOT_PRESENT</strong>。我们只需要简单的定义所需的拓展，当返回错误代码的时候终止应用。这对于窗口系统的对接来说非常游泳，但是如果我们还想检查其他的错误怎么办呢？</p>
<p>为了在创建实例之前获得支持拓展的列表，我们可以使用 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkEnumerateInstanceExtensionProperties.html"><strong>vkEnumerateInstanceExtensionProperties</strong></a> 函数。它将指针指向存储拓展数目的变量和储存拓展细节的 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkExtensionProperties.html"><strong>VkExtensionProperties</strong></a> 数组。它还提供了一个可选参数（第一个参数），通过指定验证层来过滤拓展，这里我们暂时先忽略。</p>
<p>在分配数组去保存拓展信息之前，我们首先要知道有多少个数组。可以通过填空最后一个参数来请求得到拓展个数:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-21" bindSpecial='fontSize:14px' :bindCode ='snippet21'></snippet-component>
<p>现在来分配数组，保存拓展信息 (<strong>include &lt;vector&gt;</strong>):</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-22" bindSpecial='fontSize:14px' :bindCode ='snippet22'></snippet-component>
<p>最终我们可以查询得到拓展细节：</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-23" bindSpecial='fontSize:14px' :bindCode ='snippet23'></snippet-component>
<p>每个 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkExtensionProperties.html"><strong>VkExtensionProperties</strong></a> 结构体包含了拓展的名称和版本号。我们可以通过简单的 for loop 来列举显示他们(<strong>\t</strong> 是缩进的标签):</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-24" bindSpecial='fontSize:14px' :bindCode ='snippet24'></snippet-component>
<p>如果你想为 Vulkan 支持提供更多的细节，你可以把上述代码添加到 <strong>createInstance</strong> 中。作为挑战，你可以试着写一个函数，来检查 <strong>glfwGetRequiredInstanceExtensions</strong> 返回的拓展是否在支持列表中。</p>
<p>结果如下:</p>
<img data-action="zoom" src="../static/images/vulkan/04/04_mac_check_extensions.png" alt=""></img>
<h2 id="page_Cleaning_up">清理</h2>
<p>在程序退出之前，应该销毁 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkInstance.html"><strong>VkInstance</strong></a> ，可以在 <strong>cleanup</strong> 中调用 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkDestroyInstance.html"><strong>vkDestroyInstance</strong></a> 函数:</p>
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-25" bindSpecial='fontSize:14px' :bindCode ='snippet25'></snippet-component>

<p>The parameters for the <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkDestroyInstance.html"><strong>vkDestroyInstance</strong></a> 函数的参数非常明了。前面提到过，Vulkan 中的分配和解除分配函数有可选分配器回调，这里我们暂时忽略，填写 <strong>nullptr</strong>。后面章节中，所有的创建的 Vulkan 资源在销毁前都应该清理。</p>
<p>实例创建完成后，我们要研究一下验证层了。</p>
<code-modal>
  <a slot="link">C++ code</a>
  <div slot="header"></div>
  <div slot="body">
<snippet-component v-if="$route.meta.keepAlive" lan='cpp c++' id="CodeSnippet-26" bindSpecial='fontSize:14px' :bindCode ='snippet26'></snippet-component>
  </div>
</code-modal>
<a href="https://github.com/MartinRGB/100ProjectsVulkan/tree/master/2.Instance(Xcode)">XCode 项目地址</a>
<p>最终结果:</p>
<img data-action="zoom" src="../static/images/vulkan/04/04_mac_final_result.png" alt=""></img>



      </div>
    </div>
  </div>
</template>

<script>
  import SnippetComponent from '@/components/SnippetComponent'
  import CodeModal from '@/components/CodeModal'
  import Toc from '@/components/Toc'
//   import * as THREE from 'three' 
//   var perlin = require('../static/js/vulkan/perlin.js');
//   var TweenMax = require('../static/js/vulkan/TweenMax.min.js');
//   var demo3 = require('../static/js/vulkan/demo3.js');

  export default {
    name: 'vulkan03',
    data: function () {return {
      articleTitle:'6.[译] Vulkan 入门系列 —— 绘制三角形 | 设置 | 实例化',
      contentData:{
          title:'Vulkan 实例化',
          list:{
            创建实例: '#page_Creating_an_instance',
            检测拓展支持: '#page_Checking_for_extension_support',
            清理: '#page_Cleaning_up',
          }
      },


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

// If you run Vulkan in macOS,add this line,otherwise comment it 
#include <Molten/MoltenVK/include/MoltenVK/mvk_vulkan.h>

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
    components: {SnippetComponent,CodeModal,Toc},
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

/* 
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
} */
</style>
