/**
 * @Descripttion : 
 * @Author       : 马识途
 * @Date         : 2020-04-07 16:39:32
 * @LastEditTime : 2020-06-08 19:48:37
 * @FilePath     : \projecte:\codeFile\common-compenents\src\main.js
*/
import MainHeader from './components/header/index.vue'
import TitleBar from './components/title-bar/index.vue'
import ShadowContent from './components/shadow-content/index.vue'
import ElDialogSelf from './components/dialog/index.vue'
import ElTableSelf from './components/table/index.vue'
import ElMenuVerticalSelf from './components/el-menu/index.vue'
import FileContent from './components/fileContent/index'
import MapRightAsider from './components/map-right-asider/index.vue'
import msgSyncEventBus from './components/utils/eventBus'
import MapTools from './components/mapTool/index.vue';
import Upload from './components/upload/index.vue';
import LeftTopProup from './components/leftTopProup/index.vue';
import MapLegend from './components/map-legend/index.vue';
import EchartBox from './components/echart-box/index.vue';
import './assets/font/iconfont.css'
const components = [
  MainHeader,
  TitleBar,
  ShadowContent,
  ElDialogSelf,
  ElTableSelf,
  ElMenuVerticalSelf,
  FileContent,
  MapRightAsider,
  MapTools,
  Upload,
  LeftTopProup,
  MapLegend,
  EchartBox
]
/**
 * 绑定组件
 * @param Vue
 */
function bindComponents(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
/**
 * 为了使用 Vue.use() 使用插件
 * https://cn.vuejs.org/v2/api/#Vue-use
 * @param Vue
 */
function install(Vue) {
  bindComponents(Vue)
}
export default { 
  install, 
  MainHeader, 
  TitleBar, 
  ShadowContent, 
  ElDialogSelf, 
  ElTableSelf,
  ElMenuVerticalSelf,
  FileContent,
  MapRightAsider,
  msgSyncEventBus,
  MapTools
}

