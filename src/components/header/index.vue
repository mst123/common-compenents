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
        class="el-menu"
        mode="horizontal"
        background-color="#00AFD7"
        active-text-color="#ffffff"
        text-color="#ffffff"
      >
        <template v-for="(item, index) of menuList">
          <el-menu-item v-if="item.list.length==0" :index="item.url" :key="String(index+1)">{{item.name}}</el-menu-item>
          <el-submenu v-else index="keep" :key="index">
            <template slot="title">
              <!-- <el-menu-item class="group-title" :index="item.url">{{item.name}}</el-menu-item> -->
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
      this.axios.get(this.$config.serverIP + 'cas/logout')
      .then((res) => {
        if(res.status=='200'){
          // location.reload(true)
        }else{
          this.$error('退出失败，请重试')
        }
      }).catch((error) => {
        this.$error('退出失败，请重试')
      })
    },
    setCurrentRoute () {
      this.activeIndex = this.$route.path //关键   通过他就可以监听到当前路由状态并激活当前菜单
    },
    home(){

    },
  },
  mounted() {
    
  },
  created () {
    this.setCurrentRoute()
  },
  props:['title','menuList','userName'],
  components: {
    HeaderMessage
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .m-header{
    height: 40px;
    background: #00AFD7;
    .logo-box{
      position: relative;
      float: left;
      .leftbg{
        position: relative;
        float: left;
        background: #0092BF;
        border-radius: 0 0 0 6px;
        padding-right: 4px;
        height: 43px;
        z-index: 20;
        .logo{
          float: left;
          height: 28px;
          width: 30px;
          background: url('../../assets/img/logo.png') no-repeat;
          background-size: 100% 100%;
          margin: 9px 9px;
        }
        .logo-title{
          height: 43px;
          line-height: 43px;
          float: left;
          font-size: 24px;
          color: #ffffff;
        }
      }
      .bg-right{
        height: 43px;
        width: 30px;
        line-height: 43px;
        float: left;
        background: url('../../assets/img/bg-right.png') no-repeat center;
        background-size: 100% 100%;
      }
    }
    .menu-content{
      float: right;
      margin-right: 10px;
    }
    .admin-content{
      float: right;
    }
    .el-col{
      height: 40px;
    }
    .el-menu{
      height: 40px;
      border-bottom: 0;
      font-size: 18px;
      /deep/ .el-menu-item{
        font-size: 16px;
        font-weight: 900;
        height: 40px;
        line-height: 43px;
        &.is-active{
          background-color: #0092BF!important;
          border-bottom: 4px solid #0083A3!important;
        }
      }
      /deep/ .el-submenu__title{
        height: 40px;
        line-height: 43px;
      }
    }
    .group-title{
      display: inline;
      padding: 0;
    }
    span.img{
      height: 40px;
      width: 40px;
      background-size: contain;
      cursor: pointer;
      float: left;
      &.exit{
        background: url('../../assets/img/exit.png') no-repeat center;
      }
      &.admin{
        background: url('../../assets/img/admin.png') no-repeat center;
      }
      &.help{
        background: url('../../assets/img/help.png') no-repeat center;
      }
      &.home{
        background: url('../../assets/img/home.png') no-repeat center;
      }
      &.xiaoxi{
        background: url('../../assets/img/xiaoxi.png') no-repeat center;
      }
    }
    dl.user{
      padding: 0 5px;
      margin: 0;
      height: 40px;
      line-height: 40px;
      color: #ffffff;
      font-size: 16px;
      float: right;
      overflow: hidden;
      dt,dd{
        float: left;
        height: 40px;
        line-height: 40px;
        padding: 0 5px;
      }
    }
  }
</style>
