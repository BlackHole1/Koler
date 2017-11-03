<template>
  <div class="main">
    <v-header></v-header>
    <!-- 判断数据库里是否有数据 -->
    <!-- 如果没有数据 -->
    <el-row :gutter="20" class="row" v-if='!getProblemsWarehouseInfo'> 
      <el-col :span="16" :offset="4">
        <v-jumbotron>
          <h1>Sorry</h1>
          <p>您还没有创建任何的题目</p>
          <el-button type="primary" size="large">点我创建</el-button>
        </v-jumbotron>
      </el-col>
    </el-row>
    <!-- 如果数据里有数据 -->
    <el-row type="flex" class="row" justify="center" v-else>
      <el-col :span="12">
        <!-- 判断是否已经进入到题库里 -->
        <!-- 如果没有，则显示题库标题 -->
        <v-jumbotron v-if="!this.$route.params.name">
          <h1>题库列表</h1>
          <p>以下是您创建的题库</p>
            <el-button type="primary" size="large" icon="document" v-for="name in getProblemsWarehouseInfo.names" :key="name.id" @click="showProblemsWarehouse">{{name}}</el-button>
        </v-jumbotron>
        <!-- 如果有，则说明已经进入到router里，则显示router对应的组件 -->
        <router-view v-else></router-view>
      </el-col>
      <el-col :span="1">
      </el-col>
      <el-col :span="5">
        <v-nav-right ></v-nav-right>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '~/Header'
import Jumbotron from '~/Jumbotron'
import Subject from '~/Subject'
import navRight from '~/NavRight'
export default {
  created () {
    this.$store.dispatch('getProblemsWarehouseList')
  },
  methods: {
    showProblemsWarehouse (e) {
      this.$router.push({
        path: `ProblemsWarehouse/${e.target.innerText}/all`
      })
    }
  },
  computed: {
    ...mapGetters([
      'getProblemsWarehouseInfo'
    ])
  },
  components: {
    'v-header': Header,
    'v-jumbotron': Jumbotron,
    'v-subject': Subject,
    'v-nav-right': navRight
  }
}
</script>

<style lang="less" scoped>
  .row {
    margin-top: 20px;
    margin-right: 0 !important;
  }
  .bg-purple {
    background: #d3dce6;
  }
</style>
