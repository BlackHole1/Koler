<template>
  <div class="nav-right">
    <div class="main">
      <div class="userInfo" v-if="getModel === 'user'">
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
        <span class="created_date">
          创建时间：{{getUser.created_date}}
        </span>
      </div>
      <div class="subject" v-if="getModel === 'subject'">
        <div class="subject">
          题目名称：<br/><br/>
          {{$router.history.current.params.name}}
        </div>
        <div class="count">
          题目数量：{{getSubject.count}}
        </div>
        <div class="practice">
          练习次数：{{getSubject.practiceNumber}}
        </div>
        <div class="practice">
          平均分：{{getSubject.average}}
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
  methods: {
    checkModel () {
      this.fun.navRightModeltoggle(this)
    }
  },
  computed: {
    ...mapGetters([
      'getModel',
      'getUser',
      'getSubject',
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
  .userInfo, .subject {
    text-align: center;
    .header {
      padding: 10px 0;
      border-bottom: 1px solid #d3dce6;
      img {
        width: 100px;
        height: 100px;
        border-radius: 500px;
      }
      .name {
        display: block;
        margin-top: 10px;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 2px;
      }
    }
    .type, .upper, .upper_name, .created_date, .count, .practice, .subject{
      display: block;
      padding: 10px 0;
      border-bottom: 1px solid #d3dce6;
    }
    & > div:last-of-type, span:last-of-type{
      border-bottom: none !important;
    }
  }
</style>
