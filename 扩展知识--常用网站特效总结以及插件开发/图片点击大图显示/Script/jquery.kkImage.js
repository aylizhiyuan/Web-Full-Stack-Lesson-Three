/**
 * Description 图片全屏显示
 * Powered By 小K
 * QQ 908526866
 * E-mail lnend@sina.cn
 * Data 2013-05-24
 * Dependence jQuery v1.8.3 
 **/ 
(function($){

	$.fn.kkImgAllWindow = function(options){
		
		var opts = $.extend({},$.fn.kkImgAllWindow.defaults, options);
		//jQuery的对象进行循环
		return this.each(function(){		
  		
			var $this = $(this);
			var $imgBox = $this.find(opts.imgBox); // 获取图片外级元素
		
		$imgBox.find("img").click(function(){	
		
			
			var $Img = $(this);//当前点击的图片
			var ImgUrl = $Img.attr("src")//获取当前点击图片的地址
			
			// 获取图片真实尺寸
			$("body").append("<img class=\"getImgSize\" style=\"display:none;\" src=\"" + ImgUrl + "\" />"); //添加临时图片
							
			var imgWidth = $(".getImgSize").width();
			var imgHeight = $(".getImgSize").height(); // 获得图片真实尺寸
			
			var winWidth = $(window).width();
			var winHeight = $(window).height(); //获取当前窗口的宽高
			
			$(".getImgSize").remove(); //移除临时图片
			
			//判断尺寸
			
			if(imgWidth > winWidth || imgHeight > winHeight){
				
					showImgBox(ImgUrl,winWidth,winHeight,winWidth,winHeight);
					
				}
						
			else{showImgBox(ImgUrl,imgWidth,'auto',imgWidth,imgHeight);}
		
			
		
		});
		
		
		// 显示图片框架	
		function showImgBox(url,imgw,imgh,wrapw,wraph){
				
					var $app = $("body")
					var winWidth = $(window).width();
					var winHeight = $(window).height(); //获取当前窗口的宽高
					
					$(".kk_ImageBox").remove(); //移除全屏图片
					
					$app.append("<div style=\"display:none;width:"+ winWidth +"px; height:"+ winHeight +"px; position:fixed; top:0px; left:0px;background:#000;opacity:0.6;filter:alpha(opacity=60);z-index:9999;overflow:hidden;\" class=\"kk_ImageBox\"></div>"+
					
					"<div style=\"display:none;height:"+ wraph +"px;width:"+ wrapw +"px;overflow:hidden;position:fixed;z-index:999999; top:50%; left:50%; margin-top:-"+ wraph*0.5 +"px; margin-left:-"+ wrapw*0.5 +"px;background:url(Images/loading.gif) no-repeat center center;\" class=\"kk_ImageBox\"><img src=\""+ url +"\" width=\""+ imgw +"\" height=\""+ imgh +"\" /><div/>");
					
					$(".kk_ImageBox").fadeIn("fast");
					
					// 关闭
					$(".kk_ImageBox").dblclick(function(){
			
						$(".kk_ImageBox").fadeOut("fast",function(){
							
								$(".kk_ImageBox").remove();
							
							});

					});	
				
				};
		
		
		
			
		});//主体代码  
	};
	
	// 默认参数
	$.fn.kkImgAllWindow.defaults = {
		
		imgBox:'li' //图片的外框
		
	};
	
	$.fn.kkImgAllWindow.setDefaults = function(settings) {
		$.extend( $.fn.kkImgAllWindow.defaults, settings );
	};
	
})(jQuery);