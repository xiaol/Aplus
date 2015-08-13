$(function(){
    var url=unescape(location.search);
    $(window).ready(function(){
        function GetRequest() {
            var url =location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
                }return theRequest;
            }else{
                location.href="error.html";
            }

        }
        var Request = new Object();
        Request =GetRequest();
        var str=Request['url'];
        //var type=Request['type'];
        //console.log(str);
        //console.log(type);
        $.ajax({
            url: "http://api.deeporiginalx.com/news/baijia/newsFetchContent",
            type: "post",
            async:false,
            data:{"url":str,},
            datatype:"json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (data) {
                var cons=data['content'];
                var time=data['updateTime'];
                var abs=data['abs'];$(".date").html(time);$(".card1").html(abs);
                for(var i=0;i<cons.length;i++){
                    for(var j in cons[i]){
                        for(var k in cons[i][j]){
                            if(k=="img"){$("#bannerImg").attr("src",cons[i][j][k]);
                            }else if(k=="img_info"){
                                $(".bannertitle").html(cons[i][j][k]);
                            }else if(k=="txt"){
                                //$("<div class='cardChild'></div>").html(j).appendTo(".card2");

                                    $("<div class='card2'></div>").html(cons[i][j][k]).appendTo(".cardbox");}}}}},
            error: function () {alert("失败");}})})
    $(".close").click(function(){$(".footer").css("display","none");})
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端;
    var weixin = u.indexOf('MicroMessenger') > -1;
    var qq =u.indexOf('MQQBrowser') > -1;
    var webApp = u.indexOf('Safari') == -1;
    if(isAndroid){if(qq){$("#download").attr("href","http://koudaiv.com/static/file/app-official.apk");$("#footertu").attr("href","http://koudaiv.com/static/file/app-official.apk")}else{$("#download").attr("href","http://koudaiv.com/static/file/app-official.apk");$("#footertu").attr("href","http://koudaiv.com/static/file/app-official.apk")};}else if(isiOS||webApp){$("#download").attr("href","https://itunes.apple.com/cn/app/tou-tiao-bai-jia/id987333155?mt=8");$("#footertu").attr("href","https://itunes.apple.com/cn/app/tou-tiao-bai-jia/id987333155?mt=8");}else if(weixin){$("#download").click(alert(1))}else{$("#download").attr("href","http://deeporiginalx.com/");$("#footertu").attr("href","http://deeporiginalx.com/");}
})
