<template>
  <div class="del-user">
    删除{{subName}}
  </div>
</template>

<script>
import common from '../../../../common/function'
import { mapGetters } from 'vuex'
export default {
  name: 'delUser',
  computed: {
    ...mapGetters('navRight', [
      'getUser'
    ]),
    subName () {
      return common.subName(this.getUser.type)
    }
  }
}
</script>

<style>

</style>
