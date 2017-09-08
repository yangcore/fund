export default {
    fmoney: function (s, n) {
        let before='';
        if(s){
            if(s.indexOf('-')>=0){
                before='-';
                s=s.split('-')[1];
            }
        }
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        var  t = "";
        for(var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        if(r == '00') {
            return before+t.split("").reverse().join("");
        } else {
            return before+t.split("").reverse().join("") + "." + r;
        }
    },
    getType:function(s){
        let n;
        switch (s) {
            case "1000":
               n="股票型";
                break;
             case "1001":
               n="债券型";
                break;
            case "1002":
               n="混合型";
                break;
            case "1003":
                n="QDII";
                break;
            case "1004":
                n="ETF";
                break;
            case "1005":
               n="货币型";
                break;
            case "1006":
                n="拍活期";
                break;
        }

        return n;
    },
    colorType(e){
        if(e>=0){
            return "_ff5255"
        }else{
             return "_36cca4"
        }
    },
    isApp(){
        let t=navigator.userAgent.toLowerCase();
            if("riches" == t.match(/riches/i)) {
                return true;
              } else {
                return false;
              }
    },
    GetQueryString(t) {
        var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"),
            s = window.location.search.substr(1).match(e);
        return null != s ? unescape(s[2]) : null
    },
    getUrlAppToken(){
        let url=window.location.href;
        let appToken='';
        if(url.split('?').length>1){
            let arr=url.split('?')[1].split('&');
            for(var i=0;i<arr.length;i++){
                if(arr[i].indexOf('appToken')>=0){
                    appToken=arr[i];
                    break;
                }
            }
        }
        
        return appToken.split('=')[1];
    }
}