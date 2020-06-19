<template>
  <div :style="style" class="tuli" >
    <div v-if="isShow" class="title">
        {{title}}
        <el-tooltip class="item" effect="dark" content="隐藏" placement="top">
          <i @click="toggle" class="el-icon-remove"></i>
        </el-tooltip>
    </div>
    <el-tooltip v-else class="item" effect="dark" content="显示" placement="top">
      <div @click="toggle" class="title">
        {{title}}
      </div>
    </el-tooltip>
    <slot v-if="isShow">

    </slot>
  </div>
</template>
<script>

export default {
  name: 'MapLegend',
  data () {
    return {
      isShow: true
    }
  },
  mounted(){  //组件挂在到dom树上之后
    this.isShow = this.initialStatus
  },
  methods:{  //方法
    toggle(){
      this.isShow = !this.isShow
      this.$emit('toggle',this.isShow)
    }
  },
  watch:{  //监听

  },
  props: {
    title: {//标题
      type: String,
      default: '图例'
    },
    initialStatus: {//初始状态
      type: Boolean,
      default: true
    },
    left: {
      type: String,
      default: '10px'
    },
    bottom: {
      type: String,
      default: '10px'
    },
  },
  computed: {
    style() {
      return{
        left: this.left,
        bottom: this.bottom
      }
      
    }
  },
}
</script>

<style scoped lang="scss">
.tuli{
  min-width: 60px;
  min-height: 30px;
  color: rgb(255, 255, 255);
  position: absolute;
  border-radius: 5px;
  background:rgba(8, 8, 8, 0.5);
  z-index: 33;
  color:#fff;
  .title{
    height: 30px;
    line-height: 30px;
    width: 100%;
    text-align: center;
    cursor: pointer;
    position: relative;
    i{
      color: #009688;
      position: absolute;
      top: 7px;
      right: 10px;
      font-size: 16px;
    }
  }
}
</style>
