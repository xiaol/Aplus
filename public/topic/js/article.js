$(function() {
	var showData = new ShowData();
	var topic = showData.getUrlParam("topic"),
		articleUrl = "http://121.40.34.56/news/baijia/fetchArticle?topic="+topic,
		articleType = "get",
		articles_a = [];
	//思维导图
	var mind = {
	    /* 元数据，定义思维导图的名称、作者、版本等信息 */
	    "meta":{
	        "name":"example",
	        "author":"hizzgdev@163.com",
	        "version":"0.2"
	    },
	    /* 数据格式声明 */
	    "format":"node_array",
	    /* 数据内容 */
	    "data":[
	        {"id":"center", "isroot":true, "topic":topic}
	        // {"id":"relation", "parentid":"center", "topic":"relation", "direction":"left"},
	        // {"id":"relation1", "parentid":"center", "topic":"relation to show","direction":"left"},
	        // {"id":"relation5", "parentid":"center", "topic":"relation to edit","direction":"left"},
	        // {"id":"relation2", "parentid":"center", "topic":"relation to edit"},
	        // {"id":"relation3", "parentid":"center", "topic":"relation to store"},
	        // {"id":"relation4", "parentid":"center", "topic":"relation to embed"}
	    ]
	};
    var options = {
        container:'jsmind_container',
        editable:false,
        theme:'orange'
    };
    var jm = new jsMind(options);
	$(".nav-title span").html(topic);
	//获取所有文章列表
	showData.dataConn(articleUrl,"",getArticle,articleType,"","",false);
	function getArticle(data){
		var articleDiv = "";
		var articles = [];
		if(data&&data.length>0){
			for(var a = 0;a<data.length; a++){
				articles_a.push(data[a]);
				articles.push(data[a].text);
			}
			//查看各自文章对应的观点
			var getIdeaUrl = "http://121.40.34.56/news/baijia/differOpinion",
				getIdeaType = "post";
			showData.dataConn(getIdeaUrl,{"article":articles.join("baijia")},getIdea);
		}else{
			$("#jsmind_container").html("<h1>抱歉 没有找到该话题相关的文章</h1>");
			$("#jsmind_container .loading").hide();
		}
	}
	
	function getIdea(data){
		if(data&&data.length>0){
			for(var d = 0;d<data.length;d++){
				var node = {};
				node.id = "article_" + d;
				node.parentid = "center";
				node.topic = data[d].self_opinion;
				// node.topic = showData.cutStr(data[d].self_opinion,20);
				if(node.topic!=""){
					node.direction = (d%2==0)?"left":"right";
					mind.data.push(node);
				}
			}
			if(mind.data.length>1){
				jm.show(mind);
				$("#jsmind_container .loading").hide();
			}else{
				$("#jsmind_container .loading").html("抱歉 没找到该话题相关的评论");
			}
		}
	}
	//查看对比
	var nowNode = 0;
	$("#jsmind_container").on("click","jmnode",function() {
		var targetId = $(this).attr("nodeid");
		if(nowNode == targetId){
			return false;
		}else{
			nowNode = targetId;
		}
		var xy = {};
		if(targetId.split("_")[0]=="article"){
			xy.top = $(this).offset().top;
			if(targetId.split("_")[1]%2==0){
				xy.left = $(this).offset().left+$(this).width()+20;
			}else{
				xy.left = $(this).offset().left-$(".article").width()-10;
			}
			setArticle(targetId.split("_")[1],xy,$(this).text());
		}
	});
	function setArticle(idIndex,offset,text){
		var showArticle = articles_a[idIndex];
		var windowH = $(window).height();
		//设置文章内容
		if(showArticle.text.indexOf(text)>-1){
			var newText = showArticle.text.split(text);
			showArticle.text =  newText[0]+"<span>" + text + "</span>" + newText[1] ;
		}
		$(".article header").html(showArticle.title);
		$(".article div").html(showArticle.text);
		//设置文章位置
		if(offset.top+$(".article").height()>windowH){
			$(".article").css({
				"left": offset.left,
				"top": windowH - $(".article").height()-80
			});
		}else{
			$(".article").css({
				"left": offset.left,
				"top": offset.top-65
			});
		}
	}
	$("#jsmind_container").click(function(e){
		if($(e.target).attr("class")==" selected"){
			$(".article").show();
		}else{
			nowNode = 0;
			$(".article").hide();
		}
	});
});