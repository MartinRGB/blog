<script>  
    
    // html 里面添加
    // <div id="gComponent">
    //   <gg-component></gg-component>
    // </div>

    // 全局组件的注册，可以放到层级较低的子组件中
    import Vue from 'vue'
    // 注册
    Vue.component('gg-component',{
        template: `
            <div id="view">
            <h1>{{ fullName }}</h1>
            <button @click="showDescription">Description</button>
            </div>
        `,
        data() {
        return{
            firstName: 'John',
            lastName: 'Oliver',
            description: 'Comedian, political commentator and tv host.'
        }
        },
        computed: {
            fullName() {
            return `${ this.firstName } ${ this.lastName }`;
            }
        },
        methods: {
            showDescription() {
            alert(this.description)
            }
        }
    });

    // 创建根实例
    // var gComponent = new Vue({
    //     el: '#gComponent',
    // })

</script>