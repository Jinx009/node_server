var http = require('http');
var reqData={
    id:'111'
};

var post_options = {
    host: 'www.baidu.com',
    port: '80',
    path: '/api/list',
    method: 'POST'
};

var post_req = http.request(post_options, function (response) {
    var responseText=[];
    var size = 0;
    response.on('data', function (data) {
        responseText.push(data);
        size+=data.length;
    });
    response.on('end', function () {
        // Buffer 是node.js 自带的库，直接使用
        responseText = Buffer.concat(responseText,size);
        console.log(responseText)
    });
});

// post the data
post_req.end();