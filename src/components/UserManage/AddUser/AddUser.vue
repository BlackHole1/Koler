<template>
  <div class="add-user">
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
import common from '../../../../common/function'
export default {
  name: 'addUser',
  computed: {
    subName () {
      return common.subName(this.$store.getters.getUser.type)
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
        if (!common.regx.englishAndChinese.test(name)) {
          return this.$message.error('姓名里只能输入英语和中文')
        }
        this.$http.post(`/Api/user/add`, {
          name,
          email,
          password
        })
          .then(resp => {
            this.$message[resp.data.state ? 'success' : 'error'](resp.data.data)
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
</style>
