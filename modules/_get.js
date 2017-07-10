/**
 * Created by jinx on 7/7/17.
 */
var http = require('http');

module.exports = {
    locations: function (cb) {
        http.get('http://wx.zhanway.com/iot-admin/common/location', function (res) {
            res.setEncoding('utf8');
            var rawData = '';
            res.on('data', function (chunk) {
                rawData += chunk;
            });
            res.on('end', function () {
                try {
                    const parsedData = JSON.parse(rawData);
                    cb(parsedData);
                    console.log(parsedData);
                } catch (e) {
                    cb('error');
                    console.error(e.message);
                }
            });
        });
    },

    /**
     * 通用get方法
     * @param _url
     * @param cb
     */
    getData:function(_url,cb){
        http.get(_url, function (res) {
            res.setEncoding('utf8');
            var rawData = '';
            res.on('data', function (chunk) {
                rawData += chunk;
            });
            res.on('end', function () {
                try {
                    const parsedData = JSON.parse(rawData);
                    cb(parsedData);
                    console.log(parsedData);
                } catch (e) {
                    cb('error');
                    console.error(e.message);
                }
            });
        });
    }

}
