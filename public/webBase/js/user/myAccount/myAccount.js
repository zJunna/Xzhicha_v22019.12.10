//个人中心中的资料完整度部分
$(function() {
	
	//注意：选项卡 依赖 element 模块，否则无法进行功能性操作
	layui.use('element', function() {
		var element = layui.element;
	});
	console.log('身份状态identity_status = ' + identity_status)

	//引入头部、底部
	$("#userHeader").load("../templete/userHeader.html");
	$("#userFooter").load("../templete/userFooter.html");
	/* 用户中心的我的账户 */
	$("#my_account").load("../source/user/myAccount.html");

	//identity_status = 0;//0个人，1企业
	if(identity_status == 0) {
		//侧边栏
		$("#userSide").load("../templete/userSide.html");
		//引入账户中心
		$("#account_center").load("../UserAction/accountCenter.html");
	} else {
		//侧边栏
		$("#userSide").load("../templete/userSideCo.html");
		//引入账户中心
		$("#account_center").load("../UserAction/accountCenterCo.html");
	}
	//切换账户
	$('.account_choice_li').eq(1).click(function(){
		$("#switchingAccounts").load("../UserAction/switchingAccounts.html");
	})
	//信用评估
	$('.account_choice_li').eq(2).click(function(){
		if(identity_status == 0) {
			$("#credit_evaluation").load("../UserAction/creditEvaluation.html");
		}else{
			$("#credit_evaluation").load("../UserAction/creditEvaluationCo.html");
		}
	})
	//风险测评
	$('.account_choice_li').eq(3).click(function(){
		if(identity_status == 0) {
			$("#risk_assessment").load("../UserAction/riskAssessment.html"); //风险测评题
		}else{
			$("#risk_assessment").load("../UserAction/riskAssessmentCo.html"); //风险测评题
		}
	})
	//信用管理
	$('.account_choice_li').eq(4).click(function(){
		if(identity_status == 0) {
			$("#credit_management").load("../UserAction/creditManagement.html");
		}else{
			$("#credit_management").load("../UserAction/creditManagementCo.html");
		}
	})
})