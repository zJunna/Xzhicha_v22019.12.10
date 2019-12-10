$(function() {
	//信封
	$('.sr_mail').mouseenter(function(){
		$('.mail').hide()
		$('.mail_hover').show()
	})
	$('.sr_mail').mouseleave(function(){
		$('.mail').show()
		$('.mail_hover').hide()
	})
	//用户
	$('.sr_personal_certification').mouseenter(function(){
		$('.personal_certification').hide()
		$('.personal_certification_hover').show()
	})
	$('.sr_personal_certification').mouseleave(function(){
		$('.personal_certification').show()
		$('.personal_certification_hover').hide()
	})
	//企业
	$('.sr_co_certification').mouseenter(function(){
		$('.co_certification').hide()
		$('.co_certification_hover').show()
	})
	$('.sr_co_certification').mouseleave(function(){
		$('.co_certification').show()
		$('.co_certification_hover').hide()
	})
	
	//判断图像
	$('.personal_portrait img,.head_portrait_img,.modify_photo img').attr('src', x_user.photo)

	//是否实名认证
//	get_real_name();
//点击切换账户
	$('#sr_switch_account').click(function(){
		var x_user_update = JSON.parse(localStorage.getItem('x_user')) || ''
		if(identity_status == 0){
			window.location.href = '../userAction/myAccount.html'
			x_user_update.identity_status = 1
			localStorage.setItem('x_user', JSON.stringify(x_user_update));
		}else{
			window.location.href = '../userAction/myAccount.html'
			x_user_update.identity_status = 0
			localStorage.setItem('x_user', JSON.stringify(x_user_update));
		}
	})
	if(email != '' && email != null){
		//图标显示
		$('.mail').attr('src','../../../public/webBase/images/user/mail_hover.png')
	}
	if(identity_status == 0) {
		if(authentication_status == 1 || authentication_status == 5 || authentication_status == 6 || authentication_status == 7){
			$('.personal_certification').attr('src','../../../public/webBase/images/user/personal_certification_hover.png')
		}
	}else{
		if(authentication_status == 2 || authentication_status == 7){
			$('.co_certification').attr('src','../../../public/webBase/images/user/co_certification_hover.png')
		}
	}
	
		//侧边栏
	//mouseover mouseleave
	//鼠标滑过
	$(".sidebar ul li").mouseover(function() {
		$(this).children("a").css("display", "block");
		$(this).children(".sid_img").css("display", "none")
		$(this).css("background", "#424242");

	})
	$(".sidebar ul li").mouseleave(function() {
		$(this).css("background", "rgba(102,102,102,1)");
		$(this).children(".sid_img").css("display", "block")
		$(this).children("a").css("display", "none");

	})

	//返回顶部
	$(".sidebar .back_top").click(function() {
		$("html,body").animate({
			scrollTop: 0
		}, 500);
	});
//下载
	$('.sidebar ul li').hover(function() {
		$(this).find('div').stop().animate({
			left: '-145px'
		})
		$(this).find('div').show();
	})
	//公众号
	$('.sidebar ul li').mouseleave(function() {
		$(this).find('div').stop().animate({
			left: '-100px'
		})
		$(this).find('div').hide();
	});

})