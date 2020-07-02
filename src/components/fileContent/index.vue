<template>
  <div class="file-content">
    <div class="file-item" v-for="(item, index) of fileList" :key="index">
      <span :title="item.fileName" class="text" @click="previewFile(item.fileId)">{{item.fileName}}</span>
      <i class="el-tag__close el-icon-close" @click="deleteFile(index)"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileContent',
  data () {
    return {
      
    }
  },
  methods: {
    deleteFile(index){
      if(this.disabled){
        return
      }
      let arr = this.fileList
      arr.splice(index,1)
      this.$emit('update:fileList', arr)
    },
    getFileList(){
      return this.fileList
    },
    previewFile(fileId){
      window.open(this.fileServer + 'fileview/viewFileById?id='+fileId)
    }
  },
  mounted() {
    
  },
  props:{
    fileList:{
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fileServer: {
      require: true,
      type: String,
    }
  },
  created () {
    
  },
  components: {
    
  },
  computed: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .file-content{
    height: 56px;
    max-height: 112px;
    border-radius: 5px;
    width: 100%;
    border: 1px solid #dcdfe6;
    overflow-x: hidden;
    overflow-y: auto;
    .file-item{
      background-color: #f4f4f5;
      color: #909399;
      box-sizing: border-box;
      margin: 2px 0 2px 6px;
      height: 24px;
      padding: 0 8px;
      line-height: 22px;
      border: 1px solid #d9ecff;
      border-radius: 4px;
      box-sizing: border-box;
      max-width: 94px;
      float: left;
      .text{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 60px;
        display: block;
        float: left;
        font-size: 12px;
        cursor: pointer;
      }
      .el-tag__close{
        border-radius: 50%;
        text-align: center;
        position: relative;
        cursor: pointer;
        font-size: 12px;
        height: 16px;
        width: 16px;
        line-height: 16px;
        vertical-align: middle;
        background-color: #c0c4cc;
        right: -7px;
        top: 0;
        margin-top: -2px;
      }
    }
  } 

</style>
