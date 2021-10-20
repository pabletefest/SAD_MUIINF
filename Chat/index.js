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
    socket.broadcast.emit('user connected', 'Username: ' + socket.username + ' disconnected!');
    let index = users.indexOf( socket.username );
 
    if ( index !== -1 ) {
        users.splice( index, 1 );
    }
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    socket.broadcast.emit('chat message', socket.username + ": " + msg);
  });

  socket.on('username check', function(name){
    if (users.indexOf(name) == -1)
    {
      users.push(name);
      socket.broadcast.emit('user connected', 'Username: ' + name + ' connected!');
      socket.username = name;
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
