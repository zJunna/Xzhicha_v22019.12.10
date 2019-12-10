//我的订单
$(function(){
	layui.use('element', function(){
		var element = layui.element;
	});
	//引入头部、底部
	$("#userHeader").load("../templete/userHeader.html");
	$("#userFooter").load("../templete/userFooter.html");
	$("#userSide").load("../templete/userSide.html");
})
