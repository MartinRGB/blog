<template>
  <div class="show-hide-container" id="sh-container">

      <div id="content_div"  v-bind:class="{'is-collapsed' : collapsed }">
        <slot>
        </slot>
      </div>
	    <a @click="collapsed = !collapsed">{{this.collapsed?'展开':'折叠'}}</a>
      
  </div>
</template>


<script>

  export default {
    name: 'CollapseComponent',
    data () {
        return {
          collapsed: true
        }
    },
    computed: {
    },
    methods: {
    }
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.is-collapsed {
  display: none;
}
a{
  cursor: pointer;
}

</style>
