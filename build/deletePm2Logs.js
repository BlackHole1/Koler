let del = require('delete')

console.log('开始删除pm2的logs文件')

del(['./logs/*.log'], {force: true}, function(err, deleted) {
  if (err) {
    console.log('删除失败')
  } else {
    console.log('删除成功');
  }
});