
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var minutes=date.getMinutes();
    var seconds=date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 +minutes
        + seperator2 +seconds;
    return currentdate;
}
//    getNowFormatDate()函数获取当前时间，格式为xx-xx-xx xx：xx：xx

function timeDifference(dt1,dt2){
    var regTime = /(\d{4})-(\d{1,2})-(\d{1,2})( \d{1,2}:\d{1,2})/g;
    var interval = Math.abs(Date.parse(dt1.replace(regTime, "$2-$3-$1$4")) - Date.parse(dt2.replace(regTime, "$2-$3-$1$4")))/1000;
    var h = Math.floor(interval / 3600);
    var m = Math.floor(interval % 3600 / 60);
    var time;
    if(h>0){
        time=h + "小时" + m + "分钟前";
    }else{
        time=m + "分钟前";
    }
    return (time)
}
var dt1 = getNowFormatDate();//alert(dt1)当前时间
//var dt2 = "2016-1-20 11:20";
//document.write(timeDifference(dt1,dt2))
//    timeDifference(dt1,dt2)函数获取指定时间与当前时间的时间差，格式为xx小时xx分钟前

function transdate(endTime){
    var date=new Date();
    date.setFullYear(endTime.substring(0,4));
    date.setMonth(endTime.substring(5,7)-1);
    date.setDate(endTime.substring(8,10));
    date.setHours(endTime.substring(11,13));
    date.setMinutes(endTime.substring(14,16));
    date.setSeconds(endTime.substring(17,19));
    return date.getTime();;//时间戳精确到毫秒.parse(date)
}
console.log(transdate(dt1))
//    transdate()函数获取时间戳

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57,
    58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0,  1,  2,  3,  4,  5,  6,
    7,  8,  9,  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1,
    -1, -1);
function base64encode(str)
{
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";

    while (i < len)
    {
        c1 = str.charCodeAt(i++) & 0xff;

        if (i == len)
        {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break
        }

        c2 = str.charCodeAt(i++);

        if (i == len)
        {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break
        }

        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F)
    }

    return out
}
//js的base64算法


