var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 3000;

var io = require('socket.io')(server);

server.listen(port,function () {
    console.log("Listening on *:" + port);
});

app.use(express.static(__dirname));

app.get('/',function (request,response) {
    response.sendFile(__dirname + '/index.html');
});

app.get('/onlineusers',function (request, response) {
   // console.log(io.sockets.adapter.rooms);
   // response.send(io.nsps['/'].adapter.rooms);//fix the bug of socket.io 1.x.x ,
    response.send(io.sockets.adapter.rooms);
});

io.on('connection',function (socket) {
    console.log('一个用户已经连接' + socket.id);

    //告诉所有的clients有人连接了
    io.emit('user joined',socket.id)
    //client 发送 ’chat messages' 时间给server
    socket.on('chat.message',function (message) {
        //发出时间到所有clients连接
        io.emit('chat.message',message);
    });

    socket.on('disconnect',function () {
        console.log('用户离开' + socket.id);
        //告诉所有clients用户已经离开
        socket.broadcast.emit('user left',socket.id);
    });
});