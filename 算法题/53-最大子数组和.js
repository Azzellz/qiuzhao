/**
 * @param {number[]} nums
 * @return {number}
 * kadane算法
 */
var maxSubArray = function (nums) {
    let sum = 0;
    let max = nums[0];
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        max = Math.max(max, sum);
        // 说明当前子数组对后续的和没有正向贡献，将 sum 重置为 0
        if (sum < 0) sum = 0;
    }
    return max;
};
