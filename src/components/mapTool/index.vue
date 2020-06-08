<!--
 * @Descripttion :
 * @Author       : 马识途
 * @Date         : 2020-05-07 11:14:58
 * @LastEditTime : 2020-06-08 10:48:06
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
          ref="el-tree"
          show-checkbox
          @check-change="checkChange"
          node-key="id"
        >
        </el-tree>
        <i class="_icon iconfont icon-tuceng" slot="reference"></i>
      </el-popover>
      <i @click="swipeClick"  class="_icon iconfont icon-duibi"></i>
      <i @click="multipleClick" class="_icon iconfont icon-duochuangkou"></i>
    </div>
    <div class="origin-tool tool">
      <i class="_icon el-icon-zoom-in" @click="zoomIn"></i>
      <i class="_icon el-icon-zoom-out" @click="zoomOut"></i>
      <i class="_icon iconfont icon-home" @click="home"></i>
      <el-popover
        popper-class="baseLayer-change"
        placement="right"
        trigger="click"
      >
        <div class="layer-change-content">
          <div
            @click="baseLayerChange(index)"
            class="layer-item"
            :class="index==baseLayerActiveIndex?'active':''"
            v-for="(item, index) of baseLayerList"
            :key="index"
          >
            <el-image style="width: 66px; height: 66px" :src="item.imgUrl" fit="cover"></el-image>
            <p class="title">{{item.title}}</p>
          </div>
        </div>
        <i class="_icon iconfont icon-tucengqiehuan" slot="reference"></i>
      </el-popover>

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
      multiControl: false,
      swipeControl: false,
      baseLayerList: [],
      normalLayerList: [ //天地图地图
        {
          id: "tdt-img",
          title: "影像",
          url: this.tdtLayerUrl + "/DataServer?T=img_w&x={col}&y={row}&l={level}",
          imgUrl: require('@/assets/img/mapTools/影像.png'),
          visible: true
        },
        {
          id: "tdt-vec",
          title: "矢量",
          url: this.tdtLayerUrl + "/DataServer?T=vec_w&x={col}&y={row}&l={level}",
          imgUrl: require('@/assets/img/mapTools/矢量.png'),
          visible: false
        },
        {
          id: "tdt-ter",
          title: "地形",
          url: this.tdtLayerUrl + "/DataServer?T=ter_w&x={col}&y={row}&l={level}",
          imgUrl: require('@/assets/img/mapTools/地形.png'),
          visible: false
        }
      ],
      sbzLayerList: [ //河南水保站底图
        {
          filter: 'basemap:2:0,basemap:5:0,basemap:7_0:0',
          imgUrl: require('@/assets/img/mapTools/dixing1_1.png'),
          title: '地形图',
          visible: true,
          id: 'sbz_dx'
        },
        {
          filter: 'basemap:3:0,basemap:7_0:0',
          imgUrl: require('@/assets/img/mapTools/ly_1.png'),
          title: '流域图',
          visible: false,
          id: 'sbz_ly'
        },
        {
          filter: 'basemap:0:0,basemap:1_1:0,basemap:7_1:0',
          imgUrl: require('@/assets/img/mapTools/wx3_1.png'),
          title: '卫星图',
          visible: false,
          id: 'sbz_wx'
        },
        {
          filter: 'basemap:4:0,basemap:7_0:0',
          imgUrl: require('@/assets/img/mapTools/zq1_1.png'),
          title: '政区图',
          visible: false,
          id: 'sbz_zq'
        },
        {
          filter: 'basemap:5:0,basemap:7_0:0',
          imgUrl: require('@/assets/img/mapTools/zqj_1.png'),
          title: '政区界图',
          visible: false,
          id: 'sbz_zqj'
        }
      ],
      baseLayerActiveIndex: 0, //当前显示的底图序号
      is_sbz_env: process.env.NODE_ENV === 'sbz'
    };
  },
  components: {

  },
  beforeMount() {
    this.baseLayerList = process.env.NODE_ENV === 'sbz'? [...this.sbzLayerList] : [...this.normalLayerList]
  },
  mounted() {
    this.BaseLayerAdd()
    this.treeInit()
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
    },
    tdtLayerUrl: { //天地图地址
      type: String,
      default: 'http://139.9.125.12:7070'
    },
    swipeClick: { //卷帘点击事件
      type: Function,
      default: () => {

      }
    },
    multipleClick: { //多窗口点击事件
      type: Function,
      default: () => {

      }
    },
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
    checkChange(currentNode,checked,childchecked){ //业务图层切换
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
    },
    baseLayerChange(index){ //基础图层切换
      this.layerControl(this.baseLayerList[this.baseLayerActiveIndex].id, false)
      this.layerControl(this.baseLayerList[index].id, true)
      this.baseLayerActiveIndex = index
    },
    BaseLayerAdd(){ //底图添加 包括普通环境和水保站环境
      loadModules([
        "esri/layers/WebTileLayer",
      ])
      .then(([WebTileLayer]) => {
        this.baseLayerList.forEach((item, index) => {
          let baseMapLayer
          if(this.is_sbz_env){
            baseMapLayer = new WebTileLayer({
              urlTemplate: `http://10.41.24.9:8093/api/wmts?layer=${item.filter}&style=default&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix={level}&TileCol={col}&TileRow={row}`,
              visible: item.visible,
              id: item.id
            })
          }else{
            baseMapLayer = new WebTileLayer(
              {
                id: item.id,
                visible: item.visible,
                urlTemplate: item.url + '&tk=' + '5d29f1edac02607fb072fbfbfea7e17b',
                subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"]
              }
            )
          }
          this.map.add(baseMapLayer)
          if(item.visible){
            this.baseLayerActiveIndex = index
          }
        })
      })
      .catch(err => {
        console.error(err);
      });
    },
    treeInit(){ //默认勾选图层处理
      //不会正确触发checkChange函数，需要手动触发
      Object.keys(this.layerList).forEach(key => {
        this.layerList[key].children.forEach(item => {
          if(item.visible){
            this.$refs['el-tree'].setChecked(item, true)
            this.checkChange(item, true)//手动触发
          }
        })
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
  .multiple-window{
    height: 100%;
    padding: 0;
    >>> .el-dialog__body{
      height: calc(100vh - 35px);
      max-height: 100vh!important;
      padding: 0!important;
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
  .baseLayer-change{
    background: rgba(8, 8, 8, 0.5);
    border: 0;
    .el-popover__title{
      color: #ffffff;
    }
    .popper__arrow{
      background: rgba(8, 8, 8, 0.5);
      border: 0;
      &::after{
        border-right-color: rgba(8, 8, 8, 0.5)!important;
      }
    }
    .layer-change-content{
      display: flex;
      .layer-item{
        width: 70px;
        height: 70px;
        position: relative;
        box-sizing: border-box;
        border-width: 2px;
        border-style: solid;
        border-color: transparent;
        margin-right: 10px;
        cursor: pointer;
        &.active{
          border-color: #d37adf;
          .title{
            color: #d37adf;
          }
        }
        .title{
          position: absolute;
          bottom: 0;
          width: 100%;
          text-align: center;
          height: 15px;
          line-height: 15px;
          color: #ffffff;
          background: #cccccc;
        }
      }
    }
  }
</style>
