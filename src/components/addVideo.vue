<template>
  <div>
    <el-input v-model="input" placeholder="标题" style="width: 50%"></el-input>
    <!--<el-checkbox-group v-model="checkList" style="margin-top: 2%">-->
    <!--<el-checkbox v-for="tag in tags" :label="tag" :key="tag">{{tag.name}}</el-checkbox>-->
    <!--</el-checkbox-group>-->
    <el-upload
      style="margin-top: 2%"
      class="upload-demo"
      ref="upload"
      multiple
      :action="geturl()"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </el-upload>
  </div>
</template>

<script>
  import global from '../../Global'

  export default {
    data() {
      return {
        url: global.url + '/addVideo/',
        num: 0,
        name: "",
        fileList: [],
        input: '',
        checkList: [],
        tags: []
      }
    },
    mounted() {
      this.name = sessionStorage.getItem('name')
    },
    methods: {
      geturl: function () {
        return this.url + this.input + '/';
      },
      submitUpload() {
        this.$refs.upload.submit();
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
