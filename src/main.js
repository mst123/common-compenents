import MainHeader from './components/header/index.vue'
const components = [MainHeader]
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
export default { install, MainHeader }

