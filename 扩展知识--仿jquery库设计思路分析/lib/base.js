/**
 * Created by wangjiaojiao on 2015/5/10.
 */

//我自己的JS库
/*
var Base = {
    getId:function(id){
        return document.getElementById(id);
    },
    getName:function(name){
        return document.getElementsByName(name);
    },
    getTagName:function(tag){
        return document.getElementsByTagName(tag);
    },
}

//这种是对象写法，但是无法添加原型，所以必须用构造函数的写法来做

*/



//前台调用,每次$()调用，都会使Base构造函数实例化一个对象，这个对象，有很多原型方法，但是，它唯一不同的是elements数组，这个数组来保存我们获取的document对象
var $ = function(args){
    return new Base(args);
};


//$()实例化后，方法是公共的，但操作的节点却是不一样的，比如你$() 实例化了一次，然后$()再实例化一次，你再去调用方法的时候，它们操作的都是不同的数据。

//然后你就要考虑用getId,getTagName,getClass这些方法去把你想要的document节点放到这个elements数组中去了，这也是这个构造函数中，唯一获取elements数组的方法了
//所以，你的第一步就是使用这些方法，将每个$()对象数据准备好。
//在这些方法当中，this指的是对象本身这个不用多说，this更多的是调用elements数组，也就是数据
//$().getID('')你完美的实例化了，并且给this.elements这个数组赋值了，然后你又想去调用它的别的方法，用（实例化对象.方法）这种方式，那么你需要重新 $().另外的方法去调用
//可你发现，你每次实例化后，操作的数据都是不同的，也就无法$().getId('').其它方法，这样连接调用，你需要$().getId('')返回一个获得数据的对象，而你要在这个对象中去调用其它的方法
//那么，你只需要在所有的方法中返回这个对象，这样$().getId('').css().click().html(),$()这个对象实例化，数据为空,.getId()数据拿到，返回这个对象,.css()再调用这个对象的CSS方法，click()再调用这个对象的
//click方法，依次类推，保证以后的方法调用的都是同一个实例化对象。

//连缀中操作的是同一个数据对象，尽量用连缀解决这个数据的所有问题，当你需要操作别的数据的时候，你可以$() --> $().getId() --> $().getId().html() 这样
//默认情况下，实例化对象，elements数组是空的，如果你给这个构造函数传递一个初始的参数，类似于$(文档元素).html(),那么，这个参数会初始化elements数组
//它只是用来操作一个数据值的，因为它确实就是这么设置的。

//需要注意的是这个对象，它是个对象，而不是document对象，你只能用.elements(这是它的数据)，或者.原型方法去调用，你调用其它的命令只能是undefined.

//这里，我必须要考虑一个复用的问题，你可以$().html().css().click()进行一系列的操作，完毕后，如果你再次$()，你获得的就是一个新的对象，但是，
//很多情况下，我们需要复用，也就是说我要保存$().html().css().click()这一系列操作的元素，除非我一次性操作完成，不再进行二次操作了，否则，
//我每次想要操作它的时候都要重新创建个对象，然后给它的.elements数组赋值，这时候我应该怎么办？
// 这种情况，我们大多数会用一个变量来存储文档元素,下面有详细说明，初始化的一些情况




//我们主要是了解你传递给它值得时候，它都发生了些什么？

//1.传递一个对象
/*            var box = {};
              box.name = '李志远';
              box.age = 28;
              alert($(box).elements[0].name);
*/
//如果你传递一个对象进去了，那么根据我们的初始化规则，this.elements数组的[0]下标会保存这个对象,但它是个对象，而我们所有的原型方法是针对
//文档元素DOM进行操作的，我实在无法理解传递一个对象是何作用


//2.传递一个文档元素
//             var box = document.getElementById('box');
//             alert($(box).html());
//实际上，这里应该传递一个文档元素DOM,它也是个对象，这样，我们就可以继续操作了。




//3.传递多个文档元素
//            var aspan = document.getElementsByTagName('span');
//            alert($(aspan).elements[0][1].innerHTML);
//很明显啊，this.elements[0]保存了多个文档元素 alert($(aspan).css('width','200px'));这种系统就直接崩了，毕竟我们只循环了elements数组的第一层，第二层我们
//没有考虑过。elements[0]里头是无数个span ，我们无法加方法



