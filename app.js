/*
 * basic app to run the express server and control GPIO based on user input in the browser
 * NB! meant to run on Intel Edison
 */

var Cylon = require('Cylon');
var sys = require('sys');
var express = require('express');

var app = express();

Cylon.robot({
  connections: {
    edison: {
      adaptor: 'intel-iot'
    },
  }

  devices: {
    actC: {driver: 'led', pin: 6},
    actD: {driver: 'led', pin: 7},
    actE: {driver: 'led', pin: 8},
    actF: {driver: 'led', pin: 9},
    actG: {driver: 'led', pin: 10},
    actA: {driver: 'led', pin: 11},
    actB: {driver: 'led', pin: 12}

  },

  work: function(my) {
    var notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    var noteInd = 0;
    //switch everything off
    for (var i=0; i < notes.length; i++) {
      my['act'+notes[i]].turnOff;
    }
    //TODO: now listen to input from the web browser and act upon input
  }
}).start();


