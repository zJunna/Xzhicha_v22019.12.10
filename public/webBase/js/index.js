$(function() {

	$("#footer").load("../templete/userFooter.html");
	//判断是PC端还是移动端
	function IsPC() {
		var userAgentInfo = navigator.userAgent;
		var Agents = ["Android", "iPhone",
			"SymbianOS", "Windows Phone",
			"iPad", "iPod"
		];
		var flag = true;
		for(var v = 0; v < Agents.length; v++) {
			if(userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}
	var flag = IsPC(); //true为PC端，false为手机端
	//alert(flag);
	if(flag == false) {
		location.href = "http://192.168.0.103:9008/front/home/home"
	}
	//获取登录后的头像
	$(".login_avatar").attr('src', x_user.photo);
	//判断是否有头像，没有默认头像
	if(x_user.photo == null || x_user.photo == '') {
		$(".login_avatar").attr('src', '../../../public/webBase/images/index/z_icon3.png')
	} else {
		$(".login_avatar").attr('src', x_user.photo)
	}

	//鼠标滑过登录后的头像
	$(".login_show_login").hover(function() {
		$(".logo_hover_land").css("display", "block");
	}, function() {
		$(".logo_hover_land").css("display", "none");
	})

	$(".each_land1").hover(function() {
		$(this).find("img").attr("src", "../../../public/webBase/images/public/switch_hover.png");
		$(this).css("background", "#616CFF");
		$(this).find("p").css("color", "#fff")
	}, function() {
		$(this).find("img").attr("src", "../../../public/webBase/images/public/switch.png");
		$(this).css("background", "#FFFFFF");
		$(this).find("p").css("color", "rgba(51, 51, 51, 1)")
	})

	$(".each_land2").hover(function() {
		$(this).find("img").attr("src", "../../../public/webBase/images/public/p_c_hover.png");
		$(this).css("background", "#616CFF");
		$(this).find("p").css("color", "#fff")
	}, function() {
		$(this).find("img").attr("src", "../../../public/webBase/images/public/p_c.png");
		$(this).css("background", "#FFFFFF");
		$(this).find("p").css("color", "rgba(51, 51, 51, 1)")
	})

	$(".each_land3").hover(function() {
		$(this).find("img").attr("src", "../../../public/webBase/images/public/sign_out_hover.png");
		$(this).css("background", "#616CFF");
		$(this).find("p").css("color", "#fff")
	}, function() {
		$(this).find("img").attr("src", "../../../public/webBase/images/public/sign_out.png");
		$(this).css("background", "#FFFFFF");
		$(this).find("p").css("color", "rgba(51, 51, 51, 1)")
	})
	//退出登录,并返回首页
	$(".each_land3").click(function() {
		localStorage.clear();
		/*location.href = "index.html"*/
		href_login();
	})

	//个人历史记录
	//-点击历史记录进行查询
	$(".seach_personal_inp .name").click(function() {
		$(".personal_history").css("display", "block");
	})
	$(".personal_history_list li").click(function() {
		var textName = $(this).find(".name_text").text();
		var textId = $(this).find(".IDcard_text").text();
		var textPhone = $(this).find(".phone_text").text();
		$(".seach_personal_inp .name").val(textName);
		$(".seach_personal_inp .IDcard").val(textId);
		$(".seach_personal_inp .phone").val(textPhone);
	})

	//点击历史记录框之外的地方隐藏历史记录框

	$('body').click(function(e) {
		var target = $(e.target);
		// 如果#overlay或者#btn下面还有子元素，可使用
		// !target.is('#btn *') && !target.is('#overlay *')
		if(!target.is('.seach_personal_inp .name') && !target.is('.personal_history')) {
			if($('.personal_history').is(':visible')) {
				$('.personal_history').hide();
			}
		}
	});

	//个人历史记录结束

	//服务功能的鼠标移入移出效果
	var service_data = [{src1: '../../../public/webBase/images/index/platform_hover5.png',text1: '查询企业法院</br>被执行人信息',src2: '../../../public/webBase/images/index/platform5.png',text2: '被执行人查询'},
		{src1: '../../../public/webBase/images/index/platform_hover6.png',text1: '查询失信</br>失信被执行的信息',src2: '../../../public/webBase/images/index/platform6.png',text2: '失信人查询'},{src1: '../../../public/webBase/images/index/platform_hover7.png',text1: '根据姓名身份证号</br>查询此人是否有涉诉信息',src2: '../../../public/webBase/images/index/platform7.png',text2: '涉诉信息查询'},
		{src1: '../../../public/webBase/images/index/platform_hover4.png',text1: '根据姓名手机号身份证 </br>查询在各银行的逾期记录详情',src2: '../../../public/webBase/images/index/platform4.png',text2: '银行逾期查询'},
		{src1: '../../../public/webBase/images/index/platform_hover0.png',text1: '社保公积金缴费比例查询</br>补缴计算、正常缴纳以及补缴',src2: '../../../public/webBase/images/index/platform0.png',text2: '新市民服务'},
		{src1: '../../../public/webBase/images/index/platform_hover1.png',text1: '查询借贷过多或无能力偿还债务</br>的高风险用户',src2: '../../../public/webBase/images/index/platform1.png',text2: '网贷黑名单'},
		{src1: '../../../public/webBase/images/index/bank_card_two_hover.png',text1: '验证用户的银行卡号</br>持卡人姓名是否一致',src2: '../../../public/webBase/images/index/bank_card_two.png',text2: '银行卡二要素'},
		{src1: '../../../public/webBase/images/index/platform_hover2.png',text1: '根据企业名称或行业分类</br>查询岗位招聘信息',src2: '../../../public/webBase/images/index/platform2.png',text2: '招聘信息查询'},
		{src1: '../../../public/webBase/images/index/bank_carbin_hover.png',text1: '根据银行卡号</br>查询银行卡属性',src2: '../../../public/webBase/images/index/bank_carbin.png',text2: '银行卡宾信息'},
		{src1: '../../../public/webBase/images/index/platform_hover3.png',text1: '查询网络信息不良犯罪记录</br>或违反犯罪行为',src2: '../../../public/webBase/images/index/platform3.png',text2: '不良记录查询'}]

	$(".service_function_list dl").hover(function() {
		$(this).find("img").attr("src", service_data[$(this).index()].src1);
		$(this).find("dd").html(service_data[$(this).index()].text1);
		$(this).css("background", "#616CFF");
		$(this).find("dd").css({
			"color": "rgba(255,255,255,1)",
			"font-size": "12px",
			"line-height": "20px",
		});
	}, function() {
		$(this).find("img").attr("src", service_data[$(this).index()].src2);
		$(this).find("dd").text(service_data[$(this).index()].text2);
		$(this).css("background", "#FFF");
		$(this).find("dd").css({
			"color": "rgba(51, 51, 51, 1)",
			"font-size": "16px",
			"line-height": "20px",
		});
	})
	//首页的平台公告   platform Announcement---平台公告
	var url = api + 'webHome/home';
	platformAnnouncement();

	function platformAnnouncement() {
		$.ajax({
			url: url,
			type: 'get',
			//data: 'data_form',
			dataType: 'json',
			beforeSend: function() {},
			success: function(res) {
				var data_info = res.data;
				console.log(res);
				//console.log(data_info.Notice[0].title)
				//转换时间戳
				for(var i = 0; i < data_info.Notice.length; i++) {
					var date = new Date(data_info.Notice[i].time);
					Y = date.getFullYear() + '-';
					M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
					D = date.getDate() <10 ? '0' + date.getDate() : date.getDate() + '';
					//D = date.getDate() + ' ';
					YMD = Y + M + D;
					//console.log(Y + M + D);
					data_info.Notice[i].time = YMD;
				}
				$('#platform_announcement_id').html(template('platform_announcement_template', data_info));
			},
			error: function(res) {
				//错误提示
			}
		});
	};
	//首页的行业新闻资讯        Industry news--行业新闻资讯
	industryNews();

	function industryNews() {
		$.ajax({
			url: url,
			type: 'get',
			//data: 'data_form',
			dataType: 'json',
			beforeSend: function() {},
			success: function(res) {
				if(res.err_code == 0) {
					var data_info = res.data;
					//console.log(data_info.news[0].time);
					//替换时间戳
					for(var i = 0; i < data_info.news.length; i++) {
						var date = new Date(data_info.news[i].time);
						Y = date.getFullYear() + '-';
						M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
						D = date.getDate() <10 ? '0' + date.getDate() : date.getDate() + '';
						//D = date.getDate() + ' ';
						YMD = Y + M + D;
						//console.log(Y + M + D);
						data_info.news[i].time = YMD;
					}
					$('#industry_news').html(template('industry_template', data_info));
				} else {
					//console.log(res.msg);
				}

				var data_info = res.data;
				//console.log(res);
				//console.log(data_info.news[0].title)
				$('#industry_news').html(template('industry_template', data_info));
			},
			error: function(res) {
				//console.log(res.msg);
				/*layer.alert(res.msg, {
					title: 'X职查'
				})*/
			}
		});
	};
	//首页的热门企业查询
	popularQuery();

	function popularQuery() {
		$.ajax({
			url: url,
			type: 'get',
			//data: 'data_form',
			dataType: 'json',
			beforeSend: function() {},
			success: function(res) {
				var data_info = res.data;
				//console.log(res);
				//console.log(data_info.hotData[0].queryTime);
				//替换时间戳
				for(var i = 0; i < data_info.hotData.length; i++) {
					var date = new Date(data_info.hotData[i].queryTime);
					Y = date.getFullYear() + '-';
					M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
					//D = (date.getDate() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '';
					D = date.getDate() <10 ? '0' + date.getDate() : date.getDate() + '';
					//D = date.getDate() + '';
					YMD = Y + M + D;
					//console.log(Y + M + D);
					data_info.hotData[i].queryTime = YMD;
				}
				$('#popular_query').html(template('popular_query_template', data_info));
			},
			error: function(res) {
				//console.log(res);
				//layer.alert(res.msg, {
				//	title: 'X职查'
				//})
			}
		})
	};
	//企业历史记录
	//-点击历史记录进行查询
	$(".company_input").click(function() {
		//判断是否有历史记录，选择显示清空
		if($(".company_history_list ul").find("li").length > 0) {
			$(".company_history").css("display", "block");
			$(".clear_company_history").click(function() {
				$(".company_history").css("display", "none");
				clear_history();
			})
			//console.log(1);
		} else {
			$(".clear_company_history").css("display", "none");
			$(".company_history").css("display", "none");
			console.log(0);
		}
	})
	//点击历史记录框之外的地方隐藏历史记录框

	$('body').click(function(e) {
		var target = $(e.target);
		// 如果#overlay或者#btn下面还有子元素，可使用
		// !target.is('#btn *') && !target.is('#overlay *')
		if(!target.is('.company_input') && !target.is('.company_history')) {
			if($('.company_history').is(':visible')) {
				$('.company_history').hide();
			}
		}
	});
	//点击查询时调用保存历史记录
	$(".com_button").click(function() {
		var comp = $(".company_input").val();
		//alert(comp);
		seachinput(comp);
	})
	/*$(".com_button").keypress(function (e) {
    if (e.which == 13) {
      
       alert(111);
    }*/
	//回车
	$(document).keypress(function(e) {
		if(e.keyCode == 13) {
			//var comp = $(".company_input").val();
			alert(1);
			$('.com_button').click()
		}

	})
	//保存历史记录
	function seachinput(comp) {
		var url = api + 'webHome/saveHistory';
		//console.log(url);
		var data_form = {
			"search_name": comp
		}
		//alert(data_form.search_name);
		console.log(data_form.search_name);
		$.ajax({
			type: "post",
			url: url,
			data: data_form,
			dataType: 'json',
			beforeSend: function() {},
			success: function(res) {
				//var data_info = res.data;
				//console.log(res);
				//$('#company_history').html(template('company_history_template', ));
			}
		})
	}

	//历史记录
	companyHistory();

	function companyHistory() {
		$.ajax({
			type: "get",
			url: url,
			dataType: 'json',
			beforeSend: function() {},
			success: function(res) {
				var data_info = res.data;
				//console.log(res);
				$('#company_history').html(template('company_history_template', data_info));
			}
		});
	}
	//清空企业历史记录
	function clear_history() {
		var url = api + 'webHome/cleanHistory';
		//console.log(url);
		$.ajax({
			type: "post",
			url: url,
			dataType: 'json',
			beforeSend: function() {},
			success: function(res) {
				companyHistory();
				//console.log(res);
			}
		});
	}

	//企业历史记录结束
	function href_login() {
		location.href = "login.html"
	}

	//判断点击导航上的查企业时是否登录   

	$(".index_check_company").click(function() {
		/*if(user_id == '') {
			href_login();
		} else {
			console.log("进入查企业");
		}*/
		console.log("进入查企业");
	})
	//判断点击导航上的查个人时是否登录   
	$(".index_check_personal").click(function() {
		if(user_id == '') {
			href_login();
			return false;
		}
		if(authentication_status == 0) {
			console.log("个人认证")
			location.href = '../UserAction/realName.html';
		} else {
			console.log("进入查个人");
		}
	})
	//判断点击导航上的线上人力时是否登录   
	$(".index_online_manpower").click(function() {
		if(user_id == '') {
			$("#no_login").css('display', 'flex');
			$(".go_login").click(function() {
				href_login();
			})
		}
		if(identity_status == 0) {
			$('.online_pop').css('display', 'flex');
			return false;
		}
		if(authentication_status != 2 && authentication_status != 7) {
			console.log("企业认证")
			$("#realNameError").css('display', 'flex');
		} else {
			console.log("进入线上人力");
			//window.open("/front/webHome/SigningAction/onlineManpower");
		}
	})
	//判断点击搜索上的线上人力时是否登录   
	$(".seach_online_manpower").click(function() {
		if(user_id == '') {
			href_login();
			return false;
		}
		if(identity_status == 0) {
			$('.online_pop').css('display', 'flex');
			return false;
		}
		if(authentication_status == 1 || authentication_status == 7) {
			console.log("企业认证")
			location.href = '../UserAction/realName.html';
		} else {
			console.log("进入线上人力");
			//window.open();
		}
	})

	//未实名认证弹窗
	$("#willCancel").click(function() {
		$("#realNameError").css('display', 'none');
	})

	//线上人力弹窗
	$(".online_pop_button").click(function() {
		$('.online_pop').css('display', 'none');
	})
	//查个人查询  判断输入框是否为空
	$(".personal_buttom").click(function() {
		var name = $(".seach_personal_name").val();
		var phone = $(".phone").val();
		var idcard = $(".IDcard").val();
		var patternName = /^[\u4E00-\u9FA5]{1,6}$/;
		var patternPhone = /^1[34578]\d{9}$/;
		var patternIdcard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
		if(name == '') {
			$(".input_no_air").html("姓名不能为空");
			return false;
		}

		if(idcard == '') {
			$(".input_no_air").html("身份证号码不能为空");
			return false;
		}
		if(phone == '') {
			$(".input_no_air").html("手机号码不能为空");
			return false;
		}
		if(!patternName.test(name)) {
			$(".input_no_air").html("姓名格式不对");
			return false;
		}

		if(!patternIdcard.test(idcard)) {
			$(".input_no_air").html("身份证号格式有误");
			return false;
		}

		if(!patternPhone.test(phone)) {
			$(".input_no_air").html("手机号格式有误");
			return false;
		}
		if(user_id == '') {
			href_login();
			return false;
		}

	})
	//从登录页登录判断是否登录，判断显示头像
	if(x_user != "") {
		$(".login_no_login").css("display", "none");
		$(".login_show_login").css("display", "block");
	}
	//服务功能的弹窗
	//根据input框显示叉号
	$('.service_name').bind('input propertychange', function() {
		if($(this).val() == '') {
			$('.service_input_img1').css('display', 'none');
		} else {
			$('.service_input_img1').css('display', 'block');
		}
	})

	$(".service_input_img1").click(function() {
		$(".service_name").val("");
		$(this).css("display", "none");
	})

	$('.service_num').bind('input propertychange', function() {
		if($(this).val() == '') {
			$('.service_input_img2').css('display', 'none');
		} else {
			$('.service_input_img2').css('display', 'block');
		}
	})
	$(".service_input_img2").click(function() {
		$(".service_num").val("");
		$(this).css("display", "none");
	})

	$('.service_idcard').bind('input propertychange', function() {
		if($(this).val() == '') {
			$('.service_input_img3').css('display', 'none');
		} else {
			$('.service_input_img3').css('display', 'block');
		}
	})
	$(".service_input_img3").click(function() {
		$(".service_idcard").val("");
		$(this).css("display", "none");
	})

	//判断输入框不能为空
	$(".service_button").click(function() {

		var name = $(".service_name").val();
		var phone = $(".service_num").val();
		var idcard = $(".service_idcard").val();
		var patternName = /^[\u4E00-\u9FA5]{1,6}$/;
		var patternPhone = /^1[34578]\d{9}$/;
		var patternIdcard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
		if(name == '') {
			$(".serviceError").html("姓名不能为空");
			$(".serviceError").css('display', 'block');
			return false;
			return false;
		}
		if(phone == '') {
			$(".serviceError").html("手机号不能为空");
			$(".serviceError").css('display', 'block');
			return false;
		}
		if(idcard == '') {
			$(".serviceError").html("身份证号不能为空");
			$(".serviceError").css('display', 'block');
			return false;
		}
		if(!patternName.test(name)) {
			$(".serviceError").html("姓名格式不对");
			$(".serviceError").css('display', 'block');
			return false;
		}

		if(!patternIdcard.test(idcard)) {
			$(".serviceError").html("身份证号格式有误");
			$(".serviceError").css('display', 'block');
			return false;
		}
		if(!patternPhone.test(phone)) {
			$(".serviceError").html("手机号格式有误");
			$(".serviceError").css('display', 'block');
			return false;
		}
		if(user_id == '') {
			href_login();
			return false;
		} else {
			console.log("提交信息");
		}

	})
	//点击弹窗外隐藏
	$('#service_function_pop').bind('click', function(e) {
		var e = e || window.event; //浏览器兼容性 
		var elem = e.target || e.srcElement;
		while(elem) { //循环判断至跟节点，防止点击的是div子元素 
			if(elem.id && elem.id == 'service_function_pop_box') {
				return;
			}
			elem = elem.parentNode;
		}
		//点击的不是div或其子元素
		$('#service_function_pop_box').css('display', 'none');
		$('#service_function_pop').css('display', 'none');
		$('#service_function_pop_box').css('display', 'block');
	});

	//正在开发中的弹窗
	$('#back_bank_popup1').bind('click', function(e) {
		var e = e || window.event; //浏览器兼容性 
		var elem = e.target || e.srcElement;
		while(elem) { //循环判断至跟节点，防止点击的是div子元素 
			if(elem.id && elem.id == 'popup_box') {
				return;
			}
			elem = elem.parentNode;
		}
		//点击的不是div或其子元素
		$('#popup_box').css('display', 'none');
		$('#back_bank_popup1').css('display', 'none');
		$('#popup_box').css('display', 'flex');
	});
	$(".back_bank_popup1 .popup_btn").click(function() {
		$(".back_bank_popup1").css("display", "none")
	})

	//点击服务功能的选项判断是否登录

	//被执行人
	$(".service_function_list1").click(function() {
		/*if(user_id == '') {
			href_login();
		} else {*/
		$(".service_function_pop").css('display', 'flex');
		$('.service_function_title').html('被执行人');
		$('.service_resolve').html('查询企业法院被执行人信息')
		/*}*/

	})
	//失信人查询
	$(".service_function_list2").click(function() {
		console.log("失信人查询");
		$(".service_function_pop").css('display', 'flex');
		$('.service_function_title').html('失信人查询');
		$('.service_resolve').html('查询失信失信被执行的信息')
	})
	//涉诉信息查询
	$(".service_function_list3").click(function() {
		console.log("涉诉信息查询");
		$(".service_function_pop").css('display', 'flex');
		$('.service_function_title').html('涉诉信息查询');
		$('.service_resolve').html('根据姓名身份证号查询此人是否有涉诉信息')

	})
	//银行逾期查询
	$(".service_function_list4").click(function() {

		console.log("银行逾期查询");
		$(".service_function_pop").css('display', 'flex');
		$('.service_function_title').html('银行逾期查询');
		$('.service_resolve').html('根据姓名、手机号、身份证号查询在各银行的逾期记录详情');

	})
	//新市民服务
	$(".service_function_list5").click(function() {

		console.log("新市民服务");
		$(".service_function_pop").css('display', 'flex');
		$('.service_function_title').html('新市民服务');
		$('.service_resolve').html('社保公积金缴费比例查询补缴计算、正常缴纳以及补缴');

	})
	//网贷黑名单
	$(".service_function_list6").click(function() {

		console.log("网贷黑名单");
		$(".service_function_pop").css('display', 'flex');
		$('.service_function_title').html('网贷黑名单');
		$('.service_resolve').html('查询借贷过多或无能力偿还债务的高风险用户');

	})
	//银行卡二要素
	$(".service_function_list7").click(function() {

		$(".back_bank_popup1").css("display", "flex")

	})
	//招聘信息查询
	$(".service_function_list8").click(function() {

		console.log("招聘信息查询");
		$(".service_function_pop").css('display', 'flex');
		$('.service_function_title').html('招聘信息查询');
		$('.service_resolve').html('根据企业名称或行业分类查询岗位招聘信息');

	})
	//银行卡宾信息
	$(".service_function_list9").click(function() {

		//console.log("银行卡宾信息");
		$(".back_bank_popup1").css("display", "flex")

	})
	//不良记录查询
	$(".service_function_list10").click(function() {

		console.log("不良记录查询");
		$(".service_function_pop").css('display', 'flex');
		$('.service_function_title').html('不良记录查询');
		$('.service_resolve').html('查询网络信息不良犯罪记录或违反犯罪行为');

	})

	//首页进行实名认证
	$(".certification_button").click(function() {
		if(user_id == '') {
			href_login();
		} else {
			location.href = '../UserAction/realName.html';
		}
	})
	//首页热搜的查询
	$("li[name='li_company']").click(function() {
		var companyName = $(this).children("p").html();
		location.href = "/front/webHome/HomeAction/searchCompany?companyName=" + companyName + "&mark=charge";
	})
});
//历史记录
function his_list(index) {
	$('.company_input').val($('.company_history_list ul li').eq(index).find('span').html())
}
	