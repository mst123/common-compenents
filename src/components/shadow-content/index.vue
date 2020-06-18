<!--
 * @Descripttion : 
 * @Author       : 马识途
 * @Date         : 2020-04-21 10:39:37
 * @LastEditTime : 2020-06-17 18:28:42
 * @FilePath     : \projecte:\codeFile\common-compenents\src\components\shadow-content\index.vue
 -->
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
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
      overflow: hidden;
    }
  }
</style>
<style lang="scss">
  .el-button.el-button--primary{
    background: #009688;
    border-color: #009688;
    &.is-disabled{
      background: #02cfbb;
      border-color: #02cfbb;
      &:hover{
        background: #02cfbb;
        border-color: #02cfbb;
      }
    }
  }
  .el-tabs{
    .el-tabs__item.is-active{
      font-weight: bold;
    }
  }
  ::-webkit-scrollbar-track-piece {
    background-color: #f8f8f8;
  }
  ::-webkit-scrollbar {
    width: 15px;
    height: 15px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #dddddd;
    background-clip: padding-box;
    min-height: 28px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color:#bbb;
  }
</style>
