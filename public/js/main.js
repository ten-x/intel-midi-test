/*
 * main file: takes care of sending requests to the server with the note being played
 */

fapp = (window.fapp) ? window.fapp : {};
fapp.log = function() {
  console.log(arguments);
};

fapp.sendData = function(data) {
  //sending data to the server
  //fapp.log(data);
  var note = fapp.midiNotes[data];
  fapp.log(note.tone);
  $.ajax({
    method: 'POST',
    url: '/api/v1/act',
    data: note
  })
  .done(function(msg) {
    fapp.log('success!', msg);
  })
  .fail(function(e) {
    fapp.log('error! :(');
  });
};

fapp.init = function() {
  fapp.midi.prepare();
  fapp.log('ready!');
};

//kick it off
fapp.init();
