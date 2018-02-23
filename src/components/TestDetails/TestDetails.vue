<template>
  <div class="test-details">
    <el-row type="flex" class="row" justify="center" style="margin-top:20px">
      <el-col :span="11">
        试卷详情
      </el-col>
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
export default {
  name: 'TestDetails',
  components: {
    'v-header': Header,
    'v-jumbotron': Jumbotron,
    'v-nav-right': navRight
  }
}
</script>

<style scoped lang="less">

</style>
