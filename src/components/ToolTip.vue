<template>
<div id="tooltip" style="display: inline-block;">
        <div class="tip_Anchor">
            <slot>
              
            </slot>
        </div>
        
        <div class="tip_Img" v-popover.top="{ name: mName }">
        </div>
        
        <transition name="show-from-top">
            <popover :name ='mName'>
               <p>{{this.tipString}}</p>
            </popover>
        </transition>
</div>
</template>

<script>
  import Vue from 'vue'
  import Popover  from 'vue-js-popover'
  Vue.use(Popover , { tooltip: true })

  export default {
    name: 'toolTip',
    props:['tips'],
    data () {
      return {
        tipString:this.tips,
        mName: 'tooltip-' + this._uid
      }
    },
    methods: {},
    mounted:function(){
      // var goalLeft = this.$el.querySelector('.tip_Anchor').offsetWidth 
      // this.$el.querySelector('.tip_Img').style.marginLeft = (goalLeft+7) + 'px' 

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.show-from-top-enter-active, .show-from-top-leave-active {
  transition: transform 0.4s ease-out, opacity 0.25s ease;
}
.show-from-top-enter, .show-from-top-leave-to {
  opacity: 0;
  transform: translate(0px,-30px);
}

.vue-popover {
    padding: 15px 15px 15px 15px;
    min-width: 200px;
    max-width: 450px;
    box-shadow: 0 4px 20px 0 rgba(78, 78, 78, 0.15);
    width: auto !important;
}

.tip_Img{
  background:url('../static/images/tips.svg');
  position: relative;
  display: inline-block;
  width: 26px;
  height: 15px;
  margin-top: -24px;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.9;
  cursor: help;
  margin-right: 5px;
}

.tip_Anchor{
  display: inline-block;
  /* margin-right: 40px; */
}

p,span {
  margin: 0px;
}

@media screen /*and (min-width: 320px)*/
and (max-width: 500px) {

}



</style>
