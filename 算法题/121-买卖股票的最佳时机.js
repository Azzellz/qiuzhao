/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let min = prices[0] || 0;
    let sold = 0;
    for (const p of prices) {
        min = Math.min(p, min);
        sold = Math.max(p - min, sold);
    }
    return sold;
};
