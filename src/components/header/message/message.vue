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
        <div v-if="messageNum" class="infinite-list" v-infinite-scroll="msgLoadMore" style="overflow:auto">
          <template v-for="(item, index) of msgList">
            <el-tooltip v-if="item.name.length>19" :key="index" class="item" effect="dark" :content="item.name" placement="top">
              <div @click="previewMsg(item)" class="infinite-list-item">
                <i :class="item.type==1?'el-icon-s-comment':'el-icon-finished'"></i>
                {{item.name}}
              </div>
            </el-tooltip>
            <div @click="previewMsg(item)" v-else class="infinite-list-item" :key="index">
              <i :class="item.type==1?'el-icon-s-comment':'el-icon-finished'"></i>
              {{item.name}}
            </div>
          </template>
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
      <TableCom @messageEmit="previewMsg" />
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
      messageNum: 20, //提示消息总数
      dialogMessage: false, //消息总弹窗
      dialogNotice: false,  //提醒类信息弹窗
      messageNotice: '',
      msgList: [     //提示消息列表
        {
          name: '萨达萨达数据萨达萨达数据库萨达萨达数据库萨达萨达数据库萨达萨达数据库达萨达数据库萨达萨达数据库库',
          type: '0'
        },{
          name: '萨达萨达数据库萨达萨达数据萨达萨达数据',
          type: '1'
        },{
          name: '萨达萨达数据库萨达萨达数据萨达萨达数据库萨达萨萨达萨达数据萨达萨达数据库萨达萨',
          type: '0'
        },{
          name: '萨达萨达数据库',
          type: '0'
        },{
          name: '萨达萨达数据库',
          type: '1'
        },{
          name: '萨达萨达数据萨达萨达数据库萨达萨达数据库萨达萨达数据库萨达萨达数据库达萨达数据库萨达萨达数据库库',
          type: '0'
        }
      ],
      floatVisible: false, 
    }
  },
  methods: {
    readMore(){
      this.dialogMessage = true
    },
    msgLoadMore(){ //滚动加载
      console.log(1);
      let arr = [{
        name: '萨达萨达数据库',
        type: '0'
      },{
        name: '萨达萨达数据库',
        type: '1'
      },{
        name: '萨达萨达数据库',
        type: '1'
      },{
        name: '萨达萨达数据库',
        type: '0'
      },{
        name: '萨达萨达数据库',
        type: '0'
      }]
      this.msgList.push(...arr)
    },
    previewMsg(item){
      console.log(1111111);
      
      if(item.type==1){ //消息类
        this.dialogNotice = true
        this.messageNotice = item.name
      }else{ //办理类
        alert('跳转')
        // this.$router.push('')
      }
    }
  },
  mounted() {

  },
  created () {
    
  },
  props:[],
  components: {
    TableCom
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .msg-top-content{
    position: relative;
    width: 40px;
    height: 40px;
    float: left;
    box-sizing: border-box;
    .num-item{
      height: 40px;
      width: 40px;
      cursor: pointer;
      /deep/ .el-badge__content.is-fixed{
        transform: translateY(4%) translateX(65%);
        height: 15px;
        line-height: 15px;
        padding: 0 4px;
      }
      .bg{
        height: 40px;
        width: 40px;
        background: url('../../../assets/img/xiaoxi.png') no-repeat center;
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
          top: -12px;
        }
      }
      .msg-content{
        width: 340px;
        min-height: 210px;
        background: #ffffff;
        border-radius: 10px;
        overflow: hidden;
        .msg-title{
          height: 50px;
          line-height: 50px;
          p{
            float: left;
            padding: 0 20px;
            margin: 0;
            height: 50px;
            line-height: 50px;
            font-size: 16px;
          }
          .msg-more{
            float: right;
            font-size: 16px;
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
            height: 30px;
            line-height: 30px;
            padding-left: 10px;
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
}
</style>
