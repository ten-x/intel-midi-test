/*
 * basic app to run the express server and control GPIO based on user input in the browser
 * NB! meant to run on Intel Edison
 */

//global object to put everything into
var IMA = {};

IMA.version = 0.1;
IMA.config = {
  env : (process.env.USER == 'root') ? 'edison' : 'pc' //on edison USER environment var is set to 'root' - so we use it to detect where we are running. //HACK
};

console.log(IMA.config.env);
console.log(IMA.config.env);

var Cylon = require('cylon');
var sys = require('sys');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'jade');
//public assets
app.use(express.static('public'));
//serving static files from bower_components
app.use('/vendor', express.static('bower_components'));
//to enable POST request data reading
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//need to detect environment and change config depending on whether we are running on a computer for testing or on Edison

IMA.init = function() {
  console.log('Starting up...');
  //use forever to keep alive?
  //start web server
  IMA.startWebServer();
  if(IMA.config.env == 'edison') {
    IMA.startActuators();
  };
};

IMA.startWebServer = function() {

  app.get('/', function (req, res) {
    res.render('index')
  });

  app.post('/api/v1/act/', function(req, res) {
    if(IMA.config.env == 'edison') {
      IMA.cylon.lightLedNote(req.body.tone);
    }
    console.log(req.body.tone);

    res.send('OK');
  });

  var port = (IMA.config.env == 'edison') ? 80 : 3030;

  app.listen(port)
};

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

//kick it off
IMA.init();
