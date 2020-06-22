<!--
 * @Descripttion: 上传组件封装
 * @version:
 * @Author: JumpingBirds
 * @Date: 2020-03-17 22:00:47
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-06-05 14:58:03
 -->
<template>
  <el-dialog-self
    title="上传文件"
    width="600"
    :custom-class="customeClass"
    :visible.sync="dvisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    append-to-body
    @close="cancelHandler"
  >
    <div class="container-cls">
      <div class="operation-cls">
        <el-form :inline="true"  size="small" class="demo-form-inline">
          <el-form-item>
            <el-input style="width:480px;" v-model="uploadfile.fileName" v-if="fileList.length == 0" />
          </el-form-item>
          <el-form-item :id="picker">
            <el-button style="margin-left:5px;color:#ffffff;" type="primary"  class="IDpiker" plain >
              添 加
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="list-container-cls">
        <ul class="ul-cls">
          <div :key="index" v-for="(file, index) in fileList">
            <el-row>
              <el-col :span="20" class="li-left-cls">
                <li :title="file.fileName" class="list-item-cls">
                  {{ file.fileName }}
                </li>
              </el-col>
              <el-col :span="4" class="li-rigth-cls">
                <el-tag
                  closable
                  @close="cancelFile(file.md5, file.id)"
                  v-if="file.tip == 1"
                  >上传中...
                </el-tag>
                <el-tag
                  closable
                  @close="deleteFile(file.md5, file.id)"
                  v-if="file.tip == 2"
                  >成功
                </el-tag>
                <el-tag
                  closable
                  type="danger"
                  @close="deleteErrorFile(file.md5, file.id)"
                  v-else-if="file.tip == 3"
                  >上传异常
                </el-tag>
              </el-col>
            </el-row>
            <el-progress
              class="progress-cls"
              :percentage="file.percentage"
              v-if="file.tip == 1"
              :text-inside="true"
              :stroke-width="10"
            >
            </el-progress>
          </div>
        </ul>
      </div>
    </div>

    <div slot="footer">
      <el-button type="primary"  size="small" @click="commitHandler">确定</el-button>
      <el-button plain  size="small" @click="cancelHandler">取消</el-button>
    </div>
  </el-dialog-self>
</template>
<script>
import $ from "jquery";
import WebUploader from "webuploader";
import collect from "collect.js";

