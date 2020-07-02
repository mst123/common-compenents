<!--
 * @Descripttion :
 * @Author       : 马识途
 * @Date         : 2020-05-07 11:14:58
 * @LastEditTime : 2020-06-18 20:24:21
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
          shadowUrl: this.arcgisServerIP + 'arcgis/rest/services/henan/全国_镂空_预防监督系统/MapServer',
        },
        {
          id: "npm-self-vec",
          title: "矢量",
          restUrl: this.arcgisServerIP + "arcgis/rest/services/henan/行政区划2/MapServer",
        },
        {
          filter: 'basemap:2:0,basemap:5:0,basemap:7_0:0,000AW:000AZ_0:0,000AW:000BP_0:0,000AW:000B0_0:0',
          title: '地形图',
          id: 'npm-sbz_dx'
        },
        {
          filter: 'basemap:0:0,basemap:1_1:0,basemap:7_1:0,000AW:000AZ_1:0,000AW:000BP_1:0,000AW:000B0_1:0',
          title: '卫星图',
          id: 'npm-sbz_wx'
        },
        {
          filter: 'basemap:4:0,basemap:5:0,basemap:7_0:0,000AW:000AZ_0:0,000AW:000BP_0:0,000AW:000B0_0:0,000AW:000AX_0:0,000AW:000BN_0:0,000AW:000EV_0:0',
          title: '政区图',
          id: 'npm-sbz_zq'
        },
        {
          filter: 'basemap:3:0,basemap:1_0:0,basemap:7_0:0,basemap:8_0:0,000AW:000AZ_0:0,000AW:000BP_0:0,000AW:000B0_0:0,000AW:000AX_0:0,000AW:000BN_0:0,000AW:000EV_0:0',  
          title: '流域图',
          id: 'npm-sbz_ly'
        }
      ],
      baseLayerActiveIndex: 0, //当前显示的底图序号
      resolutionList: [
        {level: 0,
        resolution: 156543.03392800014,
        scale: 5.91657527591555E8},
        {level: 1,
        resolution: 78271.51696399994,
        scale: 2.95828763795777E8},
        {level: 2,
        resolution: 39135.75848200009,
        scale: 1.47914381897889E8},
        {level: 3,
        resolution: 19567.87924099992,
        scale: 7.3957190948944E7},
        {level: 4,
        resolution: 9783.93962049996,
        scale: 3.6978595474472E7},
        {level: 5,
        resolution: 4891.96981024998,
        scale: 1.8489297737236E7},
        {level: 6,
        resolution: 2445.98490512499,
        scale: 9244648.868618},
        {level: 7,
        resolution: 1222.992452562495,
        scale: 4622324.434309},
        {level: 8,
        resolution: 611.4962262813797,
        scale: 2311162.217155},
        {level: 9,
        resolution: 305.74811314055756,
        scale: 1155581.108577},
        {level: 10,
        resolution: 152.87405657041106,
        scale: 577790.554289},
        {level: 11,
        resolution: 76.43702828507324,
        scale: 288895.277144},
        {level: 12,
        resolution: 38.21851414253662,
        scale: 144447.638572},
        {level: 13,
        resolution: 19.10925707126831,
        scale: 72223.819286},
        {level: 14,
        resolution: 9.554628535634155,
        scale: 36111.909643},
        {level: 15,
        resolution: 4.77731426794937,
        scale: 18055.954822},
        {level: 16,
        resolution: 2.388657133974685,
        scale: 9027.977411},
        {level: 17,
        resolution: 1.1943285668550503,
        scale: 4513.988705},
        {level: 18,
        resolution: 0.5971642835598172,
        scale: 2256.994353},
        {level: 19,
        resolution: 0.29858214164761665,
        scale: 1128.497176},
        {level: 20,
        resolution: 0.14929107082380832,
        scale: 564.248588},
      ]
    };
  },
  components: {

  },
  mounted() {
    loadModules([
      "esri/layers/support/LOD",
    ])
    .then(([LOD]) => {
      this.mapView.spatialReference = {
        wkid:'3857'
      }
      this.mapView.constraints = {
        lods:[...this.resolutionList.map(item => new LOD(item))]
      }
      this.BaseLayerAdd()
    })
    .catch(err => {
      console.error(err);
    })
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
   
      required: true
    }
  },
  methods: {
    zoomIn(){ //放大
      this.mapView.goTo({
        zoom: this.mapView.zoom + 1,
        center: this.mapView.center
      })
    },
    zoomOut(){ //缩小
      this.mapView.goTo({
        zoom: this.mapView.zoom - 1,
        center: this.mapView.center
      })
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
      }else if(this.baseLayerList[this.baseLayerActiveIndex].filter){
        this.layerControl(this.baseLayerList[this.baseLayerActiveIndex].id+'-title', false)
      }
      this.layerControl(this.baseLayerList[this.baseLayerActiveIndex].id, false)
      if(this.baseLayerList[index].id=='npm-tdt-img'){
        this.layerControl(this.baseLayerList[index].id+'-bound', true)
        this.layerControl(this.baseLayerList[index].id+'-shadow', true)
      }else if(this.baseLayerList[index].filter){
        this.layerControl(this.baseLayerList[index].id+'-title', true)
      }
      this.layerControl(this.baseLayerList[index].id, true)
      this.baseLayerActiveIndex = index
    },
    BaseLayerAdd(){ //底图添加 包括普通环境和水保站环境
      loadModules([
        "esri/layers/WebTileLayer",
        "esri/layers/MapImageLayer",
        "esri/layers/WMSLayer",
        "esri/layers/BaseDynamicLayer",
        "esri/geometry/support/webMercatorUtils",
        "esri/core/urlUtils"
      ])
      .then(([WebTileLayer, MapImageLayer, WMSLayer, BaseDynamicLayer, webMercatorUtils]) => {
        let CustomWMSLayer = BaseDynamicLayer.createSubclass({
          properties: {
            mapUrl: null,
            mapParameters: null
          },
          getImageUrl: function(extent, width, height) {
            var urlVariables = this._prepareQuery(
              this.mapParameters,
              extent,
              width,
              height
            );
            var queryString = this._joinUrlVariables(urlVariables);
            return this.mapUrl + "?" + queryString;
          },
          _prepareQuery: function(queryParameters, extent, width, height) {
            var wkid = extent.spatialReference.isWebMercator
              ? 3857
              : extent.spatialReference.wkid;
            let extentex
            if(wkid==3857){
              extentex = webMercatorUtils.webMercatorToGeographic(extent)
            }else{
              extentex = extent
            }
            var replacers = {
              width: width,
              height: height,
              xmin: extentex.xmin,
              xmax: extentex.xmax,
              ymin: extentex.ymin,
              ymax: extentex.ymax
            };
            var urlVariables = this._replace({}, queryParameters, replacers);
            return urlVariables;
          },
          _replace: function(urlVariables, queryParameters, replacers) {
            try {
              Object.keys(queryParameters).forEach(function(key) {
                urlVariables[key] = Object.keys(replacers).reduce(function(
                  previous,
                  replacerKey
                ) {
                  return previous.replace(
                    "{" + replacerKey + "}",
                    replacers[replacerKey]
                  );
                },
                queryParameters[key]);
              });
            } catch (error) {
              console.log(error);

            }
            return urlVariables;
          },
          _joinUrlVariables: function(urlVariables) {
            return Object.keys(urlVariables).reduce(function(previous, key) {
              return (
                previous + (previous ? "&" : "") + key + "=" + urlVariables[key]
              );
            }, "");
          }
        })
        this.baseLayerList.forEach((item, index) => {
          let baseMapLayer
          if(item.filter){
            baseMapLayer = new WebTileLayer({
              urlTemplate: `http://10.41.24.9:8093/api/wmts?layer=${item.filter}&style=default&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix={level}&TileCol={col}&TileRow={row}`,
              visible: item.id==this.activeLayerId?true:false,
              id: item.id
            })
            let color_id = item.title=='卫星图'?'1':'0'
            let titleLayer =  new CustomWMSLayer({
              id: item.id + '-title',
              visible: (item.id==this.activeLayerId)?true:false,
              mapUrl: 'http://10.41.24.9:8093/api/wms',
              mapParameters: {
                layers:'000BP,000B0,000AZ',
                user_id:'13346',
                color_id,
                tiled:'false',
                draw_text:'true',
                union_lyr:'true',
                SERVICE: "WMS",
                REQUEST: "GetMap",
                FORMAT: "image/png",
                VERSION: "1.1.1",
                WIDTH: "{width}",
                HEIGHT: "{height}",
                BBOX: "{xmin},{ymin},{xmax},{ymax}"
              }
            });
            this.map.add(titleLayer, 10)
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
    },
    CustomWMSLayer(){
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
          background: url('../../assets/img/mapTools/yx.png') no-repeat center / cover;
        }
        &:nth-child(2){
          background: url('../../assets/img/mapTools/sl.png') no-repeat center / cover;
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
