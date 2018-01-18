<template>
  <div class="add-user">
    添加{{subName}}
  </div>
</template>

<script>
import common from '../../../common/function'
export default {
  name: 'addUser',
  computed: {
    subName () {
      return common.subName(this.$store.getters.getUser.type)
    }
  }
}
</script>

<style>

</style>
