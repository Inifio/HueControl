//Username: sAV64P8HGtFHl5HF3LnX36EDULQNxM9PFd5pHlbV

huejay = require('huejay');
 
huejay.discover()
  .then(bridges => {
    for (let bridge of bridges) {
      console.log(`Hue bridge Discover `);
      console.log(`Id: ${bridge.id}, IP: ${bridge.ip}`);
    }
  })
  .catch(error => {
    console.log(`An error occurred: ${error.message}`);
  });

  var hue = require('hue-module');
  var hueHost =  "192.168.1.6"
  var loadBridge = function(host) {
      hue.load({
          "host"  : host
      });
      hue.getUsername(function(err, result) {
          if (err) {
              console.log(err);
              return;
          }
          console.log(`Hue bridge UserName: ${result.username}`);
      });
  };
  loadBridge(hueHost)