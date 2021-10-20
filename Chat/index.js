var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = [];

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('username check', function(msg){
    if (users.indexOf(msg) == -1)
    {
      users.push(msg);
      socket.broadcast.emit('user connected', 'Username: ' + msg + ' connected!');
      socket.emit('username validated', 'Username has been validated');
    }
    else
    {
      socket.emit('username picked', 'This username is already taken');
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