// 4.在base对象中传递this
//            $('span').click(function(){
//                alert($(this).getElement(0).innerHTML);
//            })
//  这里头的this指的是谁？this.elements[i].onclick = fn;指的是this.elements[i]，它都会赋值给this.elements[0],随后会对每一个span文档元素进行操作。

//5.传递一个字符串，根据我们的分析，字符串转义后我们将会顺利获取数值。



//类库初始化
function Base(args){
    //创建一个存储节点的数组
    this.elements = [];
    if(typeof args == 'string'){
        if(args.indexOf(' ') != -1){ //如果在参数中存在空格
            //CSS方法
            var elements = args.split(' ');//把节点拆开
            var childElements = [];//存放临时节点对象的数组
            var node = [];//用来存放父节点
            for(var i=0;i<elements.length;i++){
                if(node.length == 0) node.push(document);
                switch(elements[i].charAt(0)){
                    case '#':
                        childElements = [];//清理临时节点
                        childElements.push(this.getId(elements[i].substring(1)));
                        node = childElements;//保存父节点
                        break;
                    case '.':
                        childElements = [];
                        for(var j=0;j<node.length;j++){ //循环父节点
                            var temps = this.getClass(elements[i].substring(1),node[j]); //得到每个父节点下的所有子节点
                            for(var k=0;k<temps.length;k++){ //循环子节点
                                childElements.push(temps[k]); //放入数组中
                            }
                        }
                        node = childElements; //父节点变化为上一个元素的集合
                        break;
                    default :
                        childElements = [];
                        for(var j=0;j<node.length;j++){
                            var temps = this.getTagName(elements[i],node[j]);
                            for(var k=0;k<temps.length;k++){
                                childElements.push(temps[k]);
                            }
                        }
                        node = childElements;
                }
            }
        this.elements = childElements;
        }else{
            //find方法
            switch(args.charAt(0)){
                case '#':
                    this.elements.push(this.getId(args.substring(1)));
                    break;
                case '.':
                    this.elements = this.getClass(args.substring(1));
                    break;
                default :
                    this.elements = this.getTagName(args);

            }
        }

    }else if(typeof args == 'object'){
        if(args != undefined){
            this.elements[0] = args;//只适用于在Base对象中，传递this值
        }
    }else if(typeof args == 'function'){
        addDomLoaded(args);
    }
};
//我们要深入了解下这个css方法，举个例子 $(.box .text .span)这种调用方式是如何进行编码的，既然它存在了一个层级的关系，我们要找的是.box下的.text下的.span
//那么，我们是不是首先获取所有的.box元素集合，然后遍历.box元素集合，找到下头所有的.text元素集合，再将.text作为父元素，遍历.text元素集合，找到下头所有的.span
//元素集合呢？思路就是这个。下面，我们来分析下源代码

// var elements = args.split(' ') 这句话，我们把所有要获取的元素分成一个数组存储，下面我们会遍历这个数组
//for(var i=0;i<elements.length;i++) 遍历这个数组，elements[i]是我们的文档元素。
//if(node.length == 0) node.push(document);文档元素一号，也就是最上层的父元素，应该是在整个文档流中去查找的，所以，它的父元素就是document
//switch(elements[i].charAt(0)) 首先，我们来检查它是class，id,tag
//这里，我们看看是class的情况
//childElements = []; 首先，将这个数组的元素清空，这个数组是用来保存最后结果的数组，文档元素1,2,3号都会获得不同的childElements，所以这里我们只要最后一个。
//for(var j=0;j<node.length;j++)，循环父节点，第一次的情况，我们的父节点是document，所以，这里只循环一次
//var temps = this.getTagName(elements[i],node[j]);获取父节点中所有的文档元素一号集合，赋值给temps
//for(var k=0;k<temps.length;k++)childElements.push(temps[k]) 遍历这个元素一号集合，将它所有的东西放到childElements数组里头去。
// node = childElements;  把node作为我们的父元素集合来使用。
//下次情况下，我们的node就有了非常多的父元素集合了，那等我们再次遍历这个父元素集合的时候，
//var temps = this.getTagName(elements[i],node[j]),temps每次都会找到元素一号集合下的所有元素二号集合
//for(var k=0;k<temps.length;k++)childElements.push(temps[k]) node = childElements元素二号集合又一次被放入了childElements数组中，并赋值给node
//元素二号集合称为了新的父元素，依此再找到元素三号集合。
//this.elements = childElements;最后我们将获取的元素集合赋值给elements数组。




