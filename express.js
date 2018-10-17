var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var hostId = '';
app.use(express.static('public'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});

app.get('/createGame', function(req, res){
  res.sendFile(__dirname + '/hostMain.html');
});

app.get('/game', function(req, res){
  res.sendFile(__dirname + '/userMain.html');
});

io.on('connection', function(socket){
  var ip = socket.conn.remoteAddress;
 
  socket.on('create', function(msg){
    hostId = socket.id;
    console.log('id : ' + hostId);
    console.log('create : ' + msg);
    
  });

  socket.on('authCode', function(msg){
    console.log('authCode : ' + msg);
    if(msg.toUpperCase() !== 'AAAA'){
      io.emit('authCode', 'F');
    }
    else{
      io.emit('authCode', 'T');
    } 
  });
  
  socket.on('ink', function(msg){
    console.log('id : ' + socket.id);
    console.log('ink : ' + msg);
    var ink = JSON.parse(msg);
    console.log('ink : ' + ink);
    console.log('hostId : ' + hostId);
    socket.to(hostId).emit('join',ink);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});