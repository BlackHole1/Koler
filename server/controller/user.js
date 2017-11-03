const resource = {
  getInfo: (req, res, next) => {
    const data = {
      'id': 5,
      'name': '小明',
      'avatar_url': 'https://avatars0.githubusercontent.com/u/8198408?v=4',
      'type': 'Student',
      'upper': 'Teacher',
      'upper_name': 'Boss',
      'created_date': '2015-07-18 11:20:32'
    }
    res.send(data)
  }
}

module.exports = resource
