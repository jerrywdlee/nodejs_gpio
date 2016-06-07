var rpio = require('rpio');

/*
26-pin models: pin 12
40-pin models: pins 12, 19, 33, 35
*/

var pin1 = 12;           /* P12/GPIO18 */  //pin12  pin32同输出
var pin2 = 32;           /* p32/GPIO12 */
var pin3 = 33;           /* GPIO13*/  //pin33 pin35 同输出
var pin4 = 35;           /* GPIO19*/
var range = 1024;       /* LEDs can quickly hit max brightness, so only use */
var max = 128;          /*   the bottom 8th of a larger scale */
var clockdiv = 8;       /* Clock divider (PWM refresh rate), 8 == 2.4MHz */
var interval = 5;       /* setInterval timer, speed of pulses */
var times = 5;          /* How many times to pulse before exiting */

/*
 * Enable PWM on the chosen pin and set the clock and range.
 */
rpio.open(pin1, rpio.PWM);
rpio.open(pin2, rpio.PWM);
rpio.open(pin3, rpio.PWM);
rpio.open(pin4, rpio.PWM);

rpio.pwmSetClockDivider(clockdiv);
rpio.pwmSetRange(pin1, range);
rpio.pwmSetRange(pin2, range);
rpio.pwmSetRange(pin3, range);
rpio.pwmSetRange(pin4, range);

rpio.pwmSetData(pin1, range);
rpio.pwmSetData(pin2, range/2);
rpio.pwmSetData(pin3, range/4);
rpio.pwmSetData(pin4, range/6);

/*
 * Repeatedly pulse from low to high and back again until times runs out.
 */
setTimeout(function () {
  var direction = 1;
  var data = 0;
  var pulse = setInterval(function() {
          rpio.pwmSetData(pin1, data);
          rpio.pwmSetData(pin2, data);
          //rpio.pwmSetData(pin3, max-data);
          rpio.pwmSetData(pin4, max-data);
          if (data === 0) {
                  direction = 1;
                  if (times-- === 0) {
                          clearInterval(pulse);
                          rpio.open(pin1, rpio.INPUT);
                          rpio.open(pin2, rpio.INPUT);
                          rpio.open(pin3, rpio.INPUT);
                          rpio.open(pin4, rpio.INPUT);
                          return;
                  }
          } else if (data === max) {
                  direction = -1;
          }
          data += direction;
  }, interval, data, direction, times);

},1000)
