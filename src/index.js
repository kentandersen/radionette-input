"use strict";

var interface = require('./interface');

var mpd = require('mpd');
var cmd = mpd.cmd;

var client = mpd.connect({
  port: 6600,
  host: '192.168.0.18',
});

var sendCommand = function(command) {
  return new Promise((resolve, reject) => {
    client.sendCommand(command, (error, message) => {
      !error ? resolve(message) : reject(error);
    });
  });
};

// client.on('ready', function() {
//   console.log('ready');
// });

interface.on('power', function(isOn) {
  if(isOn) {
    // /etc/init.d/shairport-sync start
  } else {
    // 'amixer set Master 0%'
    // /etc/init.d/shairport-sync stop
    sendCommand(cmd('stop', [])).then(sendCommand(cmd('clear', [])))
  }
});

interface.on('volume', function(volume) {
  // 'amixer set Master ' + Math.ceil(volume * 100) + '%'
});

interface.on('tuner', function() {
  // sendCommand(cmd('stop', []))
  //   .then(sendCommand(cmd('clear', [])))
  //   .then(sendCommand(cmd('add', ['http://lyd.nrk.no/nrk_radio_p1_ostlandssendingen_mp3_h'])))
  //   .then(sendCommand(cmd('play', [])));
});

