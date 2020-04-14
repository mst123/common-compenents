import MainHeader from './components/header/index.vue'
import TitleBar from './components/title-bar/index.vue'
import ShadowContent from './components/shadow-content/index.vue'
import ElDialogSelf from './components/dialog/index.vue'
import ElTableSelf from './components/table/index.vue'
import ElMenuVerticalSelf from './components/el-menu/index.vue'
const components = [
  MainHeader,TitleBar,ShadowContent,ElDialogSelf,ElTableSelf,ElMenuVerticalSelf
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
  ElMenuVerticalSelf
}

