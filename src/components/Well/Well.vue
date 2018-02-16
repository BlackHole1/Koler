<template>
  <div class="well">
    <el-button @click="toggle">显示/隐藏答案</el-button>
    <div :class="toggleState && 'answer'">
      <slot v-if="toggleState"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      toggleState: false
    }
  },
  methods: {
    toggle () {
      this.toggleState = !this.toggleState
    }
  }
}
</script>

<style lang="less" scoped>
  .well {
    padding: 18px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
    .answer {
      margin-top: 20px;
      font-size: 16px;
    }
  }
</style>