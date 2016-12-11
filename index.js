const express = require('express');
const bodyParser = require('body-parser');
var redis = require("redis");

const app = express();

var services_json = JSON.parse(process.env.VCAP_SERVICES);
var credentials = services_json["azure-rediscache"][0]["credentials"];
var hostname = credentials["hostname"];
var primaryKey = credentials["primaryKey"];

app.use(bodyParser.urlencoded({extended: true}))

  // Add your cache name and access key.
var client = redis.createClient(6380,hostname, {auth_pass: primaryKey, tls: {servername: hostname + '.redis.cache.windows.net', rejectUnauthorized: false }});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/values', (req, res) => {
  console.log(req.body)

  console.log('Setting ' + req.body.name + ' to ' + req.body.value);

  client.set(req.body.name, req.body.value, function(err, reply) {
    console.log(reply);
  });

  res.redirect('/');
})

app.get('/values', function(req, res) {
  var reqName = req.query.name;

  console.log('Checking Redis for ' + reqName);

  client.get(reqName, function(err, reply) {
    console.log('Redis replied with: ' + reply);
    res.json({ name: reqName, value: reply});
  });

});


app.listen(process.env.PORT || 3000, function() {
 console.log('listening on port ' + process.env.PORT || 3000);
});

