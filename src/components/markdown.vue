<template>
  <div id="editor">
    <!--<el-input v-model="title" placeholder="请输入标题" style="width: 50%"></el-input>-->
    <mavon-editor v-model="md" :value="md" style="height: 100%;margin-top: 1%"/>
    <!--<el-button type="primary" style="margin-top: 1%" @click="send_md">发表博客</el-button>-->
    <!--<el-popover-->
      <!--placement="right"-->
      <!--width="1000"-->
      <!--trigger="click"-->
    <!--&gt;-->
      <!--1-->
      <!--<el-button type="success" slot="reference" @click="get_blogs">博客列表</el-button>-->
    <!--</el-popover>-->
  </div>
</template>
<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    name: 'editor',
    components: {
      mavonEditor
    },
    data() {
      return {
        md: '',
        title:'',
        todos: []
      }
    },
    methods: {
      get_blogs() {
        this.axios.get('http://127.0.0.1:5000'+'/v1/blog/', {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          }
        }).then(response => {
          if (response.data.status == 200) {
            this.todos = response.data.data;
            if (this.todos == undefined) {
              this.todos = []
            }
          } else {
            var msg = new Array();
            var data = eval(response.data.error);
            for (var e in data) {
              msg.push(data[e]);
            }
            let newDatas = [];
            const h = this.$createElement;
            for (let i in msg) {
              newDatas.push(h('p', null, msg[i].join(',')));
            }
            this.$notify.error({
              title: '查询失败',
              message: h('div', null, newDatas),
            });
          }
        })
      },
      send_md() {
        console.log(this.title);
        this.axios.post('http://127.0.0.1:5000' + '/v1/blog/', {
          title:this.title,
          md: this.md,
        }, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          }
        }).then(response => {
          if (response.data.status == 200) {
            this.$notify({
              title: '发布成功',
              message: '博客发布成功！',
              type: 'success'
            });
          } else {
            var msg = new Array();
            var data = eval(response.data.error);
            for (var e in data) {
              msg.push(data[e]);
            }
            let newDatas = [];
            const h = this.$createElement;
            for (let i in msg) {
              newDatas.push(h('p', null, msg[i].join(',')));
            }
            this.$notify.error({
              title: '查询失败',
              message: h('div', null, newDatas),
            });
          }
        })
      }
    }
  }

</script>
<style>
  #editor {
    margin: auto;
    width: 80%;
    height: 20%;
    margin-top: 1%;
  }
</style>
