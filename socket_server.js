/**
 * Created by jinx on 7/12/17.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    console.log(__dirname);
    res.sendFile(__dirname + '/views/socket.html');
});

io.on('connection', function (socket) {
    io.emit('message', 'hello');
    setInterval(function () {
        io.emit('message', Math.random());
    }, 3000);
    socket.on('message', function (msg) {
        console.log(msg);
        io.emit('message', msg);
    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});