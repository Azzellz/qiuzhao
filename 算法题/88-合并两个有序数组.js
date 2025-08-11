/**
 * @param {number[]} nums1 长度 = m + n，尾部有 n 个 0 占位
 * @param {number} m       nums1 的有效元素个数
 * @param {number[]} nums2 长度 = n
 * @param {number} n
 * @return {void} 原地修改，不返回
 */
var merge = function (nums1, m, nums2, n) {
    let i = m - 1; // nums1 的最后一个有效元素
    let j = n - 1; // nums2 的最后一个元素
    let k = m + n - 1; // nums1 的最后一个位置

    // 从后往前填充，避免覆盖
    while (j >= 0) {
        if (i >= 0 && nums1[i] > nums2[j]) {
            nums1[k--] = nums1[i--];
        } else {
            nums1[k--] = nums2[j--];
        }
    }
};
