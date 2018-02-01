<template>
  <div class="main">
    <v-header></v-header>
    <el-row type="flex" class="row" justify="center">
      <!-- 判断数据库里是否有数据 -->
      <!-- 如果没有数据 -->
      <el-col :span="12" v-if='!getProblemsWarehouseInfo'>
        <v-jumbotron>
          <h1>Sorry</h1>
          <p>您还没有创建任何的题库</p>
          <el-button type="primary" size="large" @click="toggleDialog('create')" :loading="dialog.loading">点我创建</el-button>
        </v-jumbotron>
      </el-col>
      <!-- 如果数据里有数据 -->
      <el-col :span="11" v-else>
        <!-- 判断是否已经进入到题库里 -->
        <!-- 如果没有，则显示题库标题 -->
        <v-jumbotron v-if="!this.$route.params.name">
          <div class="pw-operation">
            <el-button type="text" style="font-size: 16px;" @click="toggleDialog('create')">创建题库</el-button>
            <el-button type="text" style="font-size: 16px;" @click="toggleDialog('delete')">删除题库</el-button>
            <el-button type="text" style="font-size: 16px;" @click="toggleDialog('rename')">重命名题库</el-button>
          </div>
          <el-button type="primary" size="medium" icon="document" class="pw-button" v-for="name in getProblemsWarehouseInfo.names" :key="name.id" @click="showProblemsWarehouse">{{name}}</el-button>
          <span style="clear: both;"></span>
        </v-jumbotron>
        <!-- 如果有，则说明已经进入到router里，则显示router对应的组件 -->
        <router-view v-else></router-view>
      </el-col>
      <!-- 无论如何都显示右侧用户信息 -->
      <el-col :span="1">
      </el-col>
      <el-col :span="4">
        <v-nav-right ></v-nav-right>
      </el-col>
    </el-row>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.state"
      width="22%">
      <div v-if="dialog.model === 'rename'">
        <el-select v-model="dialog.name" size="medium" placeholder="请选择您要重命名的题库" style="width: 100%">
          <el-option
            v-for="item in getProblemsWarehouseInfo.names"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <br><br>
        <el-input  size="medium" placeholder="新名称" v-model="dialog.changeName"></el-input>
      </div>
      <div v-else>
        <el-input size="medium" :placeholder="dialog.placeholder" v-model="dialog.name" :autofocus="true"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" icon="el-icon-close" @click="toggleDialog()">取 消</el-button>
        <el-button type="primary" size="small" icon="el-icon-check" @click="PWOperation(dialog.model)" :loading="dialog.loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Header from '~/Header'
import Jumbotron from '~/Jumbotron'
import navRight from '~/NavRight'
import { isNoSymbols } from '../../../common/function'
export default {
  created () {
    this.getProblemsWarehouseList()
  },
  data () {
    return {
      dialog: {
        state: false, // 弹框是否显示
        model: '',  // 属于创建(create)还是删除(delete)还是重命名(rename)
        title: '',  // 不同的model，不同的标题
        placeholder: '',  // 不同的model，不同的提示文字
        name: '', // 当前选择的题库名称
        changeName: '',  // 修改后的题库名称
        loading: false // 当点击确定后，禁止重复点击，并显示loading
      }
    }
  },
  methods: {
    ...mapActions('problemsWarehouse', [
      'getProblemsWarehouseList'
    ]),
    showProblemsWarehouse (e) {
      this.$router.push({
        path: `ProblemsWarehouse/${e.target.innerText}/1`
      })
    },
    toggleDialog (model) {
      const dialog = this.dialog
      dialog.state = !dialog.state
      dialog.loading = false
      dialog.name = ''
      dialog.changeName = ''
      if (model) {
        dialog.model = model
        switch (model) {
          case 'create':
            dialog.title = '创建题库'
            dialog.placeholder = '题库名称'
            break
          case 'delete':
            dialog.title = '删除题库'
            dialog.placeholder = '将要删除的题库名称'
            break
          case 'rename':
            dialog.title = '重命名题库'
            break
        }
      }
    },
    PWOperation (model) {
      const dialog = this.dialog
      dialog.loading = true
      let request = {
        state: true,
        data: ''
      }
      const ajaxPromise = (model) => {
        switch (model) {
          case 'create':
            if (isNoSymbols(dialog.name)) {
              request.data = this.$http.post(`/Api/problemsWarehouse/`, {
                name: dialog.name
              })
            } else {
              request.state = false
              request.data = '请确定您输入的题库名称里只包含字母、数字、中文'
            }
            break
          case 'delete':
            request.data = this.$http.delete(`/Api/problemsWarehouse/?name=${dialog.name}`)
            break
          case 'rename':
            if (isNoSymbols(dialog.changeName)) {
              request.data = this.$http.put(`/Api/problemsWarehouse/`, {
                name: dialog.name,
                changeName: dialog.changeName
              })
            } else {
              request.state = false
              request.data = '请确定您重命名的题库名称里只包含字母、数字、中文'
            }
            break
          default:
            request.state = false
            request.data = '选择的模式不正确'
            break
        }
        return new Promise((resolve, reject) => {
          if (request.state) {
            resolve(request.data)
          } else {
            reject(request.data)
          }
        })
      }
      ajaxPromise(model).then(res => {
        dialog.loading = false
        const data = res.data
        this.$message[data.state ? 'success' : 'error'](data.data)
        this.toggleDialog()
        if (data.state) {
          this.getProblemsWarehouseList()
        }
      }).catch(data => {
        dialog.loading = false
        this.$message.error(data)
      })
    }
  },
  computed: {
    ...mapGetters('problemsWarehouse', [
      'getProblemsWarehouseInfo'
    ])
  },
  components: {
    'v-header': Header,
    'v-jumbotron': Jumbotron,
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
    margin: 20px 20px 0 -10px;
  }
</style>

<style>
.jumbotron {
  padding: 48px 60px 48px 70px !important;
}
</style>