//获得ID
Base.prototype.getId = function(id){
    //this.elements.push(document.getElementById(id));
    //这里我们就不需要再返回这个对象了，我们不需要再getId()这么调用了，直接$(#box)调用了。
    //为了让它复用，我们用返回这个ID来操作，不再直接往数组里头扔数据了。
    return document.getElementById(id);
};
//获得CLASS
Base.prototype.getClass = function(className,parentNode){
    //可以限定节点了
    var node = null;
    //临时存储的数组
    var temps = [];
    if(parentNode != undefined){
        node = parentNode;
    }else{
        node = document;
    }
    var all = node.getElementsByTagName('*');
    for(var i = 0;i < all.length;i++){
        if ((new RegExp('(\\s|^)' +className +'(\\s|$)')).test(all[i].className)) {
            temps.push(all[i]);
        }
    }
    return temps;
};
//获得标签TAG
Base.prototype.getTagName = function(tag,parentNode){
    //可以限定节点了
    var node = null;
    //临时存储的数组
    var temps = [];
    if(parentNode != undefined){
        node = parentNode;
    }else{
        node = document;
    }
    var tags = node.getElementsByTagName(tag);
    for(var i=0;i < tags.length;i++){
        temps.push(tags[i]);
    }
    return temps;
};

//getid,getclass,gettagname用temp获取到我们要操作的文档元素集合，然后返回这个集合。在base初始化的时候，$(初始化的元素)将temp赋值给
//elements数组，getclass和gettagname都接受一个父节点的选择，默认是document,也可以为它传递一个父节点，那么我们将获取父节点下的子节点集合
//但是在初始化的时候，我们并没有考虑父节点的情况，而在find 中，我们才会去考虑。

//设置CSS选择器的子节点
Base.prototype.find  = function(str){
    var childElements = [];
    for(var i=0;i<this.elements.length;i++){
        switch(str.charAt(0)){
            case '#':
                childElements.push(this.getId(str.substring(1)));
                break;
            case '.':
                var temps = this.getClass(str.substring(1),this.elements[i]);
                for(var k=0;k<temps.length;k++){
                    childElements.push(temps[k]);
                }
                break;
            default :
                var temps = this.getTagName(str,this.elements[i]);
                for(var j=0;j<temps.length;j++){
                    childElements.push(temps[j]);
                }
        }
    }
    this.elements = childElements;
    return this;
};
//当我们通过初始化$()获取到文档元素集合之后，我们想要再获取当前文档元素集合当中的子节点，所以，我们考虑用 find 来获取
//这时候，我们的父元素节点集合已经在elements数组里头了
//1.我们首先会遍历所有的父节点for(var i=0;i<this.elements.length;i++)
//2.检测find()内传递的子节点，是ID，CLASS，还是TAGNAMEswitch(str.charAt(0))
//3.我们将再次调用getclass,gettagname方法，但这次，我们会将存储在elements数组里头的父元素节点传递过去，我们就会获得每个父节点下的所有
//符合条件的子节点集合  var temps = this.getClass(str.substring(1),this.elements[i]);
//4.然后放入临时的childElements数组里头 childElements.push(temps[j])
//5.最后将elements数组里头的东西清空，赋值给所有的子节点集合。this.elements = childElements;
// $('p').find('a')
//我们将p标签传递给初始化函数，调用getTagName()我们获得了所有的P元素，elements = 所有获得的P元素
//循环每一个P元素，在每一个P元素中找到a元素的集合，赋值给一个临时的数组var temps = this.getTagName(str,this.elements[i]);
// 循环这个临时的数组temps,将它的值push到childElements数组里头去。this.elements = childElements;我们就获得了所有的P元素下的a元素了。









//下标形式选择节点，记得是节点，不是base对象
Base.prototype.ge = function(num){
    return this.elements[num];

};
//获取首个节点，并返回节点对象
Base.prototype.first = function(){
    return this.elements[0];
};
//获取最后一个节点
Base.prototype.last = function(){
    return this.elements[this.elements.length - 1];
};
//获取某组节点的数量
Base.prototype.length = function () {
    return this.elements.length;
};
//获取某一个节点的属性
Base.prototype.attr = function (attr, value) {
    for (var i = 0; i < this.elements.length; i ++) {
        if (arguments.length == 1) {
            return this.elements[i].getAttribute(attr);
        } else if (arguments.length == 2) {
            this.elements[i].setAttribute(attr, value);
        }
    }
    return this;
};

