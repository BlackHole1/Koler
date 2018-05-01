<template>
  <div class="test-details C-test">
    <el-row type="flex" class="row" justify="center" style="margin-top:20px">
      <el-col :span="11">
        <v-jumbotron v-if="details.length === 0">
          <p>您还没有给当前试卷添加试题</p>
          <el-button type="primary" size="large" @click="pullSubject">从题库拉入试题</el-button>
        </v-jumbotron>
        <div v-else>
          <v-jumbotron class="test-operation">
            <el-button type="text" @click="pullSubject">从题库拉入试题</el-button>
            <el-button type="text" @click="startExamDialog.state = true">准备考试</el-button>
          </v-jumbotron>
          <br><br>
          <el-card class="box-card" v-for="(test, id) in details" :key="test.id">
            <div slot="header" class="clearfix">
              <span class="test-header">
                <span>{{id+1}}、{{test.name}}</span>
              </span>
              <div class="test-info">
                <div class="tag">
                  <el-tag class="tag-item" v-for="tag in test.category" :key="tag">{{tag}}</el-tag>
                </div>
                <b>分值：{{test.score}}</b>
              </div>
            </div>
            <div class="item">
              <v-markdown class="test-content" :value="test.content" :configs="testSimplemdeConfigs" :highlight="true" ref="testContent" preview-class="markdown-body"></v-markdown>
            </div>
            <div class="card-foot">
              <el-button type="info" class="note" @click="showAnswerOrNote('note', test.note)"  size="small" icon="el-icon-document">显示备注</el-button>
              <el-button type="info" class="answer" @click="showAnswerOrNote('answer', test.answer)"  size="small" icon="el-icon-tickets">显示答案</el-button>
              <el-button type="danger" @click="deleteTest(test._id)"  size="small" icon="el-icon-delete"> 删 除 </el-button>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="4">
        <v-nav-right></v-nav-right>
      </el-col>
    </el-row>
    <el-dialog
      title="题目答案"
      :visible.sync="answerDialog.state"
      width="40%">
      <v-markdown v-model="answerDialog.data" v-if="answerDialog.state" :configs="testSimplemdeConfigs" :highlight="true" ref="answerSimplemde" preview-class="markdown-body"></v-markdown>
    </el-dialog>
    <el-dialog
      title="题目备注"
      :visible.sync="noteDialog.state"
      width="40%">
      <v-markdown v-model="noteDialog.data" v-if="noteDialog.state" :configs="testSimplemdeConfigs" :highlight="true" ref="noteSimplemde" preview-class="markdown-body"></v-markdown>
    </el-dialog>
    <el-dialog
      title="选中要考试的学生"
      :visible.sync="startExamDialog.state"
      width="1200px">
      <el-row class="user-list">
        <el-col :span=4 v-for="(item, index) in userList" :key="index" class="card">
          <div class="user" :class="{'selectUser': item.selectUser}" @click="selectUser(item, index)">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="item.avatar_url" class="image">
              <div class="footer">
                <span>{{item.name}}</span>
                <div class="bottom clearfix">
                  <time class="email">{{ item.email }}</time>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="startExam">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import Header from '~/Header'
import Jumbotron from '~/Jumbotron'
import navRight from '~/NavRight'
import {mapGetters, mapActions} from 'vuex'
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import hljs from 'highlight.js'
window.hljs = hljs

