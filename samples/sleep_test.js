var tsleep = require('thread-sleep');
//var usleep = require('sleep')

var str = "World"
// res is the actual time that we slept for
//console.log(res + ' ~= ' + (end - start) + ' ~= 1000');
// tested on osx and resulted in => 1005 ~= 1010 ~= 1000
process.stdin.on('data',function (data) {
  str = data.toString().replace(/[\n\r]/g,"")
})

setInterval(function () {
  var start = Date.now();
  var res = tsleep(1000);
  var end = Date.now();
  console.log("Hello "+str+"~="+(end - start) );
  //usleep.usleep(5000)
  tsleep(500);
  console.log("Hello "+str+"~="+"usleep" );
},2000)
