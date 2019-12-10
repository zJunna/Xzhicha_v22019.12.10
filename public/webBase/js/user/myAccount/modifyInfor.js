$(function() {

	//点击绑定邮箱按钮
	$('#sr_bind_email_btn').click(function() {
		sr_bind_email()
	})
	//点击修改邮箱按钮   提交按钮
	$('#sr_email_btn').click(function() {
		sr_modify_email()
	})
	//点击绑定邮箱的发送验证码按钮
	$('#sr_get_bind_email').click(function() {
		var email_dress = $("#sr_email_dress").val(),
			email_dress_yes = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/; //邮箱
			//验证邮箱
			if(email_dress == '') {
				$('.tip_phone').html('请输入邮箱地址！')
				$('#sr_email_dress').css('border-color', '#E73637')
			} else
		if(!(email_dress_yes.test(email_dress))) {
			$('.tip_phone').html('请输入正确的邮箱地址！')
			$('#sr_email_dress').css('border-color', '#E73637')
		} else {
			$('.tip_phone').html('')
			$('#sr_email_dress').css('border-color', 'rgba(238, 238, 238, 1)')
			//执行发送验证码方法
			bind_get_email_yzm()
		}
	})
	//点击邮箱的获取验证码按钮   修改邮箱时
	$('#sr_get_email_code').click(function() {
		var email_dress_yes = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/, //邮箱
			sr_email_dress_original = $('#sr_email_dress_original').val(), //原来的邮箱
			sr_email_dress_now = $('#sr_email_dress_now').val(); //现有邮箱
		//验证原邮箱
		if(sr_email_dress_original == '') {
			$(".tip_phone_original").html('请输入邮箱地址！')
			$('#sr_email_dress_original').css('border-color', '#E73637')
		} else
		if(!(email_dress_yes.test(sr_email_dress_original))) {
			$('.tip_phone_original').html('请输入正确的邮箱地址！')
			$('#sr_email_dress_original').css('border-color', '#E73637')
		} else {
			$('.tip_phone_original').html('')
			$('#sr_email_dress_original').css('border-color', 'rgba(238, 238, 238, 1)')

			//验证现邮箱
			if(sr_email_dress_now == '') {
				$(".tip_phone_now").html('请输入邮箱地址！')
				$('#sr_email_dress_now').css('border-color', '#E73637')
			} else if(!(email_dress_yes.test(sr_email_dress_now))) {
				$('.tip_phone_now').html('请输入正确的邮箱地址！')
				$('#sr_email_dress_now').css('border-color', '#E73637')
			} else if(sr_email_dress_original == sr_email_dress_now) {
				$('.tip_phone_now').html('请输入与原来不一致的邮箱地址！')
				$('#sr_email_dress_now').css('border-color', '#E73637')
			} else {
				$('.tip_phone_now').html('')
				$('#sr_email_dress_now').css('border-color', 'rgba(238, 238, 238, 1)')
				//获取邮箱验证码方法
				get_email_yzm()
			}
		}

	})
	//绑定邮箱
	function sr_bind_email() {
		var email_dress = $("#sr_email_dress").val(),
			email_dress_yes = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/, //邮箱
			sr_code_input = $('#sr_code_input').val();
		//验证邮箱
		if(email_dress == '') {
			$('.tip_phone').html('请输入邮箱地址！')
			$('#sr_email_dress').css('border-color', '#E73637')
		} else if(!(email_dress_yes.test(email_dress))) {
			$('.tip_phone').html('请输入正确的邮箱地址！')
			$('#sr_email_dress').css('border-color', '#E73637')
		} else {
			$('.tip_phone').html('')
			$('#sr_email_dress').css('border-color', 'rgba(238, 238, 238, 1)')

			//验证验证码
			if(sr_code_input == '') {
				$('.tip_code').html('请输入验证码！')
				$('#sr_code_input').css('border-color', '#E73637')
			} else {
				//发送邮箱验证码
				bind_get_email_yzm()
			}
		}
	}
	//修改邮箱  判断
	function sr_modify_email() {
		var sr_email_dress_original = $('#sr_email_dress_original').val(),
			sr_email_dress_now = $('#sr_email_dress_now').val(),
			email_dress_yes = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/,
			sr_code_input_now = $('#sr_code_input_now').val()
		//验证原邮箱
		if(sr_email_dress_original == '') {
			$(".tip_phone_original").html('请输入邮箱地址！')
			$('#sr_email_dress_original').css('border-color', '#E73637')
		} else if(!(email_dress_yes.test(sr_email_dress_original))) {
			$('.tip_phone_original').html('请输入正确的邮箱地址！')
			$('#sr_email_dress_original').css('border-color', '#E73637')
		} else {
			$('.tip_phone_original').html('')
			$('#sr_email_dress_original').css('border-color', 'rgba(238, 238, 238, 1)')

			//验证现邮箱
			if(sr_email_dress_now == '') {
				$(".tip_phone_now").html('请输入邮箱地址！')
				$('#sr_email_dress_now').css('border-color', '#E73637')
			} else if(!(email_dress_yes.test(sr_email_dress_now))) {
				$('.tip_phone_now').html('请输入正确的邮箱地址！')
				$('#sr_email_dress_now').css('border-color', '#E73637')
			} else if(sr_email_dress_original == sr_email_dress_now) {
				$('.tip_phone_now').html('请输入与原来不一致的邮箱地址！')
				$('#sr_email_dress_now').css('border-color', '#E73637')
			} else {
				$('.tip_phone_now').html('')
				$('#sr_email_dress_now').css('border-color', 'rgba(238, 238, 238, 1)')
				if(sr_code_input_now == '') {
					$('.tip_code_now').html('请输入验证码！')
					$('#sr_code_input_now').css('border-color', '#E73637')
				} else {
					//执行确认验证码的方法
					emailCode()
				}
			}
		}
	}

	//修改手机号按钮弹窗
	$('#sr_subNum_btn').click(function() {
		sr_mobile_number()
	})
	//点击修改手机号弹窗的获取验证码弹窗
	$('#sr_phone_code_mobile').click(function() {
		var sr_old_number = $('#sr_old_number').val(), //原手机号
			sr_new_number = $('#sr_new_number').val(), //现手机号
			check_phone_no = /^1[3456789]\d{9}$/ //手机号码正则
		if(sr_old_number == '') {
			$('.tip_old_number').html('请输入手机号');
			$('#sr_old_number').css('border', '1px solid #E73637');
		} else
		if(!(check_phone_no.test(sr_old_number))) {
			$('.tip_old_number').html('请输入正确的手机号');
			$('#sr_old_number').css('border', '1px solid #E73637');
		} else if(sr_old_number != $('#get_Item').html()){
			$('.tip_old_number').html('请输入您的原手机号');
			$('#sr_old_number').css('border', '1px solid #E73637');
		}else {
			$('.tip_old_number').html('');
			$('#sr_old_number').css('border-color', '#EEEEEE');
			if(sr_new_number == '') {
				$('.tip_new_number').html('请输入手机号');
				$('#sr_new_number').css('border', '1px solid #E73637');
			} else if(!(check_phone_no.test(sr_old_number))) {
				$('.tip_new_number').html('请输入正确的手机号');
				$('#sr_new_number').css('border', '1px solid #E73637');
			} else {
				$('.tip_new_number').html('');
				$('#sr_new_number').css('border-color', '#EEEEEE');
				if(sr_new_number == sr_old_number) {
					$('.tip_new_number').html('请输入不一致的手机号');
					$('#sr_old_number').css('border', '1px solid #E73637');
					$('#sr_new_number').css('border-color', '#E73637');
				} else {
					$('.tip_new_number').html('');
					$('#sr_old_number').css('border', '1px solid #EEEEEE');
					$('#sr_new_number').css('border-color', '#EEEEEE');
					//发送修改手机中的手机验证码
					sr_send_phone()
				}
			}
		}
	})
	//修改手机号
	function sr_mobile_number() {
		var sr_old_number = $('#sr_old_number').val(), //原手机号
			sr_new_number = $('#sr_new_number').val(), //现手机号
			sr_code_input_number = $('#sr_code_input_number').val(), //获取验证码
			check_phone_no = /^1[3456789]\d{9}$/ //手机号码正则
		if(sr_old_number == '') {
			$('.tip_old_number').html('请输入手机号');
			$('#sr_old_number').css('border', '1px solid #E73637');
		} else
		if(!(check_phone_no.test(sr_old_number))) {
			$('.tip_old_number').html('请输入正确的手机号');
			$('#sr_old_number').css('border', '1px solid #E73637');
		} else {
			$('.tip_old_number').html('');
			$('#sr_old_number').css('border-color', '#EEEEEE');
			if(sr_new_number == '') {
				$('.tip_new_number').html('请输入手机号');
				$('#sr_new_number').css('border', '1px solid #E73637');
			} else if(!(check_phone_no.test(sr_old_number))) {
				$('.tip_new_number').html('请输入正确的手机号');
				$('#sr_new_number').css('border', '1px solid #E73637');
			} else {
				$('.tip_new_number').html('');
				$('#sr_new_number').css('border-color', '#EEEEEE');
				if(sr_new_number == sr_old_number) {
					$('.tip_new_number').html('请输入不一致的手机号');
					$('#sr_old_number').css('border', '1px solid #E73637');
					$('#sr_new_number').css('border-color', '#E73637');
				} else {
					$('.tip_new_number').html('');
					$('#sr_old_number').css('border', '1px solid #EEEEEE');
					$('#sr_new_number').css('border-color', '#EEEEEE');
					if(sr_code_input_number == '' || $('#sr_phone_code_mobile').html() == '获取验证码') {
						$('.tip_code_number').html('请输入验证码');
						$('#sr_code_input_number').css('border', '1px solid #E73637');
						return false;
					} else {
						//确认验证码
						sr_code_phone()
					}
				}
			}
		}
	}

	//发送邮箱验证码  修改邮箱
	function get_email_yzm() {
		var url = api + 'webAccount/webVerifyEmail';
		var data_form = {
			'email': $('#sr_email_dress_now').val()
		};
		$.ajax({
			url: url,
			type: "post",
			data: data_form,
			dataType: 'json',
			beforeSend: function() {},
			success: function(res) {
				// 隐藏 loading
				//console.log(res)
				//发送邮箱验证码成功
				if(res.err_code == 0) {
					layer.msg(res.msg);
					settime1();
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
	//确认邮箱验证码  修改邮箱
	function emailCode() {
		var url = api + 'webAccount/webVerifyEmailCode';
		var data_form = {
			'email': $('#sr_email_dress_now').val(),
			'emailCode': $('#sr_code_input_now').val()
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
				//console.log(res)
				//发送邮箱验证码成功
				if(res.err_code == 0) {
					sr_change_email();
				} else {
					$('.tip_code_pad').html('请填写正确的验证码！');
					$('#sr_code_input_now').css('border-color', '#E73637');
				}
			},
			error: function(res) {
				layer.alert(res.msg, {
					title: 'X职查'
				})
			}
		});
	}
	//发送邮箱验证码  绑定邮箱时
	function bind_get_email_yzm() {
		var url = api + 'webAccount/webVerifyEmail';
		var data_form = {
			'email': $('#sr_email_dress').val()
		};
		$.ajax({
			url: url,
			type: "post",
			data: data_form,
			dataType: 'json',
			beforeSend: function() {},
			success: function(res) {
				// 隐藏 loading
				//console.log(res)
				//发送邮箱验证码成功
				if(res.err_code == 0) {
					layer.msg(res.msg);
					settime1();
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
	//绑定邮箱时：确认邮箱验证码
	function bind_emailCode() {
		var url = api + 'webAccount/webVerifyEmailCode';
		var data_form = {
			'email': $('#sr_email_dress').val(),
			'emailCode': $('#sr_code_input').val()
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
				//console.log(res)
				//发送邮箱验证码成功
				if(res.err_code == 0) {
					sr_bind_email();
				} else {
					layer.alert(res.msg,{
						title:'X职查'
					})
					/*$('.tip_code_pad').html('请填写正确的验证码！');
					$('#sr_code_input_now').css('border-color', '#E73637');*/
				}
			},
			error: function(res) {
				layer.alert(res.msg, {
					title: 'X职查'
				})
			}
		});
	}
	//60s倒计时   发送邮箱验证码倒计时
	var countdown = 60;

	function settime1() {
		if(countdown == 0) {
			$('#sr_get_email_code,#sr_get_bind_email').removeAttr("disabled").html("获取验证码").css({
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
			$('#sr_get_email_code,#sr_get_bind_email').attr("disabled", true).html("重新发送(" + countdown + ")").css({
				'color': '#999999',
				'cursor': 'not-allowed',
				'background': '#EEEEEE'
			});
			countdown--;
		}
		setTimeout(function() {
			settime1()
		}, 1000)
	}
	//修改邮箱数据请求 成功之后 保存
	function sr_change_email() {
		var url = api + 'webAccount/saveWebEmails',
			data_form = {
				'user_id': user_id,
				'email': $('#sr_email_dress_now').val()
			}
		$.ajax({
			url: url,
			type: 'post',
			dataType: 'json',
			data: data_form,
			success: function(res) {
				//请输入邮箱
				//console.log(res)
				if(res.err_code == 0) {
					//设置邮箱成功之后
					layer.msg(res.msg);
					$('.person_info_con,.person_info_bg').css('display','none')
					$('.sr_email').html($('#sr_email_dress_now').html())
				} else {
					$('.tip_phone_now').html('设置邮箱失败')
					$('#sr_email_dress_now').css('border-color', '#E73637');
				}
			},
			error: function(res) {
				layer.alert('修改邮箱失败',{title:'X职查'})
			}
		})
	}
//绑定邮箱数据请求 成功之后 保存
	function sr_bind_email() {
		var url = api + 'webAccount/saveWebEmails',
			data_form = {
				'user_id': user_id,
				'email': $('#sr_email_dress').val()
			}
		$.ajax({
			url: url,
			type: 'post',
			dataType: 'json',
			data: data_form,
			success: function(res) {
				//请输入邮箱
				//console.log(res)
				if(res.err_code == 0) {
					//设置邮箱成功之后
					layer.msg(res.msg);
					$('.sr_email').html($('#sr_email_dress').val())
					window.location.reload();	
				} else {
					layer.alert(res.msg,{
						title:'X职查'
					})
					$('#sr_email_dress').css('border-color', '#E73637');
				}
			},
			error: function(res) {

			}
		})
	}
	//发送手机验证码
	function sr_send_phone() {
		var url = api + 'webAccount/verifyMobile',
			data_form = {
				'mobile': $('#sr_new_number').val()
			}
		$.ajax({
			url: url,
			type: 'post',
			dataType: 'json',
			data: data_form,
			success: function(res) {
				//console.log(res)
				if(res.err_code == 0) {
					sr_phone_settime()
				}else{
					layer.alert(res.msg,{
						title:'X职查'
					})
				}
			},
			error: function(res) {
				console.log('发送手机验证码失败')
			}
		})
	}
	//修改手机号  成功之后执行的方法
	function sr_mobile_phone() {
		var url = api + 'webAccount/saveWebPhones',
			data_form = {
				'user_id': user_id,
				'mobile': $('#sr_new_number').val()
			}
		$.ajax({
			url: url,
			type: 'post',
			dataType: 'json',
			data: data_form,
			success: function(res) {
				//console.log(res)
				if(res.err_code == 0) {
					/*alert('修改手机号成功')*/
					layer.msg(res.msg);
					$('.person_get_phone,#sr_set_number').css('display','none')
					$('#get_Item,#get_Item1').html($('#sr_new_number').html())
				}else{
					layer.alert(res.msg,{
						title:'X职查'
					})
				}
			},
			error: function(res) {
				console.log('发送手机验证码失败')
			}
		})
	}
	//验证手机验证码
	function sr_code_phone() {
		var url = api + 'webHome/verifySmsCodeForReg',
			data_form = {
				'mobile': $('#sr_new_number').val(),
				'smsCode': $('#sr_code_input_number').val()
			}
		$.ajax({
			url: url,
			data: data_form,
			type: 'post',
			dataType: 'json',
			success: function(res) {
				//console.log(res)
				if(res.err_code == 0) {
					//验证手机验证码成功之后执行修改手机号成功方法
					sr_mobile_phone()
				}else{
					layer.alert(res.msg,{
						title:'X职查'
					})
				}
			},
			error: function(res) {
				console.log(res)
			}
		})
	}
	//60s倒计时    修改手机号倒计时
	var countdown = 60;

	function sr_phone_settime() {
		if(countdown == 0) {
			$('#sr_phone_code_mobile').removeAttr("disabled").html("获取验证码").css({
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
			$('#sr_phone_code_mobile').attr("disabled", true).html("重新发送(" + countdown + ")").css({
				'color': '#999999',
				'cursor': 'not-allowed',
				'background': '#EEEEEE'
			});
			countdown--;
		}
		setTimeout(function() {
			sr_phone_settime()
		}, 1000)
	}
	
})