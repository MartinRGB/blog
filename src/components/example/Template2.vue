<template>
    <div class="center-container">
        <div id="gcomponent" v-if="$route.meta.keepAlive">
            <gg-component></gg-component>
        </div>
     </div>
</template>

<script>  
    import GlobalComponent from './GlobalComponent.vue'
    export default {
        name: 'Template2',
        components: {GlobalComponent}
    }
</script>