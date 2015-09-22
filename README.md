## Prepare

1. Connect to our Intel Edison: `ssh root@192.168.1.56`, password: password
2. make sure node and portaudio are installed
3. `cd intel-midi-test`
4. `git pull`, `npm install`, `bower install --allow-root` 

## Intel Edison midi to actuators test

1. `node main.js`
2. In latest chrome browser go to http://192.168.1.56
3. Make sure your MIDI device is connected and if you have more than one - correct one is selected
4. Play your MIDI device and see actuators go off accordingly

## Intel Edison native pitch detection test

1. `ctrl + c` to stop main.js
2. make sure your usb sound card is connected and detected and mic input is ready
3. `node pitch-detection.js` 
4. whistle into the microphone and you should see actuators go off accordingly (whistling is recommended for it's the simplest / closes sine wave. accurate detection of sounds with more overtones such as guitar or singing is harder)

## Links:
* http://fab-lab.eu/edison/
* http://www.helios.de/heliosapp/edison/index.html

## Implement native pitch detection:

1. install python and paudio: `https://communities.intel.com/docs/DOC-24006`
1. `https://www.npmjs.com/package/node-core-audio` (looks like it requires portaudio http://pythonhackers.com/p/marcj/node-core-audio)
1. `https://www.npmjs.com/package/detect-pitch`
