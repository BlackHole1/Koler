<template>
  <div class="exam">
    <v-header></v-header>
    <el-row type="flex" class="row" justify="center">
      考试系统
    </el-row>
  </div>
</template>

<script>
import Header from '~/Header'
export default {
  name: 'Exam',
  components: {
    'v-header': Header
  }
}
</script>

<style lang="less" scoped>

</style>

