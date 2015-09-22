var buflen = 2048;
var buf = new Uint8Array( buflen );
var MINVAL = 134;  // 128 == zero.  MINVAL is the "minimum detected signal" level.

var noteFromPitch = function( frequency ) {
  var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
  return Math.round( noteNum ) + 69;
}

function autoCorrelate( buf, sampleRate, minVal ) {
  if(minVal) {
    MINVAL = minVal;
  }
  var MIN_SAMPLES = 4;    // corresponds to an 11kHz signal
  var MAX_SAMPLES = 1000; // corresponds to a 44Hz signal
  var SIZE = 1000;
  var best_offset = -1;
  var best_correlation = 0;
  var rms = 0;
  var foundGoodCorrelation = false;

  if (buf.length < (SIZE + MAX_SAMPLES - MIN_SAMPLES)) {
    console.log('here');
    return -1;  // Not enough data
  }

  for ( var i = 0; i < SIZE; i++ ) {
    var val = ( buf[i] - 128 ) / 128;
    rms += val * val;
  }
  rms = Math.sqrt(rms/SIZE);
  if (rms<0.01)
    return -1;

  var lastCorrelation=1;
  for (var offset = MIN_SAMPLES; offset <= MAX_SAMPLES; offset++) {
    var correlation = 0;

    for (var i=0; i<SIZE; i++) {
      correlation += Math.abs(((buf[i] - 128)/128)-((buf[i+offset] - 128)/128));
    }
    correlation = 1 - (correlation/SIZE);
    if ((correlation>0.9) && (correlation > lastCorrelation))
      foundGoodCorrelation = true;
    else if (foundGoodCorrelation) {
      // short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
      return sampleRate/best_offset;
    }
    lastCorrelation = correlation;
    if (correlation > best_correlation) {
      best_correlation = correlation;
      best_offset = offset;
    }
  }
  if (best_correlation > 0.01) {
    //console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
    return sampleRate/best_offset;
  }
  return -1;
  //  var best_frequency = sampleRate/best_offset;
}

exports.detect = autoCorrelate;
