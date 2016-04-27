function dates(){
    var title,pubTime,pubName,urls,nowTime,imgLists,timeCha;
    nowTime=getNowFormatDate();
    $.ajax({
        url:"http://api.deeporiginalx.com/bdp/news/load?cid=28&tstart="+transdate(nowTime),
        type:"get",
        dataType:"json",
        success:function(e){
            console.log(e);
            var data=e['data'];
            $("<span class='first'></span>").css("display","none").html(data[0].pubTime).appendTo("body");
            $("<span class='last'></span>").css("display","none").html(data[data.length-1].pubTime).appendTo("body");
            for(var i=0;i<data.length;i++){
                title=data[i].title;
                pubTime=data[i].pubTime;
                timeCha=timeDifference(nowTime,pubTime);
                pubName=data[i].pubName;
                urls=data[i].url;
                if(!("imgList" in data[i])){
                    //alert(true)
                    //return;
                    $("<li class='yindaoMain'></li>").attr("id","main"+i).appendTo("#thelist");
                    $("<a></a>").attr("href",urls).attr("id","a"+i).appendTo("#main"+i);
                    $("<div class='yindaoTitle'></div>").html(title).appendTo("#a"+i);
                    $("<div class='yindaoForm'></div>").attr("id","form"+i).appendTo("#a"+i);
                    $("<div class='yindaoForminner' style='margin-left: 0'></div>").html(pubName).appendTo("#form"+i);
                    $("<div class='yindaoForminner'></div>").html(timeCha).appendTo("#form"+i);
                }else{
                    imgLists=data[i].imgList;
                    //alert(false)

                    if(imgLists.length==1){
                        $("<li class='yindaoMain'></li>").attr("id","main"+i).appendTo("#thelist");
                        $("<a></a>").attr("href",urls).attr("id","a"+i).appendTo("#main"+i);
                        $("<div class='yindaoLeft'></div>").attr("id","left"+i).appendTo("#a"+i);
                        $("<img src="+imgLists[0]+">").appendTo("#left"+i);
                        $("<div class='yindaoRight'></div>").attr("id","right"+i).appendTo("#a"+i);
                        $("<div class='yindaoTitle'></div>").html(title).attr("id","title"+i).appendTo("#right"+i);
                        $("<div class='yindaoForm'></div>").attr("id","form"+i).appendTo("#right"+i);
                        $("<div class='yindaoForminner' style='margin-left: 0'></div>").html(pubName).appendTo("#form"+i);
                        $("<div class='yindaoForminner'></div>").html(timeCha).appendTo("#form"+i);
                        //alert(1)
                    }else if(imgLists.length>1){
                        //alert(1)
                        $("<li class='yindaoMain'></li>").attr("id","main"+i).appendTo("#thelist");
                        $("<a></a>").attr("href",urls).attr("id","a"+i).appendTo("#main"+i);
                        $("<div class='yindaoTitle'></div>").html(title).attr("id","title"+i).appendTo("#a"+i);
                        $("<div class='yindaoTubox'></div>").attr("id","tubox"+i).appendTo("#a"+i);
                        for(var j=0;j<imgLists.length;j++){
                            //alert(imgList.length)
                            $("<div class='yindaoTu'>").attr("id","tu"+j).css({"background":"url("+imgLists[j]+")","background-size":"cover"}).appendTo("#tubox"+i);
                        }
                        $("<div class='yindaoForm'></div>").attr("id","form"+i).appendTo("#a"+i);
                        $("<div class='yindaoForminner' style='margin-left: 0'></div>").html(pubName).appendTo("#form"+i);
                        $("<div class='yindaoForminner'></div>").html(timeCha).appendTo("#form"+i);
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
}