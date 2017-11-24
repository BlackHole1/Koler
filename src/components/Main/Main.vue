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
          <el-button type="primary" size="large" @click="toggleDialog()" :loading="loading">点我创建</el-button>
        </v-jumbotron>
      </el-col>
    </el-row>
    <!-- 如果数据里有数据 -->
    <el-row type="flex" class="row" justify="center" v-else>
      <el-col :span="12">
        <!-- 判断是否已经进入到题库里 -->
        <!-- 如果没有，则显示题库标题 -->
        <v-jumbotron v-if="!this.$route.params.name">
          <div class="pw-operation">
            <el-button type="text" style="font-size: 16px;" @click="toggleDialog('create')">创建题库</el-button>
            <el-button type="text" style="font-size: 16px;" @click="toggleDialog('delete')">删除题库</el-button>
          </div>
          <el-button type="primary" size="large" icon="document" class="pw-button" v-for="name in getProblemsWarehouseInfo.names" :key="name.id" @click="showProblemsWarehouse">{{name}}</el-button>
          <span style="clear: both;"></span>
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
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.state"
      width="22%">
      <el-input :placeholder="dialog.placeholder" v-model="PWName"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="toggleDialog()">取 消</el-button>
        <el-button type="primary" @click="PWOperation(dialog.model)" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
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
  data () {
    return {
      dialog: {
        state: false,
        model: '',
        title: '',
        placeholder: ''
      },
      loading: false,
      PWName: ''
    }
  },
  methods: {
    showProblemsWarehouse (e) {
      this.$router.push({
        path: `ProblemsWarehouse/${e.target.innerText}/all`
      })
    },
    toggleDialog (model) {
      const dialog = this.dialog
      dialog.state = !dialog.state
      this.loading = false
      this.PWName = ''
      if (model) {
        dialog.model = model
        if (model === 'create') {
          dialog.title = '创建题库'
          dialog.placeholder = '题库名称'
        } else if (model === 'delete') {
          dialog.title = '删除题库'
          dialog.placeholder = '将要删除的题库名称'
        }
      }
    },
    PWOperation (model) {
      const method = (model === 'create') ? 'post' : 'delete'
      this.loading = true
      this.$http[method](`/Api/problemsWarehouse/${(method === 'delete') ? '?name=' + this.PWName : ''}`, {
        name: this.PWName
      })
      .then((res) => {
        this.loading = false
        const data = res.data
        this.$message[data.state ? 'success' : 'error'](data.data)
        this.toggleDialog()
        if (data.state) {
          this.$store.dispatch('getProblemsWarehouseList')
        }
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
  .pw-operation {
    margin-left: -10px;
  }
  .pw-button {
    margin:20px 20px 0 -10px;
  }
</style>

<style>
.jumbotron {
  padding: 48px 60px 48px 70px !important;
}
</style>