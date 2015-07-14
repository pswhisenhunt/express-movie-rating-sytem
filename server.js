// dependencies
var app = require('./app');
var debug = require('debug')('express-movie-ratings-by-hand:server');
var http = require('http');

// set port, get from env vars, if not specified then default to 8000
var port = normalizePort(process.env.PORT || 8000);
app.set(port);

function normalizePort(portValue) {
  var port = parseInt(portValue, 10);
  if (isNaN(port)) {
    return portValue;
  }
  if (port >= 0) {
    return port
  }
  return false;
}

// create the http server
var server = http.createServer(app);
server.listen(port, function() {
  console.log('Listening on port...' + port);
});