//获取某一个节点在整个节点组中是第几个索引
Base.prototype.index = function () {
    var children = this.elements[0].parentNode.children;
    for (var i = 0; i < children.length; i ++) {
        if (this.elements[0] == children[i]) return i;
    }
};

//设置某一个节点的透明度
Base.prototype.opacity = function (num) {
    for (var i = 0; i < this.elements.length; i ++) {
        this.elements[i].style.opacity = num / 100;
        this.elements[i].style.filter = 'alpha(opacity=' + num + ')';
    }
    return this;
};

//获取某一个节点，并且返回base对象
Base.prototype.eq = function(num){
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this;
};
//获取当前节点的下一个元素节点
Base.prototype.next = function () {
    for (var i = 0; i < this.elements.length; i ++) {
        this.elements[i] = this.elements[i].nextSibling;
        if (this.elements[i] == null) throw new Error('找不到下一个同级元素节点！');
        if (this.elements[i].nodeType == 3) this.next();
    }
    return this;
};

//获取当前节点的上一个元素节点
Base.prototype.prev = function () {
    for (var i = 0; i < this.elements.length; i ++) {
        this.elements[i] = this.elements[i].previousSibling;
        if (this.elements[i] == null) throw new Error('找不到上一个同级元素节点！');
        if (this.elements[i].nodeType == 3) this.prev();
    }
    return this;
};





//设置CSS属性
Base.prototype.css = function(attr,value){
    for(var i = 0;i < this.elements.length;i++){
        if(arguments.length == 1){
           return getStyle(this.elements[i],attr);//返回一个结果，不能连缀
        }else {
            this.elements[i].style[attr] = value;
        }
    }
    return this;
};




//设置内容
Base.prototype.html = function(str){
    for(var i = 0;i < this.elements.length;i++){
        if(arguments.length == 0){
            return this.elements[i].innerHTML;//返回一个结果，不能连缀
        }
        this.elements[i].innerHTML = str;
    }
    return this;
};

//设置innerText
Base.prototype.text = function (str) {
    for (var i = 0; i < this.elements.length; i ++) {
        if (arguments.length == 0) {
            return getInnerText(this.elements[i]);
        }
        setInnerText(this.elements[i], str);
    }
    return this;
}

//绑定click事件
Base.prototype.click = function(fn){
    for(var i = 0;i < this.elements.length;i++){
        this.elements[i].onclick = fn;
    }
    return this;
};


//添加class
Base.prototype.addClass = function(className){
    for(var i = 0;i < this.elements.length;i++){
        if(!this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
            this.elements[i].className += ' '+ className;
        }
    }
    return this;
};


//移除class
Base.prototype.removeClass = function(className){
    for(var i = 0;i < this.elements.length;i++){
        if(this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
            this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),' ');
        }
    }
    return this;
};

//添加link或者style的CSS规则
Base.prototype.addRule = function(num,selectorText,cssText,position){
    var sheet = document.styleSheets[num];
    if(typeof sheet.insertRule != 'undefined'){
        sheet.insertRule(selectorText+'{'+cssText+'}',position)
    }else if(typeof sheet.addRule != 'undefined'){
        sheet.addRule(selectorText,cssText,position)
    }

};
//移除link和style的CSS规则
Base.prototype.removeRule = function(num,index){
    var sheet = document.styleSheets[num];
    if(typeof sheet.deleteRule != 'undefined'){
        sheet.deleteRule(index);
    }else if(typeof sheet.removeRule){
        sheet.removeRule(index);
    }
    return this;
};

//获取一个表单里头的某个input
Base.prototype.form = function (name) {
    for (var i = 0; i < this.elements.length; i ++) {
        this.elements[i] = this.elements[i][name];
    }
    return this;
};
//设置表单字段内容获取
Base.prototype.value = function (str) {
    for (var i = 0; i < this.elements.length; i ++) {
        if (arguments.length == 0) {
            return this.elements[i].value;
        }
        this.elements[i].value = str;
    }
    return this;
};

