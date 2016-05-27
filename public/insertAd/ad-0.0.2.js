var mydiv = document.createElement("div");
var ua = navigator.userAgent.toLowerCase();	
var windowH = 0;
if (/iphone|ipad|ipod/.test(ua)) {
	windowH = (window.screen.width*2.5)*0.75;
} else if (/android/.test(ua)) {
	windowH = (window.screen.width*2)*0.8;
}
mydiv.innerHTML = '<iframe src="ad.html?t=129" width=100% height='+windowH+' style="position:fixed;bottom:0px" frameborder=0 seamless></iframe>';
var body = document.getElementsByTagName("body")[0];
body.insertBefore(mydiv, body.firstChild);