export default {
  name: 'TestDetails',
  created () {
    // 获取用户列表
    this.getUserList()

    this.testName = this.$route.params.name
    let testData = this.getData
    // 当用户刷新页面时，vuex里的试卷列表将为空，则需要重新发送请求
    // 而当用户进入一个不存在的试卷时，跳转到试卷列表
    // 如果是正常的跳转，则直接进入else

    if (testData.length === 0) {  // 当刷新页面或者请求一个不存在的试卷时
      this.data(data => { // 发送获取试卷列表请求
        let checkTestName = this.setTestList(data)
        !checkTestName && this.$router.push('/MyTest')  // 如果发送请求后，还是没有匹配到试卷名，则跳转到试卷列表页面
      })
    } else {
      // 把当前试卷的信息赋值给test变量
      this.setTestList(testData)
    }
  },
  mounted () {
    this.refreshTestContent()
  },
  updated () {
    this.refreshTestContent()
  },
  data () {
    return {
      testName: {},
      details: [],
      refreshList: true,
      userList: [{
        name: '',
        email: '',
        type: '',
        upper: '',
        upper_name: '',
        under: '',
        avatar_url: '',
        created_date: ''
      }],
      testSimplemdeConfigs: { // simplemde配置
        spellChecker: false, // 禁用拼写检查
        status: false, // 禁用底部状态栏
        toolbar: false,
        autoDownloadFontAwesome: false
      },
      answerDialog: {
        state: false,  // 是否显示备注
        data: ''  // 显示id的答案
      },
      noteDialog: {
        state: false,  // 是否显示答案
        data: ''  // 显示id的答案
      },
      startExamDialog: {
        state: false, // 是否显示下属列表
        data: []  // 已经选中的学生
      }
    }
  },
  computed: {
    ...mapGetters('test', [
      'getData',
      'getList'
    ])
  },
  methods: {
    ...mapActions('test', [
      'data',
      'create',
      'end'
    ]),
    refreshTestContent () {
      if (this.$refs.testContent !== undefined) {
        this.$refs.testContent.forEach(content => {
          const simplemde = content.simplemde
          if (!simplemde.isPreviewActive()) {
            simplemde.togglePreview()
          }
        })
      }
    },
    setTestList (data) {
      return data.some(test => {
        if (test.name === this.testName) {
          this.details = test.details
          return true
        }
      })
    },
    pullSubject () {
      if (this.getSituation === 'start') {
        this.$notify.error({
          title: '禁止重复点击',
          message: '您目前已经处于拉入试题的过程中'
        })
        return false
      }
      this.end()
      this.$confirm('拉入试题的过程中，请不要刷新网页、关闭浏览器，否则您将重新操作', '拉入试题', {
        confirmButtonText: '我已了解',
        cancelButtonText: '暂不创建',
        type: 'warning'
      })
      .then(() => {
        const h = this.$createElement
        this.$router.push('/')
        this.create()
        this.notify = this.$notify({
          title: '拉入试题',
          duration: 0,
          showClose: false,
          message: h('div', null, [
            h('p', null, '您目前正处于拉入试题阶段。在此期间，请勿刷新网页、关闭浏览器'),
            h('el-button', {
              attrs: {
                type: 'text'
              },
              on: {
                click: this.startCreateTest
              }
            }, '确认拉入'),
            h('el-button', {
              attrs: {
                type: 'text'
              },
              on: {
                click: this.cancelCreateTest
              }
            }, '取消本次拉入')
          ])
        })
      })
      .catch(() => {})  // 加入catch，防止没有捕获到数据而抱错
    },
    startCreateTest () {
      const lists = JSON.stringify(this.getList)
      this.$http.put('/Api/testSubject', {
        lists,
        name: this.testName
      })
        .then(resp => {
          const {state, data} = resp.data
          this.$message[state ? 'success' : 'error'](data)
          if (state) {
            this.$router.push(`/MyTest/${this.testName}`)
            this.$http.get('/Api/test').then(resp => {
              let content = resp.data.data
              content.some(test => {
                if (test.name === this.testName) {
                  this.details.splice(0, this.details.length)
                  this.details.push.apply(this.details, test.details)
                }
              })
            })
          }
          this.end()
          this.notify.close()
        })
    },
    cancelCreateTest () {
      this.$confirm('您确定要取消本次拉入试题的操作么？', '取消本次拉入', {
        confirmButtonText: '确认',
        cancelButtonText: '点错了',
        type: 'warning'
      })
      .then(() => {
        this.end()
        this.notify.close()
      })
      .catch(() => {})
    },
    showAnswerOrNote (model, data) {
      const answerOrNoteDialog = this[`${model}Dialog`]
      answerOrNoteDialog.state = !answerOrNoteDialog.state
      answerOrNoteDialog.data = data
      this.$nextTick(() => {
        const simplemde = this.$refs[`${model}Simplemde`].simplemde
        if (!simplemde.isPreviewActive()) {
          this.$refs[`${model}Simplemde`].simplemde.togglePreview()
        }
      })
    },
    deleteTest (id) {
      this.$confirm('此操作将永久删除该试题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.$http.delete(`/Api/testSubject/?name=${this.testName}&id=${id}`)
          .then(res => {
            const {state, data} = res.data
            this.$message[state ? 'success' : 'error'](data)
            if (state) {
              this.$http.get('/Api/test').then(resp => {
                let content = resp.data.data
                content.some(test => {
                  if (test.name === this.testName) {
                    this.details.splice(0, this.details.length)
                    this.details.push.apply(this.details, test.details)
                  }
                })
              })
            }
          })
      })
      .catch(() => {})
    },
    getUserList () {
      this.$http.get('/Api/users')
        .then(resp => {
          let { state, data } = resp.data
          if (!state) {
            this.$message.error(data)
          }
          this.userList = data
        })
    },
    selectUser (item, index) {
      let userList = this.startExamDialog.data
      if (item.selectUser) {
        this.$array(userList).remove([item.id])
        Vue.set(item, 'selectUser', false)
      } else {
        userList.push(item._id)
        Vue.set(item, 'selectUser', true)
      }
    },
    startExam () {
      let userList = this.startExamDialog.data
      if (userList.length === 0) {
        return this.$message.error('请至少选择一名用户进行考试')
      }
      this.$prompt('请为此次考试起个名字', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value == null) {
          return this.$message.error('名称不能为空')
        }
        // this.$http.post('/Api/exam')
        //   .then(resp => {
        //     const {state, data} = resp.data
        //     this.$message[state](data)
        //     if (state) {
        //       this.startExamDialog.state = false
        //       this.startExamDialog.data = []
        //     }
        //   })
      }).catch(() => {})
    }
  },
  components: {
    'v-header': Header,
    'v-jumbotron': Jumbotron,
    'v-nav-right': navRight,
    'v-markdown': markdownEditor
  }
}
</script>

