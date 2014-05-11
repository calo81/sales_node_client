var http = require('http')
 , fs = require('fs')
 , path = require('path')
 , mime = require('mime')
 , restify = require('restify')
 , server = restify.createServer()
 , cache = {}

server.use(restify.bodyParser()); 
function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}

function sendFile(response, filePath, fileContents) {
  response.writeHead(
    200,
    {"content-type": mime.lookup(path.basename(filePath))}
  );
  response.end(fileContents);
}

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

function serveStatic(response, cache, absPath) {
  if (cache[absPath]) {
    sendFile(response, absPath, cache[absPath]);
  } else {
    fs.exists(absPath, function(exists) {
      if (exists) {
        fs.readFile(absPath, function(err, data) {
          if (err) {
            send404(response);
          } else {
            cache[absPath] = data;
            sendFile(response, absPath, data);
          }
        });
      } else {
        send404(response);
      }
    });
  }
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