//设置事件发生器
Base.prototype.bind = function(event,fn){
    for(var i = 0;i <this.elements.length;i++){
        addEvent(this.elements[i],event,fn);
    }
    return this;
}

//设置鼠标移入移除
Base.prototype.hover = function(over,out){
    for(var i = 0;i <this.elements.length;i++){
        addEvent(this.elements[i],'mouseover',over);
        addEvent(this.elements[i],'mouseout',out);
    }
    return this;
};
//设置点击切换方法
Base.prototype.toggle = function () {
    for (var i = 0; i < this.elements.length; i ++) {
        (function (element, args) {
            var count = 0;
            addEvent(element, 'click', function () {
                args[count++ % args.length].call(this);
            });
        })(this.elements[i], arguments);
    }
    return this;
};
//设置显示
Base.prototype.show = function(){
    for(var i = 0;i < this.elements.length;i++){
        this.elements[i].style.display = 'block';
    }
    return this;
};
//设置隐藏
Base.prototype.hide = function(){
    for(var i = 0;i < this.elements.length;i++){
        this.elements[i].style.display = 'none';
    }
    return this;
};
//设置物体居中
Base.prototype.center = function (width, height) {
    var top = (getInner().height - height) / 2 + getScroll().top;
    var left = (getInner().width - width) / 2 + getScroll().left;
    for (var i = 0; i < this.elements.length; i ++) {
        this.elements[i].style.top = top + 'px';
        this.elements[i].style.left = left + 'px';
    }
    return this;
};

//触发浏览器窗口事件
Base.prototype.resize = function (fn) {
    for (var i = 0; i < this.elements.length; i ++) {
        var element = this.elements[i];
        addEvent(window, 'resize', function () {
            fn();
            if (element.offsetLeft > getInner().width + getScroll().left - element.offsetWidth) {
                element.style.left = getInner().width + getScroll().left - element.offsetWidth + 'px';
                if (element.offsetLeft <= 0 + getScroll().left) {
                    element.style.left = 0 + getScroll().left + 'px';
                }
            }
            if(element.offsetTop > getInner().height + getScroll().top - element.offsetHeight) {
                element.style.top = getInner().height + getScroll().top - element.offsetHeight + 'px';
                if (element.offsetTop <= 0 + getScroll().top) {
                    element.style.top = 0 + getScroll().top + 'px';
                }
            }
        });
    }
    return this;
};

//锁屏
/*
首先，创建一个可以布满整个浏览器的div,将它的z-index设置为9998

画布的CSS：
filter:alpha(Opacity=30);
opacity:0.30
z-index:9998
display:none;
width:100%
height:100%
top:0
left:0
position:absolute
background: black;

然后写个弹窗div 弹窗的div设置为9999 ,默认display = none position:absolute,background: white;

 <div class="top">
 <p class="login">点击我弹窗</p>
 </div>

 <div id="login">
 <div class="close">X</div>
 <div class="user">用户名:<input type="text"/></div>
 <div class="pass">密码:<input type="text"/></div>
 <div class="sub"><input type="submit" value="提交"/></div>
 </div>
 <div id="screen"></div>

调用的时候这么调用:

var login = $().getId('login');
var screen = $().getId('screen');

login.center(350,250).resize(function(){
    if(login.css('display') == 'blcok'){
        screen.lock();//当你改变窗口大小的时候，再锁一次的目的是它会随着你的变化，画布也会随之而变化
    }
});
$().getClass('login').click(function(){
    login.center(350,250);
    login.css('display','block');
    screen.lock();
})

$().getClass('close').click(function(){
    login.css('display','none');
    screen.unlock();
})

login.drag();//使用一个函数来实现拖拽

 思路分析:首先是为触发元素绑定一个点击事件，然后弹窗，画布和注册DIV默认都是不显示的，并且都为绝对定位，因为DIV要根据画布进行移动。DIV的层级较高
 当点击行为发生的时候，画布和DIV同时显示，当点击退出的时候，画布和DIV要同时消失。这个是最基本的要求，下面增加了以下的几个特点：
 1.画布在打开的时候是居中的，关闭，再次打开仍然居中
 2.画布的大小是窗口的视图大小，并且兼容所有浏览器，画布会拥有透明度
 3.当window.onresize浏览器窗口大小发生变化的时候，第二部的操作也要执行，画布的大小会根据视图的大小而变化
 4.鼠标点击下去，移动的时候DIV随着移动，松开鼠标的时候撤销事件，这些都发生在鼠标点击下去之后，鼠标移动的坐标减去鼠标在DIV中的坐标，再赋给它的偏移量就等于它相对于DIV边缘移动了多少
 5.根据4的结果，来进行判断，如果它的偏移量超出了视图的范围应该如何解决
 6.同样根据5的形式，在窗口大小改变的时候，它的偏移量再次计算
 7.只有点击DIV的某个区域的时候，它的偏移才会有效果，否则撤销

还有一些问题是，如果出现了滚动条怎么办？其它形式滚动到下面怎么办？解决DIV空白问题？
 */