<style scoped lang="less">
  .test-operation {
    padding:10px 10px 10px 30px !important;
    button {
      font-size: 15px;
    }
  }
  .C-test .box-card {
    background-color: rgba(255, 255, 255, 0.9215686274509803);
    margin-bottom: 20px;
    .clearfix {
      .test-checkbox {
        margin-right: 10px; 
      }
      .test-header {
        line-height: 32px;
        font-size:17px;
      }
      .test-info {
        float: right;
        .tag {
          display: inline-block;
        }
        b {
          display: inline-block;
          margin: 5px 0 0 50px;
          font-size:16px;
          color: #EB9E05;
        }
      }
    }
    .item {
      margin: 18px 0;
      font-size: 18px;
      &:first-of-type {
        margin: 0;
      }
      .test-content {
        line-height: 1.65;
        font-size: 16px;
      }
    }
    .card-foot {
      text-align: right;
      margin-top: 20px;
      padding-top: 10px;
      border-top: 1px solid #d1dbe5;
      .answer, .note{
        float: left;
      }
      .tag {
        float: right;
        .tag-item {
          margin-right: 10px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .user-list {
    .card {
      margin-bottom: 30px;
      margin-right: 30px;
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        .selectUser
      }
      .footer{
        padding: 14px;
      }
    }
    .email {
      font-size: 13px;
      color: #999;
    }
    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }
    .button {
      padding: 0;
      float: right;
      color: #f56c6c;
    }
    .image {
      width: 100%;
      display: block;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
  }
  .selectUser {
    * {
      cursor: pointer;
    }
    .footer {
      background-color: #0366d6;
      color: #fff;
    }
  }
</style>

<style lang="less">
.C-test {
  @import '~simplemde/dist/simplemde.min.css';
  @import '~github-markdown-css';
  @import '~highlight.js/styles/github.css';
  @import '~font-awesome/css/font-awesome.min.css';

  textarea {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial,sans-serif !important;
    height: 150px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .el-card__header {
    padding: 10px 20px;
  }
  .el-card__body {
    padding-top: 0;
    padding-bottom: 10px;
  }
  .markdown-editor {
    .editor-toolbar {
      line-height: normal;
    }
    .CodeMirror-line {
      font-size: 16px;
      line-height: normal;
    }
    .cm-comment {
      background: none !important;
    }
    pre code {
      white-space: pre-wrap;
      word-break: break-all;
    }
  }
  .test-content {
    .CodeMirror-wrap {
      min-height: auto;
      border: none;
      background-color: rgba(255, 255, 255, 0);
      .CodeMirror-sizer {
        display: none;
      }
      .CodeMirror-scroll {
        opacity: 0;
        min-height: auto;
        .CodeMirror-code {
          opacity: 0;
        }
      }
      .editor-preview {
        position: static;
      }
      .markdown-body {
        background-color: rgba(255, 255, 255, 0);
        overflow: hidden;
      }
    }
  }
  .el-form-item {
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>
