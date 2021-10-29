var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = [];

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

//Waiting for client connections
io.on('connection', function(socket){
  console.log('a user connected');

  //For every client disconnected, other clients are notified and client is removed from users array.
  socket.on('disconnect', function(){
    console.log('user disconnected');
    socket.broadcast.emit('user disconnected', 'Username: ' + socket.username + ' disconnected!');
    let index = users.indexOf({username: socket.username, socketId: socket.id});
 
    if ( index !== -1 ) {
        users.splice( index, 1 );
    }

    io.emit('users online', users);
  });

  //When a client emits a 'chat message' event, the server broadcast it to all the other users.
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    socket.broadcast.emit('chat message', socket.username + ": " + msg);
  });

  /*
  * Server checks for the username a client chose. 
  * If the username is not picked yet, then it's added to the array and broadcasts to all other users a new client connected.
  * The new client gets back a 'user valitated' event in case the chosen username was valid or 'suername picked' event otherwise.
  */
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

  //Server receives 'user typing' events to know when a client is typing, and notify the other clients.
  socket.on('user typing', function(isTyping){
    message = socket.username + ' is typing...';
    socket.broadcast.emit('user writting', {msg: message, isTypingUser: isTyping});
  })

  /*
  * Server wait for 'private message' event sent by any user. It looks for the destination user in the array and if present, 
  with the destination client ID sends the private message to him.
  * If the server can't find the destination user because it's not connected, 
  then it emits to the sender client the 'wrong destination username' event
  */
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

//Server listens for connections in port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});
