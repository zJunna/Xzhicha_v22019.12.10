$(function() {
	layui.use('element', function() {
		var element = layui.element;
	});
	//引入头部、底部
	$("#userHeader").load("../templete/userHeader.html");
	$("#userFooter").load("../templete/userFooter.html");
	if(identity_status == 0) {
		$("#userSide").load("../templete/userSide.html");
	} else {
		$("#userSide").load("../templete/userSideCo.html");
	}
	
		
	query();
	function query(pageNo) {

		var url = api + 'webAccount/CreditManagementApi/recordViews';
		data_form = {
			'user_id': user_id,
			'currPage': pageNo
		};
		//console.log(user_id);
		$.ajax({
			type: "post",
			url: url,
			data: data_form,
			dataType: 'json',

			/*beforeSend: function(){},*/
			success: function(res) {
				if(res.err_code == 0) {
					console.log(res);
					data_info = res.data;
					//替换时间戳
					for(var i = 0; i < data_info.currency.length; i++) {
						var date = new Date(data_info.currency[i].time);
						Y = date.getFullYear() + '-';
						M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
						D = date.getDate() <10 ? '0' + date.getDate() : date.getDate() + '';
						YMD = Y + M + D;
						data_info.currency[i].time = YMD;
					}
					$('#que_myQuery_Co').html(template('que_myQuery_Co_template', data_info));
					$('#que_myQuery_people').html(template('que_myQuery_people_template', data_info));
					//分页
					var totalRecords = res.data.page.totalCount; //记录总数
					var pageSize = res.data.page.pageSize; //每页显示条数
					var totalPage = Math.ceil(totalRecords / pageSize); //总页码
					//alert(totalRecords);
					//alert(totalPage);
					kkpager.generPageHtml({
						pno: pageNo, //当前页码
						total: totalPage, //总页码
						totalRecords: totalRecords, //总数据条数
						mode: 'click', //默认值是link，可选link或者click
						click: function(pageNo) {
							this.selectPage(pageNo);
							query(pageNo); //点击页码的时候，显示对应页的记录
						//	console.log('当前第'+pageNo+'页')
							return false;
						}
						
					});
					$('.pageBtnWrap span:first-child').remove();
					$('.pageBtnWrap span:last-child').remove();
					$('.pageBtnWrap a:first-child').remove();
					$('.pageBtnWrap a:last-child').remove();
					$('.infoTextAndGoPageBtnWrap').remove();

				} else {
					console.log(res);
				}
			}
		});

	}

})