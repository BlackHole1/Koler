/* eslint-disable no-extend-native */
module.exports = () => {
  /**
   * 针对Promise没有统一事件回调而增加的方法
   * 对Promise提交的issue：https://github.com/then/promise/issues/145
   * @param {*} callback 回调函数
   */
  Promise.prototype.unified = function (callback) {
    this.then(
      data => callback(true, data),
      data => callback(false, data)
    )
  }
}
/* eslint-enable */
