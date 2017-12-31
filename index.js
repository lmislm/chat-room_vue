var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 3000;

server.listen(port,function () {
    console.log("Listening on *:" + port);
});

app.use(express.static(__dirname));

app.get('/',function (request,response) {
    response.sendFile(__dirname + '/index.html');
});