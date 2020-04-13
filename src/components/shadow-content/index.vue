<template>
  <div class="shadow-box">
    <div class="shadow">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShadowContent',
  data () {
    return {
      
    }
  },
  methods: {
    
  },
  mounted() {
    
  },
  created () {
    
  },
  props:{
    
  },
  components:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .shadow-box{
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    background: #F2F2F2;
    .shadow{
      width: 100%;
      height: 100%;
      border-radius: 5px;
      background: #ffffff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
      overflow: hidden;
    }
  }
</style>
