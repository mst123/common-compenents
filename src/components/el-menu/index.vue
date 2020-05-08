<!--
 * @Descripttion : 
 * @Author       : 马识途
 * @Date         : 2020-04-13 16:26:09
 * @LastEditTime : 2020-05-08 11:17:15
 * @FilePath     : \projecte:\codeFile\common-compenents\src\components\el-menu\index.vue
 -->
<template>
  <el-menu
    class="el-menu-vertical"
    :collapse="isCollapse"
    :style="varStyle"
    v-bind="computedProp"
    v-on="$listeners"
  > 
    <el-menu-item class="disabled" disabled index="no">
      <i @click="collapse" class="el-icon-menu"></i>
      <span slot="title" class="title">点击展开</span>
    </el-menu-item>
    <slot></slot>
  </el-menu>
</template>

<script>
export default {
  name: 'ElMenuVerticalSelf',
  data () {
    return {
      isCollapse: false,
      varStyle: {
        "--width": this.maxWidth
      }
    }
  },
  methods: {
    collapse(){
      this.isCollapse=!this.isCollapse
      this.$emit('collapse',this.isCollapse)
    }
  },
  mounted() {
    
  },
  created () {
    
  },
  components: {
    
  },
  props:{
    maxWidth: {
      type: String,
      require: true
    }
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
    height: 100%;
    background-color: #E5EFF1;
    &:not(.el-menu--collapse){
      width: var(--width);
    } 
    /deep/ .el-menu-item{
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      text-align: left;
      &.is-active{
        background-color: #C1E1DE!important;
      }
    }
    /deep/ .el-submenu__title{
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      text-align: left;
    }
    /deep/ .disabled{
      color: #000000;
      cursor: inherit;
      .title{
        color: transparent!important;
      }
      .el-icon-menu{
        color: #000000;
        cursor: pointer;
      }
    }
  }
</style>
