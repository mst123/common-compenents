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
      <el-table-column align="center" prop="NOTIFICATIONS" show-overflow-tooltip label="消息">
        <template slot-scope="scope">
          <p @click="messageClick(scope.row)" :style="{margin:0,cursor:'pointer'}">{{ scope.row.NOTIFICATIONS }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="NOTICE_TYPE" :formatter="(row, column, cellValue)=>cellValue==2?'通知':'办理'" label="类型" width="120" ></el-table-column>
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

      ],
      getMessageUrl: {
        first: 'siltDam/SwcSysNotice/getSwcSysNotice',
        second: 'siltDam/SwcSysNotice/getSwcSysNoticeRead'
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize[this.activeName] = val
      this.getMessage()
    },
    handleCurrentChange(val) {
      this.currentPage[this.activeName] = val
      this.getMessage()
    },
    tabClick(tab, event){
      this.getMessage()
    },
    messageClick(row){
      this.$emit('messageEmit',row)
    },
    getMessage(){
      this.axios.post(this.$config.serverIP + this.getMessageUrl[this.activeName],
        {
          page: this.currentPage[this.activeName],
          rows: this.pageSize[this.activeName]
        }
      ).then((res) => {
        console.log(res)
        if(res.data.meta.success){
          this.total[this.activeName] = res.data.data.total
          this.tableData = res.data.data.list
        }
      }).catch((error) => {
        console.log(error);
      })
    }
  },
  mounted() {
    this.getMessage()
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
</style>
