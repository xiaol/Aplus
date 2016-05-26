var mydiv = document.createElement("div");
mydiv.innerHTML = '<iframe src="ad.html" width=100% height=500 style="position:fixed;bottom:0px" frameborder=0 seamless></iframe>';
var body = document.getElementsByTagName("body")[0];
body.insertBefore(mydiv, body.firstChild);
