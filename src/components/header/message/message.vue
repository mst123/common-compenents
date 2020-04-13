<template>
  <div
    @mouseover="floatVisible=true"
    @mouseout="floatVisible=false"
    class="msg-top-content"
  >
    <el-badge :value="messageNum" class="num-item">
      <div class="bg"></div>
    </el-badge>
    <div v-show="floatVisible" class="float-box">
      <div class="sanjiao-content">
        <div class="sanjiao"></div>
      </div>
      <div class="msg-content">
        <div class="msg-title">
          <p>系统消息({{messageNum}})</p>
          <el-link @click="readMore" :underline='false' class="msg-more" type="primary">查看更多</el-link>
        </div>
        <div v-if="messageNum" class="infinite-list"
          v-infinite-scroll="msgLoadMore"
          style="overflow-y:auto;overflow-x:hidden;"
          infinite-scroll-disabled="disabled"
        >
          <template v-for="(item, index) of msgList">
            <el-tooltip v-if="item.NOTIFICATIONS.length>19" :key="index" class="item" effect="dark" :content="item.NOTIFICATIONS" placement="top">
              <div @click="previewMsg(item)" class="infinite-list-item">
                <i :class="item.NOTICE_TYPE==2?'el-icon-s-comment':'el-icon-finished'"></i>
                {{item.NOTIFICATIONS}}
              </div>
              <div class="dashed"></div>
            </el-tooltip>
            <template v-else>
              <div @click="previewMsg(item)" class="infinite-list-item" :key="index">
                <i :class="item.NOTICE_TYPE==2?'el-icon-s-comment':'el-icon-finished'"></i>
                {{item.NOTIFICATIONS}}
              </div>
              <div class="dashed" :key="index+'a'"></div>
            </template>
          </template>
          <p class="title" v-if="loading">加载中...</p>
          <p class="title" v-if="noMore">没有更多了</p>
        </div>
        <p v-else>
          暂无新消息
        </p>
      </div>
    </div>
    <el-dialog
      title="消息提醒"
      :visible.sync="dialogMessage"
      :close-on-click-modal="false"
      width="800px"
      append-to-body
    >
      <TableCom ref="tableCom" @messageEmit="previewMsg" />
    </el-dialog>
    <el-dialog
      title="消息信息"
      :visible.sync="dialogNotice"
      :close-on-click-modal="false"
      width="400px"
      append-to-body
    >
      <p class="messageNotice">{{messageNotice}}</p>
    </el-dialog>
  </div>
</template>

<script>
import TableCom from './components/table'
export default {
  name: 'message',
  data () {
    return {
      messageNum: 0, //提示消息总数
      dialogMessage: false, //消息总弹窗
      dialogNotice: false,  //提醒类信息弹窗
      messageNotice: '',
      msgList: [     //提示消息列表

      ],
      floatVisible: false,
      currentPage: 1,
      loading: false
    }
  },
  methods: {
    readMore(){
      this.dialogMessage = true
    },
    msgLoadMore(){ //滚动加载
      this.currentPage++
      if(!this.noMore){
        this.getUnHandleTotal()
      }
    },
    previewMsg(item){
      console.log(item);
      if(item.NOTICE_TYPE==2){ //消息类
        this.dialogNotice = true
        this.messageNotice = item.NOTIFICATIONS
        //将未读消息标记为已读
        if(item.NOTICE_STATUS!=2){ //筛选出已读消息
          this.axios.post(this.$config.serverIP + 'siltDam/SwcSysNotice/getSwcSysNoticeReadStatus',
            {
              noticeId: item.NOTICE_ID,
            }
          ).then((res) => {
            console.log(res)
            //刷新头部未读消息
            this.currentPage = 1
            this.msgList = []
            this.getUnHandleTotal()
            //刷新弹出框消息
            if(this.dialogMessage){
              this.$refs['tableCom'].getMessage()
            }
          }).catch((error) => {
            console.log(error);
          })
        }
      }else{ //办理类
        console.log('办理');

        this.$router.push(item.SUBMODULE_URL)
      }
    },
    getUnHandleTotal(){
      this.axios.post(this.$config.serverIP + 'siltDam/SwcSysNotice/getSwcSysNotice',
        {
          page: this.currentPage,
          rows: 6
        }
      ).then((res) => {
        console.log(res)
        if(res.data.meta.success){
          this.msgList.push(...res.data.data.list)
          this.messageNum = res.data.data.total
        }
      }).catch((error) => {

      })
    }
  },
  mounted() {
    this.getUnHandleTotal()
  },
  created () {

  },
  props:[],
  components: {
    TableCom
  },
  computed: {
    noMore () {
      return this.currentPage>Math.ceil(this.messageNum/6)
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .msg-top-content{
    position: relative;
    width: 40px;
    height: 100%;
    box-sizing: border-box;
    float: left;
    .num-item{
      height: 100%;
      width: 40px;
      cursor: pointer;
      /deep/ .el-badge__content.is-fixed{
        transform: translateY(4%) translateX(65%);
        height: 15px;
        line-height: 15px;
        padding: 0 4px;
      }
      .bg{
        height: 100%;
        width: 40px;
        background: url('../../../assets/img/xiaoxi.png') no-repeat center;
        background-size: 24px 24px;
      }
    }
    .float-box{
      width: 340px;
      height: 228px;

      position: absolute;
      top: 40px;
      left: -150px;
      z-index: 2;
      .sanjiao-content{
        height: 18px;
        .sanjiao{
          height: 0;
          width: 0;
          border-width: 15px;
          border-style: solid;
          border-color: transparent transparent #ffffff transparent;
          margin: 0 auto;
          position: relative;
          top: -11px;
        }
      }
      .msg-content{
        width: 340px;
        min-height: 210px;
        background: #ffffff;
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid #cccccc;
        box-shadow: 5px 5px 20px #888888;
        .msg-title{
          height: 50px;
          line-height: 50px;
          p{
            float: left;
            padding: 0 20px;
            margin: 0;
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            font-weight: 900;
          }
          .msg-more{
            float: right;
            font-size: 14px;
            margin-right: 20px;
          }
        }
        .infinite-list{
          width: 340px;
          min-height: 30px;
          max-height: 150px;
          .infinite-list-item{
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            width: 100%;
            height: 29px;
            line-height: 29px;
            box-sizing: border-box;
            text-align: left;
            font-size: 14px;
            color: #7E7E7E;
            cursor: pointer;
            i{
              font-size: 20px;
              color: #424242;
              padding: 0 15px;
            }
          }
          .dashed{
            height: 0;
            border-bottom: 1px dashed #cccccc;
            width: 100%;
            position: relative;
            left: 50px;
          }
          p.title{
            width: 100%;
            text-align: center;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
          }
        }
        &>p{
          width: 100%;
          text-align: center;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
        }
      }
    }
  }
  .messageNotice{
    width: 100%;
    height: 24px;
    line-height: 24px;
  }
  // 弹窗框
  /deep/ .el-dialog {
    .el-dialog__header {
      background: #3fbcdd;
      padding: 0 20px;
      height: 35px;
      line-height: 35px;
      font-size: 16px;
      span {
        color: #ffffff;
      }
      .el-dialog__headerbtn {
        top: 9px;
      }
      .el-dialog__close {
        font-size: 20px;
        color: #ffffff;
      }
      .el-dialog__title {
        float: left;
        font-size: 16px;
        padding-top: 5px;
      }
    }
    .el-dialog__body{
      padding: 10px 20px;
    }
  }
</style>
