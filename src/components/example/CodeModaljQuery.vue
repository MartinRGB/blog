<template>
   <div>
    <div id="show-modal" href="#animatedModal" class="showSlot">
      <slot name="link" >
        
      </slot>
    </div>

      <div id="animatedModal" class="mainModal">
            <!--THIS IS IMPORTANT! to close the modal, the class name has to match the name given on the ID -->
            <div  id="btn-close-modal" class="close-animatedModal"> 
              <span>✕</span>
            </div>
                
            <div class="modal-content" id="modal-content">
              <slot name="body">
                <!--Your modal content goes here-->
              </slot>
            </div>
      </div>
   </div>
</template>

<style src="../style/animate.min.css"></style>

<script>

  import '../static/js/jquery.min.js'
  import '../static/js/animatedModal.min.js'

  var bindData
  export default {
    name: 'CodeModal',
    data () {
      return {
        showModal:false
      }
    },
    methods: {
      highlight:function(){
        alert('Opened')
      }
    },
    ready:function(){
    },
    created:function(){
    },
    mounted:function(){
      $("#show-modal").animatedModal({
                modalTarget:'animatedModal',
                animatedIn:'slideInUp',
                animatedOut:'slideOutDown',
                color:'#fff',
                beforeOpen: function() {

                },           
                afterOpen: function() {
                  var aCodes = $("#modal-content tr")

                  $(aCodes).each(function(i) {
                    var $code = $(this);
                    setTimeout(function() {
                      $code.addClass("hljs-animated");
                    }, i*16); // delay 100 ms
                  });

                }, 
                beforeClose: function() {
                    console.log("The animation was called");
                }, 
                afterClose: function() {
                    
                  var aCodes = $("#modal-content tr")

                  $(aCodes).each(function(i) {
                    var $code = $(this);
                    $code.removeClass("hljs-animated");
                  });
                }
      });
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

.mainModal {
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 20px 4px !important;
}

.modal-content{
  position: absolute;
  top: 12px;
  width: 100%;
}

.close-animatedModal{
  background-color:#888 !important;
  cursor: pointer;
  border: 1px solid #888;
  width: 41px !important;
  border-radius: 41px;
  height: 41px;
  box-shadow: 0 4px 20px rgba(0,0,0,.22);
  transition:all 0.2s;
  position: sticky;
  top: 40px;
  left: calc(100vw - 81px);
  z-index: 200;
}

.close-animatedModal:hover{
  background-color:#fff !important;
  transform: scale(1.1);
  border: 1px solid rgba(0,0,0,.0);
  box-shadow: 0 5px 36px rgba(136,136,136,.7);
  box-shadow: 0 6px 20px rgba(0,0,0,.15);
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

</style>
