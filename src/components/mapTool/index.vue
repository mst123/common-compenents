<!--
 * @Descripttion :
 * @Author       : 马识途
 * @Date         : 2020-05-07 11:14:58
 * @LastEditTime : 2020-06-17 15:05:39
 * @FilePath     : \projecte:\codeFile\common-compenents\src\components\mapTool\index.vue
 -->
<template>
  <div class="map-tool-content">
    <div
      class="origin-tool"
      :class="[isVertical?'vertical':'horizontal']"
      :style="positionStyle"
    > 
      <slot name="first">

      </slot>
      <el-tooltip class="item" effect="dark" content="放大" :placement="isVertical?'right':'bottom'">
        <i class="_icon el-icon-zoom-in" @click="zoomIn"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="缩小" :placement="isVertical?'right':'bottom'">
        <i class="_icon el-icon-zoom-out" @click="zoomOut"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="全图" :placement="isVertical?'right':'bottom'">
        <i class="_icon iconfont icon-home" @click="home"></i>
      </el-tooltip>
      <el-popover
        popper-class="baseLayer-change"
        :placement="isVertical?'right':'bottom'"
        trigger="hover"
      >
        <div class="layer-change-content">
          <div
            @click="baseLayerChange(index)"
            class="layer-item"
            :class="index==baseLayerActiveIndex?'active':''"
            v-for="(item, index) of baseLayerList"
            :key="index"
          >
            <div class="bg-conten"></div>
            <p class="title">{{item.title}}</p>
          </div>
        </div>
        <i class="_icon iconfont icon-ditu" slot="reference"></i>
      </el-popover>
      <slot name="last">

      </slot>
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
      baseLayerList: [
        {
          id: "npm-tdt-img", //tdt-img影像  self-vec矢量 sbz_dx地形图 sbz_wx卫星图 sbz_zq政区图 sbz_ly流域图
          title: "影像",
          url: "http://139.9.125.12:7070/DataServer?T=img_w&x={col}&y={row}&l={level}",
          boundUrl: this.arcgisServerIP + 'arcgis/rest/services/henan/行政区划_浮雕边界_影像用/MapServer',
          shadowUrl: this.arcgisServerIP + 'arcgis/rest/services/HeNanClicp/MapServer',
        },
        {
          id: "npm-self-vec",
          title: "矢量",
          restUrl: this.arcgisServerIP + "arcgis/rest/services/henan/行政区划2/MapServer",
        },
        {
          filter: 'basemap:2:0,basemap:5:0,basemap:7_0:0',
          title: '地形图',
          id: 'npm-sbz_dx'
        },
        {
          filter: 'basemap:0:0,basemap:1_1:0,basemap:7_1:0',
          title: '卫星图',
          id: 'npm-sbz_wx'
        },
        {
          filter: 'basemap:4:0,basemap:7_0:0',
          title: '政区图',
          id: 'npm-sbz_zq'
        },
        {
          filter: 'basemap:3:0,basemap:7_0:0',
          title: '流域图',
          id: 'npm-sbz_ly'
        }
      ],
      baseLayerActiveIndex: 0, //当前显示的底图序号
    };
  },
  components: {

  },
  mounted() {
    this.BaseLayerAdd()
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
          center: [114.65, 33.9]
        }
      }
    },
    left: { //position定位
      type: String,
      default: '20px'
    },
    top: { //position定位
      type: String,
      default: '20px'
    },
    isVertical: { //水平模式或者垂直模式
      type: Boolean,
      default: true
    },
    activeLayerId: { //默认激活图层的id
      type: String,
      default: 'npm-tdt-img'
      //npm-tdt-img影像  npm-self-vec矢量 npm-sbz_dx地形图 npm-sbz_wx卫星图 npm-sbz_zq政区图 npm-sbz_ly流域图
    },
    arcgisServerIP: { //rest地图服务地址
      type: String,
      default: 'http://10.1.100.73:7070',
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
    baseLayerChange(index){ //基础图层切换
      if(this.baseLayerList[this.baseLayerActiveIndex].id=='npm-tdt-img'){
        this.layerControl(this.baseLayerList[this.baseLayerActiveIndex].id+'-bound', false)
        this.layerControl(this.baseLayerList[this.baseLayerActiveIndex].id+'-shadow', false)
      }
      this.layerControl(this.baseLayerList[this.baseLayerActiveIndex].id, false)
      if(this.baseLayerList[index].id=='npm-tdt-img'){
        this.layerControl(this.baseLayerList[index].id+'-bound', true)
        this.layerControl(this.baseLayerList[index].id+'-shadow', true)
      }
      this.layerControl(this.baseLayerList[index].id, true)
      
      this.baseLayerActiveIndex = index
    },
    BaseLayerAdd(){ //底图添加 包括普通环境和水保站环境
      loadModules([
        "esri/layers/WebTileLayer",
        "esri/layers/MapImageLayer"
      ])
      .then(([WebTileLayer, MapImageLayer]) => {
        this.baseLayerList.forEach((item, index) => {
          let baseMapLayer
          if(item.filter){
            baseMapLayer = new WebTileLayer({
              urlTemplate: `http://10.41.24.9:8093/api/wmts?layer=${item.filter}&style=default&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix={level}&TileCol={col}&TileRow={row}`,
              visible: item.id==this.activeLayerId?true:false,
              id: item.id
            })
          }else if(item.url){
            baseMapLayer = new WebTileLayer(
              {
                id: item.id,
                visible: item.id==this.activeLayerId?true:false,
                urlTemplate: item.url + '&tk=' + '5d29f1edac02607fb072fbfbfea7e17b',
                subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"]
              }
            )
            let boundLayer = new MapImageLayer(
              item.boundUrl,
              {
                id: item.id + '-bound',
                visible: item.id==this.activeLayerId?true:false,
              }
            )
            this.map.add(boundLayer, 0)
            let shadowLayer = new MapImageLayer(
              item.shadowUrl,{
                id: item.id + '-shadow',
                opacity: 0.4,
                visible: item.id==this.activeLayerId?true:false,
              }
            )
            this.map.add(shadowLayer, 10)
          }else if(item.restUrl){
            baseMapLayer = new MapImageLayer(
              item.restUrl,
              {
                id: item.id,
                visible: item.id==this.activeLayerId?true:false,
              }
            )
          }
          this.map.add(baseMapLayer, 0)
        })
      })
      .catch(err => {
        console.error(err);
      });
    }
  },
  computed: {
    positionStyle() {
      return {
        top: this.top,
        left: this.left
      }
    }

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
    .origin-tool{
      border-radius: 25px;
      background:  rgba(8,8,8,0.5);
      position: absolute;
      z-index: 2;
      display: flex;
      justify-content: space-around;
      align-items: center;
      &.vertical{
        flex-flow: column;
        min-height: 200px;
        width: 50px;
      }
      &.horizontal{
        flex-flow: row;
        height: 50px;
        min-width: 200px;
      }
    }
    &>div i._icon{
      height: 40px;
      width: 40px;
      font-size: 20px;
      border-radius: 20px;
      cursor: pointer;
      color: #ffffff;
      display: inline-block;
      background:  rgba(8,8,8,0.5);
      text-align: center;
      line-height: 40px;
      margin: 5px;
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
  .baseLayer-change{
    background:  rgba(8,8,8,0.5);
    border: 0;
    .el-popover__title{
      color: #ffffff;
    }
    .popper__arrow{
      background:  rgba(8,8,8,0.5);
      border: 0;
      &::after{
        border-right-color:  rgba(8,8,8,0.5)!important;
      }
    }
    .layer-change-content{
      display: flex;
      flex-flow: row wrap;
      max-width: 230px;
      height: 130px;
      justify-content: space-between;
      align-content: space-between;
      .layer-item{
        width: 70px;
        height: 60px;
        position: relative;
        box-sizing: border-box;
        border-width: 2px;
        border-style: solid;
        border-color: transparent;
        cursor: pointer;
        &>.bg-conten{
          height: 66px;
          width: 66px;
        }
        &:nth-child(1){
          background: url('../../assets/img/mapTools/影像.png') no-repeat center / cover;
        }
        &:nth-child(2){
          background: url('../../assets/img/mapTools/矢量.png') no-repeat center / cover;
        }
        &:nth-child(3){
          background: url('../../assets/img/mapTools/dixing1_1.png') no-repeat center / cover;
        }
        &:nth-child(4){
          background: url('../../assets/img/mapTools/wx3_1.png') no-repeat center / cover;
        }
        &:nth-child(5){
          background: url('../../assets/img/mapTools/zq1_1.png') no-repeat center / cover;
        }
        &:nth-child(6){
          background: url('../../assets/img/mapTools/ly_1.png') no-repeat center / cover;
        }
        &.active{
          border-color: #009688;
          .title{
            color: #009688;
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
