<template>
  <div class="mytest">
    <v-header></v-header>
    <el-row type="flex" class="row" justify="center">
      <el-col :span="14">
        <v-jumbotron v-if="examList.length === 0">
          <p>您还没有创建任何的试卷</p>
          <el-button type="primary" size="large">点我创建</el-button>
        </v-jumbotron>
        <v-jumbotron v-else>
          <div class="mytest-operation">
            <el-button type="text">创建试卷</el-button>
            <el-button type="text">删除试卷</el-button>
            <el-button type="text">重命名试卷</el-button>
          </div>
          <el-button type="primary" size="medium" icon="document" class="mytest-button" v-for="name in examList" :key="name">{{name}}</el-button>
          <span style="clear: both;"></span>
        </v-jumbotron>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from '~/Header'
import Jumbotron from '~/Jumbotron'
export default {
  created () {
    this.$http.get('/Api/exam')
      .then(resp => {
        const {state, data} = resp.data
        if (!state) {
          return this.$message.error(data)
        }
        this.examList = data
      })
  },
  data () {
    return {
      examList: []
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
  .mytest-operation {
    margin-left: -10px;
    button {
      font-size: 16px;
    }
  }
  .mytest-button {
    margin: 20px 20px 0 -10px;
  }
</style>
