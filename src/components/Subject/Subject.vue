<template>
  <div class="subject" v-if="state">
    <el-card class="box-card" v-for="(subject, id) in details" :key="subject.id">
      <div slot="header" class="clearfix">
        <span style="line-height: 32px;font-size:20px;">
          <span>{{id+1}}、{{subject.name}}</span>
        </span>
        <el-dropdown trigger="click" style="float: right;">
          <el-button type="primary">
            操作<i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-edit el-icon--left"></i> 修 改</el-dropdown-item>
            <el-dropdown-item><i class="el-icon-delete el-icon--left"></i> 删 除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="item">
        <el-tooltip class="item" effect="dark" content="题目内容" placement="left">
          <span>{{subject.content}}</span>
        </el-tooltip>
      </div>
      <div class="item">
        <el-tooltip class="item" effect="dark" content="题目注释" placement="left">
          <span class="note">{{subject.note}}</span>
        </el-tooltip>
      </div>
      <div class="item">
        <el-tooltip class="item" effect="dark" content="题目答案" placement="left">
          <el-button class="answer">显示答案</el-button>
        </el-tooltip>
      </div>
      <div class="card-foot">
        <el-tooltip class="item" effect="dark" content="题目分数" placement="left">
          <b style="font-size:18px;color:#ff4949">{{subject.score}}</b>
        </el-tooltip>
        <div class="tag">
          <el-tag class="tag-item" v-for="tag in subject.category" :key="tag">{{tag}}</el-tag>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      name: '',
      num: '',
      state: false,
      details: []
    }
  },
  created () {
    const name = (this.name = this.$route.params.name)
    const num = (this.num = this.$route.params.num)
    if (this.getDetailsByName(this.name).state) {
      let data = this.getProblemsWarehouseInfo[name].details
      this.details = num === 'all' ? data : data.slice(0, num)
      this.state = true
    } else {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(['getDetailsByName', 'getProblemsWarehouseInfo'])
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.item {
  margin: 18px 0;
  font-size: 18px;
  i {
    font-size: 16px;
  }
  .answer {
    font-size: 14px;
  }
  .note {
    font-size: 16px;
    color: #8391a5;
  }
}

.card-foot {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #d1dbe5;
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
</style>