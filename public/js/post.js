/**
 * Created by jinx on 7/7/17.
 */
/**
 * Created by jinx on 7/7/17.
 */
/**
 * Created by jinx on 7/7/17.
 */
var _i;
$(function () {
    _i = layer.open({type: 2});
    $.ajax({
        url: '/post',
        type: 'post',
        dataType: 'json',
        success: function (res) {
            if (res != null)
                layer.close(_i);
            new Vue({
                el: '.main',
                data: {items: res.params}
            });
        }
    })
})