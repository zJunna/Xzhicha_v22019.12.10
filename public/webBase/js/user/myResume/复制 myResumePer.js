$(function() {
	//个人简历
	layui.use(['form', 'laydate', 'layedit'], function() {
		var form = layui.form,
			layer = layui.layer,
			layedit = layui.layedit,
			laydate = layui.laydate;
		//日期
		laydate.render({
			elem: '#date',
			type: 'month'
		});
		laydate.render({
			elem: '#date_start_time',
			type: 'month'
		});
		laydate.render({
			elem: '#date_end_time',
			type: 'month'
		});
		laydate.render({
			elem: '#date_studied_time',
			type: 'month'
		});
		laydate.render({
			elem: '#date_studied_end',
			type: 'month'
		});
		//教育背景时间选择
		laydate.render({
			elem: '#date_studied_time_edit',
			type: 'month'
		});
		laydate.render({
			elem: '#date_studied_end_edit',
			type: 'month'
		});
		//编辑工作经历时间选择
		laydate.render({
			elem: '#date_start_time_eidts',
			type: 'month'
		});
		laydate.render({
			elem: '#date_end_time_eidts',
			type: 'month'
		});
		//监听提交
		form.on('submit(demo1)', function(data) {
			layer.alert(JSON.stringify(data.field), {
				title: '最终的提交信息'
			})
			return false;
		});
		//表单取值
		layui.$('#LAY-component-form-getval').on('click', function() {
			var data = form.val('example');
		});
	})
		
	function per_block_or_none() {
		//点击预览简历出现弹窗
		$('#preview_resume_a').click(function(){
			$('.preview_resume_bg').css('display','flex')
			$('.sr_preview_overflow').show()
		})
		//点击关闭简历隐藏弹窗
		//点击关闭按钮
		$('.sr_preview_overflow #preview_close_id').click(function(){
			$('.sr_preview_overflow').hide()
			$('.preview_resume_bg').css('display','none')
		})
		//鼠标滑过简历预览出现变化
		$('.sr_preview_overflow #preview_close_id').mousemove(function(){
			$('.close_white_close').show()
			$(this).find('img').hide()
			$(this).css('background','rgba(51,51,51,1)')
		})
		$('.sr_preview_overflow #preview_close_id').mouseleave(function(){
			$('.close_white_close').hide()
			$(this).find('img').show()
			$(this).css('background','#eeeeee')
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
		//鼠标移入显示删除编辑按钮
		$('.per_job_option').mouseenter(function() {
			$(this).find($('.per_job_edit_hover')).css('display', 'block')
	
			$(this).find($('.per_job_edit')).css('display', 'none')
		})
		$('.per_job_option').mouseleave(function() {
			$(this).find($('.per_job_edit_hover')).css('display', 'none')
			$(this).find($('.per_job_edit')).css('display', 'block')
		})
		//基本信息
		$('.basic_information .per_edit').click(function() {
			//编辑基本信息内容显示
			$('.Edit_basic_information').css('display', 'block')
			//点击编辑基本信息保存按钮
			$('#per_save_edit').click(function(){
				add_person_data()
			})
			//调用编辑基本信息
			person_data()
			$('.basic_information').css('display', 'none')
		})
		$('.Edit_basic_information .per_give_up').click(function() {
			$('.Edit_basic_information').css('display', 'none')
			$('.basic_information').css('display', 'block')
		})
			//自我评价
		$('.per_self_evaluation_edit .per_edit_self').click(function() {
			SelfEvaluation();
			$('.per_self_evaluation').css('display', 'block')
			$('.per_self_evaluation_edit').css('display', 'none')
		})
		//保存自我评价
		$("#SelfEvaluation").click(function() {
			if($("#SelfEvaluationVal").val() == "") {
				$("#error_SelfEvaluationVal").css("display", "block");
				return false;
			}
			SaveSelfEvaluation();
			$(".per_self_evaluation").css("display", "none")
			$('.per_self_evaluation_edit').css('display', 'block')
		})
		//放弃编辑
		$('.per_self_evaluation .car_cancel').click(function() {
			$('.per_self_evaluation_edit').css('display', 'block')
			$('.per_self_evaluation').css('display', 'none')
		})
		//字数限制
		window.wordLeg = function(obj) {
			var currleg = $(obj).val().length;
			var length = $(obj).attr('maxlength');
			if(currleg > length) {
				layer.msg('字数请在' + length + '字以内');
			} else {
				$('.text_count').text(currleg);
			}
		};
		//求职意向  点击添加求职意向
		
		$('.Job_intention .per_edit').click(function() {
			$('.Add_job_intention').css('display', 'block')
				//添加求职意向
				//点击添加求职意向时调用接口  
				Add_job_edit_enter()
				get_province_and_city_two()
				//职位三级联动
				new Vue({
					el: '#position_name_per',
					data: function() {
						return {
							value: [],
							options: option_data
						};
					},
					mounted: function(){
						this.getAjax()
					},
					methods: {
						handleChange(value) {
							console.log(value);
							positionId = value;
							console.log(positionId[2]);
							
				//$('#look_position_value').val(positionId[2])
						},
						getAjax(){
							console.log('三级联动')
						}
					}
				});
				//console.log($('#look_position_value').val)
				//点击添加求职意向按钮  保存
			$('#save_Add_job_intention').click(function(){
				var position_name_per = $('#position_name_per .el-cascader input').val(),  //期待职位
					per_Salary = $('.per_salary_select').val(),   //薪资要求
					per_province = $('#per_job_province').val(),  //省份
					per_city = $('#per_job_city').val();      //城市
					//职位
				if(position_name_per == null || position_name_per == ''){
					$('#position_name_per .el-cascader .el-input__inner').css('border', '1px solid ##E73637!important')
					$('.tip_look_position').show()
				}else{
					$('.tip_look_position').hide()
					//薪资
					if(per_Salary == null || per_Salary == ''){
						$('.per_salary input').css('border-color','#E73637')
						$('.tip_Job_category').show()
					}else{
						$('.per_salary input').css('border-color','#e6e6e6')
						$('.tip_Job_category').hide()
						//省份
						if(per_province == null || per_province == ''){
							$('.per_see_province input').css('border-color','#E73637')
							$('.tip_province_add').show()
						}else{
							$('.per_see_province input').css('border-color','#e6e6e6')
							$('.tip_province_add').hide()
							//城市
							if( per_city == null || per_city == '' || per_city == 0){
								$('.per_see_city input').css('border-color','#E73637')
								$('.tip_city_add').show()
							}else{
								$('.per_see_city input').css('border-color','#e6e6e6')
								$('.tip_city_add').hide()
//							console.log($('#per_job_position_length').val() + '吧时DV ')
							//保存编辑的求职意向
							save_Add_job_intention()
							//调用添加求职意向的保存按钮
							//职位信息无内容
							//点击保存添加时调用编辑求职意向
							}
						}
					}
				}
			})
			$('.Job_intention').css('display', 'none')

		})
		//取消添加求职意向
		$('.Add_job_intention .car_cancel').click(function() {
//			$('.Add_job_intention').css('display', 'none')
//			$('.Job_intention').css('display', 'block')
			location.reload()
		})
		//添加工作经历
		//添加工作经历
		//工作经历    点击添加工作经历
		$('.Work_Jingl .per_edit').click(function() {
			$('.Work_Jingl').css('display', 'none')
			$('.Add_work_experience').css('display', 'block')
			//职位三级联动
			new Vue({
				el: '#car_job_categories',
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
						//console.log(value);
						positionId = value;
					},
					getAjax() {
						//console.log('三级联动')
						//this.value = ["3", "25", "194"]
					}
				}
			});
		})

		//取消添加工作经历
		$(".car_cancel_work").click(function() {
			$(".Add_work_experience ").css('display', 'none')
			$('.Work_Jingl').css('display', 'block')
		})
			//保存工作经历 work_error_com   company_name
		$(".car_work_experience").click(function() {

			if($('.company_name').val() == '') {
				$('#car_add_error_work').css('display', 'block')
				return false;
			} else {
				$('#car_add_error_work').css('display', 'none')
			}

			if($('#date_start_time').val() == '') {
				$('#car_error_date_end_time').css('display', 'inline-block')
				return false;
			} else {
				$('#car_error_date_end_time').css('display', 'none')
			}

			if($('#date_end_time').val() == '') {
				$('#car_error_date_end_time').css('display', 'inline-block')
				return false;
			} else {
				$('#car_error_date_end_time').css('display', 'none')
			}

			if($('#car_job_categories_eidt input').val() == '') {
				$('#car_job_categories_time').css('display', 'inline-block')
				return false;
			} else {
				$('#car_job_categories_time').css('display', 'none')
			}
			if($('#car_work_content').val() == '') {
				$('#car_error_work_content').css('display', 'block')
				return false;
			} else {
				$('#car_error_work_content').css('display', 'none')
			}
			saveAddWorks();
			$('.car_Work_Jingl').css('display', 'block')
			$('.Add_work_experience').css('display', 'none')

		})
			//编辑工作经历

		$(".carUpdataWorkEdit").click(function() {
			updataWork($(this).attr("updeta_work"));
			$('.Add_work_experience_eidts').css('display', 'block')
			$('.Work_Jingl').css('display', 'none')

			//职位三级联动
			new Vue({
				el: '#car_job_categories_work',
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
						//	console.log(value);
						positionId = value;
						$('#sr_gongzuojingli').val(positionId[2])
						console.log(positionId[2])
					},
					getAjax() {
						//console.log('三级联动')
						//this.value = ["3", "25", "194"]
					}
				}
			});

		})
			//保存编辑工作经历
		$(".car_work_experience_eidts_btn").click(function() {

			if($('#company_name_eidts').val() == '') {
				$('#work_error_com').css('display', 'block')
				return false;
			} else {
				$('#work_error_com').css('display', 'none')
			}

			if($('#date_start_time_eidts').val() == '' || $('#date_end_time_eidts').val() == '') {
				$('#work_error_time_eidts').css('display', 'inline-block')
				return false;
			} else {
				$('#work_error_time_eidts').css('display', 'none')
			}

			if($('#car_job_work_name input').val() == '') {
				$('#work_error_work_name').css('display', 'inline-block')
				return false;
			} else {
				$('#work_error_work_name').css('display', 'none')
			}

			if($('#car_work_textarea_eidts').val() == '') {
				$('#work_error_work_textarea_eidts').css('display', 'block')
				return false;
			} else {
				$('#work_error_work_textarea_eidts').css('display', 'none')
			}

			$('.Add_work_experience_eidts').css('display', 'none')
			$('.car_Work_Jingl').css('display', 'block')
			updateWorks();
		})
			//取消编辑工作经历
		$('.Add_work_experience_eidts .car_cancel').click(function() {
//			$('.Add_work_experience_eidts').css('display', 'none')
//			$('.car_Work_Jingl').css('display', 'block')
			window.location.reload();
		})

		//删除工作经历
		$(".carUpdataWorkDelete").click(function() {
			//alert(1);
			deteteWork($(this).attr("detele_work"));

		})
		//教育背景
		//添加
		$('.Educational_background .per_edit').click(function() {
			$('.Educational_background').css('display', 'none')
			$('.Add_educational_background').css('display', 'block')
		})
		//取消编辑
		$('.Add_educational_background .car_cancel').click(function() {
			$('.Add_educational_background').css('display', 'none')
			$('.Educational_background').css('display', 'block')
			$(".per_job_option").css("display", "block");

		})
		//点击添加教育背景
		$("#car_education").click(function() {
			if($("#car_add_school").val() == "") {
				$("#car_add_error_school").css("display", "block");
				return false;
			}

			if($("#car_education_id").val() == "") {
				$("#car_add_error_education").css("display", "block");
				return false;
			}

			if($("#car_add_profession").val() == "") {
				$("#car_add_error_profession").css("display", "block");
				return false;
			}
			if($("#date_studied_time").val() == "") {
				$("#car_add_error_studied_time").css("display", "block");
				return false;
			}
			if($("#date_studied_end").val() == "") {
				$("#car_add_error_studied_time").css("display", "block");

				return false;
			}

			education_background();
			$(".Add_educational_background").css('display', 'none')
			$('.Educational_background').css('display', 'block')
		})
		//点击编辑教育背景
		$(".car_educational_edit").click(function() {
			update_educational($(this).attr("update_id"));
			$('.edit_educational_background').css('display', 'block');
			$(".Educational_background").css("display", "none");
		})
		//取消编辑
		$('.edit_educational_background .car_cancel').click(function() {
			$('.edit_educational_background').css('display', 'none')
			$('.Educational_background').css('display', 'block');

		})
		//点击保存编辑

		$("#car_education_edit").click(function() {
			if($("#car_add_school_edit").val() == "") {
				$("#car_edit_error_school").css("display", "block");
				return false;
			}
			if($("#car_education_id_edit").val() == "") {
				$("#car_edit_error_education").css("display", "block");
				return false;
			}
			if($("#car_add_profession_edit").val() == "") {
				$("#car_edit_error_profession").css("display", "block");
				return false;
			}
			if($("#date_studied_time_edit").val() == "") {
				$("#car_edit_error_studied_time").css("display", "block");
				return false;
			}
			if($("#date_studied_end_edit").val() == "") {
				$("#car_edit_error_studied_time").css("display", "block");
				return false;
			}
			SaveEdit();
			$('.edit_educational_background').css('display', 'none');
			$(".per_job_option").css("display", "block");
		})

		//删除教育背景
		$(".remove_education").click(function() {
			delete_edu($(this).attr("delete_id"));
		})
		//删除求职意向
		$('.per_job_edit_delete').click(function(){
			delect_job_intention($(this).attr("delete_job_edit"))
		})
				//点击编辑求职意向
			$('.per_job_option .per_job_edit_edit').click(function(){
				$('.Add_job_intention h5').html('添加求职意向')
				//调用编辑求职信息接口
				Add_job_intention_edit($(this).attr("add_job_edit"))
				//获取省市
				$('#per_city_idlll').val($(this).attr("add_job_edit"))
//				//调用城市
//					get_province_and_city_two()
				$('.Add_job_intention').css('display', 'block')
				$('.Add_job_intention h5').html('编辑求职经历')
				new Vue({
					el: '#position_name_per',
					data: function() {
						return {
							value: [],
							options: option_data
						};
					},
					mounted: function(){
						this.getAjax()
					},
					methods: {
						handleChange(value) {
							console.log(value);
							positionId = value;
						console.log(positionId[2]);
						$('#look_position_value').val(positionId[2])
						},
						getAjax(){
							//console.log('三级联动')
			//				this.value = ["3", "25", "194"]
						}
					}
				});
				//点击保存求职经历
				$('#save_Add_job_intention').click(function(){
					var position_name_per = $('#position_name_per .el-cascader input').val(),  //期待职位
					per_Salary = $('.per_salary_select').val(),   //薪资要求
					per_province = $('#per_job_province').val(),  //省份
					per_city = $('#per_job_city').val();      //城市
					if(position_name_per == null || position_name_per == ''){
						$('#position_name_per .el-cascader .el-input__inner').css('border', '1px solid ##E73637!important')
						$('.tip_look_position').show()
					}else{
						$('.tip_look_position').hide()
						//薪资
						if(per_Salary == null || per_Salary == ''){
							$('.per_salary input').css('border-color','#E73637')
							$('.tip_Job_category').show()
						}else{
							$('.per_salary input').css('border-color','#e6e6e6')
							$('.tip_Job_category').hide()
							//省份
							if(per_province == null || per_province == ''){
								$('.per_see_province input').css('border-color','#E73637')
								$('.tip_province_add').show()
							}else{
								$('.per_see_province input').css('border-color','#e6e6e6')
								$('.tip_province_add').hide()
								//城市
								if( per_city == null || per_city == '' || per_city == 0){
									$('.per_see_city input').css('border-color','#E73637')
									$('.tip_city_add').show()
								}else{
									$('.per_see_city input').css('border-color','#e6e6e6')
									$('.tip_city_add').hide()
									
								//调用添加求职意向的保存按钮
								//职位信息无内容
								//点击保存添加时调用编辑求职意向
								save_job_intention()
								}
							}
						}
					}
				})
				$('.Job_intention').css('display', 'none')
			})
		}

	//我的简历的数据请求
	Edit_basic_information()
	function Edit_basic_information() {
		var url = api + 'webAccount/userWebResume',
			data_form = {
				'user_id': user_id
			}
		$.ajax({
			type: "post",
			url,
			data: data_form,
			dataType: 'json',
			success: function(res) {
				console.log(res)
				if(res.err_code == 0) {
					//console.log(dataInformation)
					var dataInformation = JSON.parse(res.data.info).data.information,//基本信息
						dataUsers = JSON.parse(res.data.info).data.users,  //用户
						dataExperiences = JSON.parse(res.data.info).data.experiences,  //工作经历
						databackground = JSON.parse(res.data.info).data.background,  //教育背景
						positionList = JSON.parse(res.data.info).data.positionList;   //职位
					$('#Curriculum_vitae').html(template('Curriculum_vitae_script', {
						'information': dataInformation,
						'users': dataUsers,
						'experiences': dataExperiences,
						'background': databackground,
						'positionList':positionList
					}));

					//点击编辑出现编辑内容
					per_block_or_none()
					//如果职位已经存在两条时隐藏添加按钮
					if(positionList.length == 2){
						$('.per_add_edit').css('display','none')
					}else{
						$('.per_add_edit').css('display','block')
					}
				} else {
					layer.alert(res.err_code, {
						title: 'X职查'
					})
				}
			},
			error: function(res) {
				//console.log(res)
			}
		});
	}
	//个人资料——即——基本信息  点击编辑调用接口
	function person_data(){
		var url = api + 'webAccount/userInfoViews',
			data_form = {
				'user_id':user_id
			};
		$.ajax({
			type:"post",
			url,
			dataType:'json',
			data:data_form,
			success:function(res){
				//获取身份证号
				var idNumber = res.data.information.id_number,
				 birth = idNumber.substring(6, 10) + "-" + idNumber.substring(10, 12) + "-" + idNumber.substring(12, 14);
				//console.log(res);
				if(res.err_code == 0){
					aaa = res.data
					var users = res.data.users,//基本信息
						sex;  //性别
					//表单赋值
					if(users.sex == 0){
						sex = '男'
					}else{
						sex = '女'
					}
					//获取省市
					get_province_and_city()
//				console.log(res.data.provinces_id)
//				console.log(res.data.information.city_id)
				layui.use(['form'], function() {
					var form = layui.form;
					//追加数据民族
					for (var i = 60; i <= 115; i++){
						race_name += '<option value="' + res.data.operations[i].id  + '">' + res.data.operations[i].name  + '</option>';
					}
					$('#race_name').html(race_name)
					//执行民族渲染步骤
					form.render();//没有写这个，操作后没有效果
					//表单赋值
					form.val('EditInformation', {
						'title_information':users.reality_name,  //姓名
						'race_name':res.data.information.race_id,  //民族   
						'edit_sex':sex,  //性别
						'date1':birth,//出生日期
						'title_phone':users.mobile,  //手机号
						'title_email':users.email,   //邮箱
					});
					$('#real_city').val(res.data.provinces_id)
					$("#title_information").attr('readOnly','true')
				});
				//向select 中追加学历内容
				}else{
					layer.alert(res.err_code,{
						'title':"X职查"
					})
				}
			},
			error:function(res){
				console.log(res)
			}
		});
	}
	
	//添加个人资料  保存
	function add_person_data(){
		var url = api + 'webAccount/addUserInfo',
		data_form = {
			'user_id':user_id,
			'city_id':$('#real_city').val(),         //城市id
			'race_id':$('#race_name').val(),         //民族id
			'mobile':$('#per_phone').val(),             //手机号
			'email':$('#per_email').val()                //邮箱
		}
		$.ajax({
			type:'post',
			url:url,
			data:data_form,
			dataType:'json',
			success:function(res){
				if(res.err_code == 0){
					//console.log(res)
					window.location.reload()
				}else{
					layer.alert(res.msg,{
						'title':'X职查'
					})
				}
			},
			error:function(res){
				console.log(res)
			}
		})
	}

	//编辑求职意向  
	function save_job_intention(){
		var url = api + 'webAccount/modifyPosition',
		data_form = {
			'user_id':user_id,
			'position_id':$('#look_position_value').val(),   //职位ID
			'workcity_id':$('#per_job_city').val(),   //城市id
			'salary_expectation':$('.per_salary_select').val(), //薪资
			'id':$('#per_city_idlll').val()
		};
		console.log($('#look_position_value').val())
		console.log($('#per_job_city').val())
		$.ajax({
			type:"post",
			url,
			data:data_form,
			datatype:'json',
			success:function(res){
				//console.log(res)
				window.location.reload()
			},
			error:function(res){
				console.log(res)
			}
		});
	}
	//删除求职意向
	function delect_job_intention(delete_job_edit){
		var url = api + 'webAccount/deletePositionl',
		data_form = {
			'user_id':user_id,
			'id':delete_job_edit
		};
//		console.log(delete_job_edit+'删除')
//		console.log(user_id+'c6c6c6')
		$.ajax({
			type:"post",
			url,
			data:data_form,
			datatype:'json',
			success:function(res){
				//console.log(res)
				window.location.reload()
			},
			error:function(res){
				console.log(res)
			}
		});
	}
	//编辑   保存
	var add_job_city = [];//城市
	function Add_job_intention_edit(add_job_edit){
		var url = api + 'webAccount/positionViews',
		data_form = {
			'user_id':user_id,
			'id':add_job_edit
		};
		//console.log(data_form.id)
		$.ajax({
			type:"post",
			url,
			data:data_form,
			datatype:'json',
			success:function(res){
						//调用城市
			get_province_and_city_two()
			var positionList = JSON.parse(res).data.positionList
				console.log(positionList)
				$('#look_position_value').val(positionList[add_job_edit].position_id)
				console.log($('#look_position_value').val())
				add_job_city = positionList[data_form.id]  //城市
				//console.log(add_job_city)
				//console.log(positionList[0])
				layui.use(['form'], function() {
					var form = layui.form;
					//表单赋值  求职信息
					form.val('job_search', {
						'salary_requirement':positionList[data_form.id].salary_id,    //薪资要求
					});
					//职位名称赋值
					$('.look_position input').val(positionList[data_form.id].positionname)
				});
			},
			error:function(res){
				console.log(res)
			}
		});
	}
	//点击进入开始调用求职信息
	function Add_job_edit_enter(){
		var url = api + 'webAccount/positionViews',
		data_form = {
			'user_id':user_id
		};
			$.ajax({
			type:"post",
			url,
			data:data_form,
			datatype:'json',
			success:function(res){
			var positionList = JSON.parse(res).data.positionList
//				console.log(positionList)
//				console.log(positionList.length)
				$('#per_job_position_length').val(positionList.length)

			},
			error:function(res){
				console.log(res)
			}
		});
	}
	//保存添加求职意向  有一条
	//职位名称 - id
	//一条都没有
	var positionId = [];
	function save_Add_job_intention(){
		var url = api + 'webAccount/addPositionl',
			length = $('#per_job_position_length').val(),
			position_id,   //职位id
			city_id; //城市ID
		//console.log(length + 'positionList的长度')
		 if(length == undefined){
		 	position_id = positionId[2]  //职位id
		 	city_id  = $('#per_job_city').val()  //城市id
		 }else if(length == 1){
		 	position_id = $("#per_position_id").val() + ',' + positionId[2],  //职位id
		 	city_id = $("#per_city_id").val() + ',' + $('#per_job_city').val()   //城市id
		 }
		 //console.log(position_id)
		 //console.log(city_id)
		 
		var	data_form = {
				'user_id':user_id,
				'position_id':position_id,  //职位
				'workcity_id':city_id,   //城市
				'salary_expectation':$('.per_salary_select').val()      //薪资
			}
		$.ajax({
			type:"post",
			url,
			dataType:'json',
			data:data_form,
			success:function(res){
				//console.log(res)
				window.location.reload()
			},
			error:function(res){
				console.log(res)
			}
		});
	}
		//保存教育背景/api/webAccount/saveAddEducationals
	function education_background() {
		var url = api + 'webAccount/saveAddEducationals';
		var data_form = {
			'user_id': user_id, //用户id
			'name': $("#car_add_school").val(), //学校名称
			'education_id': $("#car_education_id").val(), //学历
			'specialty': $("#car_add_profession").val(), //专业
			'time': $("#date_studied_time").val(), //入学时间
			'expirationtime': $("#date_studied_end").val() //毕业时间
		}
		//alert(data_form.id+"kkkk");
		$.ajax({
			type: "post",
			url: url,
			data: data_form,
			dataType: 'json',
			success: function(res) {
				if(res.err_code == 0) {
					//alert(11);
					window.location.reload()
				} else {
					layer.alert(res.err_code, {
						title: 'X职查'
					})
				}
			},
			error: function(res) {
				console.log(res)
			}

		});

	}
	//跳转编辑教育背景页面 
	function update_educational(update_id) {
		//console.log(update_id);
		var url = api + 'webAccount/updateEducational';
		var data_form = {
			'id': update_id
		}
		$.ajax({
			type: "post",
			url: url,
			data: data_form,
			dataType: 'json',
			success: function(res) {
				//console.log(res);
				var background = res.data.background;
				var tititii = res.data.background.id;
				layui.use(['form'], function() {
					var form = layui.form;
					//表单赋值
					form.val('edit_educational_background', {
						'car_end_id': background.id, //id
						'car_add_school_edit': background.name, //学校名
						'car_education_id_edit': background.education_id, //学历
						'car_add_profession_edit': background.specialty, //专业
						'date_studied_time_edit': background.schoolTime, //入学时间
						'date_studied_end_edit': background.schoolEndTime, //毕业时间
					});
				});
			}

		})
	}
	//保存编辑的简历
	function SaveEdit() {
		//console.log($("#car_end_id").val())
		var url = api + 'webAccount/updateEducationals';
		var data_form = {
			'id': $("#car_end_id").val(),
			'user_id': user_id, //用户id
			'name': $("#car_add_school_edit").val(), //学校名称
			'education_id': $("#car_education_id_edit").val(), //学历
			'specialty': $("#car_add_profession_edit").val(), //专业
			'time': $("#date_studied_time_edit").val(), //入学时间
			'expirationtime': $("#date_studied_end_edit").val() //毕业时间
		}
		$.ajax({
			type: "post",
			url: url,
			data: data_form,
			dataType: "json",
			success: function(res) {
				//console.log(res)
				window.location.reload()

			},error:function(res){
				console.log(res)
			}
		});

	}
	//删除教育背景api/webAccount/deleteEducational 
	function delete_edu(delete_id) {
		var url = api + 'webAccount/deleteEducational ';
		var data_form = {
			'id': delete_id
		}
		$.ajax({
			type: "post",
			url: url,
			data: data_form,
			dataType: "json",
			success: function(res) {
				console.log(res);
				window.location.reload()
			}
		});
	}
		//自我评价
	//跳转编辑弹窗
	function SelfEvaluation() {
		var url = api + "webAccount/selfAppraiseViews";
		var data_form = {
			"user_id": user_id
		}
		$.ajax({
			type: "post",
			url: url,
			data: data_form,
			dataType: 'json',
			success: function(res) {
				//console.log(res);
					var information = res.data.information;
					//console.log(information.self_appraise)
				layui.use(['form'], function() {
					var form = layui.form;
					//表单赋值
					form.val('edit_educational_background', {
					});
					$("#SelfEvaluationVal").val(information.self_appraise)//自我评价内容
				});
				
			}
		});
	}
	//保存自我评价的内容
	function SaveSelfEvaluation() {
		var url = api + "webAccount/addSelfAppraise";
		var data_form = {
			"user_id": user_id,
			"self_appraise": $("#SelfEvaluationVal").val()
		}
		$.ajax({
			type: "post",
			url: url,
			data: data_form,
			dataType: 'json',
			success: function(res) {
				//console.log(res);
				window.location.reload()
			}
		});
	}
	//工作经历 添加工作经历
	function saveAddWorks() {
		var url = api + 'webAccount/saveAddWorks';
		var data_form = {
			'user_id': user_id, //用户id
			'name': $(".company_name").val(), //公司名称
			'position_id': positionId[2], //职位id
			'work_content': $("#car_work_content").val(), //工作内容
			'time': $("#date_start_time").val(), //在职开始时间
			'expirationtime': $("#date_end_time").val() //在职结束时间
		}
		$.ajax({
			type: "post",
			url: url,
			data: data_form,
			dataType: 'json',
			success: function(res) {
				window.location.reload();
			},
			error: function(res) {
				layer.alert(res.err_code, {
					title: 'X职查'
				})
			}
		});
	}

	//编辑工作经历
	function updataWork(updeta_work) {
		var url = api + "webAccount/updataWork",
		 data_form = {
			'id': updeta_work,
			'user_id': user_id
		}
		$.ajax({
			type: "post",
			url: url,
			data: data_form,
			dataType: "json",
			success: function(res) {
				console.log(res);
				var experiences = res.data.experiences;
				layui.use(['form'], function() {
					var form = layui.form;
					//表单赋值 
					form.val('car_work_experience_eidts', {
						'car_end_workid': experiences.id,
						'company_name_eidts': experiences.name, //公司名称
						'car_work_textarea_eidts': experiences.work_content, //工作内容
						'date_start_time_eidts': experiences.workTime, //在职开始时间
						'date_end_time_eidts': experiences.workEndTime, //在职结束时间
					});
					$(".car_job_work_name input").val(experiences.position_name); //职位名称
					$('#sr_gongzuojingli').val(experiences.position_id)
					console.log(experiences.position_id)
				});
			},
			error: function(res) {
				layer.alert(res.err_code, {
					title: 'X职查'
				})
			}
		})
	}

	//修改工作经历保存
	var positionId = [];

	function updateWorks() {
		var url = api + "webAccount/updateWorks";

		var data_form = {
			'user_id': user_id,
			'id': $("#car_end_workid").val(),
			'name': $("#company_name_eidts").val(),
			'position_id': $('#sr_gongzuojingli').val(),
			'work_content': $("#car_work_textarea_eidts").val(),
			'time': $("#date_start_time_eidts").val(),
			'expirationtime': $("#date_end_time_eidts").val(),
		}
		
		console.log($('#sr_gongzuojingli').val())
		$.ajax({
			type: "post",
			url: url,
			data: data_form,
			dataType: "json",
			success: function(res) {
				window.location.reload();
			},
			error: function(res) {
				layer.alert(res.err_code, {
					title: 'X职查'
				})
			}
		});
	}
	//删除工作经历
	function deteteWork(detele_work) {
		var url = api + 'webAccount/deteteWork';
		var data = {
			'id': detele_work
		}
		$.ajax({
			type: "post",
			url: url,
			data: data,
			dataType: 'json',
			success: function(res) {
				window.location.reload();
			},
			error: function(res) {
				layer.alert(res.err_code, {
					title: 'X职查'
				})
			}
		});
	}
	function get_province_and_city(){
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
			var url = api + 'webAccount/Province';
			$.ajax({
				url: url,
				type: "get",
				dataType: 'json',
				beforeSend: function(){},
				success: function(res){
					// 隐藏 loading
					//console.log(res)
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
							form.val('EditInformation', {
								'province':aaa.provinces_id, //省份
							});
							console.log(aaa.provinces_id)
							get_city(aaa.provinces_id);
//							$('#real_city').val(res.data.provinces_id)
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
					//console.log(res)
					if(res.err_code == 0){
						$.each(res.data.getCity, function(i, item) {
							addEle(city, item.name, item.id);
						})
						//重新渲染select 
						form.render('select');
						//表单赋值
						form.val('EditInformation', {
							'city':aaa.information.city_id,   //现居住地城市
						});
						console.log(aaa.information.city_id)
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
		function get_province_and_city_two(){
	//省市联动
	layui.use(['form'], function(){
		var form = layui.form;
		var provinceList = [],
			province = $("#per_job_province"),
			city = $("#per_job_city");
		
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
			console.log('调用省份')
			var url = api + 'webAccount/Province';
			$.ajax({
				url: url,
				type: "get",
				dataType: 'json',
				beforeSend: function(){},
				success: function(res){
					// 隐藏 loading
					//console.log(res)
					if(res.err_code == 0){
						provinceList = res.data.Province;
						//初始将省份数据赋予
						for (var i = 0; i < provinceList.length; i++) {
							addEle(province, provinceList[i].name, provinceList[i].id);
						}
						//赋予完成 重新渲染select
						form.render('select');
						//求职信息的城市赋值
						layui.use(['form'], function() {
							var form = layui.form;
							//表单赋值
						//console.log(add_job_city.province_id)
							form.val('job_search', {
								'province':add_job_city.province_id, //省份
							});
							//console.log(add_job_city.province_id1)
							get_city(add_job_city.province_id);
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
					//console.log(res)
					if(res.err_code == 0){
						$.each(res.data.getCity, function(i, item) {
							addEle(city, item.name, item.id);
						})
						//重新渲染select 
						form.render('select');
						//表单赋值
						form.val('job_search', {
							'city':add_job_city.workcity_id,   //现居住地城市
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