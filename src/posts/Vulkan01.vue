<template>
  <div class="transition-container">
    <img class="hero-image" src='../static/images/vulkan/01.overview.jpg' alt='hero image'/>
    <div id="center-container" class="center-container">
      <div id="article-view" class="article-view">
            <h1 id="toc_0">{{articleTitle}}</h1>
            <strong><p>原文来自 <a href="https://vulkan-tutorial.com/Overview" target="_blank">Vulkan-Tutorial.com</a>，初次翻译开发类文章，恳请指正。</p></strong>
            <ul class="TableOfContents">
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_Origin_of_Vulkan')">Vulkan 的起源</a></p>
              </li>
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_What_it_takes_to_draw_a_triangle')">绘制一个三角形需要的条件</a></p>
              <ul class="TableOfContents">
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_Step_1_Instance_and_physical_device_selection')" >步骤 1 - 实例化 | 选择物理设备 (Instance and physical device selection)</a></p>
              </li>
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_Step_2_Logical_device_and_queue_families')">步骤 2 - 逻辑设备 | 队列簇 (Logical device and queue families)</a></p>
              </li>
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_Step_3_Window_surface_and_swap_chain')">步骤 3 - 窗口表面层 | 交换链 (Window surface and swap chain)</a></p>
              </li>
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_Step_4_Image_views_and_framebuffers')">步骤 4 - 图像视图 | 帧缓冲 (Image views and framebuffers)</a></p>
              </li>
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_Step_5_Render_passes')">步骤 5 - 渲染通道 (Render passes)</a></p>
              </li>
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_Step_6_Graphics_pipeline')">步骤 6 - 图形渲染管线 (Graphics pipeline)</a></p>
              </li>
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_Step_7_Command_pools_and_command_buffers')">步骤 7 - 命令池 | 命令缓冲 (Command pools and command buffers)</a></p>
              </li>
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_Step_8_Main_loop')">步骤 8 - 主循环 (Main Loop)</a></p>
              </li>
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_Summary')">总结</a></p>
              </li>
              </ul>
              </li>
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_API_concepts')">API 概念</a></p>
              <ul class="TableOfContents">
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_Coding_conventions')">代码风格管理</a></p>
              </li>
              <li>
              <p><a href="javascript:void(0)" @click="goAnchor('#page_Validation_layers')">验证层 (Validation layers)</a></p>
              </li>
              </ul>
              </li>
            </ul>
            <p>我们先来介绍 Vulkan 本身和它的设计目的——它能解决什么问题？然后下面的每个章节，我们来详细剖析一下，绘制一个三角形需要的必要步骤。同时我们会涵盖 Vulkan API 的结构及其常规使用模式。</p>
            
