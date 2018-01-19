<template>
  <div class="del-user">
    删除{{subName}}
  </div>
</template>

<script>
import common from '../../../../common/function'
export default {
  name: 'delUser',
  computed: {
    subName () {
      return common.subName(this.$store.getters.getUser.type)
    }
  }
}
</script>

<style>

</style>
