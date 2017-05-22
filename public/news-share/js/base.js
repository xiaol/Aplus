var base = {};
base.data_conn = function(path,rqd,backfn,type,ctype){
	var host = "http://bdp.deeporiginalx.com";
    type = (type?type.toLocaleLowerCase():false)
	if(type=="post"&&!ctype){
		rqd = JSON.stringify(rqd);
	}
	$.ajax({
        type: type||"get",
        url: host+path,
        dataType: "json",
        contentType: ctype?"application/x-www-form-urlencoded; charset=utf-8":"application/json; charset=UTF-8",
        data: rqd,
        jsonp:"callback",
        timeout: 100000,
        crossDomain:true,
        cache: false, 
        async: true,
        statusCode: {},
        beforeSend: function(XMLHttpRequest){
            //设置header参数
        	// XMLHttpRequest.withCredentials = true;
         	// XMLHttpRequest.setRequestHeader("myCookie",document.cookie);
        },
        success: function(data, code, xhr){
            if (data != null) {
                if (backfn != undefined && typeof(backfn) == "function") {
                    backfn(data, code,xhr);
                }
            }
        },
        error: function(XMLHttpRequest, error,option){
            if (error == "timeout") {
                console.log("请求超时：请求系统返回数据超时！请稍候再试吧…");
            }   
        },
        complete:function(res,status){
            $(".loadding").hide();
        }
    })
}
base.get_url_param = function(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null)
      return unescape(r[2]);
    return null;
}
base.if_show = function($div){

}