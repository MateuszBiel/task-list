var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
 var path = require('path')

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log(msg);
    alert(msg);
    io.emit('chat message', msg);
  });
});

http.listen(4000, function(){
  console.log('listening on *:4000');
});