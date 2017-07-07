/**
 * Created by jinx on 7/7/17.
 */
/**
 * Created by jinx on 7/7/17.
 */
var http = require('http');

const options = {
    hostname: 'wx.zhanway.com',
    port: 80,
    path: '/iot-admin/common/location',
    method: 'POST'
};

module.exports = {
    locations: function (cb) {
        var post_req = http.request(options, function (response) {
            var responseText=[];
            var size = 0;
            response.on('data', function (data) {
                responseText.push(data);
                size+=data.length;
            });
            response.on('end', function () {
                responseText = Buffer.concat(responseText,size);
                console.log(responseText.toString('utf8',0,size));
                var res = responseText.toString('utf8',0,size);
                cb(JSON.parse(res));
            });
        });
        post_req.end();
    }
}