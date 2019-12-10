$(function() {

	layui.use(['form'], function() {

	})
	que_risk_assessment();

	$(".que_risk_Pop_ups_del").click(function() {
		$(".que_risk_Pop_ups").css("display", 'none');
	})

	$(".que_risk_Pop_ups_btn").click(function() {
		$(".que_risk_Pop_ups").css("display", 'none');
	})

	function que_risk_assessment() {
		var url = api + 'webAccount/CreditManagementApi/riskAssessmentText';
		$.ajax({
			type: "get",
			url: url,
			dataType: 'json',
			beforeSend: function() {},
			success: function(res) {

				//console.log(res);

				data_info = res;
				$('#que_risk_question').html(template('risk_assessment_template', data_info));
				//选项
				$('.que_click_option dd').click(function() {
					var n = $(this).parent().index() + 1;
					$(this).addClass('que_on').siblings().removeClass('que_on')
				});
				//提交
				$('.que_risk_question_btn').click(function() {
					if($('.que_on').length < 15) {
						var n = 15 - $('.que_on').length;
						//alert('没做完'+ n)
						$(".que_not_answered span").html(n)
						$(".que_risk_Pop_ups").css("display", "flex");
					} else {
						//ajax
						post_qes();
						Polyline();
					}
				})
			}
		});
	};
	//上传风险测评     饼形图
	function post_qes() {
		var url = api + 'webAccount/CreditManagementApi/riskAssessment';
		var qes_data = '';
		$('.que_on').each(function(i) {
			qes_data = qes_data + $('.que_on').eq(i).attr('id') + ',';
			//console.log(qes_data);
		})
		qes_data = qes_data.substring(0, qes_data.length - 1);
		var data_form = {
			'user_id': user_id,
			'identity_status': identity_status,
			'answerId': qes_data,
		};
		//饼形图  定义饼形图     样例
		var myChart2 = echarts.init(document.getElementById('main2'));
		option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}"
			},
			color: ['#0ACAA0', '#FFB563', '#7A74FF', '#F35556'],
			legend: {
				type: 'scroll',
				orient: 'vertical',
				right: 10,
				top: 50,
				bottom: 20,
				itemGap: 15,
				//y:'center',

				data: ['', '', '', ' '],
				icon: "roundRect",
				   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
				itemWidth: 10,
				  // 设置宽度
				itemHeight: 10, // 设置高度
				//itemGap: 40 // 设置间距
			},
			series: [{
				name: '提升建议',
				type: 'pie',
				radius: ['45%', '70%'],
				center: ['20%', '50%'],
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: false,
						//position: 'center'
						lineStyle: {
							color: '#000'
						}
					},
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data: [{
						value: '',
						name: ''
					},
					{
						value: '',
						name: ''
					},
					{
						value: '',
						name: ''
					},
					{
						value: '',
						name: ''
					},

				]
			}]
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
					//console.log(res)

					$(".res_risk_results").css("display", "block")
					$(".que_risk_assessment_box").css("display", "none")
					//测评结果页
					var date = new Date(res.data.time);
					Y = date.getFullYear() + '-';
					M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
					//D = (date.getDate() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '';
					D = (date.getDate() + 1 < 10 ? '0' + (date.getDate()) : date.getDate()) + '';
					//D = date.getDate() + '';
					YMD = Y + M + D;
					//console.log(Y + M + D);
					res.data.time = YMD;
					//console.log(res.data.time);

					$('#mmmm').html(template('mmmm_template', res.data));
					$('#res_risk_strength').html(template('res_risk_template', res.data));
					//获取登录后的头像
					$(".res_left_inform_img img").attr('src', x_user.photo);
					if(res.data.sum < 60) {
						$('.res_risk_degree_box').find('span').eq(2).addClass('on');
					} else if(res.data.sum >= 80) {
						$('.res_risk_degree_box').find('span').eq(0).addClass('on');
					} else {
						$('.res_risk_degree_box').find('span').eq(1).addClass('on');
					}
					var text = $('.res_risk_degree_box .on').html();
					//console.log($('.res_risk_degree_box .on').html());
					$(".res_risk_read").html(text);
					//					console.log(res.data.questions);
					//					console.log(res.data.question1);
					//					console.log(res.data.question2);
					//					console.log(res.data.question3);
					//					console.log(res.data.sum);
					var questions = res.data.questions;
					var question1 = res.data.question1;
					var question2 = res.data.question2;
					var question3 = res.data.question3;

					//饼形图  添加 data 的数据
					myChart2.setOption({
						legend: {
							type: 'scroll',
							orient: 'vertical',
							right: 10,
							top: 50,
							bottom: 20,
							itemGap: 15,

							data: ['避免个人信息泄露' + ': (' + questions + '%)', '及时处理逾期' + ': (' + question1 + '%)', '及时处理不良信息' + ': (' + question2 + '%)', '提高芝麻信用分' + ': (' + question3 + '%)'],

						},
						series: [{
							data: [{
									value: questions,
									name: '避免个人信息泄露' + ': (' + questions + '%)'
								},
								{
									value: question1,
									name: '及时处理逾期' + ': (' + question1 + '%)'
								},
								{
									value: question2,
									name: '及时处理不良信息' + ': (' + question2 + '%)'
								},
								{
									value: question3,
									name: '提高芝麻信用分' + ': (' + question3 + '%)'
								}
							]
						}]
					})

				} else {

					layer.alert(res.msg, {
						title: 'X职查'
					});
				}

				save_sroce(data_form);
				save_questions(data_form);
			},
			error: function(res) {
				layer.alert(res.msg, {
					title: 'X职查'
				})
			}

		});
		//调用饼形图
		myChart2.setOption(option);
	}

	//获取日期
	function getBeforeDate(n) { //n为你要传入的参数，当前为0，前一天为-1，后一天为1
		var date = new Date();
		var year, month, day;
		date.setDate(date.getDate() + n);
		year = date.getFullYear();
		month = date.getMonth() + 1;
		day = date.getDate();
		s = (month < 10 ? ('0' + month) : month) + '.' + (day < 10 ? ('0' + day) : day);
		return s;
	}
	//上传的折线图
	//上传风险测评     折线图

	function Polyline() {
		var url = api + 'webAccount/CreditManagementApi/riskAssessment';
		var qes_data = '';
		$('.que_on').each(function(i) {
			qes_data = qes_data + $('.que_on').eq(i).attr('id') + ',';
			//console.log(qes_data);
		})
		qes_data = qes_data.substring(0, qes_data.length - 1);
		var data_form = {
			'user_id': user_id,
			'identity_status': identity_status,
			'answerId': qes_data,

		};
		//折线图形  定义饼形图     样例
		var ZmyChart = echarts.init(document.getElementById('main'));
		option = {
			xAxis: {
				type: 'category',
				/*boundaryGap: false,*/
				axisLine: {
					lineStyle: {
						color: '#666',
						width: 1
					}

				},

				data: [], //日期
			},
			yAxis: [{
				type: 'value',
				//type: 'category',
				min: 0,
				max: 100,
				axisLine: {
					lineStyle: {
						color: '#666'
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#ccc', //坐标线
						type: 'solid'
					}
				},

			}],

			series: [{
				data: [], //数值
				type: 'line',
				symbol: 'circle', //设定为实心点
				symbolSize: 6, //设定实心点的大小
				itemStyle: {
					normal: {
						color: '#616cff',
						lineStyle: {
							color: '#616CFF'
						}
					}
				},
				
			}]
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
					//					console.log(res)

					$(".res_risk_results").css("display", "block")
					$(".que_risk_assessment_box").css("display", "none")
					//测评结果页
					var date = new Date(res.data.time);
					Y = date.getFullYear() + '-';
					M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
					//D = (date.getDate() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '';
					D = (date.getDate() + 1 < 10 ? '0' + (date.getDate()) : date.getDate()) + '';
					//D = date.getDate() + '';
					YMD = Y + M + D;
					//console.log(Y + M + D);
					res.data.time = YMD;
					//console.log(res.data.time);
					$('#mmmm').html(template('mmmm_template', res.data));
					$('#res_risk_strength').html(template('res_risk_template', res.data));
					//获取登录后的头像
					$(".res_left_inform_img img").attr('src', x_user.photo);
					if(res.data.sum < 60) {
						$('.res_risk_degree_box').find('span').eq(2).addClass('on');
					} else if(res.data.sum >= 80) {
						$('.res_risk_degree_box').find('span').eq(0).addClass('on');
					} else {
						$('.res_risk_degree_box').find('span').eq(1).addClass('on');
					}
					var text = $('.res_risk_degree_box .on').html();
					//console.log($('.res_risk_degree_box .on').html());
					$(".res_risk_read").html(text);
					//					console.log(res.data.questions);
					//					console.log(res.data.question1);
					//					console.log(res.data.question2);
					//					console.log(res.data.question3);
					//					console.log(res.data.sum);
					var score = res.data.sum,

						dataScore = [],
						data = [];
					//					console.log(score);
					dataScore = [score, score - 8, score - 8, score - 5, score - 1, score - 10, score - 7]
					data = [getBeforeDate(0), getBeforeDate(-1), getBeforeDate(-2), getBeforeDate(-3), getBeforeDate(-4), getBeforeDate(-5), getBeforeDate(-6)]

					//饼形图  添加 data 的数据
					ZmyChart.setOption({
						xAxis: {
							data: data.reverse()
						},
						series: [{
							//data: [0, 0, 100, 0, 20, 10, 20, 10, 20, 13, ],//数值
							data: dataScore.reverse()
						}]
					})

				} else {

					layer.alert(res.msg, {
						title: 'X职查'
					});
				}

				save_sroce(data_form);
				save_questions(data_form);
			},
			error: function(res) {
				layer.alert(res.msg, {
					title: 'X职查'
				})
			}

		});
		//调用折线图
		ZmyChart.setOption(option);
	}

	function save_sroce(data_form) {

		var url = api + 'webAccount/CreditManagementApi/saveSroce';
		//console.log(url);
		//		console.log(data_form.answerId);

		$.ajax({
			type: "post",
			url: url,
			data: data_form,
			dataType: 'json',
			beforeSend: function() {},
			success: function(res) {
				//console.log(res);
			}
		});
	}

	function save_questions(data_form) {
		var url = api + 'webAccount/CreditManagementApi/saveQuestions ';
		//console.log(url);
		//console.log(data_form.answerId);

		$.ajax({
			type: "post",
			url: url,
			data: data_form,
			dataType: 'json',
			beforeSend: function() {},
			success: function(res) {
				//console.log(res);
			}
		});
	}

	//饼形图 样例

	function pieChart() {
		//app.title = '环形图';
		var myChart2 = echarts.init(document.getElementById('main2'));
		option = {
			tooltip: {
				trigger: 'item',
				//formatter: "{a} <br/>{b}: {c} ({d}%)"
				formatter: "{a} <br/>{b}:({d}%)"
			},
			color: ['#0ACAA0', '#FFB563', '#7A74FF', '#F35556'],
			legend: {
				type: 'scroll',
				orient: 'vertical',
				right: 10,
				top: 50,
				bottom: 20,
				itemGap: 15,
				//y:'center',
				formatter: function(name) {
					var data = option.series[0].data;
					var total = 0;
					var tarValue;
					for(var i = 0, l = data.length; i < l; i++) {
						total += data[i].value;
						if(data[i].name == name) {
							tarValue = data[i].value;
						}
					}
					var p = (tarValue / total * 100).toFixed(2);
					return name + ' ' + ' ' + '(' + p + '%)';
				},

				data: ['避免个人信息泄露', '及时处理逾期', '及时处理不良信息', '提高芝麻信用分'],
				icon: "roundRect",
				   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none

				itemWidth: 10,
				  // 设置宽度

				itemHeight: 10, // 设置高度

				//itemGap: 40 // 设置间距

			},
			series: [{
				name: '提升建议',
				type: 'pie',
				radius: ['45%', '70%'],
				center: ['20%', '50%'],
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: false,
						//position: 'center'
						lineStyle: {
							color: '#000'
						}
					},
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data: [{
						value: 2.5,
						name: '避免个人信息泄露'
					},
					{
						value: 2.5,
						name: '及时处理逾期'
					},
					{
						value: 2.5,
						name: '及时处理不良信息'
					},
					{
						value: 2.5,
						name: '提高芝麻信用分'
					},

				]
			}]
		};

		myChart2.setOption(option);
	}

	//折线图  样例
	//lineChart();

	function lineChart() {
		//折线图形
		var ZmyChart = echarts.init(document.getElementById('main'));
		option = {
			xAxis: {
				type: 'category',
			/*	boundaryGap: false,*/
				axisLine: {
					lineStyle: {
						color: '#666',
						width: 1
					}

				},
				data: ['11.6', '11.7', '11.8', '11.9', '11.10', '11.11', '11.12', '11.13', '11.14', '11.15'],
			},
			yAxis: [{
				type: 'value',
				//type: 'category',
				axisLine: {
					lineStyle: {
						color: '#666'
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#fff', //坐标线
						type: 'solid'
					}
				},

				//data:['低', '中', '高'],

			}],

			series: [{
				data: [0, 0, 100, 0, 20, 10, 20, 10, 20, 13, ],
				type: 'line',
				symbol: 'circle', //设定为实心点
				symbolSize: 5, //设定实心点的大小
				itemStyle: {
					normal: {
						color: '#EFF0FF',
						lineStyle: {
							color: '#616CFF'
						}
					}
				},
				areaStyle: {
					//background: '#333',
				}
			}]
		};

		// 使用刚指定的配置项和数据显示图表。
		ZmyChart.setOption(option);
	}

})

function again() {
	$(".res_risk_results").css("display", "none")
	$(".que_risk_assessment_box").css("display", "block")
	$('.que_on').removeClass('que_on')
}