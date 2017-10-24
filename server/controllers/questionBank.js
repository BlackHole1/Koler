let questionBank = async(ctx, next) => {
  const data = {
    count: 2, // 题库数量
    names: [ // 题库的名称
      '云计算',
      '大数据'
    ],
    '云计算': { // 题库里的题目
      details: [ // 题目的详细信息
        {
          name: 'inspect查看底层信息', // 题目的名字
          content: '在server节点，使用inspect只查询rancher/server容器的NetworkSettings内Networks网桥信息，将以上操作命令及检查结果填入答题框。', // 题目的内容（支持部分html）
          answer: 'asd', // 答案
          note: '附件：xxx', // 备注
          category: [ // 题目属于哪个类别
            'linux',
            'docker',
            'inspect'
          ],
          score: 2 // 此题分数
        },
        {
          name: 'docker部署RocketChat', // 题目的名字
          content: '通过“应用商店”部署RocketChat，修改网页访问端口为9097，通过inspect命令查看该服务的配置信息，提交执行结果文本到答题框。', // 题目的内容（支持部分html）
          answer: '', // 答案
          note: '无', // 备注
          category: [ // 题目属于哪个类别
            'linux',
            'docker',
            'RocketChat'
          ],
          score: 3 // 此题分数
        }
      ]
    }
  }
  ctx.response.body = data
}

module.exports = {
  'method': 'get',
  'path': '/Api/questionBank',
  'component': questionBank,
  'data': questionBank
}
