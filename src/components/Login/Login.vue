<template>
  <div class="login">
    <div class="main">
      <div class="form">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账户" prop="user">
          <el-input type="text" v-model="loginForm.user" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  const qs = require('qs')
  export default {
    data () {
      let checkUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入账号'))
        }
        let matchingTimes = 0
        const user = this.loginForm.user
        const whiteList = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM@-_.'
        for (let i = 0; i < user.length; i++) {
          if (whiteList.includes(user[i])) {
            matchingTimes++
          }
        }
        if (user.length === matchingTimes) {
          callback()
        } else {
          return callback(new Error('账号不规范'))
        }
      }
      let checkPass = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入密码'))
        }
        callback()
      }
      return {
        loginForm: {
          user: '',
          pass: ''
        },
        rules: {
          user: [
            { validator: checkUser, trigger: 'blur' }
          ],
          pass: [
            { validator: checkPass, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const user = this.loginForm.user
            const pass = this.loginForm.pass
            this.$http.post(`/Api/checkLogin`, qs.stringify({
              user: user,
              pass: pass
            }))
            .then(resp => {
              console.log(resp)
            })
            .catch(err => {
              console.log(err)
            })
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style>
html {
  height:100%;
  width:100%;
  background-image: url(/static/loginBackground.jpg);
  background-repeat: no-repeat;
  overflow: hidden;
  background-size:cover;
}
</style>

<style lang="less" scoped>
.main {
  position:fixed;
  left: 0;
  right: 0;
  top: -20%;
  bottom: 0;
  margin: auto;
  width: 20%;
  height: 233px;
  border: 1px solid rgba(234, 238, 251, 0.48);
  background-color: rgba(234, 238, 251, 0.48);
  border-radius: 4px;
}
.form{
  display: block;
  padding: 40px 60px 20px 0;
}
</style>

