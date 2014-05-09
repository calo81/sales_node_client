var socketio = require('socket.io')
    , fs = require('fs')
    , path = require('path')
	, sockets = []
	, restify = require('restify')
	, server = restify.createServer()
    , sales = {};

exports.sockets = sockets;	
exports.sales = sales;	
exports.listen = function (server) {
    var io = socketio.listen(server);
    io.set('log level', 1);
    io.sockets.on('connection', function (socket) {
		console.log("socket connected." + socket);
		console.log("socket connected." + sales);
		socket.emit('all_sales', sales);
		sockets.push(socket);
    });
};