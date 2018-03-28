<template>
  <div class="nav-right">
    <div class="main">
      <div class="userInfo" v-if="model === 'user'">
        <div class="header">
          <img :src="getUser.avatar_url" alt="用户头像">
          <span class="name">{{getUser.name}}</span>
        </div>
        <span class="type">
          所属类别：{{getUser.type}}
        </span>
        <span class="upper">
          上级类别：{{getUser.upper}}
        </span>
        <span class="upper_name">
          上级用户：{{getUser.upper_name}}
        </span>
      </div>
      <div class="subject" v-if="model === 'subject'">
        <div class="name">
          题目名称：<br/><br/>
          {{$route.params.name}}
        </div>
        <div class="count">
          题目数量：{{getSubject.count}}
        </div>
      </div>
      <div class="testDetails" v-if="model === 'test'">
        <div class="name">
          试卷名称：<br/><br/>
          {{$route.params.name}}
        </div>
        <div class="count">
          试题数量：{{getTest.count}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () {
    this.checkModel()
  },
  watch: {
    '$route': 'checkModel'
  },
  data () {
    return {
      model: ''
    }
  },
  methods: {
    checkModel () {
      const routerName = this.$route.name
      let routeToModel = {
        'Main': 'user',
        'ProblemsWarehouse': 'subject',
        'TestDetails': 'test',
        'Exam': 'exam'
      }
      let model = (routeToModel.hasOwnProperty(routerName)) ? routeToModel[routerName] : 'user'
      this.model = model
      let paramsName = (this.$route.params.name) ? this.$route.params.name : ''
      this.$store.dispatch('navRight/getInfoBymodel', {
        model,
        subjectName: paramsName,
        testName: paramsName
      })
    }
  },
  computed: {
    ...mapGetters('navRight', [
      'getModel',
      'getUser',
      'getSubject',
      'getTest',
      'getExam'
    ])
  }
}
</script>

<style lang="less" scoped>
  .main {
    width: auto;
    height: auto;
    background-color: rgba(255, 255, 255, 0.9215686274509803);
    border: 1px solid #d3dce6;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  .userInfo, .subject, .testDetails {
    text-align: center;
    .header {
      padding: 10px 0 0 0;
      border-bottom: 1px solid #d3dce6;
      img {
        width: 100px;
        height: 100px;
        border-radius: 500px;
      }
      .name {
        display: block;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 2px;
      }
    }
    .type, .upper, .upper_name, .created_date, .count, .practice, .name {
      display: block;
      padding: 10px 0;
      border-bottom: 1px solid #d3dce6;
      &:last-of-type {
        border-bottom: none !important;
      }
    }
  }
</style>
