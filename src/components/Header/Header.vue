<template>
  <div class="header">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" menu-trigger="click" :router="true">
      <el-menu-item index="/" class="nav-left">我的题库</el-menu-item>
      <el-menu-item index="/OnlineExam" v-if="onlineExamShow">在线考试</el-menu-item>
      <el-menu-item index="/MyTest" v-if="myTest">我的试卷</el-menu-item>
      <el-menu-item index="/UserManage" v-if="userManageShow">用户管理</el-menu-item>
      <el-menu-item index="/ExamManage" v-if="myTest">考试管理</el-menu-item>
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
      this.$store.dispatch('navRight/getInfoBymodel', {
        model: 'user'
      })
    }
  },
  computed: {
    ...mapGetters('navRight', [
      'getUser'
    ]),
    activeIndex () {
      let activeName = ''
      if (this.$route.name === 'Main' || this.$route.name === 'ProblemsWarehouse') {
        activeName = '/'
      } else if (this.$route.name === 'MyTest' || this.$route.name === 'TestDetails') {
        activeName = '/MyTest'
      } else if (this.$route.name === 'ExamManage') {
        activeName = '/ExamManage'
      } else if (this.$route.name === 'onlineExam') {
        activeName = '/onlineExam'
      } else if (this.$route.name === 'AddUser' || this.$route.name === 'DelUser') {
        activeName = '/UserManage'
      }
      return activeName
    },
    userManageShow () {
      const currentUserlevel = this.getUser.type
      return (currentUserlevel && currentUserlevel !== 'Student')
    },
    onlineExamShow () {
      const currentUserlevel = this.getUser.type
      return (currentUserlevel && currentUserlevel === 'Student')
    },
    myTest () {
      const currentUserlevel = this.getUser.type
      return (currentUserlevel && currentUserlevel === 'Teacher')
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
