<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  html {
    height:100%;
    width:100%;
    background-image: url(/static/loginBackground.jpg);
    background-attachment:fixed;
    background-repeat: no-repeat;
    background-size:cover;
  }
  body{
    margin: 0;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    color: #1f2f3d;
  }
  ::-webkit-scrollbar {  
    width: 0;  
  }
</style>
<script>
export default {
  name: 'app'
}
</script>