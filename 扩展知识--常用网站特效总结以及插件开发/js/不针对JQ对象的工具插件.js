/**
 * Created by hama on 2016/2/24.
 */
(function($,window,document,undefined){
    //不针对任何jquery对象，只是类似于$.each,$.isArray这类型的工具函数
    //所以，我们的插件的调用方式应该是$.message('参数');
    //这个参数，应该是个简单的参数
    $.message = function(option){
        var defalut = {};
        var msgText = option;
        var msgContent = '<div class="msg">我' + msgText + '</div>';
        $('body').append(msgContent);





    };

})(jQuery,window,document);




