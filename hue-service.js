let huejay = require('huejay');
let client = new huejay.Client({
  host:     '192.168.1.6',
  port:     80,               // Optional
  username: 'sAV64P8HGtFHl5HF3LnX36EDULQNxM9PFd5pHlbV', 
  timeout:  15000,            // Optional, timeout in milliseconds (15000 is the default)
});

client.bridge.get()
  .then(bridge => {
    console.log(`Retrieved bridge ${bridge.name}`);
    console.log('  Id:', bridge.id);
    console.log('  Model Id:', bridge.modelId);
    console.log('  Model Name:', bridge.model.name);
  });

  client.lights.getAll()
  .then(lights => {
    for (let light of lights) {
      console.log(`Light [${light.id}]: ${light.name}`);
      console.log(`  Type:             ${light.type}`);
      console.log(`  Unique ID:        ${light.uniqueId}`);
      console.log(`  Manufacturer:     ${light.manufacturer}`);
      console.log(`  Model Id:         ${light.modelId}`);
      console.log('  Model:');
      console.log(`    Id:             ${light.model.id}`);
      console.log(`    Manufacturer:   ${light.model.manufacturer}`);
      console.log(`    Name:           ${light.model.name}`);
      console.log(`    Type:           ${light.model.type}`);
      console.log(`    Color Gamut:    ${light.model.colorGamut}`);
      console.log(`    Friends of Hue: ${light.model.friendsOfHue}`);
      console.log(`  Software Version: ${light.softwareVersion}`);
      console.log('  State:');
      console.log(`    On:         ${light.on}`);
      console.log(`    Reachable:  ${light.reachable}`);
      console.log(`    Brightness: ${light.brightness}`);
      console.log(`    Color mode: ${light.colorMode}`);
      console.log(`    Hue:        ${light.hue}`);
      console.log(`    Saturation: ${light.saturation}`);
      //console.log(`    X/Y:        ${light.xy[0]}, ${light.xy[1]}`);
      console.log(`    Color Temp: ${light.colorTemp}`);
      console.log(`    Alert:      ${light.alert}`);
      console.log(`    Effect:     ${light.effect}`);
      console.log();
    }
  });

/*client.lights.getById(5)
  .then(light => {
     light.brightness = 254;
     light.hue = 32767 
     return client.lights.save(light);
  })
  .catch(error => {
    console.log('Could not find light');
    console.log(error.stack);
  });*/

  function turnOnLight (hueColor, brightness, lightID) {
    client.lights.getById(lightID)
      .then(light => {
        console.log('Function turnOnLight:');
        console.log(`  Light [${light.id}]: ${light.name}`);
        light.brightness = brightness;
        light.on = true
        light.hue = hueColor
        return client.lights.save(light);
      })
      .catch(error => {
        console.log('Could not find light');
        console.log(error.stack);
      });
    }

    function setLightWithPulseEffect (hueColor, lightID) {
        client.lights.getById(lightID)
          .then(light => {
            console.log('Function setLightWithPulseEffect: ');
            console.log(`  Light [${light.id}]: ${light.name}`);
            light.on = true;
            light.hue = hueColor
            light.alert = "select"
            return client.lights.save(light);
          })
          .then(light => {
            console.log(`Updated light [${light.id}]`);
          })
          .catch(error => {
            console.log('Could not find light');
            console.log(error.stack);
          });
        }

function stopPulseEffect (hueColor, lightID) {
    client.lights.getById(lightID)
        .then(light => {
        console.log('Function stopPulseEffect:');
        console.log(`  Light [${light.id}]: ${light.name}`);
        light.on = true;
        light.hue = hueColor
        light.alert = "none"
        return client.lights.save(light);
        })
        .then(light => {
        console.log(`Updated light [${light.id}]`);
        })
        .catch(error => {
        console.log('Could not find light');
        console.log(error.stack);
        });
    }

function turnOffLight(lightID) {
    client.lights.getById(lightID)
        .then(light => {
            console.log('Function turnOffLight:');
            console.log(`  Light [${light.id}]: ${light.name}`);
            light.on = false
            return client.lights.save(light);
        })
        .then(light => {
            console.log(`Updated light [${light.id}]`);
        })
        .catch(error => {
            console.log('Could not find light');
            console.log(error.stack);
        });
    }