var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var socket = require('socket.io');
var io = socket.listen(http, {
  log: false
});
app.set('port', process.env.PORT || 8080);
var flag = 1;
app.use(express.static('public'));
app.get('/', function(req, res) {
  //console.log('received the get ');
  var body = 'nirwan';
  var x = body.lengttgfgdfh;
  console.log(x);
  res.sendFile("index.html");

});

io.sockets.on('connection', function(client) {
  console.log('User connected');
  client.on('join', function(name) {
    client.set('nickname', name);
  });
  client.on('messages', function(data) {
    client.get('nickname', function(err, name) {
        console.log("Message::" + name + " : " + data.hello);
        client.broadcast.emit('messages', {
          hello: name + " : " + data.hello
        });
      });
      //client.broadcast.emit('messages',data);
  });
  client.on('textchanged', function(data) {
    console.log("TextChanged::");
    client.broadcast.emit('textchanged', {
      hello: data.hello
    });
  });
  //client.broadcast.emit('messages',data);
});
// http.listen(8080, function() {
//   console.log('listening on *:8080');
// });
http.listen(app.get('port'), function() {
    console.log("Server listening on port " + app.get('port') );
  });
