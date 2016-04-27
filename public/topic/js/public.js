var ShowData = function(){

};
//判断数据中是否存在某一值
Array.prototype.S=String.fromCharCode(2);  
Array.prototype.haspara=function(e)  
{  
    var r=new RegExp(this.S+e+this.S);  
    return (r.test(this.S+this.join(this.S)+this.S));  
}
ShowData.prototype = {
    reqUrl : "http://120.27.162.246:8888/",
    domain : document.location.protocol + "//" + document.location.host,
    url : this.domain + "",
    //获取地址栏参数
    getUrlParam: function (name){  
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
        var r = window.location.search.substr(1).match(reg);  
        if (r!=null) 
            return decodeURI(r[2]); 
        return null;  
    },
    //计算字符串所占的像素值
    compute : function(v){
        var d = document.getElementById('dvCompute');
        d.innerHTML = v;
        return { w: d.offsetWidth, h: d.offsetHeight };
    },
    // 星期映射
    getWeek : function(day){
        switch(day){
            case 1: return "星期一";
            case 2: return "星期二";
            case 3: return "星期三";
            case 4: return "星期四";
            case 5: return "星期五";
            case 6: return "星期六";
            case 0: return "星期日";
            default : return day;
        }
    },
    // 日期处理
    //格式 2015-09
    getMydate : function(date){
        var mydate = {},year = 0,month = 0;
        if(date){
            year = date.split("-")[0];
            month = date.split("-")[1];
        }
        switch(month){
            case "01": mydate.e = "January"; mydate.z = "壹月"; break;
            case "02": mydate.e = "February"; mydate.z = "贰月"; break;
            case "03": mydate.e = "March"; mydate.z = "叁月"; break;
            case "04": mydate.e = "April"; mydate.z = "肆月"; break;
            case "05": mydate.e = "May"; mydate.z = "伍月"; break;
            case "06": mydate.e = "June"; mydate.z = "陆月"; break;
            case "07": mydate.e = "July"; mydate.z = "柒月"; break;
            case "08": mydate.e = "August"; mydate.z = "捌月"; break;
            case "09": mydate.e = "September"; mydate.z = "玖月"; break;
            case "10": mydate.e = "October"; mydate.z = "拾月"; break;
            case "11": mydate.e = "November"; mydate.z = "拾壹月"; break;
            case "12": mydate.e = "December"; mydate.z = "拾贰月"; break;
            default : mydate.e = month; mydate.z = month; break;
        }
        switch((parseInt(year)-1959)%12){
            case 01: mydate.sx = "鼠年"; break;
            case 02: mydate.sx = "牛年"; break;
            case 03: mydate.sx = "虎年"; break;
            case 04: mydate.sx = "兔年"; break;
            case 05: mydate.sx = "龙年"; break;
            case 06: mydate.sx = "蛇年"; break;
            case 07: mydate.sx = "马年"; break;
            case 08: mydate.sx = "羊年"; break;
            case 09: mydate.sx = "猴年"; break;
            case 10: mydate.sx = "鸡年"; break;
            case 11: mydate.sx = "狗年"; break;
            case 12: mydate.sx = "猪年"; break;
            default : mydate.sx = year; break;
        }
        console.log(mydate);
        return mydate;
    },
    //返回规定长度的字符串  超出部分显示。。。
    cutStr : function(str,maxLength) {
        var str = str;
        var strlength = 0;
        if(maxLength){
            strlength = maxLength;
        }
        if(str&&str.length>strlength){
            str = str.slice(0,strlength) + "...";
        }
        return str;
    },
    // ajax请求
    dataConn : function (url, requestData, responseFn,type,backData,completeFn, async){
        $.ajax({
            type: (type != undefined ? type : "post"),
            url: url,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            data: requestData,
            jsonp:"callback",
            timeout: 1000000,
            crossDomain:true,
            cache: false,
            async: (async != undefined ? async : true),
            beforeSend: function(XMLHttpRequest,XMLHttpResponse,text){
                //设置header参数
                // XMLHttpRequest.setRequestHeader("Access-Control-Allow-Methods", "GET,POST");
            },
            success: function(data, textStatus, XMLHttpRequest){
                if (data != null) {
                    // if (data.retCode != "00000") {
                    //     alert(data.retCode + " : " + data.retInfo);
                    //     return false;
                    // }
                    if (responseFn != undefined && typeof(responseFn) == "function") {
                       // try {
                            responseFn(data, textStatus,backData);
                        //} catch (e) {
                          //  console.log("[PARSE ERROR] name : " + e.name + ", message: " + e.msg);

                        //}
                    }
                } 
            },
            error: function(XMLHttpRequest, error){
                console.log(error);
                if (error == "timeout") {
                    alert("请求超时：请求系统返回数据超时！请稍候再试吧…");
                }
            },
            complete: function(XMLHttpRequest, textStatus){
                if (completeFn != undefined && typeof(completeFn) == "function") {
                    try {
                        completeFn(textStatus,bd);
                    } catch (e) {
                        alert("[ERROR] name : " + e.name + ", message: " + e.message);
                    }
                }
            }
        })
    },
    drawPie:function(cd,container){
        var chart;
        AmCharts.ready(function () {
            // chart.addTitle("Visitors countries", 16);
            chart = new AmCharts.AmPieChart();
            chart.dataProvider = cd;
            chart.titleField = "country";
            chart.valueField = "visits";
            chart.sequencedAnimation = false;
            chart.startEffect = "elastic";
            chart.innerRadius = "50%";
            chart.startDuration = 2;
            chart.labelRadius = 15;
            chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
            chart.depth3D = 6;
            chart.angle = 15;
            // WRITE
            chart.write(container);
        });
    },
    drawChart:function(cd,container){
        AmCharts.ready(function () {
            var chart;
            // SERIAL CHART
            chart = new AmCharts.AmSerialChart();
            chart.addClassNames = true;
            chart.dataProvider = cd;
            chart.categoryField = "date";
            chart.dataDateFormat = "YYYY-MM-DD";
            chart.startDuration = 1;
            chart.color = "#FFFFFF";
            chart.marginLeft = 0;

            // AXES
            // category
            var categoryAxis = chart.categoryAxis;
            categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
            categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
            categoryAxis.autoGridCount = false;
            categoryAxis.gridCount = 50;
            categoryAxis.gridAlpha = 0.1;
            categoryAxis.gridColor = "#FFFFFF";
            categoryAxis.axisColor = "#555555";
            // we want custom date formatting, so we change it in next line
            categoryAxis.dateFormats = [{
                period: 'DD',
                format: 'DD'
            }, {
                period: 'WW',
                format: 'MMM DD'
            }, {
                period: 'MM',
                format: 'MMM'
            }, {
                period: 'YYYY',
                format: 'YYYY'
            }];

            // as we have data of different units, we create three different value axes
            // Distance value axis
            var distanceAxis = new AmCharts.ValueAxis();
            distanceAxis.title = "distance";
            distanceAxis.gridAlpha = 0;
            distanceAxis.axisAlpha = 0;
            chart.addValueAxis(distanceAxis);

            // latitude value axis
            var latitudeAxis = new AmCharts.ValueAxis();
            latitudeAxis.gridAlpha = 0;
            latitudeAxis.axisAlpha = 0;
            latitudeAxis.title = "duration and latitude";
            latitudeAxis.offset = 83;
            latitudeAxis.titleOffset = 10;
            latitudeAxis.position = "right";
            chart.addValueAxis(latitudeAxis);

            // duration value axis
            var durationAxis = new AmCharts.ValueAxis();
            // the following line makes this value axis to convert values to duration
            // it tells the axis what duration unit it should use. mm - minute, hh - hour...
            durationAxis.duration = "mm";
            durationAxis.durationUnits = {
                DD: "d. ",
                hh: "h ",
                mm: "min",
                ss: ""
            };
            durationAxis.gridAlpha = 0;
            durationAxis.axisAlpha = 0;
            durationAxis.inside = false;
            durationAxis.position = "right";
            chart.addValueAxis(durationAxis);

            // GRAPHS
            // distance graph
            var distanceGraph = new AmCharts.AmGraph();
            distanceGraph.valueField = "distance";
            distanceGraph.title = "distance";
            distanceGraph.type = "column";
            distanceGraph.fillAlphas = 0.9;
            distanceGraph.valueAxis = distanceAxis; // indicate which axis should be used
            distanceGraph.balloonText = "[[value]] miles";
            distanceGraph.legendValueText = "[[value]] mi";
            distanceGraph.legendPeriodValueText = "total: [[value.sum]] mi";
            distanceGraph.lineColor = "#263138";
            distanceGraph.alphaField = "alpha";
            chart.addGraph(distanceGraph);

            // latitude graph
            var latitudeGraph = new AmCharts.AmGraph();
            latitudeGraph.valueField = "latitude";
            latitudeGraph.id = "g1";
            latitudeGraph.classNameField = "bulletClass";
            latitudeGraph.title = "latitude/city";
            latitudeGraph.type = "line";
            latitudeGraph.valueAxis = latitudeAxis; // indicate which axis should be used
            latitudeGraph.lineColor = "#786c56";
            latitudeGraph.lineThickness = 1;
            latitudeGraph.legendValueText = "[[description]]/[[value]]";
            latitudeGraph.descriptionField = "townName";
            latitudeGraph.bullet = "round";
            latitudeGraph.bulletSizeField = "townSize"; // indicate which field should be used for bullet size
            latitudeGraph.bulletBorderColor = "#786c56";
            latitudeGraph.bulletBorderAlpha = 1;
            latitudeGraph.bulletBorderThickness = 2;
            latitudeGraph.bulletColor = "#000000";
            latitudeGraph.labelText = "[[townName2]]"; // not all data points has townName2 specified, that's why labels are displayed only near some of the bullets.
            latitudeGraph.labelPosition = "right";
            latitudeGraph.balloonText = "latitude:[[value]]";
            latitudeGraph.showBalloon = true;
            latitudeGraph.animationPlayed = true;
            chart.addGraph(latitudeGraph);

            // duration graph
            var durationGraph = new AmCharts.AmGraph();
            durationGraph.id = "g2";
            durationGraph.title = "duration";
            durationGraph.valueField = "duration";
            durationGraph.type = "line";
            durationGraph.valueAxis = durationAxis; // indicate which axis should be used
            durationGraph.lineColor = "#ff5755";
            durationGraph.balloonText = "[[value]]";
            durationGraph.lineThickness = 1;
            durationGraph.legendValueText = "[[value]]";
            durationGraph.bullet = "square";
            durationGraph.bulletBorderColor = "#ff5755";
            durationGraph.bulletBorderThickness = 1;
            durationGraph.bulletBorderAlpha = 1;
            durationGraph.dashLengthField = "dashLength";
            durationGraph.animationPlayed = true;
            chart.addGraph(durationGraph);

            // CURSOR
            var chartCursor = new AmCharts.ChartCursor();
            chartCursor.zoomable = false;
            chartCursor.categoryBalloonDateFormat = undefined;
            chartCursor.cursorAlpha = 0;
            chartCursor.valueBalloonsEnabled = false;
            chartCursor.valueLineBalloonEnabled = true;
            chartCursor.valueLineEnabled = true;
            chartCursor.valueLineAlpha = 0.5;
            chart.addChartCursor(chartCursor);

            // LEGEND
            var legend = new AmCharts.AmLegend();
            legend.bulletType = "round";
            legend.equalWidths = false;
            legend.valueWidth = 120;
            legend.useGraphSettings = true;
            legend.color = "#FFFFFF";
            chart.addLegend(legend);

            // WRITE
            chart.write(container);
        });
    },
    //地图
    drawMap : function(container){
        // 百度地图API功能
        var map = new BMap.Map(container);    // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    },
    drawCloud:function(){
        if( ! $('#myCanvas').tagcanvas({
        textColour : '#ffffff',
        outlineThickness : 1,
        maxSpeed : 0.03,
        depth : 0.75
        })) {
        // TagCanvas failed to load
            $('#myCanvasContainer').hide();
        }
    }
}
/**
 
 * 时间对象的格式化;
 
 */
Date.prototype.format = function(format) {
    if (this == "Invalid Date") return "无";
    var o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds()
            // millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
//数组中删除某个元素
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
    this.splice(index, 1);
    }
};
//扩展jquery
$.fn.extend({
    setText:function(text){
        $(this).html(text);
    }
});
