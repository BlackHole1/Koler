<template>
  <div class="login C-login">
    <div class="main">
      <div class="form">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="" prop="email">
          <el-autocomplete
            v-model="loginForm.email"
            size="medium"
            :fetch-suggestions="appendEmailSuffix"
            :trigger-on-focus="false"
            placeholder="邮箱"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="" prop="pass">
          <el-input type="password" v-model="loginForm.pass" auto-complete="off" placeholder="密码" size="medium" @keyup.enter.native="submitForm('loginForm')"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="submitForm('loginForm')" :loading="loading" icon="el-icon-check" size="medium">登录</el-button>
          <el-button @click="resetForm('loginForm')" icon="el-icon-refresh" size="medium">重置</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  const { isEmail } = require('../../../common/utils')
  export default {
    created () {
      if (this.$route.name === 'Logout') {
        this.$store.dispatch('login/delToken')
        this.$router.push('/Login')
        this.$message.success('您已成功退出登录')
      }
    },
    data () {
      let checkUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入邮箱'))
        }
        if (!isEmail(value)) {
          return callback(new Error('邮箱不规范'))
        }
        callback()
      }
      let checkPass = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入密码'))
        }
        if (value.length < 6) {
          return callback(new Error('密码长度小于6位'))
        }
        callback()
      }
      return {
        loading: false,
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
        },
        emailSuffix: [
          '@qq.com',
          '@gmail.com',
          '@hotmail.com',
          '@163.com',
          '@126.com'
        ]
      }
    },
    methods: {
      submitForm (formName) {
        this.loading = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const email = this.loginForm.email
            const pass = this.loginForm.pass
            this.$http.post(`/Api/sign`, {
              email: email,
              pass: pass
            })
            .then(resp => {
              this.loading = false
              const data = resp.data
              this.$store.dispatch((data.state) ? 'login/addToken' : 'login/delToken', data.token)
              this.$message[data.state ? 'success' : 'warning'](data.data)
              data.state && this.$router.push('/')
              this.loginForm.pass = ''
            })
            .catch(() => {
              this.loading = false
              this.$message.error('连接后端API失败，请确保后端服务器正常')
            })
          } else {
            this.loading = false
          }
        })
      },
      appendEmailSuffix (queryString, cb) {
        let triggerList = []
        let emailSuffix = this.emailSuffix
        if (queryString.indexOf('@') !== -1) {
          let emailInfo = queryString.split('@')
          emailSuffix.map(suffix => {
            suffix.indexOf(emailInfo[1].toLowerCase()) !== -1 && triggerList.push({value: emailInfo[0] + suffix})
          })
        } else {
          emailSuffix.map(suffix => {
            triggerList.push({value: queryString + suffix})
          })
        }
        return cb(triggerList)
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.loading = false
      }
    }
  }
</script>

<style lang="less" scoped>
.main {
  position: fixed;
  left: 0;
  right: 0;
  top: -20%;
  bottom: 0;
  margin: auto;
  width: 25em;
  height: 233px;
  border: 1px solid rgba(255, 255, 255, 0.9215686274509803);
  background-color: rgba(255, 255, 255, 0.9215686274509803);
  border-radius: 10px;
}
.form {
  display: block;
  padding: 40px 60px 20px 0;
}
</style>

<style lang='less'>
.C-login {
  .el-form-item__content {
    margin-left: 61px !important;
  }
  .el-autocomplete[role=combobox] {
    display: block;
  }
}
</style>