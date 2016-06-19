var rpio = require('rpio');
var tsleep = require('thread-sleep');
/*
26-pin models: pin 12
40-pin models: pins 12, 19, 33, 35
*/

var pin1 = 12;           /* P12/GPIO18 */  //pin12  pin32同输出
rpio.open(pin1, rpio.PWM);
var range = 1024;       /* LEDs can quickly hit max brightness, so only use */
var clockdiv = 8;       /* Clock divider (PWM refresh rate), 8 == 2.4MHz */
var data = range - 1; //0~1023

console.log("Plz Enter a Number between 0~1023:");

process.stdin.on('data',function (data) {
  try {
    data = parseInt(data.toString().replace(/[\n\r]/g,""));
    if (data > 1023) {
      data = 1023;
    }
    if (data < 0) {
      data = 0;
    }

  } catch (e) {
    console.log("Not A Number!!");
  }
})


rpio.pwmSetClockDivider(clockdiv);
rpio.pwmSetRange(pin1, range);

setInterval(function () {
  console.log("PWM On Pin "+ pin1 + " Is "+data+" at 2.4MHz");
  rpio.pwmSetData(pin1, data);
  tsleep(500);
  rpio.open(pin1, rpio.INPUT);
}, 500);
