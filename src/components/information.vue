<template>
  <div>
    <div style="float: left;margin-left: 8%">
      <img :src=url style="width: 100px;height: 100px">
      <el-upload
        class="upload-demo"
        :action=action
        :on-success="newP"
        :headers="getheaders()"
        :show-file-list=false
        accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png"
      >
        <el-button size="small" type="primary">点击修改</el-button>
      </el-upload>
    </div>
    <div style="float: left;width: 30%;margin-top: 4%;margin-left: 2%">
      用户名:
      <el-input v-model="name" style="width: 60%;margin-left: 1%"></el-input>
      <div style="margin-top: 7%">
        <el-button type="primary" size="small" @click="update">修改</el-button>
      </div>
    </div>
    <div style="float: left;margin-top: 4%;width: 30%">
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
        >
          <el-input v-model="dynamicValidateForm.email"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="small" @click="editEmail()">修改</el-button>
    </div>
    <div style="float:left;margin-top: 4.5%;margin-left: 5%;font-size: 20px">
      <span v-if='auth=="ORDINARY"'>
          角色:普通会员
      </span>
      <span v-if='auth=="ADMIN"' style="color: red">
          角色:管理员
      </span>
      <span v-if='auth=="SUPER"' style="color: blue">
          角色:超级管理员
      </span>
    </div>
  </div>
</template>

<script>
  import global from '../../Global'

  export default {
    name: "information",
    created() {
      this.url = global.url + '/static/headimage/' + sessionStorage.getItem('url');
      this.action = global.url + '/v1/user/update_image/';
      this.name = sessionStorage.getItem('name');
      this.dynamicValidateForm.email = sessionStorage.getItem('email');
      this.auth = sessionStorage.getItem('auth');
    },
    data() {
      return {
        url: '',
        name: "",
        action: "",
        auth: "",
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          email: ''
        },
      };
    },
    methods: {
      getheaders: function () {
        var headers = {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        };
        return headers
      },
      newP() {
        this.axios.get(global.url + '/v1/user/', {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          }
        }).then(response => {
          sessionStorage.setItem('url', response.data.data.photo_url);
        });
        this.url = global.url + '/static/headimage/' + sessionStorage.getItem('url');
        this.$notify({
          title: '修改成功',
          message: '如果没有显示新头像，请刷新',
          type: 'success',
          offset: 100
        });
        this.$emit('forApp', this.name);
      },
      update() {
        this.axios.post(global.url + '/v1/user/update_name/', {
            name: this.name
          },
          {
            headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            }
          }
        ).then(response => {
          if (response.data.status === 200) {
            sessionStorage.setItem('name', this.name);
            this.$notify({
              title: '成功',
              message: '用户名修改成功！',
              type: 'success',
              offset: 100
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
              title: '修改失败',
              message: h('div', null, newDatas),
              offset: 100
            });
            this.name = sessionStorage.getItem('name')
          }
        });
      },
      editEmail() {
        this.axios.post(global.url + '/v1/user/update_email/', {
          email: this.dynamicValidateForm.email,
        }, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          }
        }).then(response => {
          if (response.data.status == 200) {
            sessionStorage.setItem('email', this.dynamicValidateForm.email);
            this.$notify({
              title: '成功',
              message: '邮箱修改成功！',
              type: 'success',
              offset: 100
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
              title: '修改失败',
              message: h('div', null, newDatas),
              offset: 100
            });
            this.dynamicValidateForm.email = sessionStorage.getItem('email')
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
