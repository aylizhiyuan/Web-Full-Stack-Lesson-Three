//拖拽功能插件
$().extend('drag',function(){
    var tags = arguments;
    for(var i = 0;i < this.elements.length;i++){
        addEvent(this.elements[i],'mousedown',function(e){
            //preDef(e);//解决如果登录框是空白的情况，阻止默认行为
            if(trim(this.innerHTML).length == 0) e.preventDefault();
            //有时候使用文档对象，有时候使用本身对象，所以这时候将它统一了。
            var _this = this;

            //鼠标当前的位置减去元素的偏移坐标，得到的是鼠标在元素中的偏移量
            var diffX = e.clientX - _this.offsetLeft;
            var diffY = e.clientY - _this.offsetTop;
            //e.target获得了当前事件中，你鼠标点击的目标
            var flag = false;
            //循环传过来的要移动的元素，只要有一个是真，我们就不再进行判断了
            for(var i = 0;i < tags.length;i++){
                if(e.target == tags[i]){
                    flag = true;
                    break;//只要有一个是true,我们就跳出循环
                }
            }
            if(flag){
                //添加事件
                addEvent(document,'mousemove',move);
                addEvent(document,'mouseup',up);

            }else{
                removeEvent(document,'mousemove',move);
                removeEvent(document,'mouseup',up);
            }

            function move(e){
                var left = e.clientX - diffX;
                var top = e.clientY - diffY;
                //超出上范围，值为0
                if (left < 0) {
                    left = 0;
                } else if (left <= getScroll().left) {
                    left = getScroll().left;
                } else if (left > getInner().width + getScroll().left - _this.offsetWidth) {
                    left = getInner().width + getScroll().left - _this.offsetWidth;
                }

                if (top < 0) {
                    top = 0;
                } else if (top <= getScroll().top) {
                    top = getScroll().top;
                } else if (top > getInner().height + getScroll().top - _this.offsetHeight) {
                    top = getInner().height + getScroll().top - _this.offsetHeight;
                }
                _this.style.left = left + 'px';
                _this.style.top = top + 'px';
                //移动捕获
                if(typeof _this.setCapture != 'undefined'){
                    _this.setCapture();
                }
            }
            function up(){
                removeEvent(document,'mousemove',move);//删除move事件
                removeEvent(document,'mouseup',up);//因为你是要循环点的，所以，mouseup也会累积，所以，把它也删除了。
                //移动捕获
                if(typeof _this.releaseCapture != 'undefined'){
                    _this.releaseCapture();
                }
            }

        })

    }
    return this;

})

