const fun = {
  navRightModeltoggle: (self) => {
    const routerName = self.$router.history.current.name
    const model = (routerName === 'Main')
      ? 'user'
      : (routerName === 'ProblemsWarehouse')
      ? 'subject'
      : (routerName === 'Exam')
      ? 'exem'
      : 'user'
    self.$store.dispatch('getInfoBymodel', {
      model: model,
      subjectName: (self.$router.history.current.params.name) ? self.$router.history.current.params.name : ''
    })
  }
}

exports.install = function (Vue, options) {
  Vue.prototype.fun = fun
}
