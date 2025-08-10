/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * https://leetcode.cn/problems/two-sum/
 */
var twoSum = function (nums, target) {
    const map = new Map(); // 存储数字和对应的索引

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i]; // 找到答案
        }
        map.set(nums[i], i);
    }

    return []; // 无解时返回空数组
};
