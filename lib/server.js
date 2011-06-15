var http = require('http'),
    dispatcher = require('./dispatcher'),
    config = require('./config');

config.port = config.port || 8666;

http.createServer(function(req, res) {
    dispatcher.dispatch(req, res);
}).listen(config.port);

console.log('Server is listening on port ' + config.port + '...');
