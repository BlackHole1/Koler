<template>
  <div class="ExamManage">
    <v-header></v-header>
    <el-row type="flex" class="row" justify="center">
      <el-col :span="14">
        <el-table :data="examList" style="width: 100%" :default-sort="{prop: 'created_date', order: 'descending'}">
          <el-table-column prop="created_date" label="创建时间" sortable width="180" fixed>
          </el-table-column>
          <el-table-column prop="name" label="考试名称" sortable width="200">
          </el-table-column>
          <el-table-column label="考试状态" width="240">
            <template slot-scope="scope">
              {{formatTime(scope.row.time, scope.row.time_range)}}
            </template>
          </el-table-column>
          <el-table-column prop="time_range" label="考试时长" sortable width="100">
          </el-table-column>
          <el-table-column prop="time_use" label="所用时间" sortable width="100">
          </el-table-column>
          <el-table-column prop="users_name" label="考试人员" min-width="450px">
            <template slot-scope="scope">
              <el-tag v-for="name of scope.row.users_name" :key="name" type="primary" style="margin-right: 10px;">{{name}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from '~/Header'

export default {
  name: 'ExamManage',
  created () {
    this.$http.get('Api/exam')
      .then(resp => {
        const {state, data} = resp.data
        if (!state) {
          return this.$message.error('未知错误，请尝试刷新页面')
        }
        if (data.length === 0) {
          this.$message.error('您还没有创建考试')
          this.$router.push('/MyTest')
          return false
        }
        this.$array(this.examList).replace(data)
      })
  },
  data () {
    return {
      examList: [{
        _id: '', // 数据库id
        name: '', // 考试名称
        email: '',  // 考试安排人邮箱
        time: '', // 开始考试时间
        users: [],  // 要考试的人员
        users_name: [], // 要考试的人员名称
        score: '', // 考试分数
        test_id: '', // 试卷id
        test_name: '', // 试卷名称
        time_range: '', // 考试限定时间 (单位: 分)
        time_use: '', // 考试所用时间
        timing_task_id: '', // 定时任务id
        created_date: '' // 考试创建时间
      }]
    }
  },
  methods: {
    formatTime (createTime, timeRange) {
      let currentTime = Date.now()  // 当前时间戳
      let surplusTimestamp = createTime - currentTime // 还剩多少分钟考试
      let examEndTime = createTime * 1 + (timeRange * 60000) // 考试结束时间戳
      if (surplusTimestamp < 0) {
        // if (Math.abs(surplusTimestamp) > examEndTime) {
        if (examEndTime > createTime && currentTime < examEndTime) {
          return '正在考试，距离结束还有' + Math.ceil((examEndTime - currentTime) / 60000) + '分钟'
        } else {
          return '已经考完'
        }
      }
      return '离考试开始，还有' + Math.ceil(surplusTimestamp / 60000) + '分钟'
    }
  },
  components: {
    'v-header': Header
  }
}
</script>

<style lang="less" scoped>
  .row {
    margin-top: 20px;
  }
</style>

