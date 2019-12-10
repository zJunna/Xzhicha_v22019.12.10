$(function() {
	$('#sr_switch_account').click(function(){
		$('.account_choice_li').eq(1).click()
	})
	layui.use('element', function() {
		var element = layui.element;

	//点击叉号关闭
	$('.person_big_bg_con,.sr_waiver,.person_close img,.person_big_bg,.person_set_pad_bg,.person_get_pad_bg,.sr_set_email,.sr_get_email,.person_get_phone').click(function() {
		$('.person_big_bg_con,.sr_enterprise_infor,#sr_person_infor,.person_big_bg,.person_set_pad_bg,#sr_set_pad,.person_get_pad_bg,#sr_change_pad,.sr_set_email,#sr_bind_email,.sr_get_email,#sr_change_email,.person_get_phone,#sr_set_number').css("display", "none")
	})
	//判断是企业还是个人用户   之后判断认证状态
	if(identity_status == 0) {
		if(authentication_status == 0 || authentication_status == 2 || authentication_status == 3 || authentication_status == 4) {
			$('#authentication-btn').html('去认证');
			$('#authentication-btn').click(function(){
				window.location.href = "../userAction/realName.html"
			})
			if($('.modify_photo_tip a').html() == '前往认证'){
				$('.modify_photo_tip a').click(function(){
				window.location.href = "../userAction/realName.html"
			})
			}
			$('.authentication-tip').html('实名认证后，您将成为X职查认证用户，享有更多特权')
			$('#authentication-btn').addClass("layui-btn-primary width_120")
				.removeClass("gray_btn layui-btn-disabled")
		} else if(authentication_status == 1 || authentication_status == 5 || authentication_status == 6 || authentication_status == 7) {
			$('#authentication-btn').html('已实名个人')
			$('.authentication-tip').html('个人实名认证用户，您将享有更多特权')
			$('#authentication-btn').addClass("gray_btn layui-btn-disabled gray_btn_120")
				.removeClass("layui-btn-primary border_orange")
		}
	} else {
		if(authentication_status == 0 || authentication_status == 1) {
			$('#authentication-btn').html('去认证');
			$('#authentication-btn').click(function(){
				window.location.href = "../userAction/realName.html"
			})
			$('.authentication-tip').html('实名认证后，您将成为X职查认证用户，享有更多特权')
			$('#authentication-btn').addClass("layui-btn-primary width_120")
				.removeClass("gray_btn layui-btn-disabled")
		} else if(authentication_status == 2 || authentication_status == 7) {
			$('#authentication-btn').html('已实名企业');
			$('.authentication-tip').html('企业实名认证账户，您将享有更多特权')
			$('#authentication-btn').addClass("gray_btn layui-btn-disabled gray_btn_120")
				.removeClass("layui-btn-primary border_orange")
		} else if(authentication_status == 3 || authentication_status == 5) {
			$('#authentication-btn').html('正在审核中');
			$('.authentication-tip').html('企业实名认证后，您将成为X职查认证用户，享有更多企业特权')
			$('#authentication-btn').addClass("border_orange layui-btn-primary layui-btn-disabled")
				.removeClass("gray_btn")
		} else if(authentication_status == 4 || authentication_status == 6) {
			$('#authentication-btn').html('认证失败');
			$('.authentication-tip').html('企业认证审核失败，请修改资料后重新提交审核')
			$('#authentication-btn').addClass("border_red layui-btn-primary width_120")
				.removeClass("gray_btn layui-btn-disabled")
			$('#authentication-btn').mouseenter(function() {
				$(this).text('重新认证')
				$('#authentication-btn').click(function(){
					window.location.href = "../userAction/realName.html"
				})
			})
			$('#authentication-btn').mouseleave(function() {
				$(this).text('认证失败')
			})
		}
	}
	//认证状态
	$('#authentication_status').html($("#authentication-btn").text());
	//是否实名认证
//	get_real_name();

	function get_real_name() {
		var url = api + 'webAccount/getPerRealName';
		var data_form = {
			'user_id': user_id
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
				if(res.err_code == 0) {
					idNumber = res.data.idNumber;
					realityName = res.data.realityName;
					//判断账户中心显示的名称
					if(realityName == '') {
						$(".account_name").html('未实名')
						$('.ger_name').html('未实名')
						$('.region,.modify_photo_tip a').html('前往认证')
							.css('color', 'rgba(97,108,255,1)')
						$('.sr_account_zh').html('去实名认证')
					} else {
						$(".account_name").html(realityName)
						$('.ger_name').html(realityName)
					}
				}else{
					layer.alert(res.msg,{
						title:'X职查'
					})
				}
			},
			error: function(res) {}
		});
	}
	
	//点击出现修改个人信息or企业信息

	if(identity_status == 0) {
		$('.modify_photo_tip a').removeAttr('href', "javascript:;")
		if($('#authentication_status').html() == '去认证') {
			$('.modify_photo_tip a').html('前往认证')
			$('.modify_photo_tip a').click(function(){
				window.location.href = "../userAction/realName.html"
			})
		} else {

			if($('.modify_photo_tip a').html() == '修改个人信息') {
				$('.modify_photo_tip a').click(function() {
					//修改头像
					var modify_photo = $('.modify_photo img').attr('src')
					$('.person_photo_img img').attr('src', modify_photo)
					$('.person_big_bg,.sr_person_infor,.sr_individuals_infor,.sr_enterprise_infor').css('display', "block")
				})
			} else {
				$('.modify_photo_tip a').attr('href', 'realName.html')
			}
		}
	} else {
		$('.modify_photo_tip a').removeAttr('href')
		if($('#authentication_status').html() == '去认证') {
			$('.modify_photo_tip a').html('前往认证')
			$('.modify_photo_tip a').click(function(){
				window.location.href = "../userAction/realName.html"
			})
		} else {
			if($('.modify_photo_tip a').html() == '修改企业信息') {
				$('.modify_photo_tip a').click(function() {
					//修改头像
					var modify_photo = $('.modify_photo img').attr('src')
					$('.person_photo_img img').attr('src', modify_photo)
					$('.person_big_bg_con,.sr_person_infor,.sr_individuals_infor,.sr_enterprise_infor').css('display', "block")
				})
			} else {
				$('.modify_photo_tip a').attr('href', 'realNameCo.html')
			}
		}
	}

	//弹窗  邮箱的绑定  邮箱的更换
	$('.sr_email_gh').click(function() {
		var sr_email_bind_or_change = $('.sr_email_gh').html()
		if(sr_email_bind_or_change == '绑定') {
			$('.sr_set_email,#sr_bind_email').css("display", "block")
			$('#sr_change_email').css("display", "none")
		} else {
			$('.sr_get_email,#sr_change_email').css("display", "block")
			$('#sr_bind_email').css("display", "none")
		}
	})

	//弹窗  密码 的设置 or 修改
	$('#sr_set_up').click(function() {
		var sr_set_up = $('#sr_set_up').html()
		if(sr_set_up == '设置') {
			$('.person_set_pad_bg,#sr_set_pad').css('display', 'block')
			$('.person_get_pad_bg,#sr_change_pad').css('display', 'none')
		} else {
			$('.person_get_pad_bg,#sr_change_pad').css('display', 'block')
			$('#sr_set_pad,.person_set_pad_bg').css('display', 'none')
		}
	})
	//修改手机号弹窗.sr_subNum_btn
	$('#sr_change_number').on('click', function() {
		$('.person_get_phone,#sr_set_number').css('display', 'block')
	})
	$('.person_get_phone').on('click', function() {
		$('.person_get_phone').css('display', 'none')
	})
	
	//调用修改个人信息的验证函数
		sr_userCenter()
	//获取省市 邮箱 数据请求
	function sr_userCenter() {
		var x_user_update = JSON.parse(localStorage.getItem('x_user')) || '',
		 url = api + 'webAccount/home',
		 data_form = {
			'id': user_id
		}
		$.ajax({
			type: 'post',
			url: url,
			data: data_form,
			dataType: 'json',
			success: function(res) {
				//console.log(res)
				var email = res.data.users.email, //邮箱
					sex = res.data.users.sex, //性别
					phone = res.data.users.mobile, //手机号
					name = res.data.users.name, //个人名称
					address = res.data.users.address, //地址
					reality_name = res.data.users.reality_name, //个人的真实姓名
					company_name = res.data.users.company_name, //企业姓名
					company_address = res.data.users.company_address, //企业地址
					office_telephone = res.data.users.office_telephone, //获取手机号
					password = res.data.users.password; //密码
				//个人
				$('#username').val(name)
				$('#personName').val(address)
				//表单赋值
				layui.use(['form'], function() {
					var form = layui.form;
					//表单赋值
					form.val('example', {
						"gender": sex
					});
				});
				//企业
				$('#campanyName').val(company_address)
				$('#creditCode').val(office_telephone)
				//判断密码
				if(password == '' || password == null) {
					$('#sr_set_up').html('设置')
					$('.sr_pad_tip').html('密码要求至少包含字母，符号或数字中的两项且长度为6-16位')
				} else {
					$('#sr_set_up').html('更换')
					$('.sr_pad_tip').html('密码已设置')
				}
				//判断个人手机号
				if(phone == null || phone == '') {
					$('#get_Item,#get_Item1').html('未绑定')
					$('#hr_mobile,#hr_mobile1').html('未绑定')
				} else {
					$('#get_Item,#get_Item1').html(phone)
					$('#hr_mobile,#hr_mobile1').html(phone)
				}
				//判断邮箱
				//判断email
				if(email == null ) {
					$('.sr_email,.sr_email_unbind').html('未绑定')
					$('.sr_email_color').css("color", "#999999")
					$('.sr_email_gh').html('绑定')
					$('.sr_email_kong').html('')
				} else {
					$('.sr_email').html(email)
						//更新缓存
					x_user_update.email = email
					localStorage.setItem('x_user', JSON.stringify(x_user_update));
				}
				//判断企业办公电话
				if(office_telephone == null || office_telephone == '') {
					$('#creditCode').val(office_telephone)
				} else {
					$('#creditCode').val(office_telephone)
				}
				if(identity_status == 0) { //个人
					//判断姓名
					$('.account_name,.ger_name').html(name)
					//判断性别
					if(sex == 0) {
						$('#sr_sex').html('男')
					} else if(sex == 1) {
						$('#sr_sex').html('女')
					} else {
						$('#sr_sex').html('')
					}
				} else { //企业名称
					if(name == '' || name == null) {
						$('.account_name,.ger_name').html('未实名')
					} else {
						$('.account_name,.ger_name').html(name)
						//赋值
						$('#conName').val(name)
						//更新缓存
						x_user_update.name = name
						localStorage.setItem('x_user', JSON.stringify(x_user_update));
					}
				}
				//判断左侧资料完整度
				//个人都不为空
				var one = (name != null) && (sex != null) && (address != null) && (email !=null) && (authentication_status == 1 || authentication_status == 5 || authentication_status == 6 || authentication_status == 7),
					//一个个为空
					two1 = (name == null ) && (sex != null ) && (address != null ) && (email !=null  ) && (authentication_status == 1 || authentication_status == 5 || authentication_status == 6 || authentication_status == 7),
					two2 = (name != null ) && (sex == null ) && (address != null ) && (email !=null  ) && (authentication_status == 1 || authentication_status == 5 || authentication_status == 6 || authentication_status == 7),
					two3 = (name != null) && (sex != null ) && (address == null  ) && (email !=null  ) && (authentication_status == 1 || authentication_status == 5 || authentication_status == 6 || authentication_status == 7),
					two4 = (name != null) && (sex != null ) && (address != null ) && (email !=null  ) && (authentication_status == 1 || authentication_status == 5 || authentication_status == 6 || authentication_status == 7),
					two5 = (name != null) && (sex != null ) && (address != null ) && (email ==null ) && (authentication_status == 1 || authentication_status == 5 || authentication_status == 6 || authentication_status == 7),
					two6 = (name != null) && (sex != null ) && (address != null ) && (email !=null  ) && (authentication_status != 1 && authentication_status != 5 && authentication_status != 6 && authentication_status != 7),
					//两个为空 
					three1 = (name == null ) && (sex == null ) && (address != null ) && (email !=null  ) && (authentication_status == 1 || authentication_status == 5 || authentication_status == 6 || authentication_status == 7),
					three2 = (name == null ) && (sex != null ) && (address == null  ) && (email !=null  ) && (authentication_status == 1 || authentication_status == 5 || authentication_status == 6 || authentication_status == 7),
					three3 = (name == null ) && (sex != null ) && (address == null  ) && (email ==null ) && (authentication_status == 1 || authentication_status == 5 || authentication_status == 6 || authentication_status == 7),
					three4 = (name == null ) && (sex != null ) && (address != null  ) && (email !=null  ) && (authentication_status != 1 && authentication_status != 5 && authentication_status != 6 && authentication_status != 7),
					
					three5 = (name != null) && (sex == null ) && (address == null  ) && (email !=null  ) && (authentication_status == 1 || authentication_status == 5 || authentication_status == 6 || authentication_status == 7),
					three6 = (name != null) && (sex == null ) && (address != null ) && (email ==null  ) && (authentication_status == 1 || authentication_status == 5 || authentication_status == 6 || authentication_status == 7),
					three7 = (name != null) && (sex == null ) && (address != null ) && (email !=null  ) && (authentication_status != 1 && authentication_status != 5 && authentication_status != 6 && authentication_status != 7),

					three8 = (name != null) && (sex != null ) && (address == null  ) && (email ==null ) && (authentication_status == 1 || authentication_status == 5 || authentication_status == 6 || authentication_status == 7),
					three9 = (name != null) && (sex != null ) && (address == null  ) && (email !=null  ) && (authentication_status != 1 && authentication_status != 5 && authentication_status != 6 && authentication_status != 7),
					
					three10 = (name != null ) && (sex != null ) && (address != null ) && (email ==null ) && (authentication_status != 1 && authentication_status != 5 && authentication_status != 6 && authentication_status != 7),
					
					//三个为空
					four1 = (name == null ) && (sex == null ) && (address == null  ) && (email !=null  ) && (authentication_status == 1 || authentication_status == 5 || authentication_status == 6 || authentication_status == 7),

					four2 = (name == null ) && (sex == null ) && (address != null ) && (email ==null ) && (authentication_status == 1 || authentication_status == 5 || authentication_status == 6 || authentication_status == 7),
					four3 = (name == null ) && (sex == null ) && (address != null ) && (email !=null  ) && (authentication_status != 1 && authentication_status != 5 && authentication_status != 6 && authentication_status != 7),
					
					four4 = (name != null ) && (sex == null ) && (address == null  ) && (email ==null ) && (authentication_status == 1 || authentication_status == 5 || authentication_status == 6 || authentication_status == 7),
					four5 = (name != null ) && (sex == null ) && (address == null ) && (email !=null  ) && (authentication_status != 1 && authentication_status != 5 && authentication_status != 6 && authentication_status != 7),
					
					four6 = (name != null ) && (sex != null ) && (address == null ) && (email ==null ) && (authentication_status != 1 && authentication_status != 5 && authentication_status != 6 && authentication_status != 7),
					//四个为空

					five1 = (name == null ) && (sex == null ) && (address == null  ) && (email ==null ) && (authentication_status == 1 || authentication_status == 5 || authentication_status == 6 || authentication_status == 7),
					five2 = (name == null ) && (sex == null ) && (address == null  ) && (email !=null  ) && (authentication_status != 1 && authentication_status != 5 && authentication_status != 6 && authentication_status != 7),
					
					five3 = (name != null) && (sex == null ) && (address == null  ) && (email ==null  ) && (authentication_status != 1 && authentication_status != 5 && authentication_status != 6 && authentication_status != 7);
					//企业都不为空
				var oneCo = (name != null) && (office_telephone != null) && (company_address != null) && (email !=null) && (authentication_status == 2 || authentication_status == 7),
					//一个个为空
					two1Co = (name == null ) && ( office_telephone != null ) && (company_address != null ) && (email !=null  ) && (authentication_status == 2 || authentication_status == 7),
					two2Co = (name != null ) && ( office_telephone == null ) && (company_address != null ) && (email !=null  ) && (authentication_status == 2 || authentication_status == 7),
					two3Co = (name != null) && ( office_telephone != null ) && (company_address == null  ) && (email !=null  ) && (authentication_status == 2 || authentication_status == 7),
					two4Co = (name != null) && ( office_telephone != null ) && (company_address != null ) && (email !=null  ) && (authentication_status == 2 || authentication_status == 7),
					two5Co = (name != null) && ( office_telephone != null ) && (company_address != null ) && (email ==null ) && (authentication_status == 2 || authentication_status == 7),
					two6Co = (name != null) && ( office_telephone != null ) && (company_address != null ) && (email !=null  ) && (authentication_status != 2 && authentication_status != 7),
					//两个为空 
					three1Co = (name == null ) && ( office_telephone == null ) && (company_address != null ) && (email !=null  ) && (authentication_status == 2 || authentication_status == 7),
					three2Co = (name == null ) && ( office_telephone != null ) && (company_address == null  ) && (email !=null  ) && (authentication_status == 2 || authentication_status == 7),
					three3Co = (name == null ) && ( office_telephone != null ) && (company_address == null  ) && (email ==null ) && (authentication_status == 2 || authentication_status == 7),
					three4Co = (name == null ) && ( office_telephone != null ) && (company_address != null  ) && (email !=null  ) && (authentication_status != 2 && authentication_status != 7),
					
					three5Co = (name != null) && ( office_telephone == null ) && (company_address == null  ) && (email !=null  ) && (authentication_status == 2 || authentication_status == 7),
					three6Co = (name != null) && ( office_telephone == null ) && (company_address != null ) && (email ==null  ) && (authentication_status == 2 || authentication_status == 7),
					three7Co = (name != null) && ( office_telephone == null ) && (company_address != null ) && (email !=null  ) && (authentication_status != 2 && authentication_status != 7),

					three8Co = (name != null) && ( office_telephone != null ) && (company_address == null  ) && (email ==null ) && (authentication_status == 2 || authentication_status == 7),
					three9Co = (name != null) && ( office_telephone != null ) && (company_address == null  ) && (email !=null  ) && (authentication_status != 2 && authentication_status != 7),
					
					three10Co = (name != null ) && ( office_telephone != null ) && (company_address != null ) && (email ==null ) && (authentication_status != 2 && authentication_status != 7),
					
					//三个为空
					four1Co = (name == null ) && ( office_telephone == null ) && (company_address == null  ) && (email !=null  ) && (authentication_status == 2 || authentication_status == 7),

					four2Co = (name == null ) && ( office_telephone == null ) && (company_address != null ) && (email ==null ) && (authentication_status == 2 || authentication_status == 7),
					four3Co = (name == null ) && ( office_telephone == null ) && (company_address != null ) && (email !=null  ) && (authentication_status != 2 && authentication_status != 7),
					
					four4Co = (name != null ) && ( office_telephone == null ) && (company_address == null  ) && (email ==null ) && (authentication_status == 2 || authentication_status == 7),
					four5Co = (name != null ) && ( office_telephone == null ) && (company_address == null ) && (email !=null  ) && (authentication_status != 2 && authentication_status != 7),
					
					four6Co = (name != null ) && ( office_telephone != null ) && (company_address == null ) && (email ==null ) && (authentication_status != 2 && authentication_status != 7),
					//四个为空

					five1Co = (name == null ) && ( office_telephone == null ) && (company_address == null  ) && (email ==null ) && (authentication_status == 2 || authentication_status == 7),
					five2Co = (name == null ) && ( office_telephone == null ) && (company_address == null  ) && (email !=null  ) && (authentication_status != 2 && authentication_status != 7),
					
					five3Co = (name != null) && ( office_telephone == null ) && (company_address == null  ) && (email ==null  ) && (authentication_status != 2 && authentication_status != 7);
					
				//资料完整度的判断
				if(identity_status == 0){//个人
					if(one){
//						$('.integBox .layui-progress-bar').css({
//							'lay-percent':'100% ',
//							'width':'100%'
//						})
						 element.progress('demoBar', '100%');//一成功就把进度条置为100%
						$('.integrity_tip span').html('100%')
				}else if(two1 || two2 || two3 || two4 || two5 || two6){
						 element.progress('demoBar', '85%');
						$('.integrity_tip span').html('85%')
				}else if(three1 || three2 || three3|| three4|| three5|| three6 || three7 || three8 || three9 || three10){
						element.progress('demoBar', '70%');
						$('.integrity_tip span').html('70%')
				}else if(four1 || four2 || four3 || four4 || four5 || four6){
						element.progress('demoBar', '60%');
						$('.integrity_tip span').html('60%')
					}else if(five1 || five2 || five3){
						element.progress('demoBar', '50%');
						$('.integrity_tip span').html('50%')
					}else{
						element.progress('demoBar', '10%');//一成功就把进度条置为100%
						$('.integrity_tip span').html('10%')
					}
				}else{ //企业
					if(oneCo){
						element.progress('demoBarCo','100%')
						$('.integrity_tip span').html('100%')
					}else if(two1Co || two2Co || two3Co || two4Co || two5Co || two6Co){
						element.progress('demoBarCo','85%')
						$('.integrity_tip span').html('85%')
					}else if(three1Co || three2Co || three3Co || three4Co || three5Co || three6Co || three7Co || three8Co || three9Co || three10Co){
						element.progress('demoBarCo','70%')
						$('.integrity_tip span').html('70%')
					}else if(four1Co || four2Co || four3Co || four4Co || four5Co || four6Co){
						element.progress('demoBarCo','60%')
						$('.integrity_tip span').html('60%')
					}else if(five1Co || five2Co || five3Co){
						element.progress('demoBarCo','50%')
						$('.integrity_tip span').html('50%')
					}else{
//						$('.integBox .layui-progress-bar').css({
//							'lay-percent':'10%',
//							'width':'10%'
//						})
						element.progress('demoBarCo','10%')
						$('.integrity_tip span').html('10%')
					}
				}
			},
			error: function(res) {
				console.log('获取进入用户中心的数据')
			}
		})
	}
	//账户切换
	$('.account_four').click(function(){
		$('.account_choice_li').eq($(this).index()+1).click()
	})
		});
})