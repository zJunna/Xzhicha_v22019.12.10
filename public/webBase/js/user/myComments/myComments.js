$(function() {
	//注意：选项卡 依赖 element 模块，否则无法进行功能性操作
	layui.use('element', function() {
		var element = layui.element;
	});

	//引入头部、底部
	$("#userHeader").load("../templete/userHeader.html");
	$("#userFooter").load("../templete/userFooter.html");
	//$("#userSide").load("../../templete/userSide.html");
	if(identity_status == 0) {
		$("#userSide").load("../templete/userSide.html");
	} else {
		$("#userSide").load("../templete/userSideCo.html");
	}
	dianping();

	function dianping(pageNo) {
		var url = api + 'webAccount/CreditManagementApi/myComment';
		console.log(url);
		//identity_status=1;
		data_form = {
			'user_id': user_id,
			'identity_status': identity_status

		};
		//console.log(data_form.identity_status);
		$.ajax({
			type: 'post',
			url: url,
			data: data_form,
			dataType: 'json',
			/*beforeSend: function(){},*/
			success: function(res) {
				//console.log(res);
				if(res.err_code == 0) {
					var data_form = res.data;
					//console.log(res.data);
					//console.log(data_form.personPage.page[0].comment_name);
					//console.log(data_form.comPage.page[0].comment_id);
					//console.log(data_form.comment_count[21].comment_id);
					//console.log(data_form.comment_count[21].count);
					//替换时间戳
					for(var i = 0; i < data_form.comPage.page.length; i++) {
						var date = new Date(data_form.comPage.page[i].comment_time);
						Y = date.getFullYear() + '-';
						M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
						D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + '';
						YMD = Y + M + D;
						//console.log(Y + M + D);
						data_form.comPage.page[i].comment_time = YMD;
						//console.log(data_form.comPage.page[i].comment_time);
					}
					//替换时间戳
					for(var i = 0; i < data_form.personPage.page.length; i++) {
						var date = new Date(data_form.personPage.page[i].comment_time);
						Y = date.getFullYear() + '-';
						M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
						D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + '';
						YMD = Y + M + D;
						//console.log(Y + M + D);
						data_form.personPage.page[i].comment_time = YMD;
					}

					$('#re_my_reviews').html(template('re_my_reviews_template', data_form));
					$('#re_co_reviews1').html(template('re_co_reviews1_template', data_form));
					//分页
					//var totalRecords =390;
					var totalRecords = res.data.comPage.page.totalCount; //记录总数
					var pageSize = res.data.comPage.page.pageSize; //每页显示条数
					var totalPage = Math.ceil(totalRecords / pageSize); //总页码
					kkpager.generPageHtml({
						pno: pageNo, //当前页码
						total: totalPage, //总页码
						totalRecords: totalRecords, //总数据条数
						mode: 'click', //默认值是link，可选link或者click
						click: function(pageNo) {
							this.selectPage(pageNo);
							query(pageNo); //点击页码的时候，显示对应页的记录
							//console.log('当前第'+pageNo+'页')
							return false;
						}
					});
					$('.pageBtnWrap span:first-child').remove();
					$('.pageBtnWrap span:last-child').remove();
					$('.pageBtnWrap a:first-child').remove();
					$('.pageBtnWrap a:last-child').remove();
					$('.infoTextAndGoPageBtnWrap').remove();

				} else {
					console.log(res)
				}

			}

		});
	}

})