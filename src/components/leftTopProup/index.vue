<template>
  <div class="proup-content" :style="varStyle" ref="proup" :class="[isShow?'show':'hidden']">
    <slot></slot>
    <div class="control" @click="toggle">
      <el-tooltip class="item" effect="dark" :content="tooltipContent" placement="right">
        <i :class="[isShow?'el-icon-arrow-left':'el-icon-arrow-right']"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftTopProup",
  data() {
    return {
      isShow: true,
      varStyle: {
        "--width": this.width,
        "--left": this.left,
        top: this.top
      },
      tooltipContent: ''
    };
  },
  components: {

  },
  mounted() {
    console.log(this.$refs['proup'].offsetWidth);
    this.varStyle = {
      "--width": '-' + this.$refs['proup'].offsetWidth + 'px',
      "--left": this.left,
      top: this.top
    }
    this.isShow = this.initialStatus
    this.tooltipContent = this.isShow?'隐藏':'显示'
  },
  methods: {
    toggle(){
      this.isShow=!this.isShow
      this.$emit('toggle',this.isShow)
    }
  },
  computed: {

  },
  watch: {
    isShow(val){
      setTimeout(() => {
        this.tooltipContent = this.isShow?'隐藏':'显示'
      },400)
    }

  },
  props: {
    left: {
      type: String,
      default: '10px'
    },
    top: {
      type: String,
      default: '10px'
    },
    initialStatus: { //初始状态，显示或者隐藏
      type: Boolean,
      default: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.proup-content{
  background: rgba(8, 8, 8, 0.7);
  min-height: 50px;
  min-width: 160px;
  box-sizing: border-box;
  border-radius: 5px 0 5px 5px;
  position: absolute;
  z-index: 10;
  transition: left 0.4s;
  &.show{
    left: var(--left);
  }
  &.hidden{
    left: var(--width);
  }
  .control{
    height: 50px;
    line-height: 50px;
    width: 10px;
    box-sizing: border-box;
    position: absolute;
    top: 0px;
    right: -10px;
    background: rgba(8, 8, 8, 0.7);
    border-radius: 0 5px 5px 0;
    font-size: 16px;
    color: #ffffff;
    text-align: left;
    cursor: pointer;
    i{
      margin-left: -3px;
    }
  }
}
</style>

