$(function(){
	layui.use(['form'], function() {})
	//免密登录
	$('.sub_pwd').click(function(){
		var new_pwd = $('#new_pwd').val(),
			pwd_confirm = $('#pwd_confirm').val(),
			check_pwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;//密码至少6位
		//密码验证
	    if(new_pwd == ''){
	    	$('.tip_pwd1').html('请输入密码！');
	    	$('#new_pwd').css('border-color','#E73637');
	    }else if(!(check_pwd.test(new_pwd))){
	    	$('.tip_pwd1').html('请输入6-20位数字、英文（区分大小写）组合!');
	    	$('#new_pwd').css('border-color','#E73637');
	    }else{
	    	$('.tip_pwd1').html('');
	    	if(pwd_confirm == ''){
	    		$('.tip_pwd2').html('请确认新密码！');
	    		$('#pwd_confirm').css('border-color','#E73637');
	    	}else if(pwd_confirm != new_pwd){
	    		$('.tip_pwd2').html('两次密码输入不一致！');
	    		$('#pwd_confirm').css('border-color','#E73637');
	    	}else{
	    		$('.tip_pwd2').html('');
	    		change_pwd();
	    	}
	    }
	})
	
	//确认新密码
	function change_pwd(){
		var url = api + 'webHome/savePasswords';
		var data_form = {
			'mobile': localStorage.getItem('forget_pwd_phone'),
			'password': $('#new_pwd').val()
		};
		console.log(data_form)
		$.ajax({
			url: url,
			type: "post",
			data: data_form,
			dataType: 'json',
			beforeSend: function () {},
			success: function(res){
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
