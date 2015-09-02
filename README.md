# Intel midi to actuators test

1. Connect to our Intel Edison: `ssh root@192.168.1.56`, password: password
2. `cd intel-midi-test`
3. `git pull`, `npm install`, `bower install --allow-root`, `node app.js`
4. In latest chrome browser go to http://192.168.1.56
5. Make sure your MIDI device is connected and if you have more than one - correct one is selected
6. Play your MIDI device and see actuators go off accordingly
