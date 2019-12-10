$(function() {
	//评估进度条   个人
	layui.use('element', function() {
		var $ = layui.jquery,
			element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

		//触发事件
		var active = {
			loading: function(othis) {
				var DISABLED = 'layui-btn-disabled';
				if(othis.hasClass(DISABLED)) return;

				//模拟loading
				var n = 0,
					timer = setInterval(function() {
						n = n + Math.random() * 10 | 0;
						if(n > 100) {
							n = 100;
							clearInterval(timer);
							othis.removeClass(DISABLED);
						}
						element.progress('bar', n + '%');
					}, 30 + Math.random() * 100);

				othis.addClass(DISABLED);
			}
		};
	//点击开始测评按钮   个人
	//调用信用评估函数   个人
	
		creditEvaluation()
		creditEvaluationRader()
		$('#sr_start').click(function() {
			//调用信用评估函数  个人
			if($('#sr_start').html() == '开始评估') {
				if(authentication_status != 1 && authentication_status != 5 && authentication_status != 6 && authentication_status != 7){
					layer.alert('您没有进行认证，暂时无法使用此功能，请前往实名认证')
					$('#sr_start').removeClass('layui-btn-disabled')
				}else{
					$('#sr_start').html('正在评估中')
					$('#sr_start').removeClass('layui-btn-disabled')
					if($('#sr_start').html() == '正在评估中') {
						//进度条的增加
						var othis = $(this),
						type = $(this).data('type');
						active[type] ? active[type].call(this, othis) : '';
						$('#sr_start').addClass('layui-btn-disabled')
						//失信人 被执行人
						progressBar15()
						//银行逾期
						progressBar3()
						//不良记录
						progressBar4()
						//网贷黑名单
						progressBar6()
						//信用评估涉诉
						progressBar2()
					}
					//评分
					credit_score()	
				}
			}
		})
	});
	//圆环比例
	function ring(e) { 
		var Chart4 = echarts.init(document.getElementById('chart4'));
		option = {
			title: {
				show: true,
				text: e + '%',
				x: 'center',
				y: 'center',
				textStyle: {
					fontSize: '15',
					color: '#616CFF',
					fontWeight: 'normal'
				}
			},
			tooltip: {
				trigger: 'item',
				formatter: "{d}%",
				show: false
			},
			legend: {
				orient: 'vertical',
				x: 'left',
				show: false
			},
			color: ['#616CFF', '#EEEEEE'],
			series: {
				name: '',
				type: 'pie',
				radius: ['65%', '85%'],
				avoidLabelOverlap: true,
				hoverAnimation: false,
				label: {
					normal: {
						show: false,
						position: 'center'
					},
					emphasis: {
						show: false
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data: [{
						value: e,
						name: ''
					},
					{
						value: 100 - e,
						name: ''
					}
				]
			}

		};
		Chart4.setOption(option);
	}
	
	//开始测评  个人
	function creditEvaluation() {
		var url = api + 'webAccount/CreditManagementApi/creditManagementFirst',
			myChart3 = echarts.init(document.getElementById('broken_line')),
			data_form = {
				'user_id': user_id,
				'identity_status': identity_status
			};
		option = {
			xAxis: {
				type: 'category',
				data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'] //月份
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				data: [], //分数
				type: 'line',
				lineStyle: {
					normal: {
						color: '#616CFF'
					}
				},
				itemStyle: {
					normal: {
						borderWidth: 1,
						borderColor: '#616CFF',
						color: '#616CFF'
					}
				}
			}]
		};

		var series1 = [], //存储分数
			xAxis1 = [], //存储月份
			sr_timeShuzu = ["12", "11", "10", "09", "08", "07", "06", "05", "04", "03", "02", "01"]; //自定义月份
		$.ajax({
			url: url,
			data: data_form,
			dataType: 'json',
			type: 'post',
			success: function(res) {
				//console.log(res)
				$('.last_credit').html(res.data.lastcreditScore) //上月信用
				if(res.msg == '测评完成') {
					$('#sr_start').html('本月信用' + res.data.creditScore)
					$('#sr_start').addClass('layui-btn-disabled')
					$('#sr_total_assessment').html(res.data.noproSize)
					$('#sr_danger').html(res.data.proSize)
					ring(res.data.creditScore)
				} else {
					//开始调用圆环图
					ring(res.data.lastcreditScore)
				}
				//如果当前是有查询记录显示的
				if(res.data.records.length>0) {
					for(i = 0; i < res.data.records.length; i++) {
						// 获取月份
						let timearr = res.data.records[i].alternate_field.replace(" ", ":").replace(/\:/g, "-").split("-");
						let timestr = timearr[1];
						xAxis1.push(timestr)
					}
					var sum = 0;
					for(var j = 0; j < sr_timeShuzu.length; j++) {
						sum = 0;
						for(var k = 0; k < xAxis1.length; k++) {
							if(sr_timeShuzu[j] == xAxis1[k]) {
								series1.push(res.data.records[k].score_count)
							} else {
								sum += 1;
							}
						}
						if(sum == xAxis1.length) {
							series1.push(0)
						}
					}
					myChart3.setOption({ //加载折线数据图表
						series: [{
							data: series1.reverse()
						}]
					})
				}

			},
			error: function(res) {
				console.log('信用评估失败')
			}
		})
		//使用刚指定的配置项和数据显示图表。
		myChart3.setOption(option);
	}
		//开始测评  个人
	function creditEvaluationRader() {
		var url = api + 'webAccount/CreditManagementApi/creditManagementFirst',
			myChart4 = echarts.init(document.getElementById('sr_radar')),
			data_form = {
				'user_id': user_id,
				'identity_status': identity_status
			};
		option = {
			tooltip: {},
			legend: {
				data: [],
				right: '20px',
				top: '20px'
			},
			color: ['#15C2F5', '#7A74FF'],
			radar: {
				// shape: 'circle',
				name: {
					textStyle: {
						color: '#333',
						borderRadius: 3,
						padding: [3, 5]
					}
				},
				indicator: [{
						name: '失信人',
						max: 20
					},
					{
						name: '银行逾期',
						max: 20
					},
					{
						name: '涉诉信息',
						max: 20
					},
					{
						name: '网贷黑名单',
						max: 20
					},
					{
						name: '被执行人',
						max: 20
					},
					{
						name: '不良记录',
						max: 20
					}
				],
				radius: 80
			},
			series: [{
				name: '',
				type: 'radar',
				itemStyle: {
					normal: {
						areaStyle: {
							type: 'default'
						}
					}
				},
				data: [{
						value: [],
						name: ''
					},
					{
						value: [],
						name: ''
					}
				]
			}]
		};
		$.ajax({
			url: url,
			data: data_form,
			dataType: 'json',
			type: 'post',
			success: function(res) {
				//console.log(new Date().getMonth()+1)  //获取当前月份
				//console.log(res)
				$('.last_credit').html(res.data.lastcreditScore) //上月信用
				if(res.msg == '测评完成') {
					$('#sr_start').html('本月信用' + res.data.creditScore)
					$('#sr_start').addClass('layui-btn-disabled')
					$('#sr_total_assessment').html(res.data.noproSize)
					$('#sr_danger').html(res.data.proSize)
					ring(res.data.creditScore)
				} else {
					//开始调用圆环图
					ring(res.data.lastcreditScore)
				}
				//如果当前是有查询记录显示的 雷达图数据判断
				if(res.data.records.length>0) {
						var srRadar1 = [], //存储查询6大项
							srRadar2 = [], //样例
							timeList = [], //存储月份
							seriesName = '',//存储series的name字段
							seriesDataName = '',//存储series data中的name
							firstTime = res.data.records[0].alternate_field.replace(" ", ":").replace(/\:/g, "-").split("-")[1], //获取月份
							badrecord_score = res.data.records[0].badrecord_score, //不良信息
							bankoverdue_score = res.data.records[0].bankoverdue_score, //银行逾期
							broken_score = res.data.records[0].broken_score, //失信人
							execute_score = res.data.records[0].execute_score, //被执行人 
							involvedappeal = res.data.records[0].involvedappeal, //涉诉
							onlineloan_score = res.data.records[0].onlineloan_score; //网贷黑名单
//							console.log(firstTime); //查询记录的最近的当前月份
						if(firstTime == new Date().getMonth()+1){
							srRadar1 = [broken_score, bankoverdue_score, involvedappeal, onlineloan_score, execute_score, badrecord_score]
							timeList = [firstTime+'月', '样例']
							seriesName = firstTime +'月 vs 样例'
							seriesDataName = firstTime + '月'
						}else{
							srRadar1 = [0,0,0,0,0,0]							
							timeList = [new Date().getMonth()+1+'月', '样例']
							seriesName = new Date().getMonth()+1+'月 vs 样例'
							seriesDataName = new Date().getMonth()+1 + '月'
						}
						srRadar2 = [5,8,10,6,4,2]
						myChart4.setOption({
							legend: {
								data: timeList
							},
							series:[{
								name:seriesName,
								data:[{
									value:srRadar1,
									name:seriesDataName 
								},{
									value:srRadar2,
									name:'样例' 
								}]
							}]
						})
				}else{ //没有当前月份的查询
					var srRadar1 = [], //存储查询6大项
						srRadar2 = [], //样例
						timeList = []; //存储月份
					srRadar1 = [0,0,0,0,0,0]
					srRadar2 = [5,8,10,6,4,2]
					timeList = [new Date().getMonth()+1 + '月','样例']
						myChart4.setOption({
							legend: {
								data: [new Date().getMonth()+1 + '月', '样例']
							},
							series:[{
								name:new Date().getMonth()+1 +'月 vs 样例',
								data:[{
									value:srRadar1,
									name:new Date().getMonth()+1 + '月' 
								},{
									value:srRadar2,
									name:'样例' 
								}]
							}]
						})
				}

			},
			error: function(res) {
				console.log('信用评估失败')
			}
		})
		// 使用刚指定的配置项和数据显示图表。 雷达图
		myChart4.setOption(option);
	}
	//失信人 被执行人   个人
	function progressBar15() {
		var url = api + 'webAccount/CreditManagementApi/executePersonSearch',
			data_form = {
				'user_id': user_id,
				'identity_status': identity_status
			};
		$.ajax({
			url: url,
			type: 'post',
			dataType: 'json',
			data: data_form,
			success: function(res) {
				//console.log(res)
				$('#sr_bar_val1,#sr_bar_val5').val(res.data.execute)
			},
			error: function(res) {
				console.log(res)
			}
		})
	}
	//银行逾期      个人
	function progressBar3() {
		var url = api + 'webAccount/CreditManagementApi/bankoverdueSearch',
			data_form = {
				'user_id': user_id
			};
		$.ajax({
			url: url,
			type: 'post',
			dataType: 'json',
			data: data_form,
			success: function(res) {
				$('#sr_bar_val3').val(res.data.execute)
			},
			error: function(res) {
				console.log(res)
			}
		})
	}
	//不良记录      个人
	function progressBar4() {
		var url = api + 'webAccount/CreditManagementApi/badrecordSearch',
			data_form = {
				'user_id': user_id
			};
		$.ajax({
			url: url,
			type: 'post',
			dataType: 'json',
			data: data_form,
			success: function(res) {
				//console.log(res)
				$('#sr_bar_val4').val(res.data.execute)
			},
			error: function(res) {
				console.log(res)
			}
		})
	}
	//网贷黑名单     个人
	function progressBar6() {
		var url = api + 'webAccount/CreditManagementApi/onlineloanSearch',
			data_form = {
				'user_id': user_id
			};
		$.ajax({
			url: url,
			type: 'post',
			dataType: 'json',
			data: data_form,
			success: function(res) {
				//console.log(res)
				$('#sr_bar_val6').val(res.data.execute)
			},
			error: function(res) {
				console.log(res)
			}
		})
	}
	//信用评估涉诉    个人
	function progressBar2() {
		var url = api + 'webAccount/CreditManagementApi/involvedappeal',
			data_form = {
				'user_id': user_id
			};
		$.ajax({
			url: url,
			type: 'post',
			dataType: 'json',
			data: data_form,
			success: function(res) {
				//console.log(res)
				$('#sr_bar_val2').val(res.data.execute)
			},
			error: function(res) {
				console.log(res)
			}
		})
	}
	//信用评估用户评分存储    个人
	function credit_score() {
		var url = api + 'webAccount/CreditManagementApi/creditEvaluationMethod'
		data_form = {
			'user_id': user_id,
			'identity_status': identity_status,
			'bankoverdue_score': $('#sr_bar_val3').val(), //银行逾期
			'onlineloan_score': $('#sr_bar_val6').val(), //网贷黑名单分数
			'badrecord_score': $('#sr_bar_val4').val(), //不良信息分数
			'broken_score': $('#sr_bar_val1').val(), //失信人分数
			'execute_score': $('#sr_bar_val5').val(), //被执行人分数
			'involvedappeal': $('#sr_bar_val2').val(), //涉诉信息
		};
		$.ajax({
			url: url,
			data: data_form,
			dataType: 'json',
			type: 'post',
			success: function(res) {
				//存储分数成功
				//console.log(res)
				ring(res.data.score_count);
				$("#sr_start").html('本月信用' + res.data.score_count)
				$('#sr_start').addClass('layui-btn-disabled')
				//查询完成
				credit_success()
				//雷达图显示问题
				credit_successRader() 
			},
			error: function(res) {
				console.log(res)
			}
		})
	}
	//信用评估查询完成    个人or企业
	function credit_success() {
		var url = api + 'webAccount/CreditManagementApi/creditEvaluationSuccess',
			data_form = {
				'user_id': user_id,
				'identity_status': identity_status
			},
			myChart3 = echarts.init(document.getElementById('broken_line'));
		option = {
			xAxis: {
				type: 'category',
				data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'] //月份
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				data: [], //分数
				type: 'line',
				lineStyle: {
					normal: {
						color: '#616CFF'
					}
				},
				itemStyle: {
					normal: {
						borderWidth: 1,
						borderColor: '#616CFF',
						color: '#616CFF'
					}
				}
			}]
		};
		var series1 = [], //存储分数
			xAxis1 = [], //存储月份
			sr_timeShuzu = ["12", "11", "10", "09", "08", "07", "06", "05", "04", "03", "02", "01"]; //自定义月份
		$.ajax({
			url: url,
			dataType: 'json',
			data: data_form,
			type: 'post',
			success: function(res) {
				//console.log(res)
				$('#sr_total_assessment').html(res.data.noproSize)
				$('#sr_danger').html(res.data.proSize)
				//查询完成之后重新加载折线图
				if(res.data.records.length>0) {
					for(i = 0; i < res.data.records.length; i++) {
						// 获取月份
						let timearr = res.data.records[i].alternate_field.replace(" ", ":").replace(/\:/g, "-").split("-");
						let timestr = timearr[1];
						xAxis1.push(timestr)
					}
					var sum = 0;
					for(var j = 0; j < sr_timeShuzu.length; j++) {
						sum = 0;
						for(var k = 0; k < xAxis1.length; k++) {
							if(sr_timeShuzu[j] == xAxis1[k]) {
								series1.push(res.data.records[k].score_count)
							} else {
								sum += 1;
							}
						}
						if(sum == xAxis1.length) {
							series1.push(0)
						}
					}
					myChart3.setOption({ //加载折线数据图表
						series: [{
							data: series1.reverse()
						}]
					})

				}

			},
			error: function(res) {
				console.log(res)
			}

		})
		//使用刚指定的配置项和数据显示图表。
		myChart3.setOption(option);
	}
	//雷达图
	function credit_successRader(){
		var url = api + 'webAccount/CreditManagementApi/creditEvaluationSuccess',
			data_form = {
				'user_id': user_id,
				'identity_status': identity_status
			},
			myChart4 = echarts.init(document.getElementById('sr_radar'));
			option = {
			tooltip: {},
			legend: {
				data: [],
				right: '20px',
				top: '20px'
			},
			color: ['#15C2F5', '#7A74FF'],
			radar: {
				// shape: 'circle',
				name: {
					textStyle: {
						color: '#333',
						borderRadius: 3,
						padding: [3, 5]
					}
				},
				indicator: [{
						name: '失信人',
						max: 20
					},
					{
						name: '银行逾期',
						max: 20
					},
					{
						name: '涉诉信息',
						max: 20
					},
					{
						name: '网贷黑名单',
						max: 20
					},
					{
						name: '被执行人',
						max: 20
					},
					{
						name: '不良记录',
						max: 20
					}
				],
				radius: 80
			},
			series: [{
				name: '',
				type: 'radar',
				itemStyle: {
					normal: {
						areaStyle: {
							type: 'default'
						}
					}
				},
				data: [{
						value: [],
						name: ''
					},
					{
						value: [],
						name: ''
					}
				]
			}]
		};
		$.ajax({
			url: url,
			dataType: 'json',
			data: data_form,
			type: 'post',
			success: function(res) {
				//console.log(res)
				$('#sr_total_assessment').html(res.data.noproSize)
				$('#sr_danger').html(res.data.proSize)
				//查询完成之后重新加载雷达图图
				if(res.data.records.length>0) {
						var srRadar1 = [], //存储查询6大项
							srRadar2 = [], //样例
							timeList = [], //存储月份
							firstTime = res.data.records[0].alternate_field.replace(" ", ":").replace(/\:/g, "-").split("-")[1], //获取月份
							badrecord_score = res.data.records[0].badrecord_score, //不良信息
							bankoverdue_score = res.data.records[0].bankoverdue_score, //银行逾期
							broken_score = res.data.records[0].broken_score, //失信人
							execute_score = res.data.records[0].execute_score, //被执行人 
							involvedappeal = res.data.records[0].involvedappeal, //涉诉
							onlineloan_score = res.data.records[0].onlineloan_score; //网贷黑名单
						console.log(firstTime); //查询记录的最近的当前月份
						//console.log(res.data.records[0].badrecord_score);  //不良信息
						srRadar1 = [broken_score, bankoverdue_score, involvedappeal, onlineloan_score, execute_score, badrecord_score]
						srRadar2 = [5,8,10,6,4,2]
						timeList = [firstTime, '样例']
						myChart4.setOption({
							legend: {
								data: [firstTime + '月', '样例']
							},
							series:[{
								name:firstTime +'月 vs 样例',
								data:[{
									value:srRadar1,
									name:firstTime + '月' 
								},{
									value:srRadar2,
									name:'样例' 
								}]
							}]
						})

				}

			},
			error: function(res) {
				console.log(res)
			}

		})
		// 使用刚指定的配置项和数据显示图表。 雷达图
		myChart4.setOption(option);
	}
})