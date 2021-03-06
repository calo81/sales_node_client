var http = require('http')
 , fs = require('fs')
 , path = require('path')
 , mime = require('mime')
 , restify = require('restify')
 , server = restify.createServer()
 , cache = {}

server.use(restify.bodyParser()); 

function saleReceived(person, amount, policy){
	if(taskBoardServer.sales[person]){
	  taskBoardServer.sales[person]["quantity"]++;
	  taskBoardServer.sales[person]["amount"] += parseFloat(amount);	
	}else{
	  taskBoardServer.sales[person] = {};	
	  taskBoardServer.sales[person]["quantity"] = 1;	
	  taskBoardServer.sales[person]["amount"] = parseFloat(amount);	
	}
    taskBoardServer.sockets[0].broadcast.emit('sale_broadcast', {id: policy, person: person, quantity: taskBoardServer.sales[person]["quantity"], amount: taskBoardServer.sales[person]["amount"]});
  	
}

server.post('/sale', function(req, res, next){
  res.send('ok');
  console.log(req.body);
  params = JSON.parse(req.body);
  saleReceived(params.person, params.amount, params.id);
  return next();
});
server.get('/sale/:consultant/:amount', function(req, res, next) {
		res.send('ok');
		saleReceived(req.params.consultant, req.params.amount, 'x')
		return next();
});

server.get(/.*/, restify.serveStatic({
    'directory': 'public',
    'default': 'index.html'
 }));

var port = process.env.PORT || 3001
server.listen(port, function () {
    console.log("Server listening on port." + port);
});

var taskBoardServer = require('./lib/task_board_server');
taskBoardServer.listen(server);