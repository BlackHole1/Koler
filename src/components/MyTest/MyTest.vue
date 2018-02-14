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
            <el-button type="text" @click="rename">重命名试卷</el-button>
          </div>
          <el-button type="primary" size="medium" icon="document" class="mytest-button" v-for="name in examList" :key="name">{{name}}</el-button>
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
          v-for="item in examList"
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
export default {
  created () {
    this.getexamList()
  },
  data () {
    return {
      examList: [],
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
    getexamList () {
      this.$http.get('/Api/exam')
        .then(resp => {
          const {state, data} = resp.data
          if (!state) {
            return this.$message.error(data)
          }
          this.examList = data
        })
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
      this.$http.put('/Api/exam', {
        name,
        newName
      })
        .then(resp => {
          const {state, data} = resp.data
          this.$message[state ? 'success' : 'error'](data)
          if (state) {
            this.reset('rename')
            this.getexamList()
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
