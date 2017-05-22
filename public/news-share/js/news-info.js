$(function() {
	var nid = base.get_url_param("nid");
	var recommends_data = [];
	// 获取新闻数据
	(function(nid){
		var path = "/v2/ns/con";
		var rqd = {};
		if(nid){
			rqd.nid = nid;
		}else{
			return;
		}
		rqd.uid = "24627392";
		base.data_conn(path,rqd,function(data){
			console.log(data);
			var news_info = data.data;
			for(var n in news_info){
				$("[data-"+n+"]").html(news_info[n]);
			}
			var contents = news_info.content;
			var news_html = [];
			for(var c in contents){
				if(contents[c].txt){
					news_html.push("<div>"+contents[c].txt+"</div>")
				}else if(contents[c].img){
					news_html.push("<img src="+ contents[c].img +" />")
				}
			}
			get_comment_data(news_info.docid);
			$("#news-content").html(news_html.join(""));
		})
	})(nid);
	// 获取相关推荐
	(function(nid){
		var path = "/v2/ns/asc";
		var rqd = {};
		rqd.nid = nid;
		base.data_conn(path,rqd,function(data){
			var recommends = data.data;
			if(recommends.length>0){
				recommends_data = recommends;
				insert_recommend(3);
			}else{
				$(".news-recommend").hide();
			}
			
		})
	})(nid);
	// 获取评论信息
	function get_comment_data(did){
		var path = "/v2/ns/coms/h";
		var rqd = {did:BASE64.encoder(did)};
		base.data_conn(path,rqd,function(data){
			var comments = data.data;
			if(data.code==2000){
				var coms = create_comment(comments);
				$(".comment-content").html(coms.join(""));
			}else{
				$(".news-comment").hide();
			}
		})
	}
	// 生成推荐页面
	function create_recomend(recos){
		var reco_arr = [];
		for(var r in recos){
			var str = "";
			var reco = recos[r];
			str += '<div class="recommend-item clearfix">';
			str += '<div class="recommend-img">';
			str += '<img src="'+reco.img+'">';
			str += '</div>';
			str += '<div class="recommend-info">';
			str += '<div class="recommend-title">'+ reco.title +'</div>';
			str += '<div class="recommend-foot">'+ reco.pname +'</div></div></div>';
			reco_arr.push(str);
		}
		return reco_arr;
	}
	// 添加推荐信息
	function insert_recommend(num){
		var left_reco = recommends_data.splice(num);
		var reco_html = create_recomend(recommends_data);
		$("#recommend-content").append(reco_html.join(""));
		recommends_data = left_reco;
		if(left_reco.length<=0){
			$(".recommend-more").html("已显示全部推荐新闻");
		}
	}
	// 生成评论页面
	function create_comment(coms){
		var comm_arr = [];
		for(var c in coms){
			var str = "";
			var com = coms[c];
			str += '<div class="comment-item">';
			str += '<div class="comment-top">';
			str += '<img class="user-avat" src="'+ (com.avatar||"icon/avatar.jpg") +'">';
			str += '<span class="news-like">'+com.commend+'赞</span>';
			str += '<div class="comment-info">';
			str += '<div class="user-name">'+ com.uname +'</div>';
			str += '<div class="commnet-time">'+ com.ctime +'</div>';
			str += '</div></div>';
			str += '<div class="comment-txt">'+com.content+'</div></div>';
			comm_arr.push(str);
		}
		console.log(comm_arr)
		return comm_arr;
	}
	// 查看更多推荐
	$(".recommend-more").click(function(){
		insert_recommend(3);
	})
});