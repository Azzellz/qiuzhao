function quickSort(arr, left = 0, right = arr.length - 1) {
    while (left < right) {
        // 随机基准
        const randIdx = left + Math.floor(Math.random() * (right - left + 1));
        [arr[randIdx], arr[right]] = [arr[right], arr[randIdx]];

        const p = partition(arr, left, right);
        // 只对较短的一侧递归，另一侧用循环 → 栈深度 ≤ log n
        if (p - left < right - p) {
            quickSort(arr, left, p - 1);
            left = p + 1; // 尾递归消除
        } else {
            quickSort(arr, p + 1, right);
            right = p - 1;
        }
    }
}

function partition(arr, left, right) {
    const pivot = arr[right];
    let i = left;
    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]];
    return i;
}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
    quickSort(nums);
    return nums;
};