//打开的时候,这个是针对画布设置的
//锁屏功能
//锁屏功能
Base.prototype.lock = function () {
    for (var i = 0; i < this.elements.length; i ++) {
        fixedScroll.top = getScroll().top;
        fixedScroll.left = getScroll().left;
        this.elements[i].style.width = getInner().width + getScroll().left + 'px';
        this.elements[i].style.height = getInner().height + getScroll().top + 'px';
        this.elements[i].style.display = 'block';
        parseFloat(sys.firefox) < 4 ? document.body.style.overflow = 'hidden' : document.documentElement.style.overflow = 'hidden';
        addEvent(this.elements[i], 'mousedown', predef);
        addEvent(this.elements[i], 'mouseup', predef);
        addEvent(this.elements[i], 'selectstart', predef);
        addEvent(window, 'scroll', fixedScroll);
    }
    return this;
};

Base.prototype.unlock = function () {
    for (var i = 0; i < this.elements.length; i ++) {
        this.elements[i].style.display = 'none';
        parseFloat(sys.firefox) < 4 ? document.body.style.overflow = 'auto' : document.documentElement.style.overflow = 'auto';
        removeEvent(this.elements[i], 'mousedown', predef);
        removeEvent(this.elements[i], 'mouseup', predef);
        removeEvent(this.elements[i], 'selectstart', predef);
        removeEvent(window, 'scroll', fixedScroll);
    }
    return this;
};
//设置动画
Base.prototype.animate = function(obj){
    for(var i=0;i<this.elements.length;i++){
        //先将每个文档元素保存下来
        var element = this.elements[i];
        //对象数据的初始化
        var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top':
                   obj['attr'] == 'w' ? 'width': obj['attr'] == 'h' ? 'height' :
                   obj['attr'] == 'o' ? 'opacity' : obj['attr'] != undefined ? obj['attr'] : 'left';

        var start = obj['start'] != undefined ? obj['start'] :
                    attr == 'opacity' ? parseFloat(getStyle(element,attr))*100 : parseInt(getStyle(element,attr));
        var t = obj['t'] != undefined ? obj['t'] : 30;
        var step = obj['step'] != undefined ? obj['step'] : 10;
        var alter = obj['alter'];
        var target = obj['target'];
        //同步动画
        var mul = obj['mul'];
        //缓冲运动
        var speed = obj['speed'] != undefined ? obj['speed'] : 10;
        var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer';
        //目标量和增量的判断
        if(alter != undefined && target == undefined){
            target = alter + start;
        }else if(alter == undefined && target == undefined && mul == undefined){
            throw new Error('错误');
        }
        //解决是负数的问题
        if(start > target){
            step = - step;
        }
        if(attr == 'opacity'){
            element.style.opacity = parseInt(start) / 100;
            element.style.filter =  'alpha(opacity=' + parseInt(start) + ')';

        }else{
            //每次都会从起始点开始
            element.style[attr] = start + 'px';
        }
        //每次timer调用的时候，速度都会累加，所以，要把timer每次都清空
        if(mul == undefined){
            mul = {};
            mul[attr] = target;
        }
        clearInterval(element.timer);
        element.timer = setInterval(function(){
            //多个动画最后一个动画执行完毕了，才清空定时器
            var flag = true;
            for(var i in mul){
                attr = i == 'x' ? 'left' : i == 'y' ? 'top' : i == 'w' ? 'width' : i == 'h' ? 'height' : i == 'o' ? 'opacity' : i != undefined ? i : 'left';
                target = mul[i];
                //缓冲效果
                if(type == 'buffer'){
                    var parse = attr == 'opacity' ? (target - parseFloat(getStyle(element,attr)) * 100) :
                        (target - parseInt(getStyle(element,attr)));
                    var temp = parse/speed ;
                    step = step > 0 ? Math.ceil(temp) : Math.floor(temp);
                }
                //如果是透明度渐变
                if(attr == 'opacity'){
                    if(step == 0){
                        setOpacity();
                    }else if( step > 0 && Math.abs(parseFloat(getStyle(element,attr)) * 100 - target) <= step){

                        setOpacity();
                    }else if(step < 0 && (parseFloat(getStyle(element,attr)) * 100 - target)  <= Math.abs(step)){
                        setOpacity();
                    }else{
                        var temp = parseFloat(getStyle(element,attr)) * 100;
                        element.style.opacity = parseInt(temp + step)/100;
                        element.style.filter = 'alpha(opacity=' + parseInt(temp + step) + ')';
                    }
                    if(parseInt(target) != parseInt(parseFloat(getStyle(element,attr)) * 100)){
                        flag = false;
                    }

                }else{
                    //这个是运动动画
                    if(step == 0){
                        setTarget();
                    }else if( step > 0 && Math.abs(parseInt(getStyle(element,attr)) - target) <= step){
                        setTarget();//累加情况
                    }else if(step < 0 && (parseInt(getStyle(element,attr)) - target) <= Math.abs(step)){
                        setTarget();//累减情况
                    }else{
                        element.style[attr] = parseInt(getStyle(element,attr)) + step + 'px';

                    }
                    if(parseInt(target) != parseInt(getStyle(element,attr))){
                        flag = false;
                    }
                }

            }
            if(flag){
                clearInterval(element.timer);
                if (obj.fn != undefined) obj.fn();
            }

        },t);
        //重复代码
        function setTarget(){
            element.style[attr] = target + 'px';

        }
        function setOpacity(){
            element.style.opacity = parseInt(target)/100;
            element.style.filter = 'alpha(opacity=' + parseInt(target) + ')';

        }
    }
    return this;

};
/*
属性：
left 向左移动
top  向下移动
width 宽度变化
height 高度变化
opacity 透明度变化

start 开始的位置  obj['start'] != undefined ? obj['start'] : getStyleNum(element,attr);
如果不给，就是文档默认的CSS属性，否则接收传递过来的 element.style[attr] = start + 'px';

t 每多少毫秒执行一次  obj['t'] != undefined ? obj['t'] : 30;

step 每次变化的长度  var step = obj['step'] != undefined ? obj['step'] : 10;

alter 变化的总长度 ，如果定义了，那么  target = alter + start;如果没定义，就看target

target 变化结束后的长度 ,不能两个都不定义

speed 速度，这个值是为了达到缓冲的效果，变化的总长度（每次都不一样，因为处在变化中）/速度=每次变化的长度

type 是缓冲还是无缓冲 obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer';
*/

