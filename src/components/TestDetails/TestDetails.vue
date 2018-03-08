<template>
  <div class="test-details C-test">
    <el-row type="flex" class="row" justify="center" style="margin-top:20px">
      <el-col :span="11">
        <v-jumbotron v-if="getTestDetails.length === 0">
          <p>您还没有给当前试卷添加试题</p>
          <el-button type="primary" size="large" @click="pullSubject">从题库拉入试题</el-button>
        </v-jumbotron>
        <div v-else>
          <v-jumbotron class="test-operation">
            <el-button type="text" @click="pullSubject">从题库拉入试题</el-button>
            <el-button type="text">准备考试</el-button>
          </v-jumbotron>
          <br><br>
          <el-card class="box-card" v-for="(test, id) in getTestDetails" :key="test.id">
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
  </div>
</template>

<script>
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
    let testData = this.getData
    // 当用户刷新页面时，vuex里的试卷列表将为空，则需要重新发送请求
    // 而当用户进入一个不存在的试卷时，跳转到试卷列表
    // 如果是正常的跳转，则直接进入else

    if (testData.length === 0) {  // 当刷新页面或者请求一个不存在的试卷时
      this.data(data => { // 发生获取试卷列表请求
        let checkTestName = data.some(test => {
          if (test.name === this.$route.params.name) {  // 如果存在当前试卷名
            this.test = test
            return true
          }
        })
        !checkTestName && this.$router.push('/MyTest')  // 如果发送请求后，还是没有匹配到试卷名，则跳转到试卷列表页面
      })
    } else {
      // 把当前试卷的信息赋值给test变量
      testData.some(test => {
        if (test.name === this.$route.params.name) {
          this.test = test
        }
      })
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
      test: {},
      testSimplemdeConfigs: { // simplemde配置
        spellChecker: false, // 禁用拼写检查
        status: false, // 禁用底部状态栏
        toolbar: false,
        autoDownloadFontAwesome: false
      }
    }
  },
  computed: {
    ...mapGetters('test', [
      'getData',
      'getList'
    ]),
    getTestDetails () {
      return this.test.hasOwnProperty('name') ? this.test.details : []
    }
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
      this.$http.post('/Api/test', {
        lists,
        name: 'asd'
      })
        .then(resp => {
          console.log(resp)
        })
      this.end()
      this.notify.close()
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
  .box-card {
    background-color: rgba(255, 255, 255, 0.9215686274509803);
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
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
