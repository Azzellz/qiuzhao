// 递归版
function flatDeep(arr, depth = 1) {
    if (depth === 0) return arr.slice();

    return arr.reduce((acc, cur) => {
        return acc.concat(Array.isArray(cur) ? flatDeep(arr, depth - 1) : cur);
    });
}

// 循环版
function flatStack(arr) {
    const stack = arr.slice();
    const result = [];
    while (stack.length) {
        const next = stack.pop();
        if (Array.isArray(next)) {
            stack.push(...next);
        } else {
            result.push(next);
        }
    }
    return result.reverse();
}

// 生成器版（装逼版）
function* flatGen(arr) {
    for (const item of arr) {
        if (Array.isArray(item)) {
            yield* flatGen(item);
        } else {
            yield item;
        }
    }
}
