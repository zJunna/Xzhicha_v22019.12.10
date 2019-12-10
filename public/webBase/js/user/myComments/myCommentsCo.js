$(function(){
	//注意：选项卡 依赖 element 模块，否则无法进行功能性操作
	layui.use('element', function(){
		var element = layui.element;
	});
	
	//引入头部、底部
	$("#userHeader").load("../templete/userHeader.html");
	$("#userFooter").load("../templete/userFooter.html");
	$("#userSide").load("../templete/userSideCo.html");
	/*if(identity_status == 0){
		$("#userSide").load("../templete/userSide.html");
	}else{
		$("#userSide").load("../templete/userSideCo.html");
	}*/
})
