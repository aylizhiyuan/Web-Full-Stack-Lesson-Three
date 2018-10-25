
/* ====================== 顶部特效start =======================*/

	$('.top li').mouseover(function(){
		$(this).children('a').css('color','#fff');
	}).mouseout(function(){
		$(this).children('a').css('color','#a4b094');
	});

		/* ====================== 购物车特效start =======================*/
	$('#shopCar').mouseover(function(){
		$(this).css({color:'#FF6700',background:'#fff'});
		$('.goods').stop(true,false).slideDown();
	}).mouseout(function(){
		$(this).css({color:'#a4b094',background:'#424242'});
		$('.goods').stop(true,false).slideUp();
	});
/* ====================== 头部特效start =======================*/
	/* ====================== 输入框特效start =======================*/
	var flagSer=1;
		$('.ser1').mouseover(function(){
			if(flagSer){
				$('.ser1 input').css({border:'1px solid #c0c0c0',borderRight:'none'});
				$('.ser2').css('border','1px solid #c0c0c0');
			}
		}).mouseout(function(){
			if(flagSer){
				$('.ser1 input').css({border:'1px solid #e0e0e0',borderRight:'none'});
				$('.ser2').css('border','1px solid #e0e0e0');
			}
		});

		$('.a a').mouseover(function(){
			$(this).css({color:'#fff',background:'#FF6700'});
		}).mouseout(function(){
			$(this).css({color:'#757575',background:'#eee'});
		});

		$('.ser2').mouseover(function(){
			if(flagSer){
				$('.ser1 input').css({border:'1px solid #c0c0c0',borderRight:'none'});
			}
			$(this).css({color:'#fff',width:'52px',height:'52px',border:'none', background:'#ff6700'});
		}).mouseout(function(){
			if(flagSer){
				$(this).css({color:'#616161',width:'50px',height:'50px',background:'#fff',border:'1px solid #e0e0e0'});
				$('.ser1 input').css({border:'1px solid #e0e0e0',borderRight:'none'});
			}else{
				$(this).css({color:'#616161',width:'50px',height:'50px',background:'#fff',border:'1px solid #ff6700'});
			}
		});
		
		$('.ser1 input').focus(function(){
			flagSer=0;
			$('.a').addClass('hide');
			$('.keywordList').removeClass('hide');
			$(this).css('border','1px solid #ff6700');
			$('.ser2').css({border:'1px solid #ff6700',borderLeft:'none'});
			$('.keywordList').css('border','1px solid #ff6700');
		}).blur(function(){
			flagSer=1;
			$('.a').removeClass('hide');
			$('.keywordList').addClass('hide');
			$(this).css('border','1px solid #e0e0e0');
			$('.ser2').css('border','1px solid #e0e0e0');
		});

		/* ====================== 下拉列表特效start =======================*/

		$('.nav li').mouseover(function(){
			$(this).children('a').css('color','#FF6700');
			if($(this).index()<7){
				$('.select').removeClass('hide');
				$('.select').slideDown().finish();  //注意此处的finish()
				$('.select').find('ul').addClass('hide');
				$('.select').find('ul').eq($(this).index()).removeClass('hide');
			}
		}).mouseout(function(){
			$(this).children('a').css('color','#333333'); 
		});

		$('.nav').mouseout(function(){
			$('.select').slideUp();
		});

		$('.select').find('ul').mouseover(function(){
			$('.select').slideDown().finish();    //注意此处的finish()
		}).mouseout(function(){
			$('.select').slideUp();
		});
/* ====================== 头部特效end =======================*/

