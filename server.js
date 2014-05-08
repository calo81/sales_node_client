var http = require('http')
 , fs = require('fs')
 , path = require('path')
 , mime = require('mime')
 , restify = require('restify')
 , server = restify.createServer()
 , cache = {};
 
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

server.get('/sale', function(req, res, next) {
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        taskBoardServer.sockets[0].broadcast.emit('sale', "sdfsdf");
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