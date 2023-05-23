import Vue from "vue";


//方法一
export function formatDate(val) {
    var date = new Date(Number(val)); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + "-";
    var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
    var D = date.getDate() + " ";
    var h = date.getHours() + ":";
    var m = date.getMinutes() + ":";
    var s = (date.getSeconds() < 10 ? "0" + (date.getSeconds()) : date.getSeconds());
    return Y + M + D + h + m + s;
}

//方法二
export function formatDates(value, fmt) {
    var date = new Date(Number(value));
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substring(str.length);
}


//注册全局日期过滤器1
Vue.filter("formatDate", (value) => {
    if (value===undefined || value===null) return "NA年NA月NA日";
    return formatDate(value);
});


Vue.filter("formatDates", (value,fmt='YYYY-MM-dd HH:mm:ss') => {
    if (value===undefined || value===null) return "NA年NA月NA日";
    return formatDates(value,fmt);
});

