<template>
  <div class="setting">
    <v-header></v-header>
    <el-row type="flex" class="row" justify="center">
      <el-col :span="12">
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

