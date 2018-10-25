/**
 * Created by hama on 2015/8/11.
 */

(function($,window,document,undefined){
    var LZY = {
        VERSION : '1.0',
        AUTH : '李志远',
        init:function(element){
            var $this = element;
            //alert(1);

        },
        //用户点击了哪一个a ，哪个a的li class为action,并且对应的tab-content显示
        show:function(){
            //当前点击的链接
            var $this = $(this);
            $('#myTabs li').removeClass('active');
            $this.parent().addClass('active');
            //当前点击的用户名称
            var name = '#' + $this.html();
            var name = name.toLocaleLowerCase();
            $('.tab-pane').removeClass('active');
            $(name).addClass('active');

        }
    };
    $.fn.lzyTab = function Plugin(option){
        return this.each(function(){
            var $this = $(this);
            if(typeof option == 'string' && LZY[option]){
                return LZY[option].call(this);
            }else if(!option){
                return LZY.init(this);

            }else if(!LZY[option] || typeof(option) == 'object'){
                $.error('方法不存在');
                return this;
            }
        })
    }
})(jQuery,window,document);