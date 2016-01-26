var request = require('request')
var cheerio = require('cheerio')
var duration = require('./duration')

module.exports = function (cb) {
  request
    .get(
      'http://tvcast.naver.com',
      function (err, res, body) {
        if (err) {
          return cb(err)
        }

        var $ = cheerio.load(body)

        var items = []
        var $items = $('#rank_container li')
        var $item = null
        var $anchor = null

        for (var i = 0; i < $items.length; i++) {
          $item = $($items[i])
          $anchor = $($item.find('dl dt a'))

          items.push({
            url: $anchor.attr('href'),
            title: $($anchor.find('tooltip')).attr('title'),
            thumb_url: $($item.find('div.box > a > img')).attr('src'),
            duration: duration($($item.find('div.box > a > em.time')).text())
          })
        }

        cb(null, items)
      }
  )
}
