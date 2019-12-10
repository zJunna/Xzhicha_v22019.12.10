$(function(){
	//是否实名认证
	console.log('是否实名认证authentication_status = ' + authentication_status)
	//企业未实名：0,1;
	//已实名：2,7;
	//待审核：3,5;
	//审核失败：4,6;
	$('#is_real_name_co').html(template('is_real_name_template', {
		'authentication_status': authentication_status
	}));
	
	layui.use(['form'], function() {
		var form = layui.form;
		var provinceList = [],
			province = $("#real_province"),
			city = $("#real_city"),
			check_credit_code = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/,//信用代码
			check_phone_no = /^1[3456789]\d{9}$/;//手机号码正则
		
		//企业审核中，审核成功，审核失败时请求数据
		if(authentication_status != 0 && authentication_status != 1){
			get_co_ajax();
		}
	
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
			var co_real_name = $('#co_real_name').val(), //企业名称
				credit_code = $('#credit_code').val(), //信用代码
				real_province = $('#real_province').val(),
				real_city = $('#real_city').val(),
				co_hr_contact = $('#co_hr_contact').val(), //HR联系人
				co_phone_no = $('#co_phone_no').val(), //联系电话
				co_yyzz1 = $('#yyzz_1').attr('src'), //营业执照
				co_yyzz2 = $('#yyzz_2').attr('src'),
				co_gzzm1 = $('#gzzm_1').attr('src'), //工作证明
				co_gzzm2 = $('#gzzm_2').attr('src');

			//企业名称
			if(co_real_name == ''){
		    	$('.real_tip_1').show();
		    	$('#co_real_name').css('border-color','#E73637');
		    	return false;
			}else{
		    	$('.real_tip_1').hide();
		    }
			//信用代码
			if(credit_code == '' || !(check_credit_code.test(credit_code))){
		    	$('.real_tip_2').show();
		    	$('#credit_code').css('border-color','#E73637');
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
			//营业执照
			if(co_yyzz1 == '' && co_yyzz2 == ''){
				$('.real_tip_5').show();
		    	return false;
			}else{
				$('.real_tip_5').hide();
			}
			//HR联系人
			if(co_hr_contact == ''){
		    	$('.real_tip_6').show();
		    	$('#co_hr_contact').css('border-color','#E73637');
		    	return false;
			}else{
		    	$('.real_tip_6').hide();
		    }
			//联系电话
			if(co_phone_no == '' || !(check_phone_no.test(co_phone_no))){
		    	$('.real_tip_7').show();
		    	$('#co_phone_no').css('border-color','#E73637');
		    	return false;
			}else{
		    	$('.real_tip_7').hide();
		    }
			//工作证明
			if(co_gzzm1 == '' && co_gzzm2 == ''){
				$('.real_tip_8').show();
		    	return false;
			}else{
				$('.real_tip_8').hide();
			}
			
			//提交实名认证
			post_real_name();
			return false;
		});
		
		//input获取焦点
		$('input').on('input',function(e){
			$(this).css('border-color','#eee')
		})
		
		//查看实名认证信息
		function get_co_ajax(){
			var url = api + 'webAccount/getComRealname';
			var post_data = {
				'user_id': user_id
			}
			$.ajax({
				url: url,
				type: "post",
				data: post_data,
				dataType: 'json',
				beforeSend: function () {},
				success: function(res){
					// 隐藏 loading
					console.log(res)
					if(res.err_code == 0){
						if(authentication_status == 3 || authentication_status == 5 || authentication_status == 2 || authentication_status == 7){
							$('#is_real_name_co').html(template('is_real_name_template', {
								'authentication_status': res.data.authentication_status,
								'company_name': res.data.company_name,
								'company_code': res.data.company_code,
								'provinces_name': res.data.provinces_name,
								'city_Name': res.data.city_Name,
								'company_hr_name': res.data.company_hr_name,
								'hr_mobile': res.data.hr_mobile,
								'comImages': res.data.comImages,
								'hrImages': res.data.hrImages
							}));
						}else{
							$('#co_real_name').val(res.data.company_name)
						}
						show_img();
					}else{
						layer.alert(res.msg, {title: 'X职查'})
					}
				},
				error: function(res){
					layer.alert(res.msg, {title: 'X职查'})
				}
			});
		}
		
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
//					console.log(res)
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
			var url = api + 'webAccount/comRealname';
			var img_src = '',//图片地址
				img_mark = '';// 图片标记
			//整理后台图片格式
			$("img[name='img_marks']").each(function(){
				if($(this).attr('src') != ''){
					img_src = img_src + $(this).attr('src') + ',';
					img_mark = img_mark + $(this).attr('mark') + ',';
				}
			})
			img_src = img_src.substring(0,img_src.length-1);
			img_mark = img_mark.substring(0,img_mark.length-1);
			
			var post_data = {
				'user_id': user_id,
				'company_name': $('#co_real_name').val(),
				'company_code': $('#credit_code').val(),
				'comCiyt_id': $('#real_city').val(),
				'company_hr_name': $('#co_hr_contact').val(),
				'hr_mobile': $('#co_phone_no').val(),
				'src': img_src,
				'mark': img_mark
			}
			console.log(post_data)
			var x_user_update = JSON.parse(localStorage.getItem('x_user')) || '';
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
						//更新身份状态
						x_user_update.authentication_status = res.data.authentication_status;
						localStorage.setItem('x_user',JSON.stringify(x_user_update));
						get_co_ajax();
					}else{
						layer.alert(res.msg, {title: 'X职查'})
					}
				},
				error: function(res){
					layer.close(layer.load());
					layer.alert(res.msg, {title: 'X职查'})
				}
			});
		}
		
		// 预览图片
		$('.preview').on('click',function(){
			$('.mask').css('display','block');
			$('#big_img_show').attr('src',$(this).prev().attr('src')).css('max-height',$('.mask').height()*0.8 + 'px');
			var big_margin_top = ($('.mask').height() - $('#big_img_show').height())/2 + 'px';
			$('#big_img_show').css('margin-top',big_margin_top);
		})
		// 关闭预览
		$('.mask_close').on('click',function(){
			$('.mask').css('display','none');
		})
		
	});
})
