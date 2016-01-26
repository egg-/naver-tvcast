var request = require('request')
var cheerio = require('cheerio')
var async = require('async')
var duration = require('./duration')

module.exports = {
  /**
   * search videos
   * @method search
   * @param  {object} opts
   * @param  {number} opts.limit not work
   * @param  {number} opts.page
   * @param  {number} opts.keyword
   * @param  {number} opts.sort `rel`, `date`
   * @param  {Function} cb cb(err, result)
   * @return {number} page
   * @return {number} limit not work
   * @return {string} keyword
   * @return {string} sort
   * @return {array<object>} items
   */
  search: function (opts, cb) {
    var limit = 20
    var page = opts.page || 1
    var start = limit * (page - 1)
    var keyword = opts.keyword || ''
    var sort = (opts.sort || 'rel')
    var qs = [
      'query=' + encodeURIComponent(keyword),
      'sort=' + sort, // rel, date
      'start=' + start,
      'display=' + limit
    ]
    request
      .get(
        'http://tvcast.naver.com/api/html/search/more/?' + qs.join('&'),
        function (err, res, body) {
          if (err) {
            return cb(err)
          }

          var $ = cheerio.load(body)

          var items = []
          var $items = $('.thl')
          var $item = null
          var $anchor = null
          var $img

          for (var i = 0; i < $items.length; i++) {
            $item = $($items[i])
            $anchor = $($item.find('div.inner dt a'))
            $img = $($item.find('a.cds_thm img'))

            items.push({
              url: 'http://tvcast.naver.com' + $anchor.attr('href'),
              title: $img.attr('alt'),
              thumb_url: $img.attr('src'),
              duration: duration($($item.find('span.tm_b')).text())
            })
          }

          cb(null, {
            page: page,
            limit: limit,
            keyword: keyword,
            sort: sort,
            items: items
          })
        }
    )
  },
  list: function (targets, cb) {
    if (targets instanceof Array === false) {
      targets = [targets]
    }

    var tasks = {}

    for (var i = 0, name = null; i < targets.length; i++) {
      name = targets[i]

      if (crawler[name]) {
        tasks[name] = crawler[name]
      }
    }

    async.parallel(tasks, cb)
  }
}

var crawler = {
  top50: require('./top50')
}
