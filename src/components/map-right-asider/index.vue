<!--
 * @Descripttion : 地图右侧滑动组件 fixed布局
 * @Author       : 马识途
 * @Date         : 2020-04-29 18:06:34
 * @LastEditTime : 2020-04-29 20:14:18
 * @FilePath     : \projecte:\codeFile\common-compenents\src\components\map-right-asider\index.vue
 -->
<template>
  <div class="asider" :style="asider">
    <span @click="asiderToggle" class="toggleBtn">
      <i :class="[asiderToggleFlag ? 'el-icon-arrow-right' : 'el-icon-arrow-left']"></i>
    </span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "mapRightAsider",
  data() {
    return {
      asiderToggleFlag: !this.isHidden
    };
  },
  components: {

  },
  mounted() {
  },
  methods: {
    asiderToggle() {
      this.asiderToggleFlag = !this.asiderToggleFlag;
    } 
  },
  computed: {
    asider() {
      return {
        right: this.asiderToggleFlag ? "10px" : "-" + this.asiderWidth,
        width: this.asiderWidth
      };
    }
  },
  props: {
    asiderWidth: {
      type: String,
      default: "400px"
    },
    isHidden: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.asider {
  transition: right 0.5s;
  height: calc( 100% - 70px );
  position: fixed;
  bottom: 10px;
  display: flex;
  flex-flow: column;
  z-index: 10;
  color: #ffffff;
  .toggleBtn {
    display: block;
    height: 80px;
    width: 20px;
    position: absolute;
    top: 50%;
    left: -20px;
    margin-top: -40px;
    font-size: 24px;
    text-align: center;
    line-height: 80px;
    color: #ffffff;
    box-sizing: border-box;
    border-radius: 6px 0 0 6px;
    background: rgba(8, 8, 8, 0.7);
    cursor: pointer;
    z-index: 5;
  }
}
</style>
