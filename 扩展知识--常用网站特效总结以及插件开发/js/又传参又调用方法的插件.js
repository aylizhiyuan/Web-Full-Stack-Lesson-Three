/**
 * Created by hama on 2015/8/11.
 */

/*//简单模式
$.fn.myplugin = function(){
    //这里面的this 是jquery对象
    return this.each(function(){
        var $this = $(this);
        //对DOM元素执行一定的操作
        $this.css('color','red');
    })
}*/


/*//复杂接受参数模式
$.fn.myplugin = function(options){
    var defaults = {
        'color':'red',
        'fontSzie':'12px'
    };
    var setting = $.extend({},defaults,options);
    return this.each(function(){
        一个具体的DOM元素
        var $this = $(this);
        $this.css({
            color:setting.color,
            fontSize:setting.fontSize
        })
    })
}*/



//一个最简单的jquery插件开发逻辑
(function($,window,document,undefined){
    //这里头的this指的是window
    //alert(this);

    //这里，我们总不能都在$.fn.插件名称 上添加我们的插件，所以我们要创建一个对象来存储我们的方法
    var privateFunction = function(){
        //创建了一个公共变量构建一个私有方法
    };
    //通过字面量的方法创建了一个对象，存储我们需要的共有方法
    var methods = {
        //这里头的this指的是你通过$(元素选择).插件名称()调用，选取的jQuery对象，它是一组DOM集合
        init:function(options){
            return this.each(function(){
                //return this 和return this.each()返回值都是一样的，同样是jquery对象，为了每次都写$(this)，就用$this来代替了，方便使用链式调用
                var $this = $(this);//这里的$this就是每一个DOM元素了

                //对数据进行存储
                var settings = $this.data('mydata');
                if(typeof(settings) == 'undefined'){
                    var defaults = {
                        propertyName:'value',
                        onSomeEvent:function(){}
                    };
                    settings = $.extend({},defaults,options);
                    $this.data('mydata',settings);
                }else{
                    settings = $.extend({},settings,options);
                }

            });
        },
        //销毁数据
        destroy:function(options){
            return this.each(function(){
                //destroy方法
                var $this = $(this);
                $this.removeData('mydata');
            });
        },
        //返回某个具体的值
        var:function(options){
            var someValue = this.eq(0).html();
            return someValue;
        },
        //自行添加方法
    };


    $.fn.myplugin = function(){
        //接受到方法
        var method = arguments[0];
        if(methods[method]){
            method = methods[method];
            //方法从参数列表中删除
            arguments = Array.prototype.slice.call(arguments,1);
        }else if(typeof(method) == 'object' || !method){
            //如果方法不存在，检测是否为对象或者没传入
            //调用init方法
            method = methods.init;

        }else{
            $.error('Method' + method + 'does not exitst on jquery.pluginName');
            //这里的this依然是jquery对象
            return this;
        }
        //将jquery对象传入到我们的方法当中去
        return method.call(this,arguments);
    }

})(jQuery,window,document);
