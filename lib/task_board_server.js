var socketio = require('socket.io')
    , fs = require('fs')
    , path = require('path')
	, sockets = []
	, restify = require('restify')
	, server = restify.createServer()
    , sales = {};

exports.sockets = sockets;	
exports.listen = function (server) {
    var io = socketio.listen(server);
    io.set('log level', 1);
    io.sockets.on('connection', function (socket) {
		console.log("socket connected." + socket);
		sockets.push(socket);
        socket.on('sale', function (user_policy_amount) {
          socket.broadcast.emit('sale', user_policy_amount);
        });
    });
};