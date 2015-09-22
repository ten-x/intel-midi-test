//global object to put everything into
var IMA = {};

IMA.version = 0.1;
IMA.config = {
  env : (process.env.USER == 'root') ? 'edison' : 'pc' //on edison USER environment var is set to 'root' - so we use it to detect where we are running. //HACK
};

console.log(IMA.config.env);

var coreaudio  = require('node-core-audio-edison');
var noteFromPitch = require('./note-from-pitch.js');
var Cylon = require('cylon');
var sys = require('sys');
var detectPitchWad = require('./detect-pitch-wad.js');

//kick things off
IMA.init = function() {
  console.log('Starting up...');
  if(IMA.config.env == 'edison') {
    IMA.startActuators();
  };
  IMA.startAudioEngine();
};

//start actuators via cylon.js
IMA.startActuators = function() {
  IMA.cylon = Cylon.robot({
    connections: {
      edison: {
        adaptor: 'intel-iot'
      },
    },

    devices: {
      actC: {driver: 'led', pin: 6},
      actD: {driver: 'led', pin: 7},
      actE: {driver: 'led', pin: 8},
      actF: {driver: 'led', pin: 9},
      actG: {driver: 'led', pin: 10},
      actA: {driver: 'led', pin: 11},
      actB: {driver: 'led', pin: 12}

    },

    lightLedNote: function(note) {
      var self = this;
      var deviceName = 'act'+note.charAt(0);
      this.devices[deviceName].turnOn();
      setTimeout(function(){
        self.devices[deviceName].turnOff();
      },100);
    },

    work: function(my) {
      var notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
      var noteInd = 0;
      //switch everything off
      for (var i=0; i < notes.length; i++) {
        my['act'+notes[i]].turnOff;
      }
    }
  });
  IMA.cylon.start();
};

//start audio engine via node-core-audio
IMA.startAudioEngine = function() {

  //Create a core audio engine
  var engine = coreaudio.createNewAudioEngine();
  engine.setOptions({
    inputChannels: 1,
    outputChannels: 2,
    sampleRate: 44100,
    framesPerBuffer: 2048
  });

  var sample = 0;
  //console.log(engine.getOptions());
  var pitch = 0;
  var sampleRateInHz = 44100;
  var pitchInHz;
  var threshold = 0.8; //number between 0 and 1 to cutoff successful detection;
  var note = null;

  engine.addAudioCallback(function(inputBuffer) {
    frequency = detectPitchWad.detect(inputBuffer[0], sampleRateInHz, 130);
    if(frequency < 11025) {
      //console.log(frequency);
      note = noteFromPitch.getNote(frequency);
      if(IMA.config.env == 'edison') {
        //if we are on edison - let's light up the actuators
        IMA.cylon.lightLedNote(note);
      }
      console.log(note);
    }

    return inputBuffer;
  });
};

//kick it off
IMA.init();
