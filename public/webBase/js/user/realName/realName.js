$(function(){
	//引入头部、底部
	$("#userHeader").load("../templete/userHeader.html");
	$("#userFooter").load("../templete/userFooter.html");
	//identity_status身份,0个人,1企业
	if(identity_status == 0){
		$("#userSide").load("../templete/userSide.html");
		$("#realname").load("realNamePer.html");
	}else{
		$("#userSide").load("../templete/userSideCo.html");
		$("#realname").load("realNameCo.html");
	}
	
})
