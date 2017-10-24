<template>
  <div class="jumbotron">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
  .jumbotron{
    display: block;
    padding: 48px 60px;
    background-color: #d3dce6;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    h1{
      font-size: 32px;
      font-weight: 500;
    }
    p{
      font-size: 21px;
    }
  }
</style>
