<template>
  <div>
    <br>
    <br>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="旧密码" prop="old">
        <el-input type="password" v-model="ruleForm2.old" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import global from '../../Global'

  export default {
    name: "edit-pas",
    data() {
      var checkold = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('旧密码不能为空'));
        }
        callback()
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          old: ''
        },
        rules2: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          old: [
            {validator: checkold, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post(global.url + '/v1/user/update_password/', {
                old_password: this.ruleForm2.old,
                new_password: this.ruleForm2.pass,
                re_password: this.ruleForm2.checkPass
              },
              {
                headers: {
                  'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                }
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
                  title: '修改密码失败',
                  message: h('div', null, newDatas),
                  offset: 100
                });
              } else {
                this.$notify({
                  title: '修改成功',
                  message: '修改密码成功！',
                  type: 'success',
                  offset: 100
                });
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

<style scoped>

</style>
