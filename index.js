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

io.on('connection',function (socket) {
    console.log('一个用户已经连接' + socket.id);

    //告诉所有的clients有人连接了
    io.emit('user joined',socket.id)

    socket.on('disconnect',function () {
        console.log('用户离开' + socket.id);
    });
});