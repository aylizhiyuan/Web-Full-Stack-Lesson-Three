//常用的函数

//浏览器检测

(function(){
    window.sys = {};//创建一个全局的，供外部进行访问
    var ua = navigator.userAgent.toLowerCase();//获得浏览器的信息
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
    (s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
    if(/webkit/.test(ua)){
        sys.webkit = ua.match(/webkit\/([\d.]+)/)[1];
    }
})();


//DOM检测
function addDomLoaded(fn){
    var isReady = false;
    var timer = null;
    function doReady(){
        if(timer) clearInterval(timer);
        if(isReady) return;
        isReady = true;
        fn();
    }
    if((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit < 525)){
        timer = setInterval(function(){
            if(document && document.getElementById && document.getElementsByTagName && document.body){
                doReady();
            }
        },1);

    }else if(document.addEventListener){
            addEvent(document,'DOMContentLoaded',function(){
                fn();
                removeEvent(document,'DOMContentLoaded',arguments.callee);
            });
    }else if(sys.ie && sys.ie < 9){
        var timer = null;
        timer = setInterval(function(){
            try {
                document.documentElement.doScroll('left');
                doReady();
            }catch (e){};
        },1);
    }
}

//跨浏览器获取视图大小

function getInner(){
    if(typeof window.innerWidth != 'undefined'){
        return {
            width:window.innerWidth,
            height:window.innerHeight
        }
    }else{
        return {
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }
}

//跨浏览器获取style ,只获得一个元素文档的信息
function getStyle(element,attr){
    var value = null;
    if(typeof window.getComputedStyle != 'undefined'){
        value =  window.getComputedStyle(element,null)[attr];
    }else if(typeof this.elements[i].currentStyle != 'undefined'){
        value = element.currentStyle[attr];//这里的问题是只能获得第一个
    }
    return value;
}
//跨浏览器获取style的数值信息，只获得一个元素文档的信息
function getStyleNum(element,attr){
    var value = null;
    if(typeof window.getComputedStyle != 'undefined'){
        value = parseInt(window.getComputedStyle(element,null)[attr]);
    }else if(typeof this.elements[i].currentStyle != 'undefined'){
        value = parseInt(element.currentStyle[attr]) ;//这里的问题是只能获得第一个
    }
    return value;
}

//判断class是否存在
function hasClass(element,className){
    return element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
}

//获取event对象
function getEvent(event){
    return event || window.event;
}
//阻止默认行为
function preDef(event){
    var e = getEvent(event);
    if(typeof e.preventDefault != 'undefined'){
        e.preventDefault(); //w3c
    }else{
        e.returnValue = false;  //IE
    }
}
//跨浏览器添加link规则
function insertRule(sheet, selectorText, cssText, position) {
    if (typeof sheet.insertRule != 'undefined') {//W3C
        sheet.insertRule(selectorText + '{' + cssText + '}', position);
    } else if (typeof sheet.addRule != 'undefined') {//IE
        sheet.addRule(selectorText, cssText, position);
    }
}

//跨浏览器移出link规则
function deleteRule(sheet, index) {
    if (typeof sheet.deleteRule != 'undefined') {//W3C
        sheet.deleteRule(index);
    } else if (typeof sheet.removeRule != 'undefined') {//IE
        sheet.removeRule(index);
    }
}

//现代的事件绑定，addeventlistener问题不大，但主要的问题还是集中在IE上的attachEvent
//我们首先 要了解事件绑定要解决的问题：
//1.同一个文档元素的同一个事件可以注册多个函数  addEvent(obj,click,function1) addEvent(obj,click,function2)
//2.同一个文档元素的同一个事件注册的函数，如果相同，可以自动忽略addEvent(obj,click,function1) addEvent(obj,click,function1)后一个被忽略
//3.注册函数内的this应该正确指向绑定事件的文档元素。
//4.函数的执行顺序应该按照绑定的顺序执行

//obj.attachEvent('on'+type,function(){})这种IE默认的绑定事件，解决了可以注册多个函数的问题，但是，相同的函数没有被屏蔽，函数的执行
//顺序也不正确，函数中的this指的是window对象。


//obj.attachEvent('on'+type,function(){  fn.call(obj) })  解决this问题，匿名函数中，this就是我们的文档元素
//个人感觉call就是为了解决this问题的，fn.call(obj)，它会把obj传递给this,在这个函数内的this 就是 obj
//上面的做法，事件函数是个匿名函数，它没有event对象，你还需要将window.event传递给这个fn fn.call(obj,window.event)
//但是你再删除的时候，你发现你是无法获取到这个匿名的函数的，也就是无法删除的。
//也就是说，在IE下，我们不能用attachEvent,deatchEvent这些方法来进行操作了，我们会重写IE下的事件绑定



/*1.我们首先为每个元素（也就是说他们的obj是一样的）添加一个ID,addEvent.ID = 1;来记录在这个文档对象下，发生了多少次的事件。
2.我们会将这些所有的事件函数放在一个obj.events 对象中，那么obj.events里头的内容就是
obj.events = {
    'type':[
        function(){},
        function(){},
        function(){},
        function(){}
    ]
}
当我们第一次创建obj.events对象的时候，它默认是空的，下一次再次调用的时候，它不会为空if(!obj.events)obj.events = {};

3.我们会把这些函数放在obj.events对象的type数组里头,这个type是事件类型，相同的事件类型的函数会放在一起，不相同的事件类型会创建
新的type数组。这个数组里头放的是相同的元素执行的相同的事件的所有函数列表。

4.把第一次的事件函数放在数组的第一个位置上去if(obj['on'+type])obj.events[type][0] = fn;这里为什么要加这个判断不理解！

5.那么我们第二次的事件函数就放在以后的那些位置上去。obj.events[type][addEvent.ID++] = fn;

6.然后我们要开始执行所有的事件函数了，要解决this问题和event问题  es[i].call(this,e);

7.相同函数的屏蔽*/







//重写IE事件绑定
function addEvent(obj,type,fn){
    if(typeof obj.addEventListener != 'undefined'){
        obj.addEventListener(type,fn,false);
    }else{
        //创建一个存放事件的哈希表
        if(!obj.events)obj.events = {};//给OBJ创建一个对象，这样，添加和删除函数都可以接收到
        if(!obj.events[type]){
            obj.events[type] = [];//储存事件函数数组
            if(obj['on'+type])obj.events[type][0] = fn;//把第一个处理函数赋给数组的第一个
        }else{
            //同一个函数进行屏蔽,不添加到计数器中
            if(addEvent.equal(obj.events[type],fn))return false;
        }
        //从第二次开始，我们用事件计数器来存储
        obj.events[type][addEvent.ID++] = fn;
        //执行事件处理函数
        obj['on'+type] = addEvent.exec;
    }
}
//同一个注册函数进行屏蔽
addEvent.equal = function(es,fn){
    for(var i in es){
        if(es[i] == fn)return true;
    }
    return false;
}
addEvent.ID = 1;
addEvent.exec = function(event){
    var e = event || addEvent.fixEvent(window.event);
    var es = this.events[e.type];
    for(var i in es){
        es[i].call(this,e);  //以后addEvent里头，事件是e，必须明确
    }
}
//把IE常用的event对象配对到W3C中去
addEvent.fixEvent = function(event){
    event.preventDefault = addEvent.fixEvent.preventDefault;
    event.stopPropagation = addEvent.fixEvent.stopPropagation;
    event.target = event.srcElement;
    return event;
}
//IE阻止默认行为
addEvent.fixEvent.preventDefault = function(){
    this.returnValue = false;
}
//IE取消冒泡
addEvent.fixEvent.stopPropagation = function(){
    this.cancelBubble = true;
}

//删除事件
function removeEvent(obj,type,fn){
    if(typeof obj.removeEventListener != 'undefined'){
        obj.removeEventListener(type,fn,false);
    }else{
        if(obj.events){
            for(var i in obj.events[type]){
                if(obj.events[type][i] == fn){
                    delete  obj.events[type][i];
                }
            }
        }
    }
}
//跨浏览器获取innerText
function getInnerText(element) {
    return (typeof element.textContent == 'string') ? element.textContent : element.innerText;
}

//跨浏览器设置innerText
function setInnerText(elememt, text) {
    if (typeof elememt.textContent == 'string') {
        elememt.textContent = text;
    } else {
        elememt.innerText = text;
    }
}
//获取某一个元素到最外层顶点的位置
function offsetTop(element) {
    var top = element.offsetTop;
    var parent = element.offsetParent;
    while (parent != null) {
        top += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return top;
}

//删除左右的空格
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g,'');
}
//某一个值是否存在某一个数组中
function inArray(array, value) {
    for (var i in array) {
        if (array[i] === value) return true;
    }
    return false;
}

//滚动条清零
function scrollTop(){

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}
//跨浏览器获取滚动条的位置
function getScroll(){
    return {
        top : document.documentElement.scrollTop || document.body.scrollTop,
        left : document.documentElement.scrollLeft || document.body.scrollLeft
    }
}
//滚动条固定
function fixedScroll() {
    window.scrollTo(fixedScroll.left, fixedScroll.top);
}

//阻止默认行为
function predef(e) {
    e.preventDefault();
}
//获取某一个节点的上一个节点的索引
function prevIndex(current, parent) {
    var length = parent.children.length;
    if (current == 0) return length - 1;
    return parseInt(current) - 1;
}

//获取某一个节点的下一个节点的索引
function nextIndex(current, parent) {
    var length = parent.children.length;
    if (current == length - 1) return 0;
    return parseInt(current) + 1;
}
//创建cookie
function setCookie(name, value, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if (expires instanceof Date) {
        cookieText += '; expires=' + expires;
    }
    if (path) {
        cookieText += '; expires=' + expires;
    }
    if (domain) {
        cookieText += '; domain=' + domain;
    }
    if (secure) {
        cookieText += '; secure';
    }
    document.cookie = cookieText;
}

//获取cookie
function getCookie(name) {
    var cookieName = encodeURIComponent(name) + '=';
    var cookieStart = document.cookie.indexOf(cookieName);
    var cookieValue = null;
    if (cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(';', cookieStart);
        if (cookieEnd == -1) {
            cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }
    return cookieValue;
}

//删除cookie
function unsetCookie(name) {
    document.cookie = name + "= ; expires=" + new Date(0);
}

