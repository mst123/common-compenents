<template>
  <el-dialog
    v-bind="computedProp"
  >
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  name: 'ElDialogSelf',
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
    console.log(this.$attrs);
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
          center: true,
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
        background: #3FBCDD;
        padding: 0 20px;
        height: 50px;
        line-height: 56px;
        span{
          color:#ffffff;
        }
        .el-dialog__headerbtn{
          top: 15px;
          line-height: 20px;
        }
        .el-dialog__close{
          font-size: 24px;
          color: #ffffff;
        }
      }
      .el-dialog__body{
        padding: 15px;
        max-height: calc( 95vh - 50px );
      }
    }
  } 

</style>
