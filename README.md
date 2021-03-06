# naver-tvcast

tvcast library for Node.js

The unofficial module to crawl the content of the site.
Therefore, whenever it may not be a normal operation, if problems occur, please add the issue.

[![version](https://img.shields.io/npm/v/naver-tvcast.svg) ![download](https://img.shields.io/npm/dm/naver-tvcast.svg)](https://www.npmjs.com/package/naver-tvcast)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Usage

### tvcast.search

```javascript
var tvcast = require('./')

tvcast.search({
  keyword: '시그널',
  page: 1,
  sort: 'date'
}, function (err, result) {
  console.log(err, result)
})

```
```javascript
{
  "page": 1,
  "limit": 20,
  "keyword": "시그널",
  "sort": "date",
  "items": [
    // ...
    {
      "url": "http://tvcast.naver.com/v/710609",
      "title": "조진웅, \"시그널은 말도 안 되는 이야기\"",
      "thumb_url": "http://tvcast1.phinf.naver.net/20160125_12/Z4BC9_1453710363045lw0Mm_JPEG/531C05F32307F37C1E330E3393790913286_muploader_o_480P_854_1024_128_logo.jpg?type=f194_109",
      "duration": 2221
    },
    //...
```

#### sort

* `date`
* `rel`


### tvcast.load

```javascript
tvcast.list(['top50'], function (err, result) {
  console.log(err, JSON.stringify(result))
})

```
```javascript
{
  "top50": [
    {
      "url": "http://tvcast.naver.com/v/711374",
      "title": "180도 돌변해버린 두 얼굴의 여자친구 3",
      "thumb_url": "http://tvcast2.phinf.naver.net/20160125_188/tCScQ_1453733440496SylUu_JPEG/6AP5sBCg4dkq.jpg?type=f236_133",
      "duration": 3423
    },
    // ...
    ]
}
```
#### targets

* `top50`

## LICENSE

naver-tvcast is licensed under the MIT license.
