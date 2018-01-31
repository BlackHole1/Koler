<template>
  <div class="user-manage">
    <v-header></v-header>
    <el-row type="flex" class="row" justify="center">
      <el-col :span="3">
         <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :router="true">
          <el-menu-item index="/UserManage/AddUser">
            <i class="el-icon-menu"></i>
            <span slot="title">添加{{subName}}</span>
          </el-menu-item>
          <el-menu-item index="/UserManage/DelUser">
            <i class="el-icon-setting"></i>
            <span slot="title">删除{{subName}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="1"> </el-col>
      <el-col :span="11">
        <v-jumbotron>
          <router-view></router-view>
        </v-jumbotron>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import common from '../../../common/function'
import Header from '~/Header'
import Jumbotron from '~/Jumbotron'
import { mapGetters } from 'vuex'
export default {
  created () {
    if (this.getUser.type === 'Student') {
      this.$message.error('你无权限进入此页面')
      return this.$router.push('/')
    }
    (this.$route.name === 'UserManage') ? this.$router.push('/UserManage/AddUser') : ''
    if (this.getUser.type === '') {
      this.$store.dispatch('navRight/getInfoBymodel', {
        model: 'user'
      })
    }
  },
  computed: {
    ...mapGetters('navRight', [
      'getUser'
    ]),
    subName () {
      return common.subName(this.getUser.type)
    },
    activeIndex () {
      let currentRouteName = this.$route.name
      return (currentRouteName === 'AddUser') ? '/UserManage/AddUser' : '/UserManage/DelUser'
    }
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
</style>

