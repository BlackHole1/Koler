<template>
  <div class="del-user">
    <el-row class="user-list">
      <el-col :span=5 v-for="(o) in userList" :key="o._id" class="card">
        <el-card :body-style="{ padding: '0px' }">
          <div class="image">
            <img :src="o.avatar_url">
            <el-button type="danger" icon="el-icon-delete" circle @click="delUser(o._id)"></el-button>
          </div>
          <div style="padding: 14px;">
            <span>{{o.name}}</span>
            <div class="bottom clearfix">
              <time class="email">{{ o.email }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
      <h4 v-if="userList.length === 0">
        当前你还没有创建任何的{{subName}}
      </h4>
    </el-row>
  </div>
</template>

<script>
import { getSubName } from '../../../../common/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'DelUser',
  created () {
    this.getUserList()
  },
  data () {
    return {
      userList: [{
        name: '',
        email: '',
        type: '',
        upper: '',
        upper_name: '',
        under: '',
        avatar_url: '',
        created_date: ''
      }]
    }
  },
  computed: {
    ...mapGetters('navRight', [
      'getUser'
    ]),
    subName () {
      return getSubName(this.getUser.type)
    }
  },
  methods: {
    delUser (id) {
      this.$confirm(`是否确认删除此${this.subName}?`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.delete(`/Api/users?id=${id}`)
            .then(resp => {
              const { state, data } = resp.data
              this.$message[state ? 'success' : 'error'](data)
              state && this.getUserList()
            })
        })
        .catch(() => {})  // 防止因点击取消，没有catch捕获。而报错
    },
    getUserList () {
      this.$http.get('/Api/users')
        .then(resp => {
          let { state, data } = resp.data
          if (!state) {
            this.$message.error(data)
            return this.$router.push('/')
          }
          this.userList = data
        })
    }
  }
}
</script>

<style lang="less" scoped>
.user-list {
  .card {
    margin-bottom: 30px;
    margin-right: 30px;
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      .image {
        img {
          background: rgba(248, 218, 218, 0.137);
        }
        button {
          opacity: 1;
        }
      }
    }
  }
  .email {
    font-size: 13px;
    color: #999;
    word-wrap:break-word;
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
    position: relative;
    width:100%;
    img {
      width: 100%;
      z-index: -1;
    }
    button {
      position: absolute;
      top: 50%;
      left: 40%;
      opacity: 0;
    }
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
</style>

