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
    background-color:rgba(255, 255, 255, 0.9215686274509803);
    border: 1px solid #d3dce6;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    h1{
      font-size: 32px;
      font-weight: 500;
    }
    p{
      font-size: 21px;
    }
  }
</style>
