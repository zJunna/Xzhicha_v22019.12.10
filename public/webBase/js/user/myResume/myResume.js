$(function(){

	//引入头部、底部
	$("#userHeader").load("../templete/userHeader.html");
	$("#userFooter").load("../templete/userFooter.html");
	//引入侧边栏
	if(identity_status == 0){
		$("#userSide").load("../templete/userSide.html");
		$(".per_resume").load("myResumePer.html");
		$('.per_resume').show();
	}else{
		$("#userSide").load("../templete/userSideCo.html");
		$(".co_resume").load("myResumeCo.html");
		$('.co_resume').show();
	}

})
