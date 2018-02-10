<template>
  <div class="add-user C-add-user">
    <el-form label-width="80px" :model="setUserInfo" ref="updateAddUser" :rules="rulesUserInfo" label-position="left">
      <el-form-item label="设置姓名" prop="name">
        <el-input v-model="setUserInfo.name" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="设置邮箱" prop="email">
        <el-input v-model="setUserInfo.email" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="设置密码" prop="password">
        <el-input v-model="setUserInfo.password" size="medium"></el-input>
      </el-form-item>
    </el-form>
    <el-button size="small" icon="el-icon-refresh" @click="resetForm('updateAddUser')">重置</el-button>
    <el-button type="primary" size="small" icon="el-icon-check" @click="updateAddUser">确认添加{{subName}}</el-button>
  </div>
</template>

<script>
import { isEmail, isEnAndCn, getSubName } from '../../../../common/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'AddUser',
  computed: {
    ...mapGetters('navRight', [
      'getUser'
    ]),
    subName () {
      return getSubName(this.getUser.type)
    }
  },
  data: () => {
    return {
      setUserInfo: {
        name: '',
        email: '',
        password: ''
      },
      rulesUserInfo: {
        name: [
          {required: true, message: '姓名不能为空', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    updateAddUser () {
      this.$refs.updateAddUser.validate((valid) => {
        if (!valid) {
          return false
        }
        const {name, email, password} = this.setUserInfo
        const msgError = text => {
          this.$message.error(text)
        }
        if (!isEnAndCn(name)) {
          return msgError('姓名里只能输入英语和中文')
        }
        if (!isEmail(email)) {
          return msgError('邮箱格式不正确')
        }
        if (password.length < 6) {
          return msgError('密码长度小于6位')
        }
        this.$http.post(`/Api/users`, {
          name,
          email,
          password
        })
          .then(resp => {
            this.$message[resp.data.state ? 'success' : 'error'](resp.data.data)
            resp.data.state ? this.resetForm('updateAddUser') : ''
          })
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang='less'>
.C-add-user {
  form {
    label, .el-form-item__content {
      float: left;
    }
    .el-form-item__content {
      input {
        width: 200%;
      }
      margin-left: 0 !important;
    }
  }
}
</style>
