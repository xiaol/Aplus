$(function(){
    var ch=$(window).height();
    function obj2key(obj, keys){
        var n = keys.length,
            key = [];
        while(n--){
            key.push(obj[keys[n]]);
        }
        return key.join('|');
    }
//去重操作
    function uniqeByKeys(array,keys){
        var arr = [];
        var hash = {};
        for (var i = 0, j = array.length; i < j; i++) {
            var k = obj2key(array[i], keys);
            if (!(k in hash)) {
                hash[k] = true;
                arr .push(array[i]);
            }
        }
        return arr ;
    }
    $(window).ready(function(){
        function GetRequest() {
            var url =location.search; //获取url中"?"符后的字串
            if(url==''){
                $(".bannerzhe").css("display","none");
            }
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
        var type=Request['type'];
        if(type==1){
            $.ajax({
                url: "http://api.deeporiginalx.com/news/baijia/newsFetchContent",
                type: "post",
                cache:"false",
                async:"false",
                data:{"url":str,},
                datatype:"json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (data) {
                    var cons=data['content'];
                    var time=data['updateTime'];
                    var point=data['point'];
                    var abs=data['abs'];
                    $(".date").html(time);
                    if(abs==''){
                        $(".bannertime").css("margin-bottom","3%");
                    }else{
                        $("<div class='card1'></div>").html(abs).appendTo(".cardbox");
                    }
                    var img=data['imgUrl'];
                    if(img==null||""){
                        $("#bannerImg").attr("src","img/guanggao.png")
                    }else{
                        $("#bannerImg").attr("src",img);
                    }
                    var title=data['title'];
                    if(title==null||""){
                        return;
                    }else{
                        $(".bannertitle").html(title);
                        document.title=title;
                    }

                    var arr = uniqeByKeys(point,['paragraphIndex']);
                    for(var i=0;i<cons.length;i++){
                        for(var j in cons[i]){
                            for(var k in cons[i][j]){
                                if(k=="img"){
                                    $("<div class='card2'></div>").attr({"src":cons[i][j][k],"id":"card"+j}).css({margin:"15px auto",padding:"0"}).appendTo(".cardbox");
                                    $("<img class='card2'>").attr("src",cons[i][j][k]).css("padding","0").appendTo("#card"+j);
                                }else{
                                    $("<div class='card2'></div>").attr("id","card"+j).html(cons[i][j][k]).appendTo(".cardbox");
                                }
                            }}}
                    for(var k=0;k<arr.length;k++) {
                        $("<div class='cardChild'</div>").attr("id","child"+arr[k]['paragraphIndex']).appendTo("#card"+arr[k]['paragraphIndex']);
                        $("<div class='pinglunword'></div>").appendTo("#child"+arr[k]['paragraphIndex']);
                        $("<div class='pinglunperson'></div>").appendTo("#child"+arr[k]['paragraphIndex']);
                        $("<img src="+arr[k]['userIcon']+">").css({"background-clip":"content-box",width:"100%"}).appendTo(".pinglunperson");
                        $("<div class='pinglunword'></div>").html(arr[k]['srcText']).appendTo("#child"+arr[k]['paragraphIndex']);
                        $("<div class='pinglunshu'></div>").html(arr[k]['comments_count']).appendTo("#child"+arr[k]['paragraphIndex']);
                        $("<div class='pinglunmore'></div>").appendTo("#child"+arr[k]['paragraphIndex']);
                        $("<img src='img/pingluntu.png' class='pinglundown'>").css("width","100%").appendTo(".pinglunmore");
                        $(".pinglunmore").click(function(){
                            $(".zhezhao").css({"display":"block","height":ch});
                        })


                    }
                },
                error: function () {
                    alert("失败");
                }
            })
        }else if(type==0){
            $.ajax({
                url:"http://api.deeporiginalx.com/news/baijia/fetchContent?url="+str,
                type:"get",
                cache:"false",
                async:"false",
                datatype:"jsonp",
                jsonp: "callbackparam",
                jsonpCallback:"jsonpCallback1",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success:function(e){
                    var point=e['point'];
                    var time=e['updateTime'];
                    var abs=e['abs'];
                    $(".date").html(time);
                    if(abs==''){
                        $(".bannertime").css("margin-bottom","3%");
                    }else{
                        $("<div class='card1'></div>").html(abs).appendTo(".cardbox");
                    }
                    var img=e['imgUrl'];
                    if(img==null||""){
                        $("#bannerImg").attr("src","img/guanggao.png")
                    }else{
                        $("#bannerImg").attr("src",img);
                    }
                    var title=e['title'];
                    if(title==null||""){
                        return;
                    }else{
                        $(".bannertitle").html(title);
                        document.title=title;
                    }

                    var con=e['content'];
                    var cons=con.split("\n",4);
                    var conn=con.split("\n");
                    var cons=conn.slice(0,-1)
                    var arr = uniqeByKeys(point,['paragraphIndex']);
                    for(var i=0;i<cons.length;i++){
                        $("<div class='card2'></div>").attr("id","card"+i).html(cons[i]).appendTo(".cardbox");
                    }
                    for(var k=0;k<arr.length;k++) {
                        $("<div class='cardChild'</div>").attr("id","child"+arr[k]['paragraphIndex']).appendTo("#card"+arr[k]['paragraphIndex']);
                        $("<div class='pinglunword'></div>").appendTo("#child"+arr[k]['paragraphIndex']);
                        $("<div class='pinglunperson'></div>").appendTo("#child"+arr[k]['paragraphIndex']);
                        $("<img src="+arr[k]['userIcon']+">").css({"background-clip":"content-box",width:"100%"}).appendTo(".pinglunperson");
                        $("<div class='pinglunword'></div>").html(arr[k]['srcText']).appendTo("#child"+arr[k]['paragraphIndex']);
                        $("<div class='pinglunshu'></div>").html(arr[k]['comments_count']).appendTo("#child"+arr[k]['paragraphIndex']);
                        $("<div class='pinglunmore'></div>").appendTo("#child"+arr[k]['paragraphIndex']);
                        $("<img src='img/pingluntu.png' class='pinglundown'>").css("width","100%").appendTo(".pinglunmore");
                        $(".pinglunmore").click(function(){
                            $(".zhezhao").css({"display":"block","height":ch});
                        })
                    }
                }
            })
        }
    })
    $(".closeB img").click(function(){$(".zhezhao").css("display","none")})
    $(".close").click(function(){$(".footer").css("display","none");})
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端;
    //var weixin = u.indexOf('MicroMessenger') > -1;
    var qq =u.indexOf('MQQBrowser') > -1;
    var webApp = u.indexOf('Safari') == -1;
    function isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    }
    if(isWeiXin()){
        $("#download").click(function(){
            $(".yingdao").css("display","block");
        });
        $("#footertu").click(function(){
            $(".yingdao").css("display","block");
        })
        $(".down a").click(function(){
            $(".yingdao").css("display","block");
        })

    }
    if(isAndroid){if(qq){$("#download").attr("href","http://koudaiv.com/static/file/app-official.apk");$("#footertu").attr("href","http://koudaiv.com/static/file/app-official.apk")}else{$("#download").attr("href","http://koudaiv.com/static/file/app-official.apk");$("#footertu").attr("href","http://koudaiv.com/static/file/app-official.apk")};}else if(isiOS||webApp){$("#download").attr("href","https://itunes.apple.com/cn/app/tou-tiao-bai-jia/id987333155?mt=8");$("#footertu").attr("href","https://itunes.apple.com/cn/app/tou-tiao-bai-jia/id987333155?mt=8");}else{$("#download").attr("href","http://deeporiginalx.com/");$("#footertu").attr("href","http://deeporiginalx.com/");}
    if(isAndroid){if(qq){$(".down a").attr("href","http://koudaiv.com/static/file/app-official.apk");}else{$(".down a").attr("href","http://koudaiv.com/static/file/app-official.apk");};}else if(isiOS||webApp){$(".down a").attr("href","https://itunes.apple.com/cn/app/tou-tiao-bai-jia/id987333155?mt=8");}else{$(".down a").attr("href","http://deeporiginalx.com/");}
})
