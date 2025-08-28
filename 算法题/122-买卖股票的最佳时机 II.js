/**
 * @param {number[]} prices
 * @return {number}
 * 低价买入，高价售出
 */
var maxProfit = function (prices) {
  let i = 0,
    j = 1,
    profit = 0;
  while (j < prices.length) {
    if (prices[i] < prices[j]) {
      profit += prices[j] - prices[i];
    }
    j++;
    i++;
  }
  return profit;
};
