<template>
  <div class="hello">
    <div style="width: 50%;margin-left: 25%;margin-top: 8%">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input @keyup.enter.native="submitForm('ruleForm2')" v-model="ruleForm2.name"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input @keyup.enter.native="submitForm('ruleForm2')" type="password" v-model="ruleForm2.pass"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          <el-button type="warning">
            <router-link to="/regist" style="color: white">注册</router-link>
          </el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import global from '../../Global'

  export default {
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        if (value.length < 3 || value.length > 11) {
          return callback(new Error('用户名长度需要在[3,11]之间'));
        }
        callback()
      };
      var validatePass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'));
        }
        if (value.length < 6 || value.length > 20) {
          return callback(new Error('密码长度需要在[6,20]之间'));
        }
        callback()
      };
      return {
        ruleForm2: {
          pass: '',
          name: ''
        },
        rules2: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          name: [
            {validator: checkName, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post(global.url + '/v1/user/login/', {
              name: this.ruleForm2.name,
              password: this.ruleForm2.pass
            }).then(response => {
              if (response.data.status == 400) {
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
                  title: '登录失败',
                  message: h('div', null, newDatas),
                });
              } else {
                sessionStorage.setItem('token', response.data.data.token);
                sessionStorage.setItem('auth', response.data.data.auth[1]);
                sessionStorage.setItem('auth_num', response.data.data.auth[0]);
                sessionStorage.setItem('url', response.data.data.photo_url);
                sessionStorage.setItem('name', response.data.data.name);
                sessionStorage.setItem('email', response.data.data.email);
                sessionStorage.setItem('id', response.data.data.id);
                // 回调 App.vue
                this.$emit('showName', null);
                this.$router.push({path: '/user'})
              }
            })
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
