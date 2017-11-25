<template>

  <footer id="footer" class="footer">
    <ul class="pager" v-show='this.bindNavShow'>
        <li id="pager-left"  v-show='this.bindPrevShow' ref="pager-left" class="pager-left"><a href="javascript:void(0)" @click="clickPrevious()">上一篇</a></li> 
        <li id="pager-center"  ref="pager-center" class="pager-center"><a href="javascript:void(0)" @click="clickContent()">目录</a></li>           
        <li id="pager-right" v-show='this.bindNextShow' ref="pager-right" class="pager-right"><a href="javascript:void(0)" @click="clickNext()">下一篇</a></li>        
    </ul>
    Copyright © {{ thisYear }} {{userName}} | Powered by <a href='https://github.com/viko16/vue-ghpages-blog' target="_blank">{{projectName}}</a>
  </footer>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
  export default {
    name: 'footer',
    props:['bindListNum','bindNavShow','bindPrevShow','bindNextShow'],
    data () {
      return {
        thisYear: new Date().getFullYear(),
        userName: 'MartinRGB',
        projectName: 'vue-ghpages-blog' 
      }
    },
    mounted:function(){},
    methods:{
      clickPrevious(){
        //this.$router.push({ name: 'Brick'})
        var curId = this.$route.name.replace('Article','')
        if(curId != 'Home'){

          if(curId>1){
            this.$router.push({ name: 'Article'+(Number(curId)-1).toString()})
          }
          else{
            alert('到头了')
          }
          
        }

      },

      clickNext(){
        var curId = this.$route.name.replace('Article','')
        if(curId != 'Home'){
          if(curId<this.bindListNum){
            this.$router.push({ name: 'Article'+(Number(curId)+1).toString()})
          }
          else{
            alert('到尾了')
          }
        }
      },

      clickContent(){
        this.$router.push({ name: 'Home'})
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

.pager-center{
  float: left;
  left: 50%;
  position: absolute;
  list-style-type: none;
}


</style>

