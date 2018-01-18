<template>
  <div class="add-user">
    <el-form label-width="80px" :model="userInfoSet" :rules="rulesUserInfo" label-position="left">
      <el-form-item label="设置姓名" prop="name">
        <el-input v-model="userInfoSet.name" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="设置邮箱" prop="email">
        <el-input v-model="userInfoSet.email" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="设置密码" prop="password">
        <el-input v-model="userInfoSet.password" size="medium"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" size="small">确认添加{{subName}}</el-button>
  </div>
</template>

<script>
import common from '../../../common/function'
export default {
  name: 'addUser',
  computed: {
    subName () {
      return common.subName(this.$store.getters.getUser.type)
    }
  },
  data: () => {
    return {
      userInfoSet: {
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
