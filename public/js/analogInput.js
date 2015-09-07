fapp = (window.fapp) ? window.fapp : {};

fapp.analogInput = {};

fapp.analogInput.requestAccess = function() {
  fapp.analogInput.voice = new Wad({source : 'mic' }); // At this point, your browser will ask for permission to access your microphone.
};

fapp.analogInput.startProcessing = function() {

  fapp.analogInput.tuner = new Wad.Poly();
  fapp.analogInput.tuner.add(fapp.analogInput.voice);

  fapp.analogInput.voice.play(); // You must give your browser permission to access your microphone before calling play().

  fapp.analogInput.tuner.updatePitch() // The tuner is now calculating the pitch and note name of its input 60 times per second. These values are stored in tuner.pitch and tuner.noteName.

  var logPitch = function(){
    if(fapp.analogInput.tuner.noteName) {
      if(fapp.settings.source == 'mic') {
        fapp.sendData({
          freq: fapp.analogInput.tuner.pitch,
          tone: fapp.analogInput.tuner.noteName
        });
      }
    }
    requestAnimationFrame(logPitch);
  };

  logPitch();
  // If you sing into your microphone, your pitch will be logged to the console in real time.

  //tuner.stopUpdatingPitch(); // Stop calculating the pitch if you don't need to know it anymore.
};