/* ====================== 主内容特效start =======================*/
	/* ====================== 轮播图特效start =======================*/
	var num=-1;
	var clock;
	var n=1;
	displayImg();
	clock=setInterval('displayImg()',5000);  //clock=setInterval(displayImg,5000);也可以

	$('.banner>img').mouseover(function(){
		clearInterval(clock);
	}).mouseout(function(){
		clock=setInterval(displayImg,5000);
	});

	$('.direc').mouseover(function(){
		$(this).css('background','#77787A');
	}).mouseout(function(){
		$(this).css('background','transparent');
	});

	$('.direc-L').click(function(){
		n=-1;
		displayImg();
		n=1;
	});
	$('.direc-R').click(function(){
		n=1;
		displayImg();
	});

	$('.round li').mouseover(function(){
		$(this).css({background:'#fff',opacity:'0.6'});
	}).mouseout(function(){
		$(this).css({background:'#342416',opacity:'0.8'});
	}).click(function(){
		num=$(this).index()-1;
		displayImg();
	});

	function displayImg(){
		num=num+n;
		if(num>4){
			num=0;
		}else if(num<0){
			num=4;
		}
		$('.banner>img').fadeOut();
		$('.banner>img').eq(num).fadeIn();
		$('.round li').css({background:'#342416',opacity:'0.8'});
		$('.round li').eq(num).css({background:'#fff',opacity:'0.6'});
	}
	
	/* ====================== 轮播图特效end =======================*/

	/* ====================== 轮播图区域下方列表特效end =======================*/
		$('.miniLink li').mouseover(function(){
			$(this).find('a').css('color','#fff');
		}).mouseout(function(){
			$(this).find('a').css('color','#cfcdcb');
		});
	/* ====================== 轮播图区域下方列表特效end =======================*/

	/* ====================== 左边隐藏列表特效start =======================*/
		$('.navL li').mouseover(function(){
			$(this).css('background','#ff6700');
			$('.navHide').removeClass('hide');
			$('.ulHide').addClass('hide');
			$('.ulHide').eq($(this).index()).removeClass('hide');
		}).mouseout(function(){
			$(this).css('background','transparent');    //注意这里的颜色
		});
		
		$('.navL').mouseout(function(){
			$('.navHide').addClass('hide');
		});

		$('.ulHide').mouseover(function(){
			$('.navHide').removeClass('hide');
			$('.navL li').eq($(this).index()).css('background','#ff6700');
		}).mouseout(function(){
			$('.navHide').addClass('hide');
			$('.navL li').eq($(this).index()).css('background','transparent');
		});

		$('.ulHide li').mouseover(function(){
			$(this).find('p').css('color','#ff6700');
		}).mouseout(function(){
			$(this).find('p').css('color','#333333');
		});

		$('.buy').mouseover(function(){
			$(this).css({color:'#fff',background:'#ff6700'});
		}).mouseout(function(){
			$(this).css({color:'#ff6700',background:'#fff'});
		});

	/* ====================== 左边下拉列表特效用到的函数 =======================*/

	/* ====================== 明星单品特效start =======================*/
	var clockLR;
	$('.p').mouseover(function(){
		clearInterval(clockLR);
	}).mouseout(function(){
		clockLR=setInterval(autoLR,10000);
	});
	//向左翻页
		$('.prev').mouseover(function(){
			if($('.scroll').css('left')!='0px'){
				$(this).css({color:'#ff6700',cursor:'pointer'});
			}
		}).click(function(){
			// console.log($('.scroll').css('left'));
			if($('.scroll').css('left')!='0px'){
				$('.scroll').css('left','0px');
				$(this).css({color:'#dfdfe0',cursor:'default'});
				$('.next').css('color','#b0b4bc');
				// console.log($('.scroll').css('left'));
			}
		}).mouseout(function(){
			if($('.scroll').css('left')!='0px'){
				$(this).css('color','#b0b4bc');
			}else{
				$(this).css('color','#dfdfe0');
			}
		});
	
	//向右翻页
		$('.next').mouseover(function(){
			if($('.scroll').css('left')=='0px'){
				$(this).css({color:'#ff6700',cursor:'pointer'});
			}
		}).click(function(){
			if($('.scroll').css('left')=='0px'){
				$('.scroll').css('left','-100%');
				$(this).css({color:'#dfdfe0',cursor:'default'});
				$('.prev').css('color','#b0b4bc');
			// console.log($('.scroll').css('left'));
			}
		}).mouseout(function(){
			if($('.scroll').css('left')=='0px'){
				$(this).css('color','#b0b4bc');
			}else{
				$(this).css('color','#dfdfe0');
			}
		});

	//自动轮播
	clockLR=setInterval(autoLR,10000);

	function autoLR(){
		if($('.scroll').css('left')!='0px'){
			$('.scroll').css('left','0px');
		}else if($('.scroll').css('left')=='0px'){
			$('.scroll').css('left','-100%');
		}
	}

/* ====================== 主内容特效end =======================*/
/* ====================== 4各种产品列表start =======================*/
	/* ====================== 4.1 智能硬件特效start =======================*/
		$('.product1 li').mouseover(function(){
			$(this).css({marginTop:'12px',boxShadow:'0 0 28px #aaa'});
		}).mouseout(function(){
			$(this).css({marginTop:'14px',boxShadow:'none'});
		});

		$('.productYJ li').mouseover(function(){
			$(this).css({marginTop:'12px',boxShadow:'0 0 28px #aaa'});
		}).mouseout(function(){
			$(this).css({marginTop:'14px',boxShadow:'none'});
		});

		$('.toAll').mouseover(function(){
			$(this).find('a').css('color','#FF6700');
			$(this).find('i').css('color','#FF6700');
		}).mouseout(function(){
			$(this).find('a').css('color','#424242');
			$(this).find('i').css('color','#B0B0B0');
		});
		
	/* ====================== 其他分类左边公用特效 start =======================*/
		$('.productL li').mouseover(function(){
			if($(this).index()==0){
				$(this).css({marginTop:'12px',boxShadow:'0 0 28px #aaa'});
				$(this).next().css('marginTop','16px');
				// console.log($(this).next());
			}
			else{
				$(this).css({marginTop:'12px',boxShadow:'0 0 28px #aaa'});
			}
		}).mouseout(function(){
			if($(this).index()==0){
				$(this).css({marginTop:'14px',boxShadow:'0 0 28px #aaa'});
				$(this).next().css('marginTop','14px');
			}
			else{
				$(this).css({marginTop:'14px',boxShadow:'none'});
			}
		});
	/* ====================== 其他分类右边公用特效 start =======================*/
		$('.ProLi>li').mouseover(function(){
			// $(this).find('.slideDiv').removeClass('hide');   //显示隐藏的橙色评价栏
			$(this).find('.slideDiv').stop(true,false).slideDown('fast');
			if($(this).index()!=7){
				$(this).css({marginTop:'12px','box-shadow':'0px 0px 28px #aaa'});
			}
		}).mouseout(function(){
			// $(this).find('.slideDiv').addClass('hide');
			$(this).find('.slideDiv').stop(true,false).slideUp('fast');
			if($(this).index()!=7){
				$(this).css({marginTop:'14px','box-shadow':'none'});
			}
		});

		$('.twoRow li').mouseover(function(){
			if($(this).index()==0){
				$(this).css({marginTop:'12px',boxShadow:'0 0 28px #aaa'});
				$(this).next().css('marginTop','16px');
			}
			else{
				$(this).css({marginTop:'12px',boxShadow:'0 0 28px #aaa'});
			}
		}).mouseout(function(){
			if($(this).index()==0){
				$(this).css({marginTop:'14px',boxShadow:'0 0 28px #aaa'});
				$(this).next().css('marginTop','14px');
			}
			else{
				$(this).css({marginTop:'14px',boxShadow:'none'});
			}
		});
	/* ====================== 封装一个显示函数 =======================*/
	/**@intro  封装一个鼠标移入相应分类就显示相应产品的函数
	/* @param  obj1 指的是装下这些产品列表的ul
	/* @param  obj1的子对象 指的是装下这些产品列表的li
	/* @param  obj2 相应分类的那个li,当鼠标移到这个li上时，显示相应分类的产品
	*/
		function displayList(obj1,s1,obj2){
			obj1.find(s1).mouseover(function(){
				var a=$(this).index();
				obj1.find(s1).css({color:'#000',borderBottom:'none'});
				$(this).css({color:'#FF6700',borderBottom:'2px solid #FF6700'});
				obj2.addClass('hide');
				obj2.eq(a).removeClass('hide');
			});
			return;
		}
	/* ====================== 4.2 搭配  特效start =======================*/
		displayList($('.list41'),'li',$('.productR2>ul'));	
	/* ====================== 4.3 配件  特效start =======================*/
		displayList($('.list42'),'li',$('.productR3>ul'));
	/* ====================== 4.4 周边  特效end =======================*/
		displayList($('.list5'),'li',$('.productR4>ul'));
	/* ====================== 4.4 周边  特效end =======================*/

	/* ====================== 4.5 为你推荐  特效start =======================*/
	
	$('.scroll2 li').mouseover(function(){
		$(this).find('img').css('marginTop','48px');
	}).mouseout(function(){
		$(this).find('img').css('marginTop','50px');
	});

	//上一页
	$('.prev2').mouseover(function(){
		if($('.scroll2').css('left')!='0px'){
			$(this).css({color:'#ff6700',cursor:'pointer'});
		}else{$(this).css('color','#dfdfe0');}
	}).click(function(){
		if($('.scroll2').css('left')!='0px'){
			$('.scroll2').css('left',parseInt($('.scroll2').css('left'))+1226+'px');
			if($('.scroll2').css('left')!='-3678px'){
				$('.next2').css('color','#b0b4bc');
			}
			if($('.scroll2').css('left')=='0px'){
				$(this).css({color:'#dfdfe0',cursor:'default'});
			}
		}else{$(this).css('color','#dfdfe0');}
	}).mouseout(function(){
		if($('.scroll2').css('left')!='0px'){
			$(this).css('color','#b0b4bc');
		}else{
			$(this).css('color','#dfdfe0');
		}
	});

	//下一页
	$('.next2').mouseover(function(){
		if($('.scroll2').css('left')!='-3678px'){
			$(this).css({color:'#ff6700',cursor:'pointer'});
		}
	}).click(function(){
		if($('.scroll2').css('left')!='-3678px'){
			$('.scroll2').css('left',parseInt($('.scroll2').css('left'))-1226+'px');
			if($('.scroll2').css('left')!='0px'){
				$('.prev2').css('color','#b0b4bc');
			}
			if($('.scroll2').css('left')=='-3678px'){
				$(this).css({color:'#dfdfe0',cursor:'default'});
			}
			// console.log($('.scroll2').css('left'));
		}else{$(this).css('color','#dfdfe0');}
	}).mouseout(function(){
		if($('.scroll2').css('left')!='-3678px'){
			$(this).css('color','#b0b4bc');
		}else{
			$(this).css('color','#dfdfe0');
		}
	});
	/* ====================== 4.5 为你推荐  特效end =======================*/
	/* ====================== 4.6 热评产品  特效start=======================*/
	$('.hotList li').mouseover(function(){
		$(this).css({marginTop:'17px',boxShadow:'0 0 18px #aaa'});
	}).mouseout(function(){
		$(this).css({marginTop:'19px',boxShadow:'none'});
	});
	/* ====================== 4.6 热评产品  特效end =======================*/

	/* ====================== 4.7 内容  特效start=======================*/
	
	var num2=[0,0,0,0];    //用于记录每个模块当前的显示序号
	var index=0;
	//获取index
	$('.contList>li').mouseover(function(){
		index=$(this).index();			
		// console.log(index);
		$(this).find('.p2').css('opacity','1');
	}).mouseout(function(){
		$(this).find('.p2').css('opacity','0');
	});	
	//切换图标的显示和隐藏
	$('.p2').mouseover(function(){
			$(this).css('background','#757575');
		}).mouseout(function(){
			$(this).css('background','#b0b0b0');
		});
	//左翻页
		$('.l2').mouseover(function(){
			if(num2[index]>0){
				$(this).css('cursor','pointer');     //没出效果
			}else{
				$(this).css('cursor','default');
			}
		}).click(function(){
			if(num2[index]>0){
				num2.splice(index,1,num2[index]-1);
			}
			if(num2[index]==0){
				$(this).css('cursor','default');
			}
			showN($('.contBox'),num2);
		});
	//右翻页
		$('.r2').mouseover(function(){
			if(num2[index]<3){
				$(this).css('cursor','pointer');      //没出效果
			}else{
				$(this).css('cursor','default');
			}
		}).click(function(){
			if(num2[index]>=0&&num2[index]<3){
				num2.splice(index,1,num2[index]+1);
			}
			if(num2[index]==3){
				$(this).css('cursor','default');
			}
			// console.log(num2);
			showN($('.contBox'),num2);
		});
	//点击圆圈翻页
		$('.round2 p').mouseover(function(){
			if($(this).index()==num2[index]){
				$(this).css({border:'2px solid #ff6700', background:'#fff'});
			}else{
				$('.round2').eq(index).find('p').eq(num2[index]).css({border:'2px solid #ff6700', background:'#fff'});
				$(this).css({background:'#ff6700',cursor:' pointer'});
			}
		}).click(function(){
			num2[index]=$(this).index();
			showN($('.contBox'),num2);
			$('.round2').eq(index).find('p').css('background','#b0b0b0');
			$(this).css({border:'2px solid #ff6700', background:'#fff'});
		}).mouseout(function(){
			$('.round2').eq(index).find('p').css({background:'#b0b0b0',cursor:'default'});  //或者cursor:'auto'
			$('.round2').eq(index).find('p').eq(num2[index]).css({border:'2px solid #ff6700', background:'#fff'});
		});
	//每个模块的最后一张图的特效
		$('.goTo').mouseover(function(){
			$(this).css('background',$(this).css('color'));
			$(this).css('color','#fff');
		}).mouseout(function(){
			$(this).css('color',$(this).parent().css('color'));
			$(this).css('background','#fff');
		});
	//显示一张图片的函数
		function showN(obj,num2){
			obj.eq(index).find('li').hide();
			obj.eq(index).find('li').eq(num2[index]).show();
			$('.round2').eq(index).find('p').css({border:'2px solid #fff', background:'#b0b0b0'});
			$('.round2').eq(index).find('p').eq(num2[index]).css({border:'2px solid #ff6700', background:'#fff'});
		}
	/* ====================== 4.7 内容  特效end =======================*/
	/* ====================== 4.8 视频  特效start =======================*/
	$('.videoList li').mouseover(function(){
		$(this).css({marginTop:'12px',boxShadow:'0 0 18px #aaa'});
	}).mouseout(function(){
		$(this).css({marginTop:'14px',boxShadow:'none'});
	});
	
	$('h2 a').mouseover(function(){
		$(this).css('color','#ff6700');
	}).mouseout(function(){
		$(this).css('color','#212121');
	});
	$('.videoList li>img').mouseover(function(){
		$(this).next('.icon-bofang').css('color','#ff6700');
	}).mouseout(function(){
		$(this).next('.icon-bofang').css('color','#fff');
	});
	$('.icon-bofang').mouseover(function(){
		$(this).css('color','#ff6700');
	});
	/* ====================== 4.8 视频  特效end =======================*/
/* ====================== 5底部特效 start =======================*/
	$('.nav1 li').mouseover(function(){
		$(this).find('a').css('color','#ff6700');
	}).mouseout(function(){
		$(this).find('a').css('color','#616161');
	});

	$('.nav2 a').mouseover(function(){
		$(this).css('color','#ff6700');
	}).mouseout(function(){
		$(this).css('color','#757575');
	});

	$('#serv').mouseover(function(){
		$(this).css({background:'#ff6700',color:'#fff'});
	}).mouseout(function(){
		$(this).css({background:'#fff',color:'#ff6700'});
	});

	$('.staTxt a').mouseover(function(){
		$(this).css('color','#ff6700')
	}).mouseout(function(){
		$(this).css('color','#616161');
	});
/* ====================== 5底部特效 end =======================*/