<h2 id="page_Origin_of_Vulkan">Vulkan 的起源</h2>
<p>跟上一代图形接口一样，Vulkan 的设计理念是成为跨平台抽象 <a href="https://en.wikipedia.org/wiki/Graphics_processing_unit">GPUs</a> 图形接口。
最开始，大部分的图形 API 的限制在于，它们一开始就被设计为固定渲染管线。开发者需要以标准格式提供顶点数据，而光影、着色等效果的有无，还要看 GPU 生产商的心情。</p>
<p>随着显卡架构的成熟，生产商开始提供越来越多的 GPU 可编程功能。然而所有的新功能都被整合进了之前已有的 API 中。这就降低了 API 的抽象程度，与此同时，开发者在进行图形开发时，很多显卡驱动层的东西，完全靠猜。
因此，为了提升游戏应用中的图形体验，很多显卡驱动频繁升级，而不同的驱动版本之间，性能差异巨大。因为驱动的复杂性，应用开发者还需要解决不同显卡供应商驱动之间的兼容性，比如考虑各种 <a href="https://en.wikipedia.org/wiki/Shader">着色器</a> 的语法。除了前面提到的一些新特性，过去的十年里，移动设备的 GPU 性能愈发强劲，对行业的影响也越来越大。因为功耗和空间的因素，移动 GPU
的架构与传统架构并不相同。例如分块渲染<a href="https://en.wikipedia.org/wiki/Tiled_rendering">（tiled rendering）</a>的应用，提高了性能。而一些老的图形 API 在多线程支持上的不足，导致了 CPU 成为移动端图形渲染的瓶颈。</p>
<p>Vulkan 依赖现代图形架构，解决了上述问题。依靠更加详细具体的 API 调用，减少了驱动开销。支持多线程并行创建和提交命令。与此同时采用了单一编译器和标准字节码，提高了着色器编译的兼容性。而且，它将图形和计算的功能整合到单一API中，在现代图形显卡中拥有通用的处理能力。</p>
<h2 id="page_What_it_takes_to_draw_a_triangle">绘制一个三角形需要的条件</h2>
<p>现在我们就一起来看看在一个正常运转的 Vulkan 程序中，渲染一个三角形所需要的步骤。而所有的细节将在下面几个章节中详尽展开。本章主要是给你展示一下整个流程的全景。</p>
<h3 id="page_Step_1_Instance_and_physical_device_selection">步骤 1 - 实例化 | 选择物理设备 (Instance and physical device selection)</h3>
<p>开发 Vulkan 应用的起点，应该是通过 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkInstance.html">VkInstance</a> 设置 Vulkan API。
创建实例的目的是用来描述你的应用，和描述开发过程中所需要的 API  extensions。完成实例的创建后，你需要查询支持 Vulkan 的硬件，然后选择一块或者更多 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkPhysicalDevice.html">VkPhysicalDevice</a> 来执行渲染操作。你可以查询硬件设备的
VRAM size (显存)和性能，然后选择需要的硬件设备，例如，你可以选择使用专业图形卡。 </p>
<h3 id="page_Step_2_Logical_device_and_queue_families">步骤 2 - 逻辑设备 | 队列簇 (Logical device and queue families)</h3>
<p>在选择硬件设备之后，你需要创建一个 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkDevice.html">VkDevice</a>
(逻辑设备), 通过 VkDevice 来更精确的描述需要使用的 
<a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkPhysicalDeviceFeatures.html">VkPhysicalDeviceFeatures</a>, 比如多视窗渲染和 64 位浮点运算。你需要指定需要使用的队列簇。Vulkan 中的大部分操作，例如绘制命令和
内存操作，都被提交到 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkQueue.html">VkQueue</a> 中异步处理. 队列从队列簇中分配，每个队列簇中的队列都执行指定的操作，会有不同的队列簇用来执行图形渲染、计算、内存转换操作
通过检测队列簇的可用性，可以用来区分物理设备，帮助完成设备选择。支持 Vulkan 的设备可能不提供任何图形功能，然而迄今为止，所有支持 Vulkan 的显卡基本上会提供我们需要的所有队列操作。</p>
<h3 id="page_Step_3_Window_surface_and_swap_chain">步骤 3 - 窗口表面层 | 交换链 (Window surface and swap chain)</h3>
<p>除非你要搞离屏渲染 (offscreen rendering), 否则你需要创建窗口来显示图像。窗口可以通过原生平台接口或者第三方库（例如 <a href="http://www.glfw.org/">GLFW</a> 和 <a href="https://www.libsdl.org/">SDL</a>)来创建。
本教程主要使用 GLFW，详细内容下面会讲述。</p>
<p>除此之外，我们还需要两个组件把图像最终渲染到窗口上：窗口表面层
(<strong>VkSurfaceKHR</strong>) 和交换链(<strong>VkSwapChainKHR</strong>). 注意这个 <strong>KHR</strong> 后缀, 这意味着这些属于 Vulkan 拓展。Vulkan API 本身不识别平台，因此我们需要使用
标准化 WSI(窗口系统界面) 来与窗口管理器交互。表面层是抽象的、窗口可以渲染上的跨平台对象，通过对于原始窗口句柄的引用，便可以实例化。例如窗口上的 <strong>HWND</strong>(h 是类型描述，表示句柄(handle)， Wnd 是变量对象描述，表示窗口，所以hWnd 表示窗口句柄)。还好，GLFW 提供了内置功能
来处理跨平台窗口问题。</p>
<p>交换链是渲染对象的集合。它的基本概念是确保当前渲染屏幕和当前现实屏幕不同。这样就能确保渲染完成的图像得以显示。每次当我们需要绘制一帧图像的时候，我们就需要询问交换链，来获取渲染完成的图像。当我们完成当前帧的绘制，
渲染完成后的图像回到交换链中，以便先是在屏幕上。渲染完成后的图像显示条件和渲染对象个数，取决于显示模式。一般渲染模式是双缓冲（Vsync 垂直同步)，和三重缓冲。我们将在交换链章节中详细展开说明。</p>
<h3 id="page_Step_4_Image_views_and_framebuffers">步骤 4 - 图像视图 | 帧缓冲 (Image views and framebuffers)</h3>
<p>在获取了交换链中国年的图像后，我们需要把图像包裹到
<a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkImageView.html">VkImageView</a> 和 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkFramebuffer.html">VkFramebuffer</a> 中. 图像视图引用图像的一部分使用。
帧缓冲(framebuffer)。帧缓冲引用了图像视图中的色彩对象、深度对象、模版对象。因为交换链中可能有非常多的不同图像，因此我们提前要创建图像视图和多种帧缓冲区，然后在绘制时选择合适的缓冲。</p>
<h3 id="page_Step_5_Render_passes">步骤 5 - 渲染通道 (Render passes)</h3>
<p>Vulkan 中的渲染通道描述了在渲染操作过程中图像的样式、使用方式和图像处理。在我们的三角形渲染应用中，我们将告诉 Vulkan 我们将使用单一图像作为色彩对象，然后我们会告诉 Vulkan，在绘制操作之前，我们会将窗口 clear 成纯色。
然而渲染通道仅仅定义了图像的样式，实际上是 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkFramebuffer.html">VkFramebuffer</a> 将指定图像拼装起来。</p>
<h3 id="page_Step_6_Graphics_pipeline">步骤 6 - 图形渲染管线 (Graphics pipeline)</h3>
<p>Vulkan 中的图形渲染管线起始于创建  <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkPipeline.html">VkPipeline</a> 对象。这个过程描述了显卡的可编程修改状态，例如通过使用 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkShaderModule.html">VkShaderModule</a> 对象来修改窗口尺寸，深度缓冲操作。
<a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkShaderModule.html">VkShaderModule</a> 对象从着色器字节码中创建。驱动需要知道渲染管线中使用的渲染对象，而我们可以通过引用渲染通道来设置。</p>
<p>Vulkan 和其他现有图形 API 相比，最显著的就是所有的渲染管线都需要高级自定义配置。这意味着，当你想要切换着色器或者改变顶点着色器的结构的时候，你需要完整重建渲染管线。
所以你必须创建非常多的自定义 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkPipeline.html">VkPipeline</a> 对象，结合不同的设置来完成渲染操作。
只有窗口尺寸和背景清除颜色可以动态修改。而其他的设置必须清晰精确，例如，不提供默认的色彩混合状态。</p>
<p>这样做的好处是，相比即时编译，这种提前编译提供了更多的驱动优化空间，和精确的 runtime 性能。因为一些大型的状态切换，例如更换渲染管线的描述相较之前更精确了。</p>
<h3 id="page_Step_7_Command_pools_and_command_buffers">步骤 7 - 命令池 | 命令缓冲 (Command pools and command buffers)</h3>
<p>前面提到，Vulkan 中我们想要执行的操作，比如绘制需要提交到队列中。而提交到队列之前，操作首先要录入到 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkCommandBuffer.html">VkCommandBuffer</a> 中。然后从 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkCommandPool.html">VkCommandPool</a> 中分配命令缓冲，然后结合指定的队列簇。为了绘制一个简单的三角形，我们需要
按以下操作录入命令缓冲。</p>
<ul>
  <li>开启渲染通道</li>
  <li>绑定图形渲染管线</li>
  <li>绘制渲染管线</li>
  <li>关闭渲染通道</li>
