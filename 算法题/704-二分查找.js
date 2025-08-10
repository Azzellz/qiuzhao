/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
};

// 左侧边界：第一个 ≥ target 的位置
function lowerBound(nums, target) {
    let left = 0;
    let right = nums.length; // 注意：开区间右边界

    while (left < right) {
        const mid = left + ((right - left) >> 1);
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left; // 若返回值为 nums.length 表示所有元素都 < target
}

// 右侧边界：最后一个 ≤ target 的位置
function upperBound(nums, target) {
    let left = 0;
    let right = nums.length; // 开区间右边界

    while (left < right) {
        const mid = left + ((right - left) >> 1);
        if (nums[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left - 1; // 若返回 -1 表示所有元素都 > target
}
