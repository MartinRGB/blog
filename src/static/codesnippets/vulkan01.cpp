VkXXXCreateInfo createInfo = {};
createInfo.sType = VK_STRUCTURE_TYPE_XXX_CREATE_INFO;
createInfo.pNext = nullptr;
createInfo.foo = ...;
createInfo.bar = ...;

VkXXX object;
if (vkCreateXXX(&amp;createInfo, nullptr, &amp;object) != VK_SUCCESS) {
    std::cerr << &quot;failed to create object&quot; << std::endl;
    return false;
}