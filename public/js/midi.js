fapp = (window.fapp) ? window.fapp : {};

fapp.midi = {};

fapp.midi.prepare = function() {
  //init midi here and complain if no midi device found or browser not compatible
  // request MIDI access
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
      sysex: false // this defaults to 'false' and we won't be covering sysex in this article. 
    }).then(fapp.midi.onMIDISuccess, fapp.midi.onMIDIFailure);
  } else {
    alert("No MIDI support in your browser.");
  }
};

// midi functions
fapp.midi.onMIDISuccess = function(midiAccess) {
  // when we get a succesful response, run this code
  fapp.log('MIDI Access Object', midiAccess);
  // when we get a succesful response, run this code
  midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status
  var inputs = midi.inputs.values();
  // loop over all available inputs and listen for any MIDI input
  for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
    // each time there is a midi message call the onMIDIMessage function
    input.value.onmidimessage = fapp.midi.onMIDIMessage;
  }
};

fapp.midi.onMIDIFailure = function (e) {
  // when we get a failed response, run this code
  fapp.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
};

fapp.midi.onMIDIMessage = function(message) {
  data = message.data; // this gives us our [command/channel, note, velocity] data.
  //fapp.log('MIDI data', data); // MIDI data [144, 63, 73], second element of the array is the midi note
  var note = fapp.midiNotes[data[1]];
  if(fapp.settings.source == 'midi') {
    fapp.sendData(note);
  }
};
