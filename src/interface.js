var eventBus = require('events');


var digitalInput = require('./gpio'),
var Mcp3008 = require('mcp3008.js'),
var analogInput = new Mcp3008();

const LOOP_INTERVAL = 100;

const MODES = {
  11: 'fisk',
  13: 'lang',
  15: 'kort'
};

function guard(fn) {
  var oldVal;

  // because oldVal is undefined to begin with,
  // fn will always be called at first run
  return function(val) {
    if(val !== oldVal) {
      oldVal = val;
      fn(arguments);
    }
  };
}


digitalInput.poll(7, LOOP_INTERVAL, guard(function(isOn) {

  // only check check analog inputs if power switch is on
  if(isOn) {
    analogInput.poll(0, LOOP_INTERVAL, guard(eventBus.emit.bind(eventBus, 'volume')));
    analogInput.poll(1, LOOP_INTERVAL, guard(eventBus.emit.bind(eventBus, 'tuner')));
  } else {
    analogInput.stop(0);
    analogInput.stop(1);
  }

  eventBus.emit('power', isOn);
}));

// TODO: implement mode switcher

module.exports = eventBus;
