$(function(){
	var api = 'https://capi.bancai.com/api/';
	
	//引入头部、底部
	$("#header").load("templete/header.html");
	$("#footer").load("templete/footer.html");
	
	//get数据
	var url = api + "index_mp";
	console.log(url)
	$.ajax({
		url: url,
		type: "get",
		//data: data,
		dataType: 'json',
		beforeSend: function () {
    		// 在所有发送请求的操作（open, send）之前执行
		    console.log('获取数据之前。。。')
		},
		success: function(res){
			// 隐藏 loading
			console.log(res)
			var data_info = res.data;
			// template
			//var html = template('test', data_info);
			//document.getElementById('aaa').innerHTML = html;
			$('#aaa').html(template('test', data_info));
		},
		error: function(res){
			// 隐藏 loading
			console.log('error', res)
		}
	});
	
	//post数据
	$('.btn').on('click',function(){
		var pageNo;
		if(!pageNo){
            pageNo = 1;
        }
		console.log('当前第'+pageNo+'页')
		get_ajax(pageNo);
	})
	//获取分页数据
	function get_ajax(pageNo){
		console.log('ajax第'+pageNo+'页')
		var url = 'http://192.168.0.100:9008/api/webHome/login';
		console.log(url);
		var data_form = {
			'companyName':'京东数字科技控股有限公司',
			'currPage':pageNo
		};
//		console.log(data_form)
		$.ajax({
			url: url,
			type: "post",
			data: data_form,
			dataType: 'json',
			beforeSend: function () {
	    		// 在所有发送请求的操作（open, send）之前执行
			    //console.log('提交数据之前。。。')
			},
			success: function(res){
				// 隐藏 loading
				console.log(res)
				var data_info = res.data;
				//console.log(data_info)
				$('#conpany_info').html(template('conpany_template', data_info));
				//分页
				var totalRecords = res.data.items.totalCount;//记录总数
				var pageSize = res.data.items.pageSize;//每页显示条数
		        var totalPage = Math.ceil(totalRecords/pageSize);//总页码
		        kkpager.generPageHtml({
		            pno : pageNo,//当前页码
		            total : totalPage,//总页码
		            totalRecords : totalRecords,//总数据条数
		            mode : 'click',//默认值是link，可选link或者click
		            click : function(pageNo){
		                this.selectPage(pageNo);
		                get_ajax(pageNo);//点击页码的时候，显示对应页的记录
		                return false;
		            }
		        });
			},
			error: function(res){
				// 隐藏 loading
				console.log('error', res)
			}
		});
	}
	
	
})
