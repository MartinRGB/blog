<template>
    <div class="center-container">
        <div id="example" v-if="$route.meta.keepAlive">
            <my-component></my-component>
        </div>
    </div>
</template>

<script>
    import SingleComponent from './SingleComponent.vue'
    export default {
        name: 'Template3',
        components: {SingleComponent}
    }
</script>