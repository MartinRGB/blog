<template>
 <div class="center-container">
    <div id="Template"  v-if="$route.meta.keepAlive">
        <!-- test1 -->
        <h1>Test</h1>   
        <input type="text" v-model="message">
        <span v-bind:title="message">
            鼠标悬停几秒钟查看此处动态绑定的提示信息！
        </span>
    </div>
  </div>
</template>

<script>  
    export default {
        name: 'Template',
        data() {
            return {
                message: '页面加载于 ' + new Date().toLocaleString()
            }
        }
    }
</script>