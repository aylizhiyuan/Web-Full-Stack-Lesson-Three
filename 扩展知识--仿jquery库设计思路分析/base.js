/**
 * Created by hama on 2016/9/5.
 */
//这次我要以面对对象的方法创建一个框架

(function(window,document,undefined){
    //$().方法()
    //创建一个对象
    var $ = function(arc){
        return new Base(arc);
    }

    //设计一个构造函数

    function Base(arc){
        //$('#id'),$('.class'),$(tag)传递值,操作DOM
        //把DOM放在整个数组里面
        this.elements = [];
        //创建一个临时的数组
        var childElements = [];
        //简单的DOM选择
        if(typeof arc == 'string'){
            //判断一下传递过来的是ID,CLASS,tag
            switch (arc.charAt(0)){
                case '#' :
                    childElements = [];
                    childElements.push(document.getElementById(arc.substring(1)))
                    break;
                case '.':
                    childElements = [];
                    var list = document.getElementsByClassName(arc.substring(1));
                    for(var i =0;i<list.length;i++){
                        childElements.push(list[i]);
                    }
                    break;
                default :
                    childElements = [];
                    var list = document.getElementsByTagName(arc);
                    for(var i=0;i<list.length;i++){
                        childElements.push(list[i]);
                    }
                    break;
            }
            this.elements = childElements;

        }else if(typeof arc == 'function'){
            addDomLoaded(arc);
        }

    }
    //将方法放在这个构造函数里面去
    Base.prototype.init = function(){
        console.log('init');
        return this;
    };

    //设置样式
    Base.prototype.css = function(name,value){
        //console.log(name);
        //console.log(value);
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].setAttribute('style', name + ':' + value );
        }
        //这里为什么要return this>>>>>>>>>>>>>
        return this;
    }



    //如果需要一些工具方法的话，则挂载到$这个对象上
    $.init = function(){
        console.log('init');
    }

    //扩展方法插件
    $.extend = function(name,fn){
        Base.prototype.name = fn;
    }
    function addDomLoaded(fn){
        //DOM加载完毕之后执行
        document.addEventListener('DomContentReady',function(){
            fn();
            removeEventListener(document,'DomContentReady');
        })
    }
    //暴露给window
    window.$ = window.lzy = $;
})(window,document,undefined)

