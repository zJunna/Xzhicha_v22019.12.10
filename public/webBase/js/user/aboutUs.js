//关于我们
$(function(){
	layui.use('element',function(){
		var element = layui.element;
	})
	//引入头部、底部
	$("#userHeader").load("../templete/userHeader.html");
	$("#userFooter").load("../templete/userFooter.html");
})
