<template>
  <div class="setting C-setting">
    <v-header></v-header>
    <el-row type="flex" class="row" justify="center">
      <el-col :span="12">
        <v-jumbotron>
          <div class="info-item change-header">
            <h3>用户头像</h3>
            <el-button size="small" type="primary" icon="el-icon-upload" @click="$refs.uploadFile.click()">点击上传</el-button>
            <input type="file" style="display:none" ref="uploadFile" @change="checkFile">
            <p>
              <img :src="userInfo.header || getUser.avatar_url">
              <img :src="userInfo.header || getUser.avatar_url">
            </p>
            <div class="operation">
              <el-button size="small" icon="el-icon-refresh" @click="resetFile()">重置</el-button>
              <el-button size="small" type="primary" icon="el-icon-check" @click="updateFile">确定上传</el-button>
            </div>
          </div>
          <div class="info-item chang-password">
            <h3>修改密码</h3>
            <el-form :model="userInfo" ref="updateUserInfo" :rules="rulesUpdateUserInfo">
              <el-form-item label="旧密码" prop="oldPassword">
                <el-input v-model="userInfo.oldPassword" size="medium" type="password"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="userInfo.newPassword" size="medium" type="password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input v-model="userInfo.confirmPassword" size="medium" type="password"></el-input>
              </el-form-item>
            </el-form>
            <div class="operation">
              <el-button size="small" icon="el-icon-refresh" @click="resetForm('updateUserInfo')">重置</el-button>
              <el-button size="small" type="primary" icon="el-icon-check"  @click="updatePassWord()">确定修改</el-button>
            </div>
          </div>
        </v-jumbotron>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from '~/Header'
import Jumbotron from '~/Jumbotron'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      userInfo: {
        header: '',
        oldPassword: '',
        confirmPassword: ''
      },
      rulesUpdateUserInfo: {
        oldPassword: [{
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error('旧密码不能为空'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }],
        newPassword: [{
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'))
            } else {
              if (this.userInfo.confirmPassword !== '') {
                this.$refs.updateUserInfo.validateField('confirmPassword')
              }
              callback()
            }
          },
          trigger: 'blur'
        }],
        confirmPassword: [{
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.userInfo.newPassword) {
              callback(new Error('两次输入密码不一致!'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    updatePassWord () {
      this.$refs.updateUserInfo.validate((valid) => {
        if (!valid) {
          return false
        }
        const {oldPassword, newPassword, confirmPassword} = this.userInfo
        this.$http.put(`/Api/user/password`, {
          oldPassword,
          newPassword,
          confirmPassword
        })
          .then(resp => {
            this.$message[resp.data.state ? 'success' : 'error'](resp.data.data)
          })
      })
    },
    checkFile () {
      if (this.$refs.uploadFile.files.length === 0) {
        return false
      }
      const fileInfo = this.$refs.uploadFile.files[0]
      const suffix = fileInfo.name.split('.').pop()
      const size = fileInfo.size
      if (!/(jpg|jpeg|png)$/.test(suffix)) {
        return this.$message.error('上传的图片后缀必须为jpg、jpeg、png')
      }
      if (size > 1024 * 1024 * 2) {
        return this.$message.error('上传的图片必须在2M之内')
      }
      this.changeImg(fileInfo)
    },
    changeImg (fileInfo) {
      this.userInfo.header = URL.createObjectURL(fileInfo)
    },
    updateFile () {
      if (this.$refs.uploadFile.files.length === 0) {
        return this.$message.error('请先上传你的图片')
      }
      const fileInfo = this.$refs.uploadFile.files[0]
      let param = new FormData()
      param.append('file', fileInfo, fileInfo.name)
      this.$http.put('/Api/user/header', param)
        .then(resp => {
          this.$message[resp.data.state ? 'success' : 'error'](resp.data.data)
        })
    },
    resetFile () {
      this.$refs.uploadFile.value = ''
      this.userInfo.header = ''
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  computed: {
    ...mapGetters('navRight', [
      'getUser'
    ])
  },
  components: {
    'v-header': Header,
    'v-jumbotron': Jumbotron
  }
}
</script>

<style lang="less" scoped>
.row {
  margin-top: 20px;
}
.info-item {
  margin-bottom: 55px;
  &:last-child {
    margin-bottom: 0;
  }
  h3 {
    font-size: 22px;
    font-weight: 400;
  }
}
.change-header {
  img {
    width: 100px;
    height: 100px;
    &:last-child {
      margin-left: 20px;
      border-radius: 500px;
    }
  }
}
</style>

<style lang="less">
.C-setting {
  .chang-password {
    form {
      label, .el-form-item__content {
        float: left;
      }
      .el-form-item__content {
        input {
          width: 200%;
        }
        margin-left: 14px !important;
      }
      .el-form-item {
        &:last-child {
          .el-form-item__content {
            margin-left: 0 !important;
          }
        }
      }
    }
  }
}
</style>
