<template>
  <div class="content">
    <el-tabs class="tabs" v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="未 办" name="first"></el-tab-pane>
      <el-tab-pane label="已 办" name="second"></el-tab-pane>
    </el-tabs>
    <el-table
      stripe
      :header-cell-style="{
        background: '#F5F3F4',
        color: '#909399',
        fontSize: '12px',
        borderRight: '4px solid #ffffff'
      }"
      max-height="400"
      size="medium"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column align="center" type="index" label="序号" width="80" ></el-table-column>
      <el-table-column align="center" prop="name" show-overflow-tooltip label="消息">
        <template slot-scope="scope">
          <p @click="messageClick(scope.row)" :style="{margin:0,cursor:'pointer'}">{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="type" :formatter="(row, column, cellValue)=>cellValue==1?'通知':'办理'" label="类型" width="120" ></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage[activeName]"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pageSize[activeName]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total[activeName]"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'TableCom',
  data () {
    return {
      activeName: 'first',
      pageSize: {
        first: 10,
        second: 10
      },
      total: {
        first: 0,
        second: 0
      },
      currentPage: {
        first: 1,
        second: 1
      },
      tableData: [
        {
          name: '萨达萨达数据萨达萨达数据库萨达萨达数据库萨达萨达数据库萨达萨达数据库达萨达数据库萨达萨达数据库库',
          type: '0',
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
      ]
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize[activeName] = val
    },
    handleCurrentChange(val) {
      this.currentPage[activeName] = val
    },
    tabClick(tab, event){
      console.log(tab);
    },
    messageClick(row){
      console.log(row);
      this.$emit('messageEmit',row)
    }
  },
  mounted() {

  },
  created () {
    
  },
  props: {
    dialogVisible: Boolean,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.content{
  .tabs{
    /deep/ .el-tabs__nav-scroll{
      padding-left: 20px;
    } 
  }
}
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
      top: 5px;
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
  box-shadow: 10px 10px 5px #888888;
}
</style>
