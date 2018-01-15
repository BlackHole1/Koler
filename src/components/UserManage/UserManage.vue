<template>
  <div class="user-manage">
    <v-header></v-header>
    <el-row type="flex" class="row" justify="center">
      <el-col :span="3">
         <el-menu default-active="addUser" class="el-menu-vertical-demo">
          <el-menu-item index="addUser">
            <i class="el-icon-menu"></i>
            <span slot="title">添加老师</span>
          </el-menu-item>
          <el-menu-item index="delUser">
            <i class="el-icon-setting"></i>
            <span slot="title">删除老师</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="1"> </el-col>
      <el-col :span="11">
        <v-jumbotron>
          
        </v-jumbotron>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from '~/Header'
import Jumbotron from '~/Jumbotron'
export default {
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

