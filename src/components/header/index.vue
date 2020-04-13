<template>
  <el-row class="m-header">
    <div class="logo-box">
      <div class="leftbg">
        <div class="logo"></div>
        <div class="logo-title">
          {{title}}
        </div>
      </div>
      <div class="bg-right"></div>
    </div>
    <div class="admin-content">
      <HeaderMessage/>
      <span class="help img"></span>
      <el-tooltip class="item" effect="dark" :content="'欢迎您：' + userName" placement="bottom">
        <span class="admin img"></span>
      </el-tooltip>
      <span @click="home" class="home img"></span>
      <span @click="exit" class="exit img"></span>
    </div>
    <div class="menu-content">
      <el-menu
        :default-active="activeIndex"
        :router="true"
        class="el-menu"
        mode="horizontal"
        background-color="#1E9FFF"
        active-text-color="#ffffff"
        text-color="#BCE2FF"
      >
        <template v-for="(item, index) of menuList">
          <el-menu-item v-if="item.list.length==0" :index="item.url" :key="String(index+'a')">{{item.name}}</el-menu-item>
          <el-submenu v-else index="keep" :key="index">
            <template slot="title">
              {{item.name}}
            </template>
            <el-menu-item v-for="(itemC, indexC) of item.list" :key="index+'-'+indexC" :index="itemC.url">{{itemC.name}}</el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </div>

  </el-row>
</template>

<script>
import axios from 'axios' //all spread 不是实例方法
import HeaderMessage from './message/message'
export default {
  name: 'MainHeader',
  data () {
    return {
      activeIndex: '/',
    }
  },
  methods: {
    exit(){
      axios.all(
        [
          this.axios.get(this.$config.serverIP + 'cas/logout'),
          this.axios.get(this.$config.adminIP + 'wasc-admin/logout')
        ]
      ).then(
        axios.spread( (test1Res,test2Res) => {
          console.log(test1Res)
          console.log(test2Res)
          if(test1Res.status==200&&test2Res.status==200){
            location.reload(true)
          }else{
            this.$error('退出失败，请重试')
          }
        })
      ).catch((error) => {
        console.log(error);
        this.$error('退出失败，请重试')
      })
    },
    setCurrentRoute () {
      this.activeIndex = this.$route.path //关键   通过他就可以监听到当前路由状态并激活当前菜单
    },
    home(){
      location.href = this.$config.adminIP + 'wasc-admin/'
    }
  },
  mounted() {
    console.log(this);
  },
  created () {
    this.setCurrentRoute()
  },
  props:['title','menuList','userName'],
  components:{
    HeaderMessage
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .m-header{
    height: 100%;
    background: #1E9FFF;
    .logo-box{
      position: relative;
      float: left;
      height: 100%;
      .leftbg{
        position: relative;
        float: left;
        // background: #0092BF;
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
      .bg-right{
        height: 100%;
        width: 30px;
        float: left;
        // background: url('../../assets/img/bg-right.png') no-repeat center;
        background-size: 100% 100%;
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
      >>> .el-menu-item{
        font-size: 16px;
        // font-weight: 900;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        line-height: initial;
        box-sizing: border-box;
        padding-bottom: 5px;
        border-bottom: 4px solid transparent;
        &.is-active{
          background-color: #0092BF!important;
          border-bottom: 4px solid #0083A3!important;
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
