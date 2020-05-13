<!--
 * @Descripttion : 地图插件
 * @Author       : 马识途
 * @Date         : 2020-05-07 11:14:58
 * @LastEditTime : 2020-05-13 13:27:45
 * @FilePath     : \projecte:\codeFile\common-compenents\src\components\mapTool\index.vue
 -->
<template>
  <div class="map-tool-content">
    <div class="expand-tool tool">
      <el-popover
        popper-class="layer-control"
        placement="right"
        title="图层管理"
        width="200"
        trigger="click"
      >
        <el-tree
          :data="layerList"
          show-checkbox
          @check-change="checkChange"
          node-key="id"
        >
        </el-tree>

        <i class="_icon iconfont icon-tuceng" slot="reference"></i>
      </el-popover>

      <i class="_icon iconfont icon-duibi"></i>
      <i class="_icon iconfont icon-duochuangkou"></i>
    </div>
    <div class="origin-tool tool">
      <i class="_icon el-icon-zoom-in" @click="zoomIn"></i>
      <i class="_icon el-icon-zoom-out" @click="zoomOut"></i>
      <i class="_icon iconfont icon-home" @click="home"></i>
    </div>
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
export default {
  name: "MapTools",
  data() {
    return {
      activeZoom: false,
    };
  },
  components: {

  },
  mounted() {

  },
  props: {
    map: { //地图实例
      required: true
    },
    mapView: { //mapView实例
      required: true
    },
    center: { //初始化中心点及层级
      type: Object,
      default: function () {
        return {
          zoom: 7,
          center: [113.65, 34.76667]
        }
      }
    },
    layerList: { //图层控制列表
      type: Array,
      default: function () {
        return []
      }
    },
    mapServerIP: { //地图服务地址
      type: String,
      required: true
    }
  },
  methods: {
    zoomIn(){ //放大
      if(!this.activeZoom){
        this.activeZoom = this.mapView.zoom
      }
      this.activeZoom++
      this.mapView.zoom = this.activeZoom
    },
    zoomOut(){ //缩小
      if(!this.activeZoom){
        this.activeZoom = this.mapView.zoom
      }
      this.activeZoom--
      this.mapView.zoom = this.activeZoom
    },
    home(){
      this.mapView.goTo(this.center)
    },
    layerControl(id, visible){
      this.map.findLayerById(id).visible = visible
    },
    checkChange(currentNode,checked,childchecked){
      loadModules([
        "esri/layers/MapImageLayer",
      ])
      .then(([MapImageLayer]) => {
        if(currentNode.url){
          if(this.map.findLayerById(currentNode.id)){
            this.map.findLayerById(currentNode.id).visible = checked
          }else{
            let Layer = new MapImageLayer(
            this.mapServerIP + currentNode.url,{
              id: currentNode.id,
              visible: checked
            })
            this.map.add(Layer)
          }
        }
      })
    }
  },
  computed: {


  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .map-tool-content{
    position: absolute;
    width: 0;
    height: 0;
    z-index: 20;
    top: 0;
    left: 0;
    &>.tool{
      min-height: 100px;
      padding-bottom: 10px;
      width: 50px;
      border-radius: 25px;
      background: rgba(8, 8, 8, 0.5);
      position: absolute;
      text-align: center;
      z-index: 2;
      left: 20px;
      &.expand-tool{
        top: 20px;
      }
      &.origin-tool{
        top: 200px;
      }
    }
    &>div i._icon{
      height: 40px;
      width: 40px;
      font-size: 20px;
      border-radius: 20px;
      cursor: pointer;
      color: #ffffff;
      margin-top: 10px;
      display: inline-block;
      background: rgba(8, 8, 8, 0.5);
      text-align: center;
      line-height: 40px;
      &.active{
        background: #009688;
      }
      &:hover{
        background: #009688;
      }
    }
  }

</style>
<style lang="scss">
  .layer-control{
    top: 60px!important;
    background: rgba(8, 8, 8, 0.5);
    border: 0;
    .el-popover__title{
      color: #ffffff;
    }
    .popper__arrow{
      top: 31.5px!important;
      background: rgba(8, 8, 8, 0.5);
      border: 0;
      &::after{
        border-right-color: rgba(8, 8, 8, 0.5)!important;
      }
    }
    .el-tree{
      background: transparent;
      color: #ffffff;
      .el-tree-node:focus>.el-tree-node__content{
        background: rgba(8, 8, 8, 0.5);
      }
      .el-tree-node__content:hover{
        background: rgba(8, 8, 8, 0.5);
      }
    }
  }
</style>
