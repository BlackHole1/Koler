<template>
  <div class="mytest">
    <v-header></v-header>
    <div v-if="!this.$route.params.name">
      <el-row type="flex" class="row" justify="center">
        <el-col :span="14">
          <v-jumbotron v-if="getList.length === 0">
            <p>您还没有创建任何的试卷</p>
            <el-button type="primary" size="large" @click="create">点我创建</el-button>
          </v-jumbotron>
          <v-jumbotron v-else>
            <div class="mytest-operation">
              <el-button type="text" @click="create">创建试卷</el-button>
              <el-button type="text">删除试卷</el-button>
              <el-button type="text" @click="rename">重命名试卷</el-button>
            </div>
            <el-button type="primary" size="medium" icon="document" class="mytest-button" v-for="name in getList" :key="name" @click="testEntry(name)">{{name}}</el-button>
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
            v-for="item in getList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <br><br>
        <el-input size="medium" placeholder="新名称" v-model="dialog.rename.newName"></el-input>
        <span slot="footer">
          <el-button size="small" icon="el-icon-close" @click="cancelDialog('rename')">取 消</el-button>
          <el-button type="primary" size="small" icon="el-icon-check" @click="renameTest">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :title="dialog.create.title"
        :visible.sync="dialog.create.state"
        width="22%">
        <el-input size="medium" v-model="dialog.create.name" placeholder="请输入要创建试卷的名称"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" icon="el-icon-close" @click="cancelDialog('create')">取 消</el-button>
          <el-button type="primary" size="small" icon="el-icon-check" @click="createTest">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import Header from '~/Header'
import Jumbotron from '~/Jumbotron'
import { isNoSymbols } from '../../../common/utils'
import {mapGetters, mapActions} from 'vuex'
export default {
  created () {
    this.gettestList()
  },
  data () {
    return {
      dialog: {
        create: {
          state: false,
          title: '创建试卷',
          name: ''
        },
        rename: {
          state: false,
          title: '重命名试卷',
          name: '',
          newName: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters('test', [
      'getData'
    ]),
    getList () {
      if (this.getData.length !== 0) {
        // 把当前用户下所有的试卷名称提取出来
        let nameArr = []
        this.getData.map(info => nameArr.push(info.name))
        return nameArr
      }
      return []
    }
  },
  methods: {
    ...mapActions('test', [
      'data'
    ]),
    gettestList () {
      this.data()
    },
    testEntry (name) {
      this.$router.push({
        path: `MyTest/${name}/1`
      })
    },
    create () {
      this.dialog.create.state = true
    },
    rename () {
      this.dialog.rename.state = true
    },
    createTest () {
      const name = this.dialog.create.name
      if (!isNoSymbols(name)) return this.$message.error('试卷名称里只能包含英文、中文')
      this.$http.post('/Api/test', {
        name
      })
        .then(resp => {
          const {state, data} = resp.data
          this.$message[state ? 'success' : 'error'](data)
          if (state) {
            this.reset('create')
            this.gettestList()
          }
        })
    },
    renameTest () {
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
    cancelDialog (name) {
      this.dialog[name].state = false
    },
    reset (name) {
      const modelInfo = this.dialog[name]
      switch (name) {
        case 'rename':
          modelInfo.state = false
          modelInfo.name = ''
          modelInfo.newName = ''
          break
        case 'create':
          modelInfo.state = false
          modelInfo.name = ''
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
