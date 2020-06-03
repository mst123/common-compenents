<!--
 * @Descripttion : 
 * @Author       : 马识途
 * @Date         : 2020-04-13 16:26:09
 * @LastEditTime : 2020-06-03 11:10:45
 * @FilePath     : \projecte:\codeFile\common-compenents\src\components\el-menu\index.vue
 -->
<template>
  <el-menu
    class="el-menu-vertical"
    :style="varStyle"
    v-bind="computedProp"
    v-on="$listeners"
  > 
    <el-menu-item class="disabled" disabled index="no">
      <div @click="collapse" title="隐藏" v-if="!isCollapse" class="el-icon-menu-close"></div>
      <div @click="collapse" title="显示" v-else class="el-icon-menu-open"></div>
    </el-menu-item>
    <slot></slot>
  </el-menu>
</template>

<script> 
export default {
  name: 'ElMenuVerticalSelf',
  data () {
    return {
      isCollapse: this.$attrs.collapse ? this.$attrs.collapse : false,
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
        this.$attrs,
        {
          'collapse': this.isCollapse
        }
      )   
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  $fontSize: 16px;
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
      font-size: $fontSize;
      &.is-active{
        background-color: #C1E1DE!important;
      }
    }
    /deep/ .el-submenu__title{
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      font-size: $fontSize;
      text-align: left;
    }
    /deep/ .disabled{
      color: #000000;
      cursor: inherit;
      .title{
        color: transparent!important;
      }
      .el-icon-menu-close{
        color: #000000;
        cursor: pointer;
        background: url(../../assets/icons/menuClose.svg) no-repeat center/contain;
        display: inline-block;
        height: 20px;
        width: 20px;
      }
      .el-icon-menu-open{
        color: #000000;
        cursor: pointer;
        background: url(../../assets/icons/menuOpen.svg) no-repeat center/contain;
        display: inline-block;
        height: 20px;
        width: 20px;
      }
    }
  }
</style>
