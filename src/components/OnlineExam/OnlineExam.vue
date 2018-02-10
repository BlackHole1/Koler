<template>
  <div class="OnlineExam">
    <v-header></v-header>
    <el-row type="flex" class="row" justify="center">
      <el-col :span="14">
        <v-jumbotron>
          <p>
            在下面选择你要考试的模式
          </p>
          <el-button type="primary" icon="el-icon-edit">自己出卷考试</el-button>
          <el-button type="primary" icon="el-icon-edit-outline">老师发卷考试</el-button>
        </v-jumbotron>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from '~/Header'
import Jumbotron from '~/Jumbotron'
export default {
  name: 'OnlineExam',
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

