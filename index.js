var express = require('express')
var socket=require('socket.io')

var app = express()
//const PORT = process.env.PORT;
var server = app.listen(4000,()=>{
    console.log('server is listening to the port')
});

// MAKING STATIC FILES
//app.use(express.static('public'))
app.use(express.static(__dirname + '/public'));

//SOCKET SETUP
var io=socket(server);    //to work server on the socket
io.on('connection',(socket)=>{
    console.log("connection established",socket.id);

// Handle chat event
 socket.on('chat', function(data){
     //console.log(data);
    io.sockets.emit('chat', data);
});

  // Handle typing event
  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
});


});