<template>
  <div class="mytest">
    <v-header></v-header>
    <el-row type="flex" class="row" justify="center">
      <el-col :span="14">
        <v-jumbotron v-if="testList.length === 0">
          <p>您还没有创建任何的试卷</p>
          <el-button type="primary" size="large" @click="createTest">点我创建</el-button>
        </v-jumbotron>
        <v-jumbotron v-else>
          <div class="mytest-operation">
            <el-button type="text" @click="createTest">创建试卷</el-button>
            <el-button type="text">删除试卷</el-button>
            <el-button type="text" @click="rename">重命名试卷</el-button>
          </div>
          <el-button type="primary" size="medium" icon="document" class="mytest-button" v-for="name in testList" :key="name">{{name}}</el-button>
          <span style="clear: both;"></span>
        </v-jumbotron>
      </el-col>
    </el-row>
    <el-dialog
      :title="dialog.rename.title"
      :visible.sync="dialog.rename.state"
      width="22%">
      <el-select v-model="dialog.rename.name" size="medium" placeholder="请选择您要重命名的试卷" style="width: 100%">
        <el-option
          v-for="item in testList"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <br><br>
      <el-input  size="medium" placeholder="新名称" v-model="dialog.rename.newName"></el-input>
      <span slot="footer">
        <el-button size="small" icon="el-icon-close" @click="cancelDialog('rename')">取 消</el-button>
        <el-button type="primary" size="small" icon="el-icon-check" @click="sendRename">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Header from '~/Header'
import Jumbotron from '~/Jumbotron'
import { isNoSymbols } from '../../../common/utils'
import { mapGetters, mapActions } from 'vuex'
export default {
  created () {
    this.gettestList()
  },
  data () {
    return {
      testList: [],
      notify: {},
      dialog: {
        rename: {
          state: false,
          title: '重命名试卷',
          name: '',
          newName: ''
        }
      }
    }
  },
  methods: {
    ...mapActions('test', [
      'create',
      'end'
    ]),
    gettestList () {
      this.$http.get('/Api/test')
        .then(resp => {
          const {state, data} = resp.data
          if (!state) {
            return this.$message.error(data)
          }
          this.testList = data
        })
    },
    createTest () {
      if (this.getSituation === 'start') {
        this.$notify.error({
          title: '禁止创建',
          message: '您目前已经处于创建试卷的过程中'
        })
        return false
      }
      this.end()
      this.$confirm('创建试卷的过程中，请不要刷新网页、关闭浏览器，否则将重新创建试卷', '创建试卷', {
        confirmButtonText: '我已了解',
        cancelButtonText: '暂不创建',
        type: 'warning'
      })
      .then(() => {
        const h = this.$createElement
        this.$router.push('/')
        this.create()
        this.notify = this.$notify({
          title: '创建题库',
          duration: 0,
          showClose: false,
          message: h('div', null, [
            h('p', null, '您目前正处于创建试卷阶段。在此期间，请勿刷新网页、关闭浏览器'),
            h('el-button', {
              attrs: {
                type: 'text'
              },
              on: {
                click: this.startCreateTest
              }
            }, '生成试卷'),
            h('el-button', {
              attrs: {
                type: 'text'
              },
              on: {
                click: this.cancelCreateTest
              }
            }, '取消本次创建')
          ])
        })
      })
      .catch(() => {})  // 加入catch，防止没有捕获到数据而抱错
    },
    startCreateTest () {
      const list = this.getList
      console.log(list)
      this.end()
      this.notify.close()
    },
    cancelCreateTest () {
      this.$confirm('您确定要取消本次创建么？', '取消本次创建', {
        confirmButtonText: '确定取消',
        cancelButtonText: '点错了',
        type: 'warning'
      })
      .then(() => {
        this.end()
        this.notify.close()
      })
      .catch(() => {})
    },
    rename () {
      this.dialog.rename.state = true
    },
    cancelDialog (name) {
      this.dialog[name].state = false
    },
    sendRename () {
      const {name, newName} = this.dialog.rename
      if (!isNoSymbols(newName)) return this.$message.error('新的名字里只能包含英文、中文')
      this.$http.put('/Api/test', {
        name,
        newName
      })
        .then(resp => {
          const {state, data} = resp.data
          this.$message[state ? 'success' : 'error'](data)
          if (state) {
            this.reset('rename')
            this.gettestList()
          }
        })
    },
    reset (name) {
      const modelInfo = this.dialog[name]
      switch (name) {
        case 'rename':
          modelInfo.state = false
          modelInfo.name = ''
          modelInfo.newName = ''
          break
      }
    }
  },
  computed: {
    ...mapGetters('test', [
      'getSituation',
      'getList'
    ])
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
