<template>
  <div>
    <div style="width: 50%;margin-left: 22%;margin-top: 6%">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm2.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="classname">
          <el-input v-model="ruleForm2.classname"></el-input>
        </el-form-item>
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
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import global from '../../Global'

  export default {
    name: "regist",
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        callback()
      };
      var checkClassName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('班级不能为空'));
        }
        callback()
      };
      var checkTname = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('姓名不能为空'));
        }
        callback();
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
          name: '',
          classname: '',
          t_name: '',
        },
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          email: ''
        },
        rules2: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          name: [
            {validator: checkName, trigger: 'blur'}
          ],
          classname: [
            {validator: checkClassName, trigger: 'blur'}
          ],
          t_name: [
            {validator: checkTname, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post(global.url + '/v1/user/register/', {
              name: this.ruleForm2.name,
              password: this.ruleForm2.pass,
              re_password: this.ruleForm2.checkPass,
              class_name: this.ruleForm2.classname,
              email: this.dynamicValidateForm.email
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
                  title: '注册失败',
                  message: h('div', null, newDatas),
                });
              } else {
                this.$notify({
                  title: '注册成功',
                  message: '请用用户名登录！',
                  type: 'success'
                });
                this.$router.push({path: '/'});
              }
            });
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
