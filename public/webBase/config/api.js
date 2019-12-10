var api = 'http://192.168.0.110:9008/api/',
	apiImg = 'http://192.168.0.110:9008/';
//localStorage
var x_user = JSON.parse(localStorage.getItem('x_user')) || '',
	user_id = x_user.id || '',
	//手机号码
	mobile = x_user.mobile,
	//认证状态	0未认证/1 仅个人/2 仅企业 3 仅企业认证待审核 4仅企业认证失败 5个人已认证企业待审核  6个人已认证企业认证失败 7全部已认证
	authentication_status = x_user.authentication_status,
	//身份状态	0个人1企业
	identity_status = x_user.identity_status,
	//邮箱
	email = x_user.email,
	//城市
	cityId = x_user.cityId;

//缓存时间
var x_timer = localStorage.getItem('x_timer') || 0;
if(x_timer == 0){
	x_timer = new Date();
	localStorage.setItem('x_timer',new Date())
}
var x_time_second = (new Date().getTime() - new Date(x_timer).getTime())/1000;
if(x_time_second >= 28800 && x_user != ''){
	layui.use('layer', function(){
		var layer = layui.layer;
		layer.alert('您的缓存已过期，请重新登录！', {title: 'X职查'},function(){
			localStorage.clear();
			window.location.reload();
		})
	});
}else{
	localStorage.setItem('x_timer',new Date())
}