//动画的思路分析：首先我们要考虑用setInterval这种定时器的方式，每隔一段时间，就改变元素的偏移量left值
//element.style[attr] = getStyleNum(element,attr) + step + 'px';
//if(start > target){step = - step;}因为没有right和bottom属性，所以，如果开始的位置小于要达到的位置，我们每次都会减去变化的量。
//因为每次变化的长度可能是正的，从起始位置相加step到目标位置，也有可能是负的，从起始位置相减step到目标位置
//所以，你要考虑着两种情况同时存在的时候


//下面我们要解决几个问题
//1.到目标点停止,并且如果每次变化的长度累加，累加的数并不是恰恰等于目标点的情况，比如目标300,累加到303发现到目标了，再回到300会有一个突兀的效果。
// element.style[attr] = target + 'px';clearInterval(timer); 这两句话的意思就是到达目标点就清除这个动画了。但，问题是什么情况下，清除并到达目标点
//应该是还未到达目标点，快达到的时候，直接跳到300，就解决上面的问题了。
//2.到目标点停止，并且如果每次变化的长度累减，累减的数并不是恰恰等于目标点的情况，例如目标0,累减到-1发现目标了，再回到0
//













//插件入口
Base.prototype.extend = function(name,fn){
    Base.prototype[name] = fn;
};




