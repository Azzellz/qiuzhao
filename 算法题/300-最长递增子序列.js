/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const tails = [];
  for (const x of nums) {
    let l = 0,
      r = tails.length;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (tails[mid] < x) l = mid + 1;
      else r = mid;
    }
    tails[l] = x; // 替换或追加
    if (l === tails.length) tails.push(x);
  }
  return tails.length;
};
