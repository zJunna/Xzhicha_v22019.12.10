$(function() {
	
	//点击密码设置
	$('.sr_bind_btn').click(function() {
		//在这修改
		sr_set_pad()
	})
	//密码设置
	function sr_set_pad() {
		var sr_login_number = $('#sr_login_number').val(), //获取手机号
			sr_login_pad = $('#sr_login_pad').val(), //获取密码
			sr_code_input = $('#sr_code_input').val(), //获取验证码
			check_phone_no = /^1[3456789]\d{9}$/, //手机号码正则
			check_pad_no = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/ //设置您的密码（6-16位字母数字组合）
		//验证手机号
		if(sr_login_number == '') {
			$('.tip_login_number').html('您登陆时的手机号')
			$('#sr_login_number').css('border-color', '#E73637')
		} else if(!(check_phone_no.test(sr_login_number))) {
			$('.tip_login_number').html('请输入正确的手机号')
			$('#sr_login_number').css('border-color', '#E73637')
		} else {
			$('.tip_login_number').html('')
			$('#sr_login_number').css('border-color', 'rgba(238, 238, 238, 1)')
			//验证密码格式    设置您的密码（6-16位字母数字组合）
			if(sr_login_pad == '') {
				$('.tip_login_pad').html('请输入密码')
				$('#sr_login_pad').css('border-color', '#E73637')
			} else if(!(check_pad_no.test(sr_login_pad))) {
				$('.tip_login_pad').html('请设置符合要求的密码')
				$('#sr_login_pad').css('border-color', '#E73637')
			} else {
				$('.tip_login_pad').html('')
				$('#sr_login_pad').css('border-color', 'rgba(238, 238, 238, 1)')
				if(sr_code_input == '' || $('.get_phone_yzm').html() == '获取验证码') {
					$('.tip_code_pad').html('请输入验证码！')
					$('#sr_code_input_pad').css('border-color', '#E73637')
				} else {
					$('.tip_code_pad').html('')
					$('#sr_code_input_pad').css('border-color', 'rgba(238, 238, 238, 1)')
					//确认验证码
					is_smsCode()
				}
			}
		}
	}
	//点击获取验证码按钮
	$('#sr_set_code').click(function() {
		var sr_login_number = $('#sr_login_number').val(), //获取登录的手机号
			check_phone_no = /^1[3456789]\d{9}$/; //手机号码正则
		if(sr_login_number == '') {
			$('.tip_login_number').html('您登陆时的手机号')
			$('#sr_login_number').css('border-color', '#E73637')
		} else if(!(check_phone_no.test(sr_login_number))) {
			$('.tip_login_number').html('请输入正确的手机号')
			$('#sr_login_number').css('border-color', '#E73637')
		} else {
			//获取手机验证码
			get_login_yzm()
		}
	})
	//发送手机验证码
	//获取修改密码的手机验证码
	function get_login_yzm() {
		var url = api + 'webAccount/verifyMobile';
		var data_form = {
			'mobile': $('#sr_login_number').val()
		};
		//console.log(data_form)
		$.ajax({
			url: url,
			type: "post",
			data: data_form,
			dataType: 'json',
			beforeSend: function() {},
			success: function(res) {
				// 隐藏 loading
			/*	console.log(res)*/
				if(res.err_code == 0) {
					layer.msg(res.msg);
					settime();
				} else {
					layer.alert(res.msg, {
						title: 'X职查'
					});
					$('.sr_get_code').removeAttr('disabled').css({
						'color': '#616CFF',
						'cursor': 'pointer'
					});
				}
			},
			error: function(res) {
				layer.alert(res.msg, {
					title: 'X职查'
				})
				$('.sr_get_code').removeAttr('disabled').css({
					'color': '#616CFF',
					'cursor': 'pointer'
				});
			}
		});
	}
	//验证手机验证码
	//确认验证码
	function is_smsCode() {
		var url = api + 'webHome/verifySmsCodeForReg';
		var data_form = {
			'mobile': $('#sr_login_number').val(),
			'smsCode': $('#sr_code_input_pad').val()
		};
		/*console.log(data_form)*/
		$.ajax({
			url: url,
			type: "post",
			data: data_form,
			dataType: 'json',
			beforeSend: function() {},
			success: function(res) {
				// 隐藏 loading
				/*console.log(res)*/
				if(res.err_code == 0) {
					sr_set_pad_success();
				} else {
					$('.tip_code_pad').html('请填写正确的验证码！');
					$('#sr_code_input_pad').css('border-color', '#E73637');
				}
			},
			error: function(res) {
				layer.alert(res.msg, {
					title: 'X职查'
				})
			}
		});
	}
	//60s倒计时
	var countdown = 60;

	function settime() {
		if(countdown == 0) {
			$('.sr_get_code').removeAttr("disabled").html("获取验证码").css({
				'color': '#FFFFFF',
				'cursor': 'pointer',
				'background': '#616CFF'
			});
			countdown = 60;
			return;
		} else {
			if(countdown < 10) {
				countdown = '0' + countdown;
			}
			$('#sr_set_code').attr("disabled", true).html("重新发送(" + countdown + ")").css({
				'color': '#999999',
				'cursor': 'not-allowed',
				'background': '#EEEEEE'
			});
			countdown--;
		}
		setTimeout(function() {
			settime()
		}, 1000)
	}
	//设置密码成功之后
	function sr_set_pad_success() {
		var url = api + 'webAccount/setWebPassword'
		data_form = {
			'user_id': user_id,
			'password': $('#sr_login_pad').val()
		}
		$.ajax({
			type: 'post',
			url: url,
			dataType: 'json',
			data: data_form,
			success: function(res) {
				/*console.log(res)*/
				if(res.err_code == 0){
					$('.tip_login_number').html('')
					$('#sr_login_number').css('border-color', 'rgba(238, 238, 238, 1)')
					window.location.reload();	
				}else{
					$('.tip_login_number').html('设置密码失败')
					$('#sr_login_number').css('border-color', '#E73637')
				}
				/*window.location.reload();*/
			},
			error: function(res) {
				console.log(res + '设置密码失败')
			}
		})
	}
	//点击修改密码弹窗
	$('.sr_change_btn').click(function() {
		sr_change_btn()
	})
	//修改密码
	function sr_change_btn() {
		var check_pad_no = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, //设置您的密码（6-16位字母数字组合）,
			sr_change_pad_old = $('#sr_change_pad_old').val(), //获取旧密码
			sr_change_pad_new = $('#sr_change_pad_new').val(), //获取新密码
			sr_sure_change_pad = $('#sr_sure_change_pad').val(); //确认密码
		//验证旧密码
		if(sr_change_pad_old == '') {
			$('.tip_change_pad_old').html('请输入您的原密码')
			$('#sr_change_pad_old').css('border-color', '#E73637')
		} else {
			$('.tip_change_pad_old').html('')
			$('#sr_change_pad_old').css('border-color', 'rgba(238, 238, 238, 1)')

			//验证新设置的密码
			if(sr_change_pad_new == '') {
				$('.tip_change_pad_new').html('请输入您的新密码')
				$('#sr_change_pad_new').css('border-color', '#E73637')
			} else if(!(check_pad_no.test(sr_change_pad_new))) {
				$('.tip_change_pad_new').html('您的密码格式不正确，请设置您的密码（6-16位字母数字组合）')
				$('#sr_change_pad_new').css('border-color', '#E73637')
			} else if(sr_change_pad_new == sr_change_pad_old) {
				$('.tip_change_pad_new').html('请输入与原密码不一致的密码')
				$('#sr_change_pad_new').css('border-color', '#E73637')
			} else {
				$('.tip_change_pad_new').html('')
				$('#sr_change_pad_new').css('border-color', 'rgba(238, 238, 238, 1)')

				//验证确认密码
				if(sr_sure_change_pad == '') {
					$('.tip_sure_change_pad').html('请输入确认密码')
					$('#sr_sure_change_pad').css('border-color', '#E73637')
				} else if(sr_sure_change_pad != sr_change_pad_new) {
					$('.tip_sure_change_pad').html('密码不一致')
					$('#sr_sure_change_pad').css('border-color', '#E73637')
				} else {
					sr_get_pad_success()
				}
			}
		}
	}
	
	//修改密码数据请求
	function sr_get_pad_success(){
		var url = api + 'webAccount/saveWebPassword',
		data_form = {
			'user_id':user_id,
			'originalPassword':$('#sr_change_pad_old').val(),//原密码
			'password':$('#sr_change_pad_new').val() // 现密码
		}
		$.ajax({
			url:url,
			data:data_form,
			type:'post',
			dataType:'json',
			success:function(res){
				/*console.log(res)*/
				if(res.err_code == 0){
					$('.tip_change_pad_old').html("")
					$('#sr_change_pad_old').css('border-color', 'rgba(238, 238, 238, 1)')
						window.location.reload();	
				}else{
					layer.alert(res.msg,{
						title:'X职查'
					})
					/*$('.tip_change_pad_old').html("对不起,您输入的原密码错误，请核对后再试！")
					$('#sr_change_pad_old').css('border-color', '#E73637')*/
				}
			},error:function(res){
				console.log('修改密码失败')
			}
		})
	}
})