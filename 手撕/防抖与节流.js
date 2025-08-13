// 防抖：N 秒内只执行最后一次（如搜索框输入结束后再发请求）。
function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(this, ...args);
            timer = null;
        }, delay);
    };
}

// 节流：在一段时间内最多只执行一次
function throttle(fn, wait) {
    let timer = null;
    return function (...args) {
        if (timer) return;
        timer = setTimeout(() => {
            fn.call(this, ...args);
            timer = null;
        }, wait);
    };
}
