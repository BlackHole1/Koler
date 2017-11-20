<template>
  <div class="login">
    <div class="main">
      <div class="form">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="" prop="email">
          <el-input type="text" v-model="loginForm.email" auto-complete="off" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="" prop="pass">
          <el-input type="password" v-model="loginForm.pass" auto-complete="off" placeholder="密码"></el-input>
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
    created () {
      if (this.$router.history.current.name === 'Logout') {
        this.$store.dispatch('delToken')
        this.$router.push('/Login')
        this.$message.success('您已成功退出登录')
      }
    },
    data () {
      let checkUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入邮箱'))
        }
        let matchingTimes = 0
        const email = this.loginForm.email
        const whiteList = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM@-_.'
        for (let i = 0; i < email.length; i++) {
          if (whiteList.includes(email[i])) {
            matchingTimes++
          }
        }
        if (email.length === matchingTimes) {
          callback()
        } else {
          return callback(new Error('邮箱不规范'))
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
          email: '',
          pass: ''
        },
        rules: {
          email: [
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
            const email = this.loginForm.email
            const pass = this.loginForm.pass
            this.$http.post(`/Api/sign`, qs.stringify({
              email: email,
              pass: pass
            }))
            .then(resp => {
              const data = resp.data
              this.$store.dispatch((data.state) ? 'addToken' : 'delToken', data.token)
              this.$message[data.state ? 'success' : 'warning'](data.data)
              data.state ? this.$router.push('/') : ''
            })
            .catch(err => {
              this.$message.error('连接后端API失败，请F12查看详细信息')
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
  border: 1px solid rgba(255, 255, 255, 0.9215686274509803);
  background-color: rgba(255, 255, 255, 0.9215686274509803);
  border-radius: 10px;
}
.form{
  display: block;
  padding: 40px 60px 20px 0;
}
</style>

<style>
.el-form-item__content {
  margin-left: 61px !important;
}
</style>
