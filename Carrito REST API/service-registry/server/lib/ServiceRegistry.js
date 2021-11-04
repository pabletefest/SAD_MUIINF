const semver = require('semver');
var express = require('express');
var app = express();

class ServiceRegistry {
  constructor(log) {
    this.log = log;
    this.services = {};
    this.timeout = 10;
  }

  get(name, version) {
    this.cleanup();
    const candidates = Object.values(this.services)
      .filter(service => service.name === name && service.version === version);

    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  register(name, version, ip, port) {
    this.cleanup();
    const key = name + version + ip + port;

    if (!this.services[key]) {
      this.services[key] = {};
      this.services[key].timestamp = Math.floor(new Date() / 1000);
      this.services[key].ip = ip;
      this.services[key].port = port;
      this.services[key].name = name;
      this.services[key].version = version;
      this.log.debug(`Added services ${name}, version ${version} at ${ip}:${port}`);
      return key;
    }
    this.services[key].timestamp = Math.floor(new Date() / 1000);
    this.log.debug(`Updated services ${name}, version ${version} at ${ip}:${port}`);
    return key;
  }

  unregister(name, version, ip, port) {
    const key = name + version + ip + port;
    delete this.services[key];
    return key;
  }

  cleanup() {
    const now = Math.floor(new Date() / 1000);
    Object.keys(this.services).forEach((key) => {
      if (this.services[key].timestamp + this.timeout < now) {
        delete this.services[key];
        this.log.debug(`Removed service ${key}`);
      }
    });
  }
}

module.exports = ServiceRegistry;

// let registry = new ServiceRegistry("");

// app.get('/registry/:name/:version', function(req, res){
//   let name = req.params.name;
//   let version = req.params.version;

//   const service = registry.get(name, version);
//   res.send(service);
// });

// app.post('/registry/:name/:version/:ip/:port', function(req, res){
//   let name = req.params.name;
//   let version = req.params.version;
//   let ip = req.params.ip;
//   let port = req.params.port;

//   const key = registry.register(name, version, ip, port);
//   res.send(key);
// });

// app.put('/registry/:name/:version/:ip/:port', function(req, res){
//   let name = req.params.name;
//   let version = req.params.version;
//   let ip = req.params.ip;
//   let port = req.params.port;

//   const key = registry.register(name, version, ip, port);
//   res.send(key);
// });

// app.delete('/registry/:name/:version/:ip/:port', function(req, res){
//   let name = req.params.name;
//   let version = req.params.version;
//   let ip = req.params.ip;
//   let port = req.params.port;

//   const key = registry.unregister(name, version, ip, port);
//   res.send(key);
// });

// app.delete('/registry', function(req, res){
//   registry.cleanup();
//   res.send("Registry cleaned up");
// });

// const server = app.listen(3000, function(){
//   console.log('Listening at port 3000');
// });
