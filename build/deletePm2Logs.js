let del = require('delete')

console.log('开始删除pm2的logs文件')

del(['./logs/*.log'], {force: true}, function(err, deleted) {
  if (err) {
    console.log('无法删除pm2的logs文件，请手动删除/logs目录下的日志文件')
  } else {
    console.log('成功删除pm2的logs文件');
  }
});