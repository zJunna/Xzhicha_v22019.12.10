$(function(){
	layui.use(['form'], function() {})
	//验证码
	var verifyCode = new GVerify("get_yzm");
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
	    }else if(verifyCode.validate(yzm2)){
	    	$('.tip_yzm2').html('');
	    	//获取手机验证码
	    	$('.get_phone_yzm').attr('disabled','disabled').css({'color': '#CCC','cursor': 'not-allowed'});
	    	get_login_yzm();
	    }else{
	    	$('.tip_yzm2').html('请填写正确的验证码！');
	    	$('#yzm2').css('border-color','#E73637');
	    	return false;
	    }
	})
	
	//下一步
	$('.next_step').click(function(){
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
	    }else if(verifyCode.validate(yzm2)){
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
					localStorage.setItem('forget_pwd_phone',$('#phone_no2').val());
					$(location).attr('href','forgetPwd2.html');
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
	
	
})
