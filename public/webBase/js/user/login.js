$(function(){
	var tab_index = 0;
	//选项卡
	//注意：选项卡 依赖 element 模块，否则无法进行功能性操作
	layui.use('element', function(){
		var element = layui.element;
		element.on('tab(demo)', function(data){
			tab_index = data.index;
		})
	});
	layui.use(['form'], function() {
		
	})
	
	//回车
	$(document).keypress(function(e){
		if(e.keyCode == 13){
			if(tab_index == 0){
				$('.sub_login').click()
			}else{
				$('.phone_login').click()
			}
		}
	})
	
	//验证码
	var verifyCode1 = new GVerify("get_yzm1");
	var verifyCode2 = new GVerify2("get_yzm2");
	
	//选项卡1——账号登录
	//账号密码登录提交
	$('.sub_login').click(function(){
		var phone_no = $('#phone_no').val(),
			pwd = $('#pwd').val(),
			yzm = $('#yzm').val(),
			check_phone_no = /^1[3456789]\d{9}$/;//手机号码正则
		//手机号码验证
		if(phone_no == ''){
	    	$('.tip_phone').html('请输入手机号码！');
	    	$('#phone_no').css('border-color','#E73637');
	    	return false;
	    }else if(!(check_phone_no.test(phone_no))){
	    	$('.tip_phone').html('请输入正确的手机号码！');
	    	$('#phone_no').css('border-color','#E73637');
	    	return false;
	    }else{
	    	$('.tip_phone').html('');
	    }
	    //密码验证
	    if(pwd == ''){
	    	$('.tip_pwd').html('请输入密码！');
	    	$('#pwd').css('border-color','#E73637');
	    	return false;
	    }else{
	    	$('.tip_pwd').html('');
	    }
	    //验证码验证
	    if(yzm == ''){
	    	$('.tip_yzm').html('请填写验证码！');
	    	$('#yzm').css('border-color','#E73637');
	    	return false;
	    }else if(verifyCode1.validate(yzm)){
	    	$('.tip_yzm').html('');
	    }else{
	    	$('.tip_yzm').html('请填写正确的验证码！');
	    	$('#yzm').css('border-color','#E73637');
	    	return false;
	    }
	    sub_login();
	})
	
	//选项卡2——账号登录
	//获取手机验证码
	$('.get_phone_yzm').click(function(){
		var phone_no2 = $('#phone_no2').val(),
			yzm2 = $('#yzm2').val(),
			phone_yzm = $('#phone_yzm').val(),
			check_phone_no = /^1[3456789]\d{9}$/;//手机号码正则
		//手机号码验证
		if(phone_no2 == ''){
	    	$('.tip_phone2').html('请输入手机号码！');
	    	$('#phone_no2').css('border-color','#E73637');
	    }else if(!(check_phone_no.test(phone_no2))){
	    	$('.tip_phone2').html('请输入正确的手机号码！');
	    	$('#phone_no2').css('border-color','#E73637');
	    }else{
	    	$('.tip_phone2').html('');
	    	//验证码验证
		    if(yzm2 == ''){
		    	$('.tip_yzm2').html('请填写验证码！');
		    	$('#yzm2').css('border-color','#E73637');
		    }else if(verifyCode2.validate(yzm2)){
		    	$('.tip_yzm2').html('');
		    	//获取手机验证码
		    	$('.get_phone_yzm').attr('disabled','disabled').css({'color': '#CCC','cursor': 'not-allowed'});
		    	get_login_yzm();
		    }else{
		    	$('.tip_yzm2').html('请填写正确的验证码！');
		    	$('#yzm2').css('border-color','#E73637');
		    }
	    }
	})
	
	//免密登录
	$('.phone_login').click(function(){
		var phone_no2 = $('#phone_no2').val(),
			yzm2 = $('#yzm2').val(),
			phone_yzm = $('#phone_yzm').val(),
			check_phone_no = /^1[3456789]\d{9}$/;//手机号码正则
			
		//手机号码验证
		if(phone_no2 == ''){
	    	$('.tip_phone2').html('请输入手机号码！');
	    	$('#phone_no2').css('border-color','#E73637');
	    	return false;
	    }else if(!(check_phone_no.test(phone_no2))){
	    	$('.tip_phone2').html('请输入正确的手机号码！');
	    	$('#phone_no2').css('border-color','#E73637');
	    	return false;
	    }else{
	    	$('.tip_phone2').html('');
	    }
	    //验证码验证
	    if(yzm2 == ''){
	    	$('.tip_yzm2').html('请填写验证码！');
	    	$('#yzm2').css('border-color','#E73637');
	    	return false;
	    }else if(verifyCode2.validate(yzm2)){
	    	$('.tip_yzm2').html('');
	    }else{
	    	$('.tip_yzm2').html('请填写正确的验证码！');
	    	$('#yzm2').css('border-color','#E73637');
	    	return false;
	    }
		//判断验证码是否填写
		if(phone_yzm == '' || $('.get_phone_yzm').html() == '获取验证码'){
			$('.tip_phone_yzm').html('请填写正确的验证码！');
		    $('#phone_yzm').css('border-color','#E73637');
		    return false;
		}
		//确认验证码
		is_smsCode();
	})
	
	//60s倒计时
	var countdown = 60;
	function settime() {
	    if (countdown == 0) {
	    	$('.get_phone_yzm').removeAttr("disabled").html("免费获取验证码").css({'color': '#616CFF','cursor': 'pointer'});
	        countdown = 60;
	        return;
	    } else {
	    	if(countdown < 10){
	    		countdown = '0' + countdown;
	    	}
	    	$('.get_phone_yzm').attr("disabled", true).html("重新发送(" + countdown + ")").css({'color': '#CCC','cursor': 'not-allowed'});
	        countdown--;
	    }
		setTimeout(function() {
		    settime()
		},1000)
	}
	
	//登录1
	function sub_login(){
		var url = api + 'webHome/loginMobile';
		var data_form = {
			'name':$('#phone_no').val(),
			'password':$('#pwd').val()
		};
		console.log(data_form)
		$.ajax({
			url: url,
			type: "post",
			data: data_form,
			dataType: 'json',
			beforeSend: function(){},
			success: function(res){
				// 隐藏 loading
				console.log(res)
				if(res.err_code == 0){
					layer.msg(res.msg);
					res.data.user.realityName = '';
					res.data.user.idNumber = '';
					localStorage.setItem('x_user',JSON.stringify(res.data.user));
					$(location).attr('href','userType.html');
				}else{
					layer.alert(res.msg, {title: 'X职查'});
				}
			},
			error: function(res){
				layer.alert(res.msg, {title: 'X职查'})
			}
		});
	}
	
	//获取手机验证码
	function get_login_yzm(){
		var url = api + 'webHome/verifyLoginMobile';
		var data_form = {
			'mobile':$('#phone_no2').val()
		};
		console.log(data_form)
		$.ajax({
			url: url,
			type: "post",
			data: data_form,
			dataType: 'json',
			beforeSend: function(){},
			success: function(res){
				// 隐藏 loading
				console.log(res)
				if(res.err_code == 0){
					layer.msg(res.msg);
					settime();
				}else{
					layer.alert(res.msg, {title: 'X职查'});
					$('.get_phone_yzm').removeAttr('disabled').css({'color': '#616CFF','cursor': 'pointer'});
				}
			},
			error: function(res){
				layer.alert(res.msg, {title: 'X职查'})
				$('.get_phone_yzm').removeAttr('disabled').css({'color': '#616CFF','cursor': 'pointer'});
			}
		});
	}
	
	//确认验证码
	function is_smsCode(){
		var url = api + 'webHome/verifySmsCodeForReg';
		var data_form = {
			'mobile': $('#phone_no2').val(),
			'smsCode': $('#phone_yzm').val()
		};
		console.log(data_form)
		$.ajax({
			url: url,
			type: "post",
			data: data_form,
			dataType: 'json',
			beforeSend: function () {},
			success: function(res){
				// 隐藏 loading
				console.log(res)
				if(res.err_code == 0){
					phone_yzm_login();
				}else{
					$('.tip_phone_yzm').html('请填写正确的验证码！');
			    	$('#phone_yzm').css('border-color','#E73637');
				}
			},
			error: function(res){
				layer.alert(res.msg, {title: 'X职查'})
			}
		});
	}
	
	//手机验证码登录
	function phone_yzm_login(){
		var url = api + 'webHome/loginMobileByCode';
		var data_form = {
			'mobile': $('#phone_no2').val()
		};
		console.log(data_form)
		$.ajax({
			url: url,
			type: "post",
			data: data_form,
			dataType: 'json',
			beforeSend: function () {},
			success: function(res){
				// 隐藏 loading
				console.log(res)
				if(res.err_code == 0){
					layer.msg(res.msg);
					res.data.user.realityName = '';
					res.data.user.idNumber = '';
					localStorage.setItem('x_user',JSON.stringify(res.data.user));
					$(location).attr('href','userType.html');
				}else{
					layer.alert(res.msg, {title: 'X职查'})
				}
			},
			error: function(res){
				layer.alert(res.msg, {title: 'X职查'})
			}
		});
	}
})
