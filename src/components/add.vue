<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      multiple
      :file-list="fileList"
      :headers="getheaders()"
      :action="geturl()"
      :on-preview="handlePreview"
      :on-remove="handleRemove">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <br>
    <div style="margin-left: 42%;float: left">
      <div v-if="value2" style="float: right;font-family: Arial;color: #409eff">所有人可见</div>
      <div v-if="!value2" style="float: right;font-family: Arial;color: #409eff">仅自己可见</div>
    </div>
    <div style="width: 1%;float: left;margin-left: 3%">
      <el-switch
        v-model="value2"
        active-color="#13ce66"
        inactive-color="#AAAAAA">
      </el-switch>
    </div>
  </div>
</template>

<script>
  import global from '../../Global'

  export default {
    data() {
      return {
        url: "/v1/file/upload_file/",
        value2: false,
        num: 0,
        name: "",
        fileList: [],
        public: 0
      }
    },
    mounted() {
      this.name = sessionStorage.getItem('name')
    },
    methods: {
      geturl: function () {
        return global.url + this.url
      },
      getheaders: function () {
        if (this.value2 == false) {
          this.public = 2
        } else {
          this.public = 1
        }
        var headers = {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'public': this.public
        };
        return headers
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  };
</script>

<style scoped>

</style>
