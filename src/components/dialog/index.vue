<template>
  <el-dialog
    v-bind="computedProp"
    v-on="$listeners"
  > 
    <template v-slot:title>
      <slot name="title"></slot>
    </template>
    <slot></slot>
    <template v-slot:footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'ElDialogSelf',
  inheritAttrs: false,
  data () {
    return {
      
    }
  },
  methods: {
    beforeClose(){
      this.$emit('update:visible', false)
    }
  },
  mounted() {
    
  },
  created () {
    
  },
  components: {
    
  },
  computed: {
    computedProp(){
      let computedProp = Object.assign(
        {
          'close-on-click-modal': false,
          'append-to-body': true,
          width: "80%",
          top: '',
          'before-close': this.beforeClose
        },this.$attrs
      )     
      if(typeof this.$attrs['before-close'] === "function"){
        computedProp['before-close'] = (done)=>{
          this.$attrs['before-close']( this.beforeClose )
        }
      }

      return computedProp
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .el-dialog__wrapper{
    display: flex;
    justify-content: center;
    align-content: center;
    /deep/  .el-dialog{
      margin: auto;
      .el-dialog__header{
        background: #009688;
        padding: 0 20px;
        height: 35px;
        line-height: 35px;
        font-size: 16px;
        text-align: left;
        .el-dialog__title{
          font-size: 16px;
        }
        span{
          color:#ffffff;
        }
        .el-dialog__headerbtn{
          top: 9px;
          line-height: 20px;
        }
        .el-dialog__close{
          font-size: 20px;
          color: #ffffff;
        }
      }
      .el-dialog__body{
        padding: 15px;
        box-sizing: border-box;
        max-height: calc( 95vh - 101px );
        overflow-x: hidden;
        overflow-y: auto;
      }
    }
  } 

</style>
