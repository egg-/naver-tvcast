var tvcast = require('./')

tvcast.search({
  keyword: '시그널',
  page: 1,
  sort: 'date'
}, function (err, result) {
  console.log(err, JSON.stringify(result))
})
