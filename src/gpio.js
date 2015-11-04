var gpio = require('pi-gpio');


exports.poll = function(pin, sleepTime, fn) {

  var read = function() {
    gpio.read(pin, function(err, value) {
      if(err) throw err;

      fn(value)
      setTimeout(fn, sleepTime);
    });
  };

  // polling only work with input
  gpio.open(pin, "input", function(err) {
    if(err) throw err;

    read();
  });
};


exports.stop = function(pin) {
  // TODO: implement stop
};