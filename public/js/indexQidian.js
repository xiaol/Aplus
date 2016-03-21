function dates(){
    //alert(y)
    var title,pubTime,pubName,urls,nowTime,imgLists,timeCha;
    nowTime=getNowFormatDate();console.log(nowTime);
    $.ajax({
        url:"http://api.deeporiginalx.com/bdp/news/load?cid=1&tstart="+transdate(nowTime),
        type:"get",
        dataType:"json",
        success:function(e){
            var data=e['data'];console.log();
            $("<span class='first'></span>").css("display","none").html(data[0].pubTime).appendTo("body");
            $("<span class='last'></span>").css("display","none").html(data[data.length-1].pubTime).appendTo("body");
            for(var i=0;i<data.length;i++){
                title=data[i].title;
                pubTime=data[i].pubTime;
                timeCha=timeDifference(nowTime,pubTime);
                pubName=data[i].pubName;
                urls=data[i].url;
                if(!("imgList" in data[i])){
                    $("<a class='a'></a>").attr("id","a"+i).appendTo(".mainBox");
                    $("<li></li>").attr("id","li"+i).appendTo("#a"+i);
                    $("<p class='titleWord'></p>").html(title).appendTo("#li"+i);
                    $("<div class='fromBox'></div>").attr("id","from"+i).appendTo("#li"+i);
                    $("<div class='from'></div>").html(pubName).appendTo("#from"+i);
                    $("<div class='time'></div>").html(timeCha).appendTo("#from"+i);
                }else{
                    imgLists=data[i].imgList;
                    //alert(false)

                    if(imgLists.length==1){
                        $("<a class='a'></a>").attr("id","a"+i).appendTo(".mainBox");
                        $("<li></li>").attr("id","li"+i).appendTo("#a"+i);
                        $("<div class='imgbox'></div>").attr("id","img"+i).appendTo("#li"+i);
                        $("<img src="+imgLists[0]+">").appendTo("#img"+i);
                        $("<div class='wordBox'></div>").attr("id","word"+i).appendTo("#li"+i);
                        $("<p class='titleWord'></p>").html(title).appendTo("#word"+i);
                        $("<div class='fromBox'></div>").attr("id","from"+i).appendTo("#word"+i);
                        $("<div class='from'></div>").html(pubName).appendTo("#from"+i);
                        $("<div class='time'></div>").html(timeCha).appendTo("#from"+i);
                    }else if(imgLists.length>1){
                        //alert(1)
                        $("<a class='a'></a>").attr("id","a"+i).appendTo(".mainBox");
                        $("<li></li>").attr("id","li"+i).appendTo("#a"+i);
                        $("<p class='titleWord'></p>").html(title).appendTo("#li"+i);
                        $("<div class='imgboxs'></div>").attr("id","tubox"+i).appendTo("#li"+i);
                        for(var j=0;j<imgLists.length;j++){
                            //alert(imgList.length)
                            $("<div><img src="+imgLists[j]+"></div>").appendTo("#tubox"+i);
                        }
                        $("<div class='fromBox'></div>").attr("id","from"+i).appendTo("#li"+i);
                        $("<div class='from'></div>").html(pubName).appendTo("#from"+i);
                        $("<div class='time'></div>").html(timeCha).appendTo("#from"+i);
                    }
                }
            }
            $("img").load(function(){
                setTimeout(function () {
                    myScroll1.refresh();
                }, 100);
            })
        }
    })

    //setTimeout(function () {
    //    myScroll1.refresh();
    //}, 100);
}
function dates1(){
    $(".channel").each(function(i,obj){
        $(obj).click(function(){
            //$(".mainBox").html("");
            $(".channel").removeClass("border");
            $(this).addClass("border");
            var val=$(this).find("a").html();
            $.ajax({
                url:"http://api.deeporiginalx.com/bdp/news/channels",
                type:"get",
                dataType:"json",
                success:function(e){
                    var mm= e.data;
                    for(var i=0;i< mm.length;i++){
                        if(mm[i]['cname']==val){
                            var ids=mm[i]['id'];
                            var title,pubTime,pubName,urls,nowTime,imgLists,timeCha;
                            nowTime=getNowFormatDate();
                            $.ajax({
                                url:"http://api.deeporiginalx.com/bdp/news/load?cid="+ids+"&tstart="+transdate(nowTime),
                                type:"get",
                                dataType:"json",
                                success:function(e){
                                    $(".mainBox").html("");
                                    var data=e['data'];console.log(data);
                                    $("<span class='first'></span>").css("display","none").html(data[0].pubTime).appendTo("body");
                                    $("<span class='last'></span>").css("display","none").html(data[data.length-1].pubTime).appendTo("body");
                                    for(var i=0;i<data.length;i++){
                                        title=data[i].title;
                                        pubTime=data[i].pubTime;
                                        timeCha=timeDifference(nowTime,pubTime);
                                        pubName=data[i].pubName;
                                        urls=data[i].url;
                                        if(!("imgList" in data[i])){
                                            $("<a></a>").attr("id","a"+i).appendTo(".mainBox");
                                            $("<li></li>").attr("id","li"+i).appendTo("#a"+i);
                                            $("<p class='titleWord'></p>").html(title).appendTo("#li"+i);
                                            $("<div class='fromBox'></div>").attr("id","from"+i).appendTo("#li"+i);
                                            $("<div class='from'></div>").html(pubName).appendTo("#from"+i);
                                            $("<div class='time'></div>").html(timeCha).appendTo("#from"+i);
                                        }else{
                                            imgLists=data[i].imgList;
                                            //alert(false)

                                            if(imgLists.length==1){
                                                $("<a></a>").attr("id","a"+i).appendTo(".mainBox");
                                                $("<li></li>").attr("id","li"+i).appendTo("#a"+i);
                                                $("<div class='imgbox'></div>").attr("id","img"+i).appendTo("#li"+i);
                                                $("<img src="+imgLists[0]+">").appendTo("#img"+i);
                                                $("<div class='wordBox'></div>").attr("id","word"+i).appendTo("#li"+i);
                                                $("<p class='titleWord'></p>").html(title).appendTo("#word"+i);
                                                $("<div class='fromBox'></div>").attr("id","from"+i).appendTo("#word"+i);
                                                $("<div class='from'></div>").html(pubName).appendTo("#from"+i);
                                                $("<div class='time'></div>").html(timeCha).appendTo("#from"+i);
                                            }else if(imgLists.length>1){
                                                //alert(1)
                                                $("<a></a>").attr("id","a"+i).appendTo(".mainBox");
                                                $("<li></li>").attr("id","li"+i).appendTo("#a"+i);
                                                $("<p class='titleWord'></p>").html(title).appendTo("#li"+i);
                                                $("<div class='imgboxs'></div>").attr("id","tubox"+i).appendTo("#li"+i);
                                                for(var j=0;j<imgLists.length;j++){
                                                    //alert(imgList.length)
                                                    $("<div><img src="+imgLists[j]+"></div>").appendTo("#tubox"+i);
                                                }
                                                $("<div class='fromBox'></div>").attr("id","from"+i).appendTo("#li"+i);
                                                $("<div class='from'></div>").html(pubName).appendTo("#from"+i);
                                                $("<div class='time'></div>").html(timeCha).appendTo("#from"+i);
                                            }
                                        }
                                    }
                                    setTimeout(function () {
                                        myScroll1.refresh();
                                    }, 100);
                                }

                            })
                        }
                    }
                    setTimeout(function () {
                        myScroll1.refresh();
                    }, 100);
                }
            })
            //setTimeout(function () {
            //    myScroll1.refresh();
            //}, 100);
        })
    })
}
function dates2(){
    $(".channel").each(function(i,obj){
        $(obj).click(function(){
//alert(y);
            //    myScroll1.refresh();
            //}, 100);
            //$(".mainBox").empty();
            $(".channel").removeClass("border");
            $(this).addClass("border");
            var val=$(this).find("a").html();
            //$.ajax({
            //    url:"http://api.deeporiginalx.com/bdp/news/channels",
            //    type:"get",
            //    dataType:"json",
                //success:function(e){
                //    var mm= e.data;
                    //for(var i=0;i< mm.length;i++){
                        //if(mm[i]['cname']==val){
                        //    var ids=mm[i]['id'];
            var ids=$(this).attr("id");
            var title,pubTime,pubName,urls,nowTime,imgLists,timeCha;
                            nowTime=getNowFormatDate();
                            $.ajax({
                                url:"http://api.deeporiginalx.com/bdp/news/load?cid="+ids+"&tstart="+transdate(nowTime),
                                type:"get",
                                dataType:"json",
                                success:function(e){
                                    $(".loadMord").css("display","block");
                                    $(".load").css("display","none");
                                    $("#scroller-pullUp").css("display","block");
                                    $(".mainBox").html("");
                                    var data=e['data'];console.log(data);
                                    $("<span class='first'></span>").css("display","none").html(data[0].pubTime).appendTo("body");
                                    $("<span class='last'></span>").css("display","none").html(data[data.length-1].pubTime).appendTo("body");
                                    for(var i=0;i<data.length;i++){
                                        title=data[i].title;
                                        pubTime=data[i].pubTime;
                                        timeCha=timeDifference(nowTime,pubTime);
                                        pubName=data[i].pubName;
                                        urls=data[i].url;
                                        var aUrl=del_html_tags(base64encode(urls),"=","");
                                        if(!("imgList" in data[i])){
                                            $("<a class='a'></a>").attr({"id":"a"+i,"href":"http://deeporiginalx.com/news.html?type=0&url="+aUrl+"&interface"}).appendTo(".mainBox");
                                            $("<li></li>").attr("id","li"+i).appendTo("#a"+i);
                                            $("<p class='titleWord'></p>").html(title).appendTo("#li"+i);
                                            $("<div class='fromBox'></div>").attr("id","from"+i).appendTo("#li"+i);
                                            $("<div class='from'></div>").html(pubName).appendTo("#from"+i);
                                            $("<div class='time'></div>").html(timeCha).appendTo("#from"+i);
                                        }else{
                                            imgLists=data[i].imgList;
                                            //alert(false)

                                            if(imgLists.length==1){
                                                $("<a class='a'></a>").attr({"id":"a"+i,"href":"http://deeporiginalx.com/news.html?type=0&url="+aUrl+"&interface"}).appendTo(".mainBox");
                                                $("<li></li>").attr("id","li"+i).appendTo("#a"+i);
                                                $("<div class='imgbox'></div>").attr("id","img"+i).appendTo("#li"+i);
                                                $("<img src="+imgLists[0]+">").appendTo("#img"+i);
                                                $("<div class='wordBox'></div>").attr("id","word"+i).appendTo("#li"+i);
                                                $("<p class='titleWord'></p>").html(title).appendTo("#word"+i);
                                                $("<div class='fromBox'></div>").attr("id","from"+i).appendTo("#word"+i);
                                                $("<div class='from'></div>").html(pubName).appendTo("#from"+i);
                                                $("<div class='time'></div>").html(timeCha).appendTo("#from"+i);
                                            }else if(imgLists.length>1){
                                                //alert(1)
                                                $("<a class='a'></a>").attr({"id":"a"+i,"href":"http://deeporiginalx.com/news.html?type=0&url="+aUrl+"&interface"}).appendTo(".mainBox");
                                                $("<li></li>").attr("id","li"+i).appendTo("#a"+i);
                                                $("<p class='titleWord'></p>").html(title).appendTo("#li"+i);
                                                $("<div class='imgboxs'></div>").attr("id","tubox"+i).appendTo("#li"+i);
                                                for(var j=0;j<imgLists.length;j++){
                                                    //alert(imgList.length)
                                                    $("<div><img src="+imgLists[j]+"></div>").appendTo("#tubox"+i);
                                                }
                                                $("<div class='fromBox'></div>").attr("id","from"+i).appendTo("#li"+i);
                                                $("<div class='from'></div>").html(pubName).appendTo("#from"+i);
                                                $("<div class='time'></div>").html(timeCha).appendTo("#from"+i);
                                            }
                                        }
                                    }
                                    $("img").load(function(){
                                        setTimeout(function () {
                                            myScroll1.refresh();
                                        }, 100);
                                    })

                                }

                            })

        })
    })
}