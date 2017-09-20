<template>
<div id="example-1" class="list">
  <div class="list__input">
    <button v-on:click="add" style="outline: none;">+</button>
    <input v-model="newItem" placeholder="Add new..." @keydown.enter="add" />
  </div>
  
  <transition-group name="list-item" tag="ul" class="list__ul">
    <li class="list__item" v-for="item in items" :key="item">
      <input type="checkbox" @click="remove(item)" />
      {{ item.message }}
    </li>
  </transition-group>
</div>
  
</template>

<script>


export default {
  name: 'list-transition',
  data: function () {return {
    newItem: 'Hello',
    items: [
      { message: 'Foo' },
      { message: 'Bar' },
      { message: 'Biz' },
      { message: 'Ban' },
      { message: 'Boo' }
    ]
  }},
  components: {},
  methods: {
    remove: function(item){
      this.items.splice( this.items.indexOf(item), 1 );
    },
    add: function(){
      this.items.unshift({ message: this.newItem });
      this.newItem = 'Hello';
    }
  }
  ,computed: {

  },
  created: function () {

  },
  mounted:function(){
  },
  destroyed:function(){
  }
}


</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* Vue List Item transition */

.list-item-enter-active, .list-item-leave-active {
  transition: opacity 0.3s, transform 0.3s;
  transform-origin: left center;
}
.list-item-enter, .list-item-leave-to /* .list-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: scale(0.5);
}

/* //////////////////////////////////////// */
/* Basic Styles */

html { background: #eee; height: 100%; display: flex; justify-content: center; align-items: center; }

.list {
  background: #FFF;
  margin: auto;
  padding: 1em 1em 1em;
  box-shadow: 0 5px 30px rgba(0,0,0,0.2);
  
}
.list:last-child{
  margin-bottom: 0;
}

.list__ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.list__input {
  display: flex;
  margin-bottom: 0.5em; 
}
.list__item {
  display: block;
  margin-bottom: 0.25em;
}

</style>
