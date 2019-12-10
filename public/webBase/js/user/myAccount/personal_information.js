$(function() {
	/*$('#username').val(x_user.name)*/
	
	//验证修改个人信息
	$("#sr_save_and_modify").click(function() {
		sr_personal_infor()
		})
	//验证修改个人信息
	function sr_personal_infor() {
		//姓名不为空验证
		var username = $("#username").val(),//昵称
			select_nv = $('.sr_select_nv input').val(),//性别
			personName = $('#personName').val()//姓名
		if(username == '') {
			$('.tip_name').html('请输入昵称！');
			$('.sr_form_person #username').css('border', '1px solid #E73637');
		} else {
			$('.tip_name').html('');
			$('.sr_form_person #username').css('border', '0px solid #EEEEEE');
			//判断地址
			if(personName == ''){
				$('.tip_person_name').html('请输入地址！')
				$('#personName').css('border', '1px solid #E73637');
			}else{
				$('.tip_person_name').html('')
				$('#personName').css('border', '1px solid #EEEEEE');
				//选择性别
				if(select_nv == '') {
					$('.tip_gender').html('请选择性别！');
					$('.sr_select_nv input').css('border', '1px solid #E73637');
				} else {
					$('.tip_gender').html('');
					$('.sr_select_nv input').css('border', '1px solid #EEEEEE');
					//保存修改个人信息的弹窗
					sr_personal_information()
				}
			}
		}
	}
	//获取修改个人信息的弹窗 -- 数据请求
	function sr_personal_information() {
		var data_form = {
			'user_id': user_id,
			'name': $('#username').val(),
			'sex': $('.gender').val(),
			'address':$('#personName').val(),
			'photo': $('.person_photo_img img').attr('src')
		}
		//更新下缓存中的昵称 性别 城市
		var x_user_update = JSON.parse(localStorage.getItem('x_user')) || '';

		var url = api + 'webAccount/savePersonInfo'
		//console.log(url)
		$.ajax({
			type: "post",
			url: url,
			data: data_form,
			dataType: 'json',
			success: function(res) {
				//console.log(res)
				if(res.err_code == 0) {
					//更新缓存
					x_user_update.name = $('#username').val()
					x_user_update.sex = res.data.sex
					x_user_update.address = res.data.address
					x_user_update.photo = $('.person_photo_img img').attr('src')
					localStorage.setItem('x_user', JSON.stringify(x_user_update));
					window.location.reload();
				}else{
					layer.alert(res.msg,{
						title:'X职查'
					})
				}
			},
			error: function(res) {
				console.log('修改个人信息失败')
			}
		});
	}

	//验证修改企业信息
	$('#sr_save_con').click(function() {
		sr_modify_con()
	})

	//修改企业信息
	function sr_modify_con() {
		//企业名称不为空验证
		var conName = $("#conName").val(), //昵称
			creditCode = $('#creditCode').val() //手机号
			companyName = $('#campanyName').val(), //公司名称
			check_phone_no = /^1[3456789]\d{9}$/ //手机号码正则
			//判断昵称
		if(conName == '') {
			$('.tip_name').html('请输入昵称！');
			$('.sr_form_person #conName').css('border', '1px solid #E73637');
		} else {
			$('.tip_name').html('');
			$('.sr_form_person #conName').css('border', '1px solid #EEEEEE');
		//判断公司名称
			if(companyName == ''){
				$('.tip_company_name').html('请输入公司名称！')
				$('#campanyName').css('border', '1px solid #E73637');
			}else{
				$('.tip_company_name').html('')
				$('#campanyName').css('border', '1px solid #EEEEEE');
				//判断联系电话
				if(creditCode == '') {
					$('.tip_gender').html('请输入联系电话！');
					$('.sr_form_person #creditCode').css('border', '1px solid #E73637');
				}else if(!check_phone_no.test(creditCode)) {
					$('.tip_gender').html('请输入正确的联系电话！');
					$('.sr_form_person #creditCode').css('border', '1px solid #E73637');
				}else {
					$('.tip_gender').html('');
					$('.sr_form_person #creditCode').css('border', '1px solid #EEEEEE');
					//修改企业成功之后 进行数据请求
					sr_save_company()
				}
			}
		}
		
		$('.sr_waiver,.person_close img').click(function() {
			$('.person_big_bg,.person_info_bg').css("display", 'none')
		})
	}
	//修改企业成功之后 进行数据请求
	function sr_save_company() {
		var url = api + 'webAccount/saveComInfo',
			data_form = {
				'user_id': user_id,
				 'name':$('#conName').val(),  //昵称
				 'office_telephone':$('#creditCode').val(),  //联系电话
				 'company_address':$('#campanyName').val(),  //公司地址
				 'photo': $('.person_photo_img img').attr('src')
			},
		x_user_update = JSON.parse(localStorage.getItem('x_user')) || '';
		$.ajax({
			url: url,
			data: data_form,
			type: 'post',
			dataType: 'json',
			success: function(res) {
				//console.log(res)
				if(res.err_code == 0) {
					//更新缓存
					x_user_update.name = $('#conName').val()
					x_user_update.office_telephone = creditCode
					x_user_update.company_address = res.data.company_address
					x_user_update.photo = $('.person_photo_img img').attr('src')
					localStorage.setItem('x_user', JSON.stringify(x_user_update));
					window.location.reload();
				}else{
					layer.alert(res.msg,{
						title:'X职查'
					})
				}
			},
			error: function(res) {
				console.log('修改企业信息失败')
			}
		})
	}
})