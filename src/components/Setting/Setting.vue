<template>
  <div class="setting">
    <v-header></v-header>
    <el-row type="flex" class="row" justify="center">
      <el-col :span="12">
        <v-jumbotron>
          <div class="info-item change-header">
            <h3>用户头像</h3>
            <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
            <p>
              <img :src="getUser.avatar_url">
              <img :src="getUser.avatar_url">
            </p>
            <duv class="operation">
              <el-button size="small" icon="el-icon-close">重置</el-button>
              <el-button size="small" type="primary" icon="el-icon-check">确定上传</el-button>
            </duv>
          </div>
          <div class="info-item chang-password">
            <h3>修改密码</h3>
            <el-form :model="userInfo">
              <el-form-item label="旧密码">
                <el-input v-model="userInfo.oldPassword"></el-input>
              </el-form-item>
              <el-form-item label="新密码">
                <el-input v-model="userInfo.newPassword"></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input v-model="userInfo.confirmPassword"></el-input>
              </el-form-item>
            </el-form>
            <duv class="operation">
              <el-button size="small" icon="el-icon-close">重置</el-button>
              <el-button size="small" type="primary" icon="el-icon-check">确定修改</el-button>
            </duv>
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
      }
    }
  },
  computed: {
    ...mapGetters([
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
  &:last-child{
    margin-bottom: 0;
  }
  h3 {
    font-size: 22px;
    font-weight: 400;
  }
  .operation {
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
</style>
