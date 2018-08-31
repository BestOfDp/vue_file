<template>
  <div style="width: 75%; margin: 0 auto; margin-top: 2.1%">
    <el-tabs type="border-card">
      <el-tab-pane label="个人信息">
        <information @forApp="turn"></information>
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <editPas></editPas>
      </el-tab-pane>
      <el-tab-pane label="文档">
        <showFile></showFile>
      </el-tab-pane>
      <el-tab-pane label="恢复">
        <dellog></dellog>
      </el-tab-pane>
      <el-tab-pane label="上传文件">
        <add></add>
      </el-tab-pane>
      <el-tab-pane label="图书">
        <books></books>
      </el-tab-pane>
      <el-tab-pane label="我的订阅">
        <myorder></myorder>
      </el-tab-pane>
      <!--<el-tab-pane label="视频">-->
        <!--<play></play>-->
      <!--</el-tab-pane>-->
      <!--<el-tab-pane v-if="auth==2" label="添加视频">-->
        <!--<addVideo></addVideo>-->
      <!--</el-tab-pane>-->
      <el-tab-pane v-if="auth=='SUPER'" label="权限管理">
        <editauth></editauth>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import showFile from '@/components/showFile'
  import add from '@/components/add'
  import editPas from '@/components/editPas'
  import information from '@/components/information'
  import books from '@/components/books'
  import myorder from '@/components/myorder'
  import editauth from '@/components/editauth'
  import dellog from '@/components/dellog'
  import play from '@/components/play'
  import addVideo from '@/components/addVideo'

  export default {
    name: 'user',
    created() {
      this.auth = sessionStorage.getItem('auth');
    },
    components: {
      showFile,
      add,
      editPas,
      information,
      books,
      myorder,
      editauth,
      dellog,
      play,
      addVideo
    },
    data() {
      return {
        auth: 0
      }
    },
    methods: {
      turn(data) {
        this.$emit('showName', null);
      }
    }
  }
</script>
<style scoped>
</style>
