<template>

  <footer id="footer" class="footer">
    <ul class="pager">
        <li id="pager-left" ref="pager-left" class="pager-left"><router-link to=Guide>上一篇</router-link></li>            
        <li id="pager-rogjt" ref="pager-right" class="pager-right"><router-link to=Guide>下一篇</router-link></li>        
    </ul>
    Copyright © {{ thisYear }} {{userName}} | Powered by <a href='https://github.com/viko16/vue-ghpages-blog' target="_blank">{{projectName}}</a>
  </footer>
</template>

<script>
  export default {
    props:['bindRouteId','bindRouteName'],
    name: 'footer',
    data () {
      return {
        thisYear: new Date().getFullYear(),
        userName: 'MartinRGB',
        projectName: 'vue-ghpages-blog' 
      }
    },
    mounted:function(){

      // if(this.$route.name == 'Home'){
      //   var nav = this.$el.getElementsByTagName('ul')[0]
      //   nav.style.display = 'none';
      // }
      
    },
    methods:{
      afterEnter: function( el ) {
        // alert(el.firstChild.firstChild.className +' Route entered' );
        // alert(el.firstChild.firstChild.className)
        //alert(this.$route.name)

      },
      beforeEnter: function(el){
        // alert(el.firstChild.firstChild.className +' Route entered' );
       
      },
      routeChange: function(){
        alert(this.$route.name)
      }
    },
  }
  
</script>

<style scoped>
.pager{
  height: 30px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 24px;
}

.pager-left{
  float: left;
  list-style-type: none;
}

.pager-right{
  float: right;
  list-style-type: none;
}


</style>

