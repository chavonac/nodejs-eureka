const Eureka = require('eureka-js-client').Eureka;
const express = require('express');
const server = express();
server.use(express.json());
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
server.listen(3001);
server.get('/', function (req, res) {
  res.send("Hola mundo esto registrado en eureka");
});



// example configuration
const client = new Eureka({
  // application instance information
  instance: {
    app: 'node-microservice',
    instanceId: 'nodemicroservice',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: {
      '$': 3001,
      '@enabled': 'true',
    },
    vipAddress: 'nodemicroservice',
    statusPageUrl: 'http://localhost:3001',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
    registerWithEureka: true,
    fetchRegistry: true
  },
  eureka: {
    // eureka server host / port
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/'
  },
});

client.logger.level('debug');

client.start(function (error) {
  console.log(error || 'complete')
});