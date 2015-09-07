/*
 * main file: takes care of sending requests to the server with the note being played
 */

fapp = (window.fapp) ? window.fapp : {};

fapp.settings = {
  source: 'midi' //or 'mic' for analog input or 'keyboard' for computer keyboard
};

fapp.log = function() {
  console.log(arguments);
};

fapp.sendData = function(note) {
  //sending data to the server: note = {freq: xxxx, tone: 'F#a7'}
  //fapp.log(note.tone);
  $.ajax({
    method: 'POST',
    url: '/api/v1/act',
    data: note
  })
  .done(function(msg) {
    //fapp.log('success!', msg);
  })
  .fail(function(e) {
    fapp.log('error! :(');
  });
};

fapp.attachEventListeners = function() {
  //change input source
  $('input[name="inputSource"]').on('change', function() {
    fapp.settings.source = $('input[name="inputSource"]:checked:first').val();
    if(fapp.settings.source == 'mic') {
      fapp.analogInput.startProcessing();
    } else {
      fapp.analogInput.tuner.stopUpdatingPitch()
    }
  });
};

fapp.init = function() {
  fapp.midi.prepare();
  fapp.analogInput.requestAccess();
  fapp.attachEventListeners();
  fapp.log('ready!');
};

//kick it off
$(document).ready(function() {
  fapp.init();
});
