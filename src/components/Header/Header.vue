<template>
  <div class="header">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true">
      <el-menu-item index="/" class="nav-left">我的题库</el-menu-item>
      <el-submenu index="2" class="nav-right">
        <template slot="title">账号</template>
        <el-menu-item index="2-1">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '/'
    }
  }
}
</script>

<style lang="less" scoped>
  .nav-right{
    float: right;
    margin-right: 20%;
  }
  .nav-left{
    margin-left: 20%;
  }
</style>
