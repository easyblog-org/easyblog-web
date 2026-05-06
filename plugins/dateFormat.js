import Vue from "vue";

export function formatDate(val) {
    const date = new Date(Number(val));
    const Y = date.getFullYear() + "-";
    const M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
    const D = date.getDate() + " ";
    const h = date.getHours() + ":";
    const m = date.getMinutes() + ":";
    const s = (date.getSeconds() < 10 ? "0" + (date.getSeconds()) : date.getSeconds());
    return Y + M + D + h + m + s;
}

export function formatDates(value, fmt) {
    const date = new Date(Number(value));
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length));
    }
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            const str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substring(str.length);
}

Vue.filter("formatDate", (value) => {
    if (value === undefined || value === null) return "NA年NA月NA日";
    return formatDate(value);
});

Vue.filter("formatDates", (value, fmt = 'YYYY-MM-dd HH:mm:ss') => {
    if (value === undefined || value === null) return "NA年NA月NA日";
    return formatDates(value, fmt);
});