export default {
  name: "Upload",
  data() {
    return {
      dvisible: this.dialogVisible, //控制组件是否可见，外部可以调用组件内的changeVisible方法，设置对话框是否可见
      fileList: [],
      singleFileName: "",
      singleFile: null,
      singleTip: 1,
      uploadfile: {
        fileName: null,
        fileId: null,
      },
      percentage: 0,
      uploader: null,
      picker: 'picker' + Date.now()
    };
  },
  props: {
    dialogVisible: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false }, //单文件、多文件上传设置
    fileType: { type: String, default: "document" }, //设置上传文件类型，提供默认四种类型，可自定义：'zip',document','image','video'
    isVector: { type: Boolean, default: false }, //是否矢量数据上传
    fileServer: { type: String, required: true }, //文件后台上传地址
  },
  computed: {
    customeClass() {
      return this.multiple == false
        ? "single-container-cls"
        : "muilt-container-cls";
    },
  },
  mounted() {

  },
  methods: {
    changeVisible(flag) {
      this.dvisible = flag;
    },
    //点击按钮，从队列里删除文件
    deleteErrorFile(md5, id) {
      this.uploader.removeFile(id, true);
      this.fileList = collect(this.fileList)
        .filter((file) => {
          return file.md5 !== md5;
        })
        .all();
    },
    //点击正确上传删除按钮，从队列里删除文件
    deleteFile(md5, id) {
      this.uploader.removeFile(id, true);
      this.fileList = collect(this.fileList)
        .filter((file) => {
          return file.md5 !== md5;
        })
        .all();
    },
    //正在上传，点击删除按钮，从队列里删除文件，取消文件上传
    cancelFile(md5, id) {
      this.uploader.cancelFile(id);
      this.fileList = collect(this.fileList)
        .filter((file) => {
          return file.md5 !== md5;
        })
        .all();
    },
    cancelHandler() {
      this.dvisible = false;
      this.fileList = [];
      if (this.uploader != null) {
        this.uploader.reset();
      }
    },
    commitHandler() {
      let data = collect(this.fileList)
        .filter((file) => {
          return file.tip == 2;
        })
        .all();
      this.$emit("upLoadSuccess", data);
      this.fileList = [];
      this.dvisible = false;
      if (this.uploader != null) {
        this.uploader.reset();
      }
    },
    refreshFileState(file, localFile, success) {
      if (file != null && file["fileName"] != null) {
        let fileInfo = collect(this.fileList).firstWhere(
          "md5",
          localFile["md5"]
        );
        if (fileInfo) {
          fileInfo.fileId = file["fileId"];
          fileInfo.tip = success == true ? 2 : 3;
          fileInfo.percentage = 100;
        }
      }
    },
    initUpload() {
      this.uploadfile.fileName = null;
      this.uploadfile.fileId = null;
      this.percentage = 0;

      var that = this;
      that.fileList = [];
      var multiple = this.multiple;

      //单次上传文件总大小
      var fileSizeLimit = 20 * 1024 * 1024 * 1024;
      //单个文件文件大小
      var fileSingleSizeLimit = 15 * 1024 * 1024 * 1024;
      //单次上传文件总数
      var fileNumLimit = 300;
      //分片大小
      var chunkSize = 4 * 1024 * 1024;

      var geoflag = 0;
      var accept = null;
      if (this.isVector) {
        geoflag = 1;
        accept = {
          title: "zip,rar压缩文件",
          extensions: "zip,rar",
          mimeTypes: ".zip,.rar",
        };
      } else {
        if (this.fileType == "zip") {
          accept = {
            title: "zip,rar压缩文件",
            extensions: "zip,rar",
            mimeTypes: ".zip,.rar",
          };
        } else if (this.fileType == "document") {
          accept = {
            title: "doc,docx,txt,ppt,pptx,xls,xlsx,pdf压缩文件",
            extensions: "doc,docx,txt,ppt,pptx,xls,xlsx,pdf",
            mimeTypes: ".doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx,.pdf",
          };
        } else if (this.fileType == "image") {
          accept = {
            title: "png,jpg,gif,tiff,tif压缩文件",
            extensions: "png,jpg,gif,tiff,tif",
            mimeTypes: ".png,.jpg,.gif,.tiff,.tif",
          };
        } else if (this.fileType == "video") {
          accept = {
            title: "mp4,avi,flv,mov,mkv,3gp压缩文件",
            extensions: "mp4,avi,flv,mov,mkv,3gp",
            mimeTypes: ".mp4,.avi,.flv,.mov,.mkv,.3gp",
          };
        }
      }

      var fileServer = this.fileServer;

      var fileMd5; //文件唯一标识

      // 添加的文件数量
      var fileCount = 0;

      // 添加的文件总大小
      var fileSize = 0;
      // var fileName; //文件名称
      var oldJindu; //如果该文件之前上传过 已经上传的进度是多少
      var count = 0; //当前正在上传的文件在数组中的下标，一次上传多个文件时使用
      var filesArr = new Array(); //文件数组：每当有文件被添加进队列的时候 就push到数组中
      var map = {}; //key存储文件id，value存储该文件上传过的进度
      if (!WebUploader.Uploader.support()) {
        alert(
          "Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器或使用html5"
        );
        throw new Error(
          "WebUploader does not support the browser you are using."
        );
      }

      WebUploader.Uploader.unRegister("beforeSendFile");
      WebUploader.Uploader.unRegister("beforeSend");
      WebUploader.Uploader.unRegister("afterSendFile");
      WebUploader.Uploader.register({
        name: "beforeSendFile",
        "before-send-file": function(file) {
          // var that = this;
          var deferred = WebUploader.Deferred();

          new WebUploader.Uploader()
            .md5File(file, 0, 10 * 1024 * 1024)
            .progress(function() {})
            .then(function(val) {
              fileMd5 = val;
              file.md5 = fileMd5;

              let fileInfo = collect(that.fileList).firstWhere(
                "id",
                file["id"]
              );
              fileInfo.md5 = fileMd5;
              $.ajax({
                type: "POST",
                url: fileServer + "/file/exist.do", //ajax验证每一个分片
                data: {
                  fileMd5: fileMd5, //文件唯一标记
                },
                cache: false,
                async: false, // 与js同步
                timeout: 50000, //todo 超时的话，只能认为该分片未上传过
                dataType: "json",
                success: function(result) {
                  if (result.status == 200) {
                    if (result.data.oldFile) {
                      that.refreshFileState(result.data, file, true);

                      that.uploader.skipFile(file);
                      file.exitFlag = true;
                    }
                    deferred.resolve();
                  }
                },
              });
            });

          // fileName = file.name;
          return deferred.promise();
        },
      });

      WebUploader.Uploader.register({
        name: "beforeSend",
        "before-send": function(block) {
          var deferred = WebUploader.Deferred();

          var temFile = block.file;
          $.ajax({
            type: "POST",
            url: fileServer + "/checkChunk/check.do",
            data: {
              param: "checkChunk",
              fileName: temFile.name,

              fileMd5: temFile.md5,
              chunk: block.chunk, //当前分块下标
              chunkSize: block.end - block.start, //当前分块大小
            },
            cache: false,
            async: false,
            timeout: 5000,
            dataType: "json",
            success: function(result) {
              if (result.status == 200) {
                if (result.data.ifExist) {
                  deferred.reject();
                } else {
                  deferred.resolve();
                }
              } else if (result.status == 500) {
                alert("服务器发生错误!");
              }
            },
          });

          this.owner.options.formData.fileMd5 = fileMd5;
          deferred.resolve();
          return deferred.promise();
        },
      });

      WebUploader.Uploader.register({
        name: "afterSendFile",
        "after-send-file": function(file) {
          if (file.exitFlag) {
            count++; //每上传完成一个文件 count+1
            if (count <= filesArr.length - 1) {
              that.uploader.upload(filesArr[count].id); //上传文件列表中的下一个文件
            }
            return;
          }
          //如果分块上传成功，则通知后台合并分块
          $.ajax({
            type: "POST",
            url: fileServer + "/checkChunk/check.do", //ajax将所有片段合并成整体
            data: {
              param: "mergeChunks",
              fileName: file.name,
              fileMd5: file.md5,
              geoflag: geoflag,
            },
            success: function(result) {
              if (result.status == 200) {
                that.refreshFileState(result["data"], file, true);
              } else {
                that.refreshFileState(result["data"], file, false);
              }
              count++; //每上传完成一个文件 count+1
              if (count <= filesArr.length - 1) {
                that.uploader.upload(filesArr[count].id); //上传文件列表中的下一个文件
              }
            },
          });
        },
      });

      this.uploader = WebUploader.create({
        auto: true, //选择文件后是否自动上传

        disableGlobalDnd: true,
        chunked: true, //开启分片上传
        chunkSize: chunkSize, // 如果要分片，分多大一片？默认大小为5M
        chunkRetry: 8, //如果某个分片由于网络问题出错，允许自动重传多少次
        threads: 8, //上传并发数。允许同时最大上传进程数[默认值：3]
        fileNumLimit: fileNumLimit,
        duplicate: false, //是否重复上传（同时选择多个一样的文件），true可以重复上传
        prepareNextFile: true, //上传当前分片时预处理下一分片
        swf: "../Uploader.swf", // swf文件路径
        server: fileServer + "/filechunk/save.do", // 文件接收服务端
        fileSizeLimit: fileSizeLimit, //验证文件总大小是否超出限制, 超出则不允许加入队列
        fileSingleSizeLimit: fileSingleSizeLimit, // 验证单个文件大小是否超出限制, 超出则不允许加入队列
        pick: {
          id: "#"+this.picker, //这个id是你要点击上传文件按钮的外层div的id
          multiple: multiple, //是否可以批量上传，true可以同时选择多个文件
        },
        resize: false, //不压缩image, 默认如果是jpeg，文件上传前会先压缩再上传！
        accept: accept,
      });
      //当有文件被添加进队列的时候（点击上传文件按钮，弹出文件选择框，选择完文件点击确定后触发的事件）
      this.uploader.on("fileQueued", function(file) {
        file = collect(that.uploader.getFiles()).firstWhere("id", file["id"]);
        if (that.multiple == false) {
          let oldFiles = that.uploader.getFiles();
          if (oldFiles.length > 2) {
            oldFiles.slice(0, oldFiles - 1).map((file) => {
              that.uploader.removeFile(file);
            });
          }
          that.fileList = [];
        }

        //限制单个文件的大小 超出了提示
        if (file.size > fileSingleSizeLimit) {
          alert(
            "单个文件大小不能超过" +
              fileSingleSizeLimit / (1024 * 1024 * 1024) +
              "G"
          );
          return false;
        }

        if (file.size + fileSize > fileSizeLimit) {
          alert(
            "单次上传总文件大小不能超过" +
              fileSizeLimit / (1024 * 1024 * 1024) +
              "G"
          );
          return false;
        }

        if (fileCount + 1 > fileNumLimit) {
          alert("单次上传总文件数量不能超过" + fileNumLimit + "个");
          return false;
        }

        // filesArr.push(file);
        if (file.name != null) {
          that.fileList.push({
            fileName: file.name,
            percentage: 0,
            id: file.id,
            fileId: "", //后台返回fileId字段值
            md5: "",
            tip: 1,
          });
        }

        $.ajax({
          type: "POST",
          url: fileServer + "/filechunk/progress.do", //先检查该文件是否上传过，如果上传过，上传进度是多少
          data: {
            fileName: file.md5, //文件名
          },
          cache: false,
          async: true, // 同步
          dataType: "json",
          success: function(data) {
            //上传过
            if (data.status == 200) {
              if (data.data > 0) {
                //上传过的进度的百分比
                oldJindu = data.data / 100;

                //将上传过的进度存入map集合
                map[file.id] = oldJindu;
              }

              fileCount++;
              fileSize += file.size;

              // $("#jindutiao").val(data.data);
            } else if (status == 500) {
              alert("服务端发生错误！");
            }
          },
        });
        // uploader.stop(true);
      });

      this.uploader.on("uploadProgress", function(file, percentage) {
        let uploadingFile = collect(that.fileList).firstWhere("md5", file.md5);

        if (uploadingFile != null) {
          uploadingFile.percentage = parseInt(percentage * 100);
        }
      });

      this.uploader.on("uploadSuccess", function(file) {
        let uploadingFile = collect(that.fileList).firstWhere("md5", file.md5);
        if (uploadingFile != null) {
          // uploadingFile.tip = 2
        }
      });

      this.uploader.on("uploadError", function(file) {
        if (file.name != null) {
          let xxfile = collect(that.fileList).firstWhere("md5", file.md5);
          if (xxfile) {
            xxfile.file = file;
            xxfile.tip = 3;
          }
        }
      });
      this.uploader.on("uploadComplete", function() {});
    },
  },
  watch: {
    dvisible: {
      handler(value) {
        if (value == true) {
          this.$nextTick(() => {
            this.initUpload();
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style scoped lang="scss">
>>> .webuploader-container {
  position: relative;
}

>>> .webuploader-element-invisible {
  position: absolute !important;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
}

.list-item-cls {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.list-container-cls {
  flex: 1;
  overflow: auto;
  max-height: 200px;
}

.ul-cls {
  list-style-type: none;
  padding-left: 0;
}

.li-left-cls {
  text-align: left;
}

.progress-cls {
  width: 100%;
  height: 15px;
  font-size: 10px;
}

.container-cls {
  width: 100%;
}

.operation-cls {
  height: 35px;
  float: right;
  justify-content: flex-end;
  .demo-form-inline{
    width: 100%;
    .el-input__inner{
      width: 480px;
    }
  }
}

.li-right-cls {
  text-align: left;
}

>>> .single-container-cls {
  height: 30vh;
  width: 30vw;
  min-height: 300px;
  min-width: 600px;
  display: flex;
  flex-direction: column;
}

>>> .muilt-container-cls {
  height: 35vh;
  width: 30vw;
  min-height: 400px;
  min-width: 600px;
  display: flex;
  flex-direction: column;
}

>>> .el-dialog__footer {
  text-align: center;
}

>>> .el-dialog__body {
  box-sizing: border-box;
  flex: 1;
  align-items: center;
  display: flex;
}

>>> .el-row {
  border-bottom: 1px solid;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: left;
  padding-left: 0px;
}
.el-dialog{
  >>> .IDpiker {
    left: 0 !important;
    top: 0 !important;
    width: 80px !important;
    height: 35px !important;
  }
}
</style>
<style lang="scss">
  .el-button.IDpiker{
    color: white;
  }
</style>