</ul>
<p>因为帧缓冲中的图像由交换链决定，我们需要给任何可能的图像录入命令缓冲，并在渲染时选择合适的图像。或者也可以在每一帧重新录入命令缓冲，但这样不高效。</p>
<h3 id="page_Step_8_Main_loop">步骤 8 - 主循环 (Main Loop)</h3>
<p>现在绘制命令已经被包裹进了命令缓冲中，主循环就很简单了。我们首先通过 <strong>vkAcquireNextImageKHR</strong> 从交换链中获取图像. 然后根据图像选择合适的命令缓冲，通过 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/vkQueueSubmit.html">vkQueueSubmit</a> 处理。最终, 我们输出图像
到交换链中，通过 <strong>vkQueuePresentKHR</strong> 让图像现实到屏幕上</p>
<p> 提交到队列中的操作会被异步处理。然后我们需要使用同步对象例如信号来确保图像信息能够正确处理。必须要等图像获取完成后，才能处理绘制命令缓冲的有关操作，否则可能会出现图像还没读完就被渲出来了。
<strong>vkQueuePresentKHR</strong> 的调用就是为了防止这个问题，然后在渲染完成后，我们会利用第二个信号来提示。</p>
<h3 id="page_Summary">总结</h3>
<p>本文快速介绍了使用 Vulkan 绘制一个三角形的流程。如果是实际开发，可能会有更多的步骤，例如分配 顶点缓冲区，创建 归一变量缓冲区，并且上传材质图像，但本文还是从简单绘制三角形开始。因为 Vulkan 的学习曲线非常陡峭。
我们会省略以下步骤，在顶点着色器中国年直接使用顶点内置坐标，而暂不使用 VBO。因为管理 顶点缓冲区需要命令缓冲的知识。</p>
<p>长话短说，绘制一个三角形，我们需要:</p>
<ul>
  <li>创建 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkInstance.html"><strong>VkInstance</strong></a></li>
  <li>选择支持的显卡设备 (<a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkPhysicalDevice.html"><strong>VkPhysicalDevice</strong></a>)</li>
  <li>创建 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkDevice.html"><strong>VkDevice</strong></a> 和 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkQueue.html"><strong>VkQueue</strong></a> 用来绘制和显示。</li>
  <li>创建窗口，窗口表面和交换链。</li>
  <li>将交换链的图像包裹进 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkImageView.html"><strong>VkImageView</strong></a></li>
  <li>创建渲染通道，制定渲染对象和用途。</li>
  <li>为渲染通道创建帧缓冲</li>
  <li>设置渲染管线</li>
  <li>将 每个可能的交换链图像 的绘制命令 录入到命令缓冲中，并进行分配</li>
  <li>根据获取的图像进行帧绘制，提交正确的绘制命令缓冲，并将图像输出到交换链中。</li>
</ul>
<p>步骤比较繁琐，但通过章节的拆解，每一步都非常简单，如果你对单个流程对于整个流程的意义不太明晰，你可以分别参考这些章节。</p>


<h2 id="page_API_concepts">API 概念</h2>
<p>这个章节间断介绍了 Vulkan API 是如何从底层构建的。</p>
<h3 id="page_Coding_conventions">代码风格管理</h3>
<p>所有的 Vulkan 功能，枚举和结构体在<strong>vulkan.h</strong> 头文件中定义, 其中也包含了 LunarG 开发的 <a href="https://lunarg.com/vulkan-sdk/">Vulkan SDK</a>
下一章节中，我们将学习安装 Vulkan SDK.</p>
<p>Function 一般带有带有小写字母 <strong>vk</strong> 的前缀，而枚举和机构体带有 <strong>Vk</strong> 前缀。 Vulkan API 重度使用结构体来给 function 提供函数。例如，对象一般用这样的模式创建：</p>

<pre data-original-code="VkXXXCreateInfo createInfo = {};
createInfo.sType = VK_STRUCTURE_TYPE_XXX_CREATE_INFO;
createInfo.pNext = nullptr;
createInfo.foo = ...;
createInfo.bar = ...;

VkXXX object;
if (vkCreateXXX(&amp;createInfo, nullptr, &amp;object) != VK_SUCCESS) {
    std::cerr << &quot;failed to create object&quot; << std::endl;
    return false;
}
" data-snippet-id="ext.11f068640aa2d2f04a976dea74b59e64" data-snippet-saved="false" data-codota-status="done"><code class="language-c++ hljs cpp"><span class="hljs-type">VkXXXCreateInfo</span> createInfo = {};
createInfo.sType = <span class="hljs-literal">VK_STRUCTURE_TYPE_XXX_CREATE_INFO</span>;
createInfo.pNext = <span class="hljs-literal">nullptr</span>;
createInfo.foo = ...;
createInfo.bar = ...;

<span class="hljs-type">VkXXX</span> object;
<span class="hljs-keyword">if</span> (<span class="hljs-function">vkCreateXXX</span>(&amp;createInfo, <span class="hljs-literal">nullptr</span>, &amp;object) != <span class="hljs-literal">VK_SUCCESS</span>) {
    <span class="hljs-built_in">std</span>::<span class="hljs-built_in">cerr</span> &lt;&lt; <span class="hljs-string">"failed to create object"</span> &lt;&lt; <span class="hljs-built_in">std</span>::<span class="hljs-built_in">endl</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}</code></pre>

<p>Vulkan 中很多结构体都需要你清晰的描述 <strong>sType</strong> 成员变量.  <strong>pNext</strong> 成员变量将指向拓展结构。 
在本教程中，将一直为 <strong>nullptr</strong> 。 创建销毁对象的函数会带有 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkAllocationCallbacks.html"><strong>VkAllocationCallbacks</strong></a> 参数，通过这个接口可以分配驱动内存，本教程中，也设置为 <strong>nullptr</strong></p>
<p>几乎所有的函数都会返回一个 <a href="https://www.khronos.org/registry/vulkan/specs/1.0/man/html/VkResult.html"><strong>VkResult</strong></a> ，要么就是 <strong>VK_SUCCESS</strong> 或者提示错误。通过自定义设置可以展示每个函数返回的错误代码，并展示其含义。</p>
<h3 id="page_Validation_layers">验证层 (Validation layers)</h3>
<p>前面提到，Vulkan 的设计目标是提供高性能和低硬件开销。因此它默认提供的错误检测和 debugging 功能有限，若果编写错误，驱动经常会突然崩溃而不返送错误代码，甚至可能可能更糟，可能会在显卡持续工作，最终影响其他使用。</p>
<p>Vulkan 通过<em><strong>validation layers</strong></em> 来提供了种类广泛的错误检测。验证层代码插入到了 API 和显卡驱动中，在函数参数上进行错误检测，并跟踪内存管理问题。你可以在开发过程中开启，然后在开完完成后关闭，这样就完全消除了错误检测的性能开销。每个开发者都可以高度自定义验证层，但是 LunarG 提供的 Vulkan SDK 提供了一系列标准的验证层检测，本教程中将大量使用。需要通过注册回调函数的手段来接受 debug 信息。</p>
<p>因为使用 Vulkan 需要清晰的定义每个操作，加上验证层的使用非常广泛，因此找 bug 相比 OpenGL 和 Direct3D更容易。</p>
<p>在开始编程之前，我们需要先配置一下开发环境。<a href="//vulkan-tutorial.com/Development_environment">setting
up the development environment</a></p>
      </div>
    </div>
  </div>
</template>

<script>
  import SnippetComponent from '@/components/SnippetComponent'
  import vulkanFile from '../static/codesnippets/vulkan/vulkan01.cpp'

  export default {
    name: 'vulkan01',
    data: function () {return {
      articleTitle:'3.[译] Vulkan 入门系列 —— 综述',
      codeSnippetCpp:vulkanFile,
    }},
    components: {SnippetComponent},
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
