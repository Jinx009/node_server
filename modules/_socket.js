/**
 * Created by jinx on 7/11/17.
 */
var io = require('socket.io-client');
// var _url = 'ws://echo.websocket.org';
var _url = 'http://localhost:3000';

// 如果是本地用这个：
var socket = io(_url);
// 如果是ws://echo.websocket.org用这个
// var socket = io(_url, {
// path: '/',
// transports: ['websocket', 'flashsocket', 'polling']
// });

socket.on('connect', function (client) {
    console.log('connect successs');
// socket.emit('data', 111);
    console.log(client);
});
socket.on('message', function (msg) {
    console.log('message:');
    console.log(msg);
// io.emit('msgs', msg + 1);
});

socket.on('connect_error', err => {
    console.log('connect_error:');
    console.log(err);
});