//信用管理
$(function(){
	//获取日期
	function getBeforeDate(n){//n为你要传入的参数，当前为0，前一天为-1，后一天为1
      var date = new Date() ;
      var year,month,day ;
      date.setDate(date.getDate()+n);
      year = date.getFullYear();
      month = date.getMonth()+1;
      day = date.getDate() ;
      s = ( month < 10 ? ( '0' + month ) : month ) + '.' + ( day < 10 ? ( '0' + day ) : day) ;
      return s;
     }
	creditManagement()
	function creditManagement(){
		var url = api + 'webAccount/CreditManagementApi/creditManagement',
			 myChart7 = echarts.init(document.getElementById('credit_line')),
			data_form = {
				'user_id':user_id
			};
		option = {
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: []
		    },
		    yAxis: {
		    	data:[],
		        type: 'value',
		        min: 0,
				max: 100,
		    },
		    series: [{
		        data: [],
		        type: 'line',
		         itemStyle: {
		            normal: {
		            	 borderWidth: 1,
		                borderColor: 'rgba(97,108,255,.6)',
		                color: '#616CFF'
		            }
		        },
		        areaStyle:{
		        normal:{
		           //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ 
		                offset: .34,
		                color: '#DDE7FF'
		            }])
		
		        }
		    }
		    }]
		};
		$.ajax({
			url:url,
			type:'post',
			dataType:'json',
			data:data_form,
			success:function(res){
				var score = res.data.credit_score,
					dataScore = [],
					data = [],
					score1 = score - 0.5,
					score2 = score - 1,
					score3 = score - 1.5,
					score4 = score - 2,
					score5 = score - 2.5,
					score6 = score - 3;
					if(score1 <= 0){
						score1 = 0
					}else{
						score1 = score - 0.5
					}
					if(score2 <= 0){
						score2 = 0
					}else{
						score2 = score - 1
					}
					if(score3 <= 0){
						score3 = 0
					}else{
						score3 = score - 1.5
					}
					if(score4 <= 0){
						score4 = 0
					}else{
						score4 = score - 2
					}
					if(score5 <= 0){
						score5 = 0
					}else{
						score5 = score - 2.5
					}
					if(score6 <= 0){
						score6 = 0
					}else{
						score6 = score - 3
					}
					dataScore = [score,score1,score2,score3,score4,score5,score6]
					data = [getBeforeDate(0),getBeforeDate(-1),getBeforeDate(-2),getBeforeDate(-3),getBeforeDate(-4),getBeforeDate(-5),getBeforeDate(-6)]
				$('.credit_title span').html(score)
				$('.sr_press_credit .layui-progress-bar').css('width',score + '%')
				if(score>=0 && score <=20){
					$('.tip_credit_write li').eq(0).addClass('sr_creditOn')
					$('.tip_credit_write li').eq(0).find('span').addClass('sr_creditOnSpan')
				}else if(score>20 && score <=40){
					$('.tip_credit_write li').eq(1).addClass('sr_creditOn')
					$('.tip_credit_write li').eq(1).find('span').addClass('sr_creditOnSpan')
				}else if(score>40 && score <=60){
					$('.tip_credit_write li').eq(2).addClass('sr_creditOn')
					$('.tip_credit_write li').eq(2).find('span').addClass('sr_creditOnSpan')
				}else if(score>60 && score <=80){
					$('.tip_credit_write li').eq(3).addClass('sr_creditOn')
					$('.tip_credit_write li').eq(3).find('span').addClass('sr_creditOnSpan')
				}else if(score>80 && score <=100){
					$('.tip_credit_write li').eq(4).addClass('sr_creditOn')
					$('.tip_credit_write li').eq(4).find('span').addClass('sr_creditOnSpan')
				}
				myChart7.setOption({
					xAxis:{
						data:data.reverse()
					},
			       series:[{
				        data:dataScore.reverse()
			       }]
			    })
				//行为风险评估按钮
				if(!(res.data.assessment.length)){
					//行为风险评估
					$('#get_evaluate').removeClass('gray_btn')
									.html('去评估')
					$('#get_evaluate').click(function(){
						$('.account_choice_li').eq(3).click()
					})
				}else{
					$('#get_evaluate').addClass('gray_btn')
										.html('已完成')
				}
				//信用评估
				if(!(res.data.record.length)){
					//信用评估
					$('#sr_CreditEvaluation').removeClass('gray_btn')
									.html('去评估')
					$('#sr_CreditEvaluation').click(function(){
						$('.account_choice_li').eq(2).click()
					})
				}else{
					$('#sr_CreditEvaluation').addClass('gray_btn')
										.html('已完成')
				}
			},
			error:function(res){
				console.log(res)
			}
			
		})
		// 使用刚指定的配置项和数据显示图表。
		myChart7.setOption(option);
	}
})
