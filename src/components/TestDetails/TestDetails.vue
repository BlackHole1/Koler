<template>
  <div class="test-details">
    <el-row type="flex" class="row" justify="center" style="margin-top:20px">
      <el-col :span="11">
        <v-jumbotron v-if="getTestDetails.length === 0">
          <p>您还没有给当前试卷添加试题</p>
          <el-button type="primary" size="large">点我创建</el-button>
        </v-jumbotron>
        <div v-else>
          <v-jumbotron class="test-operation">
            <el-button type="text">从题库拉入试题</el-button>
            <el-button type="text">准备考试</el-button>
          </v-jumbotron>
          <br><br>
          <v-jumbotron>
            试题列表
          </v-jumbotron>
        </div>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="4">
        <v-nav-right></v-nav-right>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from '~/Header'
import Jumbotron from '~/Jumbotron'
import navRight from '~/NavRight'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'TestDetails',
  created () {
    let testData = this.getData
    // 当用户刷新页面时，vuex里的试卷列表将为空，则需要重新发送请求
    // 而当用户进入一个不存在的试卷时，跳转到试卷列表
    // 如果是正常的跳转，则直接进入else

    if (testData.length === 0) {  // 当刷新页面或者请求一个不存在的试卷时
      this.data(data => { // 发生获取试卷列表请求
        let checkTestName = data.some(test => {
          if (test.name === this.$route.params.name) {  // 如果存在当前试卷名
            this.test = test
            return true
          }
        })
        !checkTestName && this.$router.push('/MyTest')  // 如果发送请求后，还是没有匹配到试卷名，则跳转到试卷列表页面
      })
    } else {
      // 把当前试卷的信息赋值给test变量
      testData.some(test => {
        if (test.name === this.$route.params.name) {
          this.test = test
        }
      })
    }
  },
  data () {
    return {
      test: {}
    }
  },
  computed: {
    ...mapGetters('test', [
      'getData'
    ]),
    getTestDetails () {
      return this.test.hasOwnProperty('name') ? this.test.details : []
    }
  },
  methods: {
    ...mapActions('test', [
      'data'
    ])
  },
  components: {
    'v-header': Header,
    'v-jumbotron': Jumbotron,
    'v-nav-right': navRight
  }
}
</script>

<style scoped lang="less">
  .test-operation {
    padding:10px 10px 10px 30px !important;
    button {
      font-size: 15px;
    }
  }
</style>
