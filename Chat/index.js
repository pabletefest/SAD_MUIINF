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
    socket.broadcast.emit('user disconnected', 'Username: ' + socket.username + ' disconnected!');
    let index = users.indexOf({username: socket.username, socketId: socket.id});
 
    if ( index !== -1 ) {
        users.splice( index, 1 );
    }

    io.emit('users online', users);
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    socket.broadcast.emit('chat message', socket.username + ": " + msg);
  });

  socket.on('username check', function(name){
    if (users.indexOf({username: name, socketId: socket.id}) == -1)
    {
      users.push({username: name, socketId: socket.id});
      socket.broadcast.emit('user connected', 'Username: ' + name + ' connected!');
      socket.username = name;
      socket.emit('username validated', {username: name, info: 'Username has been validated'});
      io.emit('users online', users);
    }
    else
    {
      socket.emit('username picked', 'This username is already taken');
    }
  });

  socket.on('user typing', function(isTyping){
    // console.log(isTyping);
    message = socket.username + ' is typing...';
    socket.broadcast.emit('user writting', {msg: message, isTypingUser: isTyping});
  })

  socket.on('private message', function(data){
    console.log('PRIVATE MESSAGE RECEIVED');

    let destinationUser = users.find(user => user.username === data.to);

    if (destinationUser != undefined)
    {
      io.to(destinationUser.socketId).emit('private message response', {from: data.from, msg: data.msg});
    }
    else
    {
      socket.emit('wrong destination username', 'The user you want to send a message is not connected!!');
    }
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
