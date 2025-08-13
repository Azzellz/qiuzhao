/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    if (n <= 1) {
        return 1;
    }
    // return climbStairs(n - 1) + climbStairs(n - 2); 递归（可能会超时）
    // 爬到第 n 级的方法数 = 爬到第 n-1 级的方法数 + 爬到第 n-2 级的方法数 f(n) = f(n-1) + f(n-2)，边界 f(0)=1, f(1)=1。
    let p1 = 1,
        p2 = 1;
    for (let i = 2; i <= n; i++) {
        // 状态转移
        const cur = p1 + p2;
        p1 = p2;
        p2 = cur;
    }
    return p2;
};
