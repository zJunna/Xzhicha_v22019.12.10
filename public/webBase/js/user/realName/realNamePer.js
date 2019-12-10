$(function(){
	//是否实名认证
//	console.log('authentication_status = ' + authentication_status)

	var idNumber = '',
		realityName = '';
	$('#is_real_name').html(template('is_real_name_template', {
		'authentication_status': authentication_status,
		'person_rz': '',
		'idNumber': idNumber,
		'realityName': realityName
	}));
	
	//已实名时获取实名信息
	if(authentication_status == 1 || authentication_status == 5 || authentication_status == 6 || authentication_status == 7){
		get_real_name();
	}
	function get_real_name(){
		var url = api + 'webAccount/getPerRealName';
		var data_form = {
			'user_id': user_id
		};
		$.ajax({
			url: url,
			type: "post",
			data: data_form,
			dataType: 'json',
			beforeSend: function(){},
			success: function(res){
				// 隐藏 loading
//				console.log(res)
				if(res.err_code == 0){
					idNumber = res.data.idNumber;
					realityName = res.data.realityName;
					$('#is_real_name').html(template('is_real_name_template', {
						'authentication_status': authentication_status,
						'person_rz': '',
						'idNumber': idNumber,
						'realityName': realityName
					}));
				}
			},
			error: function(res){}
		});
	}
	
	layui.use(['form'], function() {
		var form = layui.form;
		var provinceList = [],
			province = $("#real_province"),
			city = $("#real_city"),
			check_id = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;//身份证号码
		
		//获取省份
		get_province();
		
		var provinceText,
			cityText,
			cityItem;
		
		//选定省份后 将该省份的数据读取追加上
		form.on('select(province)', function(data) {
			provinceText = data.value;
			$.each(provinceList, function(i, item) {
				if (provinceText == item.id) {
					cityItem = i;
					return cityItem;
				}
			});
			removeEle(city);
			//获取市
			get_city(provinceText);
			
		})

		//选定市或直辖县后 将对应的数据读取追加上
		form.on('select(city)', function(data) {
			cityText = data.value;
			$.each(provinceList, function(i, item) {
				if (provinceText == item.id) {
					cityItem = i;
					return cityItem;
				}
			});
			//重新渲染select 
			form.render('select');
		})
		
		//监听实名认证提交
		form.on('submit(real_sub)', function(data) {
			var user_real_name = $('#user_real_name').val(),
				user_real_id = $('#user_real_id').val(),
				real_province = $('#real_province').val(),
				real_city = $('#real_city').val();
			//真实姓名
			if(user_real_name == ''){
		    	$('.real_tip_1').show();
		    	$('#user_real_name').css('border-color','#E73637');
		    	return false;
			}else{
		    	$('.real_tip_1').hide();
		    }
			//真实身份证
			if(user_real_id == ''){
		    	$('.real_tip_2').show();
		    	$('#user_real_id').css('border-color','#E73637');
		    	return false;
			}else if(!(check_id.test(user_real_id))){
				$('.real_tip_2').show();
		    	$('#user_real_id').css('border-color','#E73637');
		    	return false;
			}else{
		    	$('.real_tip_2').hide();
		    }
			//选择省份
			if(real_province == ''){
		    	$('.real_tip_3').show();
		    	$('#real_province').css('border-color','#E73637');
		    	return false;
			}else{
		    	$('.real_tip_3').hide();
		   }
			//选择市区
			if(real_city == '' || real_city == '0'){
		    	$('.real_tip_4').show();
		    	$('#real_city').css('border-color','#E73637');
		    	return false;
			}else{
		    	$('.real_tip_4').hide();
		    }
			
			//提交实名认证
			post_real_name();
			return false;
		});
		
		//input获取焦点
		$('input').on('input',function(e){
			$(this).css('border-color','#eee')
		})
		
		//获取省份
		function get_province(){
			var url = api + 'webAccount/Province';
			$.ajax({
				url: url,
				type: "get",
				dataType: 'json',
				beforeSend: function(){},
				success: function(res){
					// 隐藏 loading
//					console.log(res)
					if(res.err_code == 0){
						provinceList = res.data.Province;
						//初始将省份数据赋予
						for (var i = 0; i < provinceList.length; i++) {
							addEle(province, provinceList[i].name, provinceList[i].id);
						}
						//赋予完成 重新渲染select
						form.render('select');
					}else{
						layer.alert(res.msg, {title: 'X职查'});
					}
				},
				error: function(res){
					layer.alert(res.msg, {title: 'X职查'})
				}
			});
		}
		
		//获取城市
		function get_city(Provinceid){
			var url = api + 'webAccount/getCity';
			var data_form = {
				'Provinceid': Provinceid
			};
			$.ajax({
				url: url,
				type: "get",
				data: data_form,
				dataType: 'json',
				beforeSend: function(){},
				success: function(res){
					// 隐藏 loading
					console.log(res)
					if(res.err_code == 0){
						$.each(res.data.getCity, function(i, item) {
							addEle(city, item.name, item.id);
						})
						//重新渲染select 
						form.render('select');
					}else{
						layer.alert(res.msg, {title: 'X职查'});
					}
				},
				error: function(res){
					layer.alert(res.msg, {title: 'X职查'})
				}
			});
		}
		
		//向select中 追加内容
		function addEle(ele, value, id) {
			var optionStr = "";
			optionStr = "<option value=" + id + " >" + value + "</option>";
			ele.append(optionStr);
		}
		
		//移除select中所有项 赋予初始值
		function removeEle(ele) {
			ele.find("option").remove();
			var optionStar = "<option value=" + "0" + ">" + "请选择" + "</option>";
			ele.append(optionStar);
		}
		
		//实名认证
		function post_real_name(){
			var url = api + 'webAccount/perRealName';
			var post_data = {
				'user_id': user_id,
				'realityName': $('#user_real_name').val(),
				'idNumber': $('#user_real_id').val(),
				'city_id': $('#real_city').val()
			}
			var x_user_update = JSON.parse(localStorage.getItem('x_user')) || '';
			console.log(post_data)
			console.log(x_user_update.authentication_status)
			$.ajax({
				url: url,
				type: "post",
				data: post_data,
				dataType: 'json',
				beforeSend: function () {
					layer.load(0, {
			            shade: [0.3, '#000'],
			            time: 10*1000
			        })
				},
				success: function(res){
					// 隐藏 loading
					layer.close(layer.load());
					console.log(res)
					if(res.err_code == 0){
						$('#is_real_name').html(template('is_real_name_template', {
							'authentication_status': res.data.authentication_status,
							'person_rz': '', // fail实名认证失败
							'idNumber': res.data.idNumber,
							'realityName': res.data.realityName
						}));
						//更新身份状态
						x_user_update.authentication_status = res.data.authentication_status;
						localStorage.setItem('x_user',JSON.stringify(x_user_update));
					}else{
						$('#is_real_name').html(template('is_real_name_template', {
							'authentication_status': authentication_status,
							'person_rz': 'fail', // fail实名认证失败
							'idNumber': idNumber,
							'realityName': realityName
						}));
						//重新认证
						$('.person_rz_reset').click(function(){
							window.location.reload();
						})
					}
				},
				error: function(res){
					layer.close(layer.load());
					layer.alert(res.msg, {title: 'X职查'})
				}
			});
		}
	});
})
