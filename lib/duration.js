module.exports = function (txt) {
  var time = txt.split(':')
  var sec = 0

  for (var i = 0; i < time.length; i++) {
    sec += Math.pow(60, i) * time[i]
  }

  return sec
}
