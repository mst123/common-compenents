<template>
  <el-menu
    class="el-menu-vertical"
    v-bind="computedProp"
    v-on="$listeners"
  >
    <slot></slot>
  </el-menu>
</template>

<script>
export default {
  name: 'ElMenuVerticalSelf',
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
  components: {
    
  },
  computed: {
    computedProp(){   
      return Object.assign(
        {
          'active-text-color': "#000000",
          'text-color': "#000000",
          'background-color': "#E5EFF1",
        },
        this.$attrs
      )   
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .el-menu-vertical{
    border-right: 0;
    background-color: #E5EFF1;
    height: 100%;
    /deep/ .el-menu-item{
      height: 40px;
      line-height: 40px;
      &.is-active{
        background-color: #C1E1DE!important;
      }
    }
    /deep/ .el-submenu__title{
      height: 40px;
      line-height: 40px;
    }
  }
</style>
