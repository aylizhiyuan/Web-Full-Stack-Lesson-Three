/**
 * Created by hama on 2016/9/5.
 */

/*这是个工具函数集合*/

/*document.getElementById('');

document.getElementsByClassName('');

document.getElementsByTagName('');*/


/*优化的点：代码的数量上，代码的利用率上 */


function byId(option){
    if(typeof option == 'string'){
        return document.getElementById(option);
    }else{
        //传递的不是字符串的形式
        return document.getElementById(option.toString());
    }
}
function byClass(option){
    if(typeof option == 'string'){
        return document.getElementsByClassName(option);
    }else{
        return document.getElementsByClassName(option);
    }
}
function byTag(option){
    if(typeof option == 'string'){
        return document.getElementsByTagName(option);
    }else{
        return document.getElementsByTagName(option);
    }
}
//函数的作用是为了方便创建元素和文字节点





/*优化的点: 代码的合并,代码的重用性 */

function create(option){
    if(typeof option == 'string'){
        var length = option.length;
        if(option.charAt(0) == '<' && option.charAt(length-1) == '>'){
            //说明它是个标签
            //思路，获取到<>里面的标签元素
            //option = <div>,要把里面的div拿出来
            var result = /([^<][^>]){1,}/.exec(option);
            var result = (result[0].toString());
            return document.createElement(result);
        }else{
            //说明它是个文本节点
            return document.createTextNode(option);
    }
    }
}
console.log(create('br'));



//获取视图的大小


/*优化的点:代码的兼容性 */
function getInerWidth(){
    return window.innerWidth || document.documentElement.clientWidth;
}
function getInerHeight(){
    return window.innerHeight || document.documentElement.clientHeight;
}


/*优化的点：代码的功能性上  */

function drag (DOM,Offset,fn){
    var DOM = arguments[0];
    var Offset = arguments[1];
    var fn = arguments[2];
    //执行相关的操作

}
