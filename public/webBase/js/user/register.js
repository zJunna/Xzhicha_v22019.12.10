$(function(){
	//获取手机验证码
	$('.get_phone_yzm').click(function(){
		var phone_no = $('#phone_no').val(),
			check_phone_no = /^1[3456789]\d{9}$/;//手机号码正则
		//手机号码验证
		if(phone_no == ''){
	    	$('.tip_phone').html('请输入手机号码！');
	    	$('#phone_no').css('border-color','#E73637');
	    }else if(!(check_phone_no.test(phone_no))){
	    	$('.tip_phone').html('请输入正确的手机号码！');
	    	$('#phone_no').css('border-color','#E73637');
	    }else{
	    	$('.tip_phone').html('');
	    	$('#phone_no').css('border-color','#eee');
	    	//获取手机验证码
	    	$('.get_phone_yzm').attr('disabled','disabled').css({'color': '#CCC','cursor': 'not-allowed'});
	    	get_phone_yzm();
	    }
	})
	
	//应用form表单
	layui.use(['form'], function() {
		var form = layui.form;
		//监听提交
		form.on('submit(register)', function(data) {
			//console.log(data.field.x_agreement)
			var phone_no = $('#phone_no').val(),
				pwd = $('#pwd').val(),
				phone_yzm = $('#phone_yzm').val(),
				check_phone_no = /^1[3456789]\d{9}$/,//手机号码正则
				check_pwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;//密码至少6位
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
		    //手机验证码
			if(phone_yzm == '' || $('.get_phone_yzm').html() == '获取验证码'){
				$('.tip_phone_yzm').html('请填写验证码！');
			    $('#phone_yzm').css('border-color','#E73637');
		    	return false;
			}else{
				$('.tip_phone_yzm').html('');
			}
		    //密码验证
		    if(pwd == ''){
		    	$('.tip_pwd').html('请输入密码！');
		    	$('#pwd').css('border-color','#E73637');
		    	return false;
		    }else if(!(check_pwd.test(pwd))){
		    	$('.tip_pwd').html('6-20位数字、英文（区分大小写）组合!');
		    	$('#pwd').css('border-color','#E73637');
		    	return false;
		    }else{
		    	$('.tip_pwd').html('');
		    }
			//同意打钩
			if(data.field.x_agreement != 'on'){
				layer.alert('请勾选《X职查平台使用协议》', {
					title: 'X职查'
				})
		    	return false;
			}else{
				//注册
			    is_smsCode();
			}
			return false;
		});
	});
	
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
	function get_phone_yzm(){
		var url = api + 'webHome/verifyMobile';
		var data_form = {
			'mobile':$('#phone_no').val()
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
			'mobile': $('#phone_no').val(),
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
					register_ajax();
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
	
	//注册
	function register_ajax(){
		var url = api + 'webHome/registering';
		var data_form = {
			'mobile': $('#phone_no').val(),
			'password': $('#pwd').val()
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
					$(location).attr('href','login.html');
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
