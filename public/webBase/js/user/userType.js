$(function(){
	layui.use(['form'], function() {})
	//个人用户
	$('.account_personal').click(function(){
		account_type(0);//0个人
	})
	//企业用户
	$('.account_company').click(function(){
		account_type(1);//1企业
	})
	
	//账户类型
	function account_type(type){
		var url = api + 'webHome/loginwebIdentity';
		var data_form = {
			'type':type,
			'identity_status':identity_status
		};
		console.log(data_form)
		var x_user_update = JSON.parse(localStorage.getItem('x_user')) || '';
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
					//更新身份状态
					x_user_update.identity_status = res.data.identity_status;
					localStorage.setItem('x_user',JSON.stringify(x_user_update));
					$(location).attr('href','index.html');
				}else{
					layer.alert(res.msg, {title: 'X职查'});
				}
			},
			error: function(res){
				layer.alert(res.msg, {title: 'X职查'});
			}
		});
	}
})
