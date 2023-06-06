<template>
  <div>
    <a-upload
      accept=".jpg, .jpeg, .png"
      :multiple="true"
      :file-list="uploadedFileList"
      @preview="previewFile"
      :customRequest="uploadFiles"
      :remove="deleteFileItem"
      :beforeUpload="beforeUpload"
    >
      <a-button> <a-icon type="upload" /> Click to Upload </a-button>
    </a-upload>

    <a-modal
      v-model="visibleUploadView"
      :width="1000"
      title="查看附件"
      :footer="null"
    >
      <files-display :files="aleadyUploadList" />
    </a-modal>
  </div>
</template>

<script>
import FilesDisplay from "../components/Upload/FilesDisplay.vue";
export default {
  components: {
    FilesDisplay,
  },
  data() {
    return {
      uploadedFileList: [], //已经上传的文件列表（受控）
      uploadedFileListActive: [],
      aleadyUploadList: [],
    };
  },
  methods: {
    // 点击文件链接或预览图标时的回调
    previewFile(file) {
      const BASE_URL = process.env.VUE_APP_API_BASE_URL;
      window.open(`${BASE_URL}/api/file/view/${file.id}`);
    },
    // 通过覆盖默认的上传行为，可以自定义自己的上传实现
    async uploadFiles(info) {
      console.log(info);
      //初始化文件信息
      const fileInfo = {
        uid: info.file.uid,
        name: info.file.name,
        status: "uploading",
        response: "",
        url: "",
      };
      //放入上传列表中，以便于显示上传进度
      this.uploadedFileList.push(fileInfo);
      //开始真正上传
      //上传接口
      // let uploadApiUrl = "http://10.6.181.209:9020/op/api/file/upload";
      //调用公共上传方法
      const res = await this.uploadFilesToServer("files", info.file);
      //根据服务端返回的结果判断成功与否，设置文件条目的状态
      if (res) {
        fileInfo.status = "done";
        fileInfo.response = "done";
        fileInfo.url = res[0].filePath;
        fileInfo.id = res[0].id;
        this.$message.success("上传成功！");
      } else {
        fileInfo.status = "error";
        this.$message.error(res.message);
      }
      let obj = {
        id: res[0].id,
        name: fileInfo.name,
        url: res[0].filePath,
      };
      this.uploadedFileListActive.push(obj);
    },
    //上传文件方法
    uploadFilesToServer(fileName, files) {
      let formData = new FormData();
      formData.append(fileName, files);
      //开始上传
      return postAction(`api/file/multi_upload`, formData)
        .then((response) => {
          return Promise.resolve(response.result);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    // 点击移除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除。
    deleteFileItem(file) {
      //找到当前文件所在列表的索引
      let indexs = file.id;
      this.uploadedFileList.map((item, index) => {
        if (indexs == item.id) {
          this.uploadedFileList.splice(index, 1);
        }
      });
      this.uploadedFileListActive.map((item, index) => {
        if (indexs == item.id) {
          this.uploadedFileListActive.splice(index, 1);
        }
      });
      return true;
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 File 或 Blob 对象则上传 resolve 传入对象）。注意：IE9 不支持该方法。
    beforeUpload(file) {
      var fileType = file.name;
      if (
        fileType.indexOf("jpg") < 0 &&
        fileType.indexOf("jpeg") < 0 &&
        fileType.indexOf("png") < 0
      ) {
        this.$message.error("文件不正确，请重新选择！");
        return false;
      }
    },

    // 最终上传方法
    handleOkUpload() {
      if (this.uploadedFileListActive.length == 0) {
        this.$message.error("上传的东西不能为空！");
        return false;
      }
      let tempArr = [];
      this.uploadedFileListActive.map((item) => {
        tempArr.push(JSON.stringify(item));
      });
      const param = {
        fileList: tempArr,
      };
      postAction(`api/yhRecord/uploadFile`, param).then((res) => {
        if (res.result) {
          this.$message.success("更新信息成功");
        } else {
          this.$message.error(`${res.message}`);
        }
        this.visibleUpload = false;
        this.queryDetailList();
      });
    },

    // 预览/上传（编辑-回显之前已上传的文件）
    toUpload(item, type) {
      if (type == "toView") {
        this.visibleUploadView = true;
        this.visibleUpload = false;
        this.disablaType = true;
      } else {
        this.visibleUpload = true;
        this.visibleUploadView = false;
        this.disablaType = false;
      }
      this.recordDetailId = item.id;
      this.uploadedFileList = [];
      this.aleadyUploadList = [];
      this.uploadedFileListActive = [];
      if (item.files) {
        this.imgViewList = [];
        this.imgViewList = JSON.parse(item.files);
        this.imgViewList.map((item, index) => {
          console.log(JSON.parse(item).url);
          let obj = {
            id: JSON.parse(item).id,
            name: JSON.parse(item).name
              ? JSON.parse(item).name
              : JSON.parse(item).fileName,
            response: "done",
            status: "done",
            uid: "vc-upload-1648885286304-" + index,
            // url: '/mnt/op/files/2022-04-02/db7f1397c579429c86aee5f57d688f05.jpg',
            url: getFileAccessHttpUrl(`${JSON.parse(item).url}`),
          };
          this.uploadedFileList.push(obj);
          this.uploadedFileListActive.push(obj);
          this.aleadyUploadList.push(obj);
        });
      } else {
        this.uploadedFileList = [];
        this.uploadedFileListActive = [];
      }
      console.log(this.uploadedFileList);
      console.log(this.uploadedFileListActive);
    },
  },
};
</script>

<style lang="less" scoped>
</style>