(function(jQuery){
var flag = "up";
jQuery.fn.extend({
        Scroll:function(opt,callback){
                //�����ʼ��
                if(!opt) var opt={};
                var _btnUp = jQuery("#"+ opt.up);//触发事件向上的元素
                var _btnDown = jQuery("#"+ opt.down);//触发事件向下的元素
                var timerID;
                var _this=this.eq(0).find("ul:first");
                var     lineH=_this.find("li:first").height(), //一个LI的高度
                        line=opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10),//步长，如果系统不给，则用容器的高度除以一个LI的高度，得到相当于UL高度的步长，默认是4
                        speed=opt.speed?parseInt(opt.speed,10):500; //�?�ٶȣ���ֵԽ���ٶ�Խ����룩
                        timer=opt.timer //?parseInt(opt.timer,10):3000; //������ʱ���������룩
                if(line==0) line=1;
                var upHeight=0-line*lineH;//步长计算出来的最终偏移高度了。
                //��������
                var scrollUp=function(){
						flag = "up";
                        _btnUp.unbind("click",scrollUp); //Shawphy:ȡ�����ϰ�ť�ĺ����
                        _this.animate({
                                //容器的overfolw:hidden,用margin-top来显示不同的内容，margin的值等于偏移高度。
                                marginTop:upHeight
                        },speed,function(){
                                for(i=1;i<=line;i++){
                                        //将被margin-top隐藏掉的内容插入到UL的后头，这样，我们就实现了循环
                                        _this.find("li:first").appendTo(_this);
                                }
                                //最后将UL的margintop设置为0，初始化了
                                _this.css({marginTop:0});
                                _btnUp.bind("click",scrollUp); //Shawphy:�����ϰ�ť�ĵ���¼�
                        });
                }
                //Shawphy:���·�ҳ����
                var scrollDown=function(){
						flag = "down";
                        _btnDown.unbind("click",scrollDown);
                        for(i=1;i<=line;i++){
                                //将步长数量的li插入到UL的前头去
                                _this.find("li:last").show().prependTo(_this);
                        }
                        //感觉就是个样子，让它看起来有个margin-top 的变化
                        _this.css({marginTop:upHeight});
                        _this.animate({
                                marginTop:0
                        },speed,function(){
                                _btnDown.bind("click",scrollDown);
                        });
                }
               //Shawphy:�Զ�����
                var autoPlay = function(){
                        if(timer)timerID = window.setInterval(function(){
							if (flag=="up"){
								scrollUp();
							}else{
								scrollDown();	
							}											   
						},timer);
                };
                var autoStop = function(){
                        if(timer)window.clearInterval(timerID);
                };
                 //����¼���
                _this.hover(autoStop,autoPlay).mouseout();
                _btnUp.css("cursor","pointer").click( scrollUp ).hover(autoStop,autoPlay);//Shawphy:������������¼���
                _btnDown.css("cursor","pointer").click( scrollDown ).hover(autoStop,autoPlay);
        }       
})
})(jQuery);