$(function() {
	//浏览器本地数据库
	var storage = window.localStorage;
	var tagLists = [];
	if(storage){
		//读取本地数据库
		tagLists = JSON.parse(storage.getItem("tags"));
	}
	console.log(tagLists);
	$(".search-btn").click(function(){
		var new_tag = $(".search-input").val();
		if(storage){
			//读取本地数据库
			tagLists = JSON.parse(storage.getItem("tags"));
			tagLists = tagLists?tagLists:[];
		}
		if(new_tag==""){
			$(".search-input").addClass("error");
			return false;
		}else{
			$(".search-input").removeClass("error");
		}
		if(tagLists&&tagLists.indexOf(new_tag)>-1){
			alert("该标签已经存在");
		}else{
			tagLists.push(new_tag);
			storage.setItem("tags",JSON.stringify(tagLists));
			$(".tag-list .blank").remove();
			$(".tag-list").append("<span><a class='tag'>"+ new_tag +"</a><a class='close'>X</a></span>");
		}
		$(".search-input").val("");
	})
	$(".search-input").focus(function(){
		$(".search-input").removeClass("error")
	});
	//查找数据库   显示标签
	if(tagLists&&tagLists.length>0){
		for(var t = 0;t<tagLists.length;t++){
			$(".tag-list").append("<span><a class='tag'>"+ tagLists[t] +"</a><a class='close'>X</a></span>");
		}
	}else{
		$(".tag-list").append("<a class='blank'>暂无任何标签</a>");
	}
	
	//点击标签
	$(".tag-list").on("click",".tag",function(){
		window.open("http://localhost:8080/datashow/article.html?topic="+$(this).text());
	});
	$(".tag-list").on("click",".close",function(){
		tagLists.remove($(this).prev(".tag").text());
		storage.setItem("tags",JSON.stringify(tagLists));
		$(this).prev(".tag").remove();
		$(this).remove();
	});
	// storage.setItem("tags",JSON.stringify([]));
});