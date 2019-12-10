$(function(){
	//引入公共部分
	$("#login_side").load("../templete/login_side.html");
	$("#login_logo").load("../templete/login_logo.html");
	
	//设置最外层div高度与宽度
	$('.account_part').css({'height': $(window).height(),'min-height': $('.account_l').height()})
	//外层div上下居中
	$('.container').css('padding-top',($(window).height() - $('.container').height())/2)
	
	//input获得焦点
	$('.input_del').on('input',function(e){
		//console.log(e.delegateTarget.value)
		if(e.delegateTarget.value == ''){
			$(this).next().css('display','none');
		}else{
			$(this).next().css('display','block');
		}
	})
	$('input').on('input',function(e){
		$(this).css('border-color','#eee')
	})
	
	//删除input的内容
	$('.input_cancel').click(function(){
		$(this).prev().val('');
		$(this).css('display','none');
	})
	
	//密码显示、隐藏
	$('.pwd_see').click(function(){
		if($(this).attr('src') == '../../../public/webBase/images/public/see_false.png'){
			$(this).attr('src','../../../public/webBase/images/public/see_true.png');
			$(this).prev().prev().attr('type','text');
		}else{
			$(this).attr('src','../../../public/webBase/images/public/see_false.png');
			$(this).prev().prev().attr('type','password');
		}
	})
	
})
