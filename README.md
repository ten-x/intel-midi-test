# Intel midi to actuators test

1. Connect to our Intel Edison: `ssh root@192.168.1.56`, password: password
2. `cd intel-midi-test`
3. `git pull`, `npm install`, `bower install --allow-root`, `node main.js`
4. In latest chrome browser go to http://192.168.1.56
5. Make sure your MIDI device is connected and if you have more than one - correct one is selected
6. Play your MIDI device and see actuators go off accordingly

## NB! How to make it run on boot:

1. Place in `/node_app_slot` directory on Edison and it will be automatically picked up by XDK daemon

## Implement native pitch detection:

1. `https://www.npmjs.com/package/node-core-audio`
2. `https://www.npmjs.com/package/detect-pitch`
