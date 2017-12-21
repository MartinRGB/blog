<template>
   <div>
    <div id="show-modal" @click="expandModal()" style="cursor: pointer;" class="showSlot">
      <slot name="link">
        
      </slot>
    </div>

    <transition name="modal">
    <div class="modal-mask" v-show="showModal" @close="collapseModal()">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div  id="btn-close-modal" class="close-animatedModal" @click="collapseModal()"> 
              <span class="modal-default-button">
                ✕
              </span>
          </div>

          <div class="modal-header">
            <slot name="header">
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>
          
        </div>
      </div>
    </div>
  </transition>
   </div>
</template>


<script>

  export default {
    name: 'CodeModal',
    data () {
      return {
        showModal:false
      }
    },
    methods: {
      expandModal:function(){
        this.showModal = true;
        var bodyE = document.getElementsByTagName('body');
        bodyE[0].style.overflowY = 'hidden'
      },
      collapseModal:function(){
        this.showModal = false;
        var bodyE = document.getElementsByTagName('body');
        bodyE[0].style.overflowY = 'scroll'
      },
    },
    ready:function(){
    },
    created:function(){
    },
    mounted:function(){

      
    },
    destroyed:function(){
    }
  }

</script>

<style scoped>

.showSlot{
  width: auto;
  cursor: pointer;
  display: inline-block;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, .5); */
  display: table;
  transition: opacity .4s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  overflow-y: auto;
  height: 100%;
  width: auto;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 20px 4px;
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;

  animation-duration: 0.8s;
  animation-fill-mode: both;
  animation-name: slideInUp;

}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  top: -16px;
  position: relative;
}

.close-animatedModal{
  background-color:#888 !important;
  cursor: pointer;
  border: 1px solid #888;
  width: 41px !important;
  border-radius: 41px;
  height: 41px;
  box-shadow: 0 4px 20px rgba(0,0,0,.22);
  transition:all 0.3s ease;
  position: sticky;
  top: 35px;
  left: calc(100vw - 128px);
  z-index: 200;
}

.close-animatedModal:hover{
  background-color:#fff !important;
  transform: scale(1.1);
  border: 1px solid rgba(0,0,0,.0);
  box-shadow: 0 5px 36px rgba(136,136,136,.7);
  box-shadow: 0 6px 20px rgba(0,0,0,.15);
}

.close-animatedModal:active{
  transform: scale(0.75);
}


.close-animatedModal:hover > span{
  color: #888 !important;
  transform:rotateZ(90deg);
  margin-left: 12px;
}

.close-animatedModal > span{
    color: #fff !important;
    position: relative;
    display: inline-block;
    font-weight: 500;
    transition:all 0.2s;
    font-size: 20px;
    line-height: 20px;
    margin-left: 13px;
    margin-top: 11px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */



@keyframes slideInUp {
  from {
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}


@keyframes slideOutDown {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, 100%, 0);
  }
}


/* .modal-enter .modal-container{
  animation-duration: 1s;
  opacity: 1;
  animation-fill-mode: both;
  animation-name: slideInUp;
} */

.modal-leave-active .modal-container{
  animation-duration: 0.3s;
  /* opacity: 0; */
  animation-delay: 0.2s;
  animation-fill-mode: both;
  animation-name: slideOutDown;
}


/* .modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
} */

/* .modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
} */

</style>