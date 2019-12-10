$(function() {
	//重置tab2 的页面
	localStorage.setItem('page2_num',1)
	//重置tab3 的页面
	localStorage.setItem('page3_num',1)
	//选项卡
	layui.use(['element', 'layer'], function() {
		var element = layui.element;
		element.on('tab(demo)', function(data) {
			//切换tab，隐藏发布职位div
			if(data.index == 0) {
				//重置tab2 的页面
				localStorage.setItem('page2_num',1)
				//重置tab3 的页面
				localStorage.setItem('page3_num',1)
				$('.pos_management').show();
				$('.pos_release').hide();
				//获取简历数据
				get_resume_ajax();
			} else if(data.index == 1) {
				//简历推荐
				pageNo = 1;
				get_tj_ajax(pageNo);
				//重置tab2 的页面
				localStorage.setItem('page2_num',1)
				//重置tab3 的页面
				localStorage.setItem('page3_num',1)
			} else {
				//查看过的简历
				pageNo = 1;
				get_seed_ajax(pageNo);
			}
		})
	});

	//职位名称 - id
	var positionId = [];
	var pageNo;
	if(!pageNo) {
		pageNo = 1;
	}
	//获取简历数据
	get_resume_ajax();
	/*
	 * 获取简历数据
	 */
	function get_resume_ajax(pageNo) {
		var url = api + 'webAccount/Positions';
		var data_form = {
			'user_id': user_id,
			'currPagePositions': pageNo
		};
		$.ajax({
			url: url,
			type: "post",
			data: data_form,
			dataType: 'json',
			beforeSend: function() {},
			success: function(res) {
				// 隐藏 loading
				console.log(res)
				if(res.err_code == 0) {
					//引擎
					//职位管理 - 已发布职位
					$('#pos_management').html(template('pos_management_template', {
						'Positions': res.data.Positions.Recommended,
						'count_num':res.data.Positions
					}));
					//分页
					var totalRecords = res.data.Positions.count; //记录总数
					var pageSize = 5; //每页显示条数

					var totalPage = Math.ceil(totalRecords / pageSize); //总页码
					
					kkpager.generPageHtml({
						pno: pageNo, //当前页码
						total: totalPage, //总页码
						totalRecords: totalRecords, //总数据条数
						mode: 'click', //默认值是link，可选link或者click
						click: function(pageNo) {
							this.selectPage(pageNo);
							get_resume_ajax(pageNo); //点击页码的时候，显示对应页的记录
							return false;
						}
					});
					$('.pageBtnWrap span:first-child').remove();
					$('.pageBtnWrap span:last-child').remove();
					$('.pageBtnWrap a:first-child').remove();
					$('.pageBtnWrap a:last-child').remove();
					$('.infoTextAndGoPageBtnWrap').remove();
					//开关
					layui.use(['element', 'form'], function() {
						var form = layui.form;
						for(var i = 0; i < res.data.Positions.Recommended.length; i++) {
							form.on('switch(switchTest' + i + ')', function(data) {
								//console.log(data.elem.checked); //开关是否开启，true或者false
								var pos_id = $(this).parent().find('.switch_text1').attr('pos_status');
								if(data.elem.checked == true) {
									$(this).parent().find('.switch_text1').html('招聘中').css('color', '#616CFF');
									tab1_pos_status(1, pos_id);
								} else {
									$(this).parent().find('.switch_text1').html('停止招聘').css('color', '#999');
									tab1_pos_status(2, pos_id);
								}
								return false;
							})
						}
						form.render(); 
					});

					/*
					 * 职位管理
					 */
					//hover
					$('.pos_management_list ul li').hover(function() {
						$(this).find('.pos_time').hide();
						$(this).find('.pos_operate').show();
					}, function() {
						$(this).find('.pos_time').show();
						$(this).find('.pos_operate').hide();
					})
					//调用省市接口
					sr_province_and_city();
					//发布职位，按钮
					$('.release_pos').click(function() {
						$('.pos_management').hide();
						$('.pos_release').show();
						$(".pos_release_top").html("发布职位信息")
					})
					//发布编辑职位，取消
					$('.cancel_edit').click(function() {
						$('.pos_release').find('form')[0].reset();
						$('.pos_management').show();
						$('.pos_release').hide();
					})
					//编辑
					$('.pos_edit1').click(function() {
						$('.pos_management').hide();
						$('.pos_release').show();
						
						$('#fb_edit_id').html($(this).attr('edit_id'))
						tab1_edit($(this).attr('edit_id'));
						$(".pos_release_top").html("编辑职位信息")
					})
					//删除
					$('.pos_del1').click(function() {
						var del_id = $(this).attr('del_id');
						layui.use('layer', function() {
							var layer = layui.layer;
							layer.alert('确定删除该招聘信息？', {
								title: 'X职查'
							}, function() {
								tab1_del(del_id);
							})
						});
					})
					//发布编辑职位，提交
					$('.publish_job').click(function() {
						//职位名称
						if($('#position_name').find('input').val() == '') {
							$('.pos_tip1').show()
							return false;
						} else {
							$('.pos_tip1').hide()
						}
						//最低学历
						if($('#pos_min_edu').val() == '') {
							$('.pos_tip2').show()
							return false;
						} else {
							$('.pos_tip2').hide()
						}
						//薪资待遇
						if($('#pos_money').val() == '') {
							$('.pos_tip3').show()
							return false;
						} else {
							$('.pos_tip3').hide()
						}
						//工作年限
						if($('#pos_gz_year').val() == '') {
							$('.pos_tip4').show()
							return false;
						} else {
							$('.pos_tip4').hide()
						}
						//省
						if($('#real_province').val() == '') {
							$('.pos_tip5').show()
							return false;
						} else {
							$('.pos_tip5').hide()
						}
						//市
						if($('#real_city').val() == '' || $('#real_city').val() == '0') {
							$('.pos_tip6').show()
							return false;
						} else {
							$('.pos_tip6').hide()
						}

						//提交数据
						post_pos();
						$('.pos_management').show();
						$('.pos_release').hide();
					})
					//发布职位 - post
				
					function post_pos() {
						var url;
						var tab1_position_id;
						if($('#fb_edit_id').html() == ''){
							url = api + 'webAccount/positionUpload';
						}else{
							url = api + 'webAccount/positionUpdateMethod';
						}
						
						console.log(positionId[2])
						if(positionId[2] == 'undefined' || positionId[2] == undefined){
							tab1_position_id = $('#tab1_position_id').html();
						}else{
							tab1_position_id = positionId[2];
						}
						var data_form = {
							'user_id': user_id,
							'id': $('#fb_edit_id').html(),
							'positionId': tab1_position_id,
							'money': $('#pos_money').val(),
							'cityId': $('#real_city').val(),
							'educationId': $('#pos_min_edu').val(),
							'sexId': 0,
							'age': 0,
							'statusId': 1,
							'ageId': 0,
							'moneyId': $('#pos_money').val()
						};
						console.log(data_form)
						
						$.ajax({
							url: url,
							type: "post",
							data: data_form,
							dataType: 'json',
							beforeSend: function() {},
							success: function(res) {
								// 隐藏 loading
								console.log(res)
								if(res.err_code == 0) {
									window.location.reload();
								} else {
									layer.alert(res.msg, {
										title: 'X职查'
									});
								}
							},
							error: function(res) {
								layer.alert(res.msg, {
									title: 'X职查'
								});
							}
						});
					}

					//职位三级联动
					new Vue({
						el: '#position_name',
						data: function() {
							return {
								value: [],
								options: option_data
							};
						},
						mounted: function() {
							this.getAjax()
						},
						methods: {
							handleChange(value) {
								positionId = value;
							},
							getAjax() {
								//this.value = ["3", "25", "194"]
							}
						}
					});
				} else {
					layer.alert(res.msg, {
						title: 'X职查'
					})
				}
			},
			error: function(res) {
				layer.alert(res.msg, {
					title: 'X职查'
				})
			}
		});
	}
	//编辑
	var city_sr = [];
	function tab1_edit(edit_id) {
		var url = api + 'webAccount/updataPositionView';
		var data_form = {
			'user_id': user_id,
			'id': edit_id
		};
		$.ajax({
			url: url,
			type: "post",
			data: data_form,
			dataType: 'json',
			beforeSend: function() {},
			success: function(res) {
				// 隐藏 loading
				console.log(res)
				if(res.err_code == 0) {
					var position = res.data.position;
					layui.use(['form'], function() {
						var form = layui.form;
						//表单赋值 
						form.val('car_resume_eidt', {
							'pos_min_edu': position.education_id, //在职结束时间
							'pos_money': position.salary_range_id, 
							'province': position.provinces_id, 
							'city': position.work_city_id, 
						});
						city_sr = position;
						console.log(city_sr.work_city_id)
						
						//调用省市接口
						sr_province_and_city();
						$("#position_name input").val(position.position_name); //职位
						$('#tab1_position_id').html(position.position_id)
					});
				} else {
					layer.alert(res.msg, {
						title: 'X职查'
					})
				}
			},
			error: function(res) {
				layer.alert(res.msg, {
					title: 'X职查'
				})
			}
		});
	}
	//删除
	function tab1_del(del_id) {
		var url = api + 'webAccount/deletePosition';
		var data_form = {
			'id': del_id
		};
		$.ajax({
			url: url,
			type: "post",
			data: data_form,
			dataType: 'json',
			beforeSend: function() {},
			success: function(res) {
				// 隐藏 loading
				console.log(res)
				if(res.err_code == 0) {
					layer.alert(res.msg, {
						title: 'X职查'
					}, function() {
						window.location.reload();
					})
				} else {
					layer.alert(res.msg, {
						title: 'X职查'
					})
				}
			},
			error: function(res) {
				layer.alert(res.msg, {
					title: 'X职查'
				})
			}
		});
	}
	//上下线状态
	function tab1_pos_status(status, id) {
		var url = api + 'webAccount/updataPositionStatus';
		var data_form = {
			'mark': status,
			'id': id
		};
		$.ajax({
			url: url,
			type: "post",
			data: data_form,
			dataType: 'json',
			beforeSend: function() {},
			success: function(res) {
				// 隐藏 loading
				console.log(res)
				if(res.err_code == 0) {
					layer.alert(res.msg, {
						title: 'X职查'
					})
				} else {
					layer.alert(res.msg, {
						title: 'X职查'
					}, function() {
						window.location.reload()
					})
				}
			},
			error: function(res) {
				layer.alert(res.msg, {
					title: 'X职查'
				}, function() {
					window.location.reload()
				})
			}
		});
	}

	function sr_province_and_city(){
		//省市联动
		layui.use(['form'], function(){
			var form = layui.form;
			var provinceList = [],
				province = $("#real_province"),
				city = $("#real_city");
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
			//获取省份
			function get_province(){
				console.log('city_sr = '+city_sr)
				var url = api + 'webAccount/Province';
				$.ajax({
					url: url,
					type: "get",
					dataType: 'json',
					beforeSend: function(){},
					success: function(res){
						// 隐藏 loading
						if(res.err_code == 0){
							provinceList = res.data.Province;
							//初始将省份数据赋予
							for (var i = 0; i < provinceList.length; i++) {
								addEle(province, provinceList[i].name, provinceList[i].id);
							}
							//赋予完成 重新渲染select
							form.render('select');
							layui.use(['form'], function() {
								var form = layui.form;
								//表单赋值
								form.val('car_resume_eidt', {
									'province':city_sr.provinces_id, //省份
								});
								get_city(city_sr.provinces_id);
								$("#title_information").attr('readOnly','true')
							});
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
							
							//表单赋值
							form.val('car_resume_eidt', {
								'city':city_sr.work_city_id,   //现居住地城市
							});
							console.log(city_sr.work_city_id)
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
		});
}
})
//查看过的简历详情
function sr_see_resume_detail(resume_information_id) {
	var url = api + 'webAccount/resumeDetails',
	data_form = {
		'user_id': user_id,
		'resume_id': resume_information_id
	}
	$.ajax({
		type: "post",
		url,
		data: data_form,
		dataType: 'json',
		success: function(res) {
			console.log(res)
			var information = res.data.information, //信息
				dataUsers = res.data.users,
				positionList = res.data.positionList, //职位
				background = res.data.education, //教育背景
				dataExperiences = res.data.work_experience; //工作经历
			$('#per_see_resume_div').html(template('per_see_resume_div_templete', {
				'information': information, //基本信息
				'users': dataUsers,
				'experiences': dataExperiences, //工作经历
				'background': background, //教育背景
				'positionList': positionList //求职
			}));

		},
		error: function(res) {
			layer.alert(res.msg, {
				title: 'X职查'
			})
		}
	});
}
/*
	 * 简历推荐
	 */
function get_tj_ajax() {
	var url = api + 'webAccount/RecommendedInfors';
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
			if(res.err_code == 0) {
				//分页
				var totalRecords = res.data.RecommendedInfors.count; //记录总数
				var pageSize = 5; //每页显示条数
				var totalPage = Math.ceil(totalRecords / pageSize); //总页码
				
				var page2_no = localStorage.getItem('page2_num');
				var page2_data_list = res.data.RecommendedInfors.Recommended.slice((page2_no - 1)*5,page2_no*5)
				//简历推荐
				$('#tj_resume').html(template('tj_resume_template', {
					'RecommendedInfors': page2_data_list
				}));
				
				//分页
				if(totalPage >1){
					for(var i = 1; i < totalPage + 1; i++) {
						$('.kk2_page').append('<div class="kk2_page_no fl" onclick="get_tj_ajax(' + i + ');">' + i + '</div>');
					}
					$('.kk2_page_no').click(function(){
						localStorage.setItem('page2_num',$(this).index()+1)
					})
					$('.kk2_page_no').eq(localStorage.getItem('page2_num')-1).addClass('on');
				}else{
					$('.kk_page2').hide();	
				}
				//tab2，上一页，下一页
				$('.kk2_prev').click(function(){
					if(page2_no > 1){
						localStorage.setItem('page2_num',page2_no - 1);
						get_tj_ajax(page2_no - 1);
					}
				}).hover(function(){
					if(page2_no < 2){
						$(this).css({'cursor': 'not-allowed','background-color':'#fff','color':'#dfdfdf'})
					}
				})
				$('.kk2_next').click(function(){
					if(page2_no < totalPage){
						localStorage.setItem('page2_num',parseFloat(page2_no) + 1);
						get_tj_ajax(parseFloat(page2_no) + 1);
					}
				}).hover(function(){
					if(page2_no == totalPage){
						$(this).css({'cursor': 'not-allowed','background-color':'#fff','color':'#dfdfdf'})
					}
				})
					//调用查看简历弹窗
				Call_resume_Popup()
			} else {
				layer.alert(res.msg, {
					title: 'X职查'
				})
			}
		},
		error: function(res) {
			layer.alert(res.msg, {
				title: 'X职查'
			})
		}
	});
}
/*
 * 查看过的简历
 */
function get_seed_ajax(pageNo) {
	var url = api + 'webAccount/purchaseds';
	var data_form = {
		'user_id': user_id,
		'currPagePurchaseds': pageNo
	};

	$.ajax({
		url: url,
		type: "post",
		data: data_form,
		dataType: 'json',
		beforeSend: function() {},
		success: function(res) {
			// 隐藏 loading
			if(res.err_code == 0) {
				//查看过的简历
				$('#see_resume').html(template('see_resume_template', {
					'purchaseds': res.data.purchased.purchased,
					'page3_no': res.data.purchased
				}));
				//调用查看简历弹窗
				Call_resume_Popup()
				//分页
				var totalRecords = res.data.purchased.count; //记录总数
				var pageSize = 5; //每页显示条数
				var totalPage = Math.ceil(totalRecords / pageSize); //总页码
				var page3_no = localStorage.getItem('page3_num');
				
				if(totalPage >1){
					for(var i = 1; i < totalPage + 1; i++) {
						$('.kk3_page').append('<div class="kk3_page_no  fl" onclick="get_seed_ajax(' + i + ');">' + i + '</div>');
					}
					$('.kk3_page_no').click(function(){
						localStorage.setItem('page3_num',$(this).index()+1)
					})
					$('.kk3_page_no').eq(localStorage.getItem('page3_num') - 1).addClass('on');
				}else{
					$('.kk_page3').hide();	
				}
				//tab3，上一页，下一页
				$('.kk3_prev').click(function(){
					if(page3_no > 1){
						localStorage.setItem('page3_num',page3_no - 1);
						get_seed_ajax(page3_no - 1);
					}
				}).hover(function(){
					if(page3_no < 2){
						$(this).css({'cursor': 'not-allowed','background-color':'#fff','color':'#dfdfdf'})
					}
				})
				$('.kk3_next').click(function(){
					if(page3_no < totalPage){
						localStorage.setItem('page3_num',parseFloat(page3_no) + 1);
						get_seed_ajax(parseFloat(page3_no) + 1);
					}
				}).hover(function(){
					if(page3_no == totalPage){
						$(this).css({'cursor': 'not-allowed','background-color':'#fff','color':'#dfdfdf'})
					}
				})
			} else {

			}
		},
		error: function(res) {}
	});
}
//点击查看过的简历出现详情弹窗
function Call_resume_Popup() {
	//点击查看过的简历出现详情弹窗
	$('#see_resume_detail ul').on('click', 'li', function() {
		$('.preview_resume_bg').css('display', 'flex')
		$('.sr_preview_overflow').show()
		sr_see_resume_detail($(this).attr('name'))
	})
	//点击关闭按钮
	$('.sr_preview_overflow #preview_close_id').click(function() {
		$('.sr_preview_overflow').hide()
		$('.preview_resume_bg').css('display', 'none')
	})
	//鼠标滑过简历预览出现变化
	$('.sr_preview_overflow #preview_close_id').mousemove(function() {
		$('.close_white_close').show()
		$(this).find('img').hide()
		$(this).css('background', 'rgba(51,51,51,1)')
	})
	$('.sr_preview_overflow #preview_close_id').mouseleave(function() {
		$('.close_white_close').hide()
		$(this).find('img').show()
		$(this).css('background', '#eeeeee')
	})
	//鼠标滑过预览简历的下载
	//		$('.sr_preview_overflow #preview_close_download').mousemove(function(){
	//			$('.close_white_download').show()
	//			$(this).find('img').hide()
	//			$(this).css('background','rgba(51,51,51,1)')
	//		})
	//		$('.sr_preview_overflow #preview_close_download').mouseleave(function(){
	//			$('.close_white_download').hide()
	//			$(this).find('img').show()
	//			$(this).css('background','#eeeeee')
	//		})
}
