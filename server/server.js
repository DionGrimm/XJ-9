var io = require('socket.io').listen(8070);

io.on('connection', function(socket) {
  console.log("con")

  socket.on('dorot', function(data) {
      console.log(data)
    socket.broadcast.emit('rotate', data)
  });
});
