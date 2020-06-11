<template>
  <div class="m-header" ref="header">
    <div class="logo-box" ref="header-logo">
      <div class="leftbg">
        <div class="logo"></div>
        <div class="logo-title">
          {{title}}
        </div>
      </div>
    </div>
    <div class="admin-content" ref="header-admin">
      <slot name="one"></slot>
      <HeaderMessage/>
      <slot name="two"></slot>
      <el-tooltip class="item" effect="dark" content="帮助" placement="bottom">
        <span class="help img"></span>
      </el-tooltip>
      <slot name="three"></slot>
      <el-tooltip class="item" effect="dark" :content="'欢迎您：' + userName" placement="bottom">
        <span class="admin img"></span>
      </el-tooltip>
      <slot name="four"></slot>
      <el-tooltip class="item" effect="dark" content="返回系统平台" placement="bottom">
        <span @click="home" class="home img"></span>
      </el-tooltip>
      <slot name="five"></slot>
      <el-tooltip class="item" effect="dark" content="退出" placement="bottom">
        <span @click="exit" class="exit img"></span>
      </el-tooltip>
      <slot name="six"></slot>
    </div>
    <div class="menu-content"  ref="header-menu">
      <el-menu
        :default-active="activeIndex"
        :router="true"
        class="el-menu"
        mode="horizontal"
        background-color="transparent"
        active-text-color="#ffffff"
        text-color="#BCE2FF"
      >
        <template v-if="!viceMenuShow">
          <el-menu-item
            v-for="(item, index) of menuList" 
            @click="routerClick(item)" 
            :index="item.url" 
            :key="String(index+'a')"
          >{{item.name}}</el-menu-item>
        </template>
        <el-submenu v-else index="2">
          <template slot="title">菜单</template>
          <el-menu-item 
            v-for="(item, index) of menuList" 
            :index="item.url"
            :key="index+'aads'"
          >{{item.name}}</el-menu-item>          
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import axios from 'axios' //all spread 不是实例方法
import HeaderMessage from './message/message'
export default {
  name: 'MainHeader',
  data () {
    return {
      activeIndex: '/',
      headerLeftWidth: 0,
      headerRightWidth: 0,
      viceMenuShow: false
    }
  },
  methods: {
    exit(){
      axios.all(
        [
          this.axios.get(this.serverIP + 'cas/logout'),
          this.axios.get(this.adminIP + 'wasc-admin/logout')
        ]
      ).then(
        axios.spread( (test1Res, test2Res) => {
          console.log(test1Res)
          console.log(test2Res)
          if(test1Res.status==200&&test2Res.status==200){
            location.reload(true)
          }else{
            // this.$message.error('退出失败，请重试')
            
          }
          location.reload(true)
        })
      ).catch((error) => {
        location.reload(true)
        console.log(error);
        // this.$message.error('退出失败，请重试')
      })
      this.beforeExit()
    },
    setCurrentRoute () {
      this.activeIndex = '/' + this.$route.path.split('/')[1]
    },
    home(){
      location.href = this.adminIP + 'wasc-admin/'
    },
    menuResize(){
      let timer = null
      this.headerLeftWidth = this.$refs['header-logo'].offsetWidth
      this.headerRightWidth = this.$refs['header-admin'].offsetWidth
      window.addEventListener('resize', () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          if(this.$refs['header'].offsetWidth<=this.headerLeftWidth+this.headerRightWidth+this.$refs['header-menu'].offsetWidth+1){
            this.viceMenuShow = true
          }else{
            this.viceMenuShow = false
          }
        }, 400);
      })
    }
  },
  mounted() {
    setTimeout(() => {
      this.setCurrentRoute()
    }, 500)
    this.menuResize()
  },
  props:{
    title: {
      type: String,
      required: true,
    },
    menuList: {
      type: Array,
      required: true,
    },
    userName: {
      required: true,
    },
    axios: {
      required: true,
    },
    serverIP: {
      type: String,
      required: true,
    },
    adminIP: {
      type: String,
      required: true,
    },
    routerClick: {
      type: Function,
      default: function () {
        return function(){

        }
      }
    },
    beforeExit: {
      type: Function,
      default: function () {
        return function(){

        }
      }
    }
  },
  components:{
    HeaderMessage
  },
  provide: function () {
    return {
      axios: this.axios,
      serverIP: this.serverIP
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .m-header{
    height: 100%;
    background: #009688;
    .logo-box{
      position: relative;
      float: left;
      height: 100%;
      .leftbg{
        position: relative;
        float: left;
        border-radius: 0 0 0 6px;
        padding-right: 4px;
        height: 100%;
        z-index: 20;
        .logo{
          float: left;
          height: 100%;
          width: 30px;
          background: url('../../assets/img/logo.png') no-repeat center;
          background-size: contain;
          margin: 0 9px;
        }
        .logo-title{
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          float: left;
          font-size: 21px;
          color: #ffffff;
        }
      }
    }
    .menu-content{
      height: 100%;
      float: right;
      margin-right: 10px;
    }
    .admin-content{
      height: 100%;
      float: right;
    }
    .el-col{
      height: 100%;
    }
    .el-menu{
      height: 100%;
      border-bottom: 0;
      font-size: 18px;
      /deep/ .el-menu-item{
        font-size: 16px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: initial;
        box-sizing: border-box;
        border-bottom: 5px solid transparent;
        background-color: transparent!important;
        &.is-active{
          border-bottom: 5px solid #5FB878!important;
          font-weight: 400;
        }
        &:hover{
          background-color: transparent!important;
          border-bottom: 5px solid #5FB878!important;
          color: #ffffff!important;
        }
      }
      /deep/ .el-submenu{
        height: 100%;
        .el-submenu__title{
          height: 100%;
          font-size: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          line-height: initial;
          border-bottom: 5px solid transparent!important;
          &:hover{
            background-color: transparent!important;
            border-bottom: 5px solid #5FB878!important;
            color: #ffffff!important;
          }
          i{
            color: #ffffff;
          }
        }
      }
    }
    span.img{
      height: 100%;
      width: 40px;
      cursor: pointer;
      float: left;
      &.exit{
        background: url('../../assets/img/exit.png') no-repeat center / 24px 24px;
      }
      &.admin{
        background: url('../../assets/img/admin.png') no-repeat center / 24px 24px;
      }
      &.help{
        background: url('../../assets/img/help.png') no-repeat center / 24px 24px;
      }
      &.home{
        background: url('../../assets/img/home.png') no-repeat center / 24px 24px;
      }
      &.xiaoxi{
        background: url('../../assets/img/xiaoxi.png') no-repeat center / 24px 24px;
      }
    }
    dl.user{
      padding: 0 5px;
      margin: 0;
      height: 100%;
      color: #ffffff;
      font-size: 16px;
      float: right;
      overflow: hidden;
      dt,dd{
        float: left;
        height: 100%;
        padding: 0 5px;
      }
    }
  }
</style>
<style lang="scss">
  .el-menu--horizontal:not(.el-menu){
    background: #009688!important;
    .el-menu-item{
      font-size: 16px;
      border-left: 4px solid transparent!important;
      &.is-active{
        border-left: 4px solid #5FB878!important;
        font-weight: 400;
      }
    }
  }
</style>
