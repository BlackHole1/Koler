<template>
  <div class="header">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" menu-trigger="click" :router="true">
      <el-menu-item index="/" class="nav-left">我的题库</el-menu-item>
      <el-menu-item index="/UserManage" v-if="userManageShow">用户管理</el-menu-item>
      <el-submenu index="2" class="nav-right">
        <template slot="title">{{getUser.name}}</template>
        <el-menu-item index="/Setting">设置</el-menu-item>
        <el-menu-item index="/login/out">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () {
    if (this.getUser.name === '') { // 说明用户刷新页面，导致信息丢失。需要重新获取
      this.$store.dispatch('getInfoBymodel', {
        model: 'user'
      })
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ]),
    activeIndex () {
      return (this.$route.name === 'Main') ? '/' : '/UserManage'
    },
    userManageShow () {
      const currentUserlevel = this.$store.getters.getUser.type
      return (currentUserlevel && currentUserlevel !== 'Student')
    }
  }
}
</script>

<style lang="less" scoped>
  .header .el-menu {
    background-color: rgba(255, 255, 255, 0.9215686274509803);
  }
  .nav-right {
    float: right;
    margin-right: 20%;
  }
  .nav-left {
    margin-left: 20%;
  }
</style>
