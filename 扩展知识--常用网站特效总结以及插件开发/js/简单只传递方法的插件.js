/**
 * Created by hama on 2016/2/1.
 */
//匿名函数，无法被调用，只能自执行
//(function(){})();
// 全局->匿名函数,两层的关系,为了防止直接将fun写入全局的环境中，放入匿名函数防止全局的变量污染
//为什么要将全局的变量传入匿名函数中去？匿名函数内接收不到全局的？可能是为了保持一致性
//function fun(){} 这是全局的函数，这个函数存在全局中，如果发生了重名就完了
//(function fun(){})() 放在了一个匿名函数中去，并且自执行
// function fun(){} () 加两个括号是为了让这个函数看起来是一个整体而已
(function($,window,document,undefined){
    //如果只是一个简单的功能，直接用$.fn.插件名称 = function(调用这个插件的时候传递给插件的参数){this指的是jquery对象}就可以了
    //调用的时候直接$(Dom对象,这个对象基本会是整体的大的布局块).插件名称(参数得弄下){1、循环这个对象 2、针对整体的布局块下面的的Dom元素进行操作 3、写我们的动作}

    //如果用面对对象的方式，我们要做的第一步就是创建我们的对象，并且写我们对象的方法
    //element是每一个具体的DOM元素
    //对象这种方式更适合具体的DOM元素的精准操作，而不是针对大的整体布局的操作,对象这种方式可以调用的方法很多
    var Lzy = {
        VERSION : '1.0',
        AUTH : '李志远',
        init:function(){
            //初始化的操作.
            var $this = $(this);
            //操作的是每一个具体的DOM元素

        },
    };
    //调用方法: $().tab() ,option是我们的对象方法
    $.fn.tab = function (option){
        //循环jQuery对象
        return this.each(function(){
            //每一个具体的DOM元素
            var $this = $(this);
            //如果传递给$().tab()的参数是字符串的话，就直接调用tab类下的参数方法
            //$().tab(仅仅是个方法，没有提供其他的参数，可能这里并不需要什么参数，有默认的参数即可,不同的参数执行不同的方法,同样调用tab类的方法)
            if(typeof option == 'string' && LZY[option]){
                return LZY[option].call(this);
            }else if(!LZY[option] && typeof option == 'object'){
                return LZY.init(this);

            }else{
                $.error('方法不存在');
                return this;
            }
        })
    }
})(jQuery,window,document);
