<template>
  <p class="bar-title" :style="{color: color}">
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: 'TitleBar',
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
    color: {
      type: String,
      default: function () {
        return '#000000'
      }
    }
  },
  components:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  p.bar-title{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    &:before {
      width: 4px;
      display: inline-block;
      content: "";
      height: 18px;
      position: relative;
      top: 3px;
      margin-right: 8px;
      background: #009688;
    }
  }
</style>
