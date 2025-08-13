function _sort(arr, left, right) {
    if (left >= right) return;
    let pivot = arr[left];
    let i = left,
        j = right;
    while (i < j) {
        // 找到比 pivot 小的数
        while (i < j && arr[j] >= pivot) {
            j--;
        }
        if (i < j) {
            arr[i++] = arr[j];
        }
        // 找到比 pivot 大的数
        while (i < j && arr[i] <= pivot) {
            i++;
        }
        if (i < j) {
            arr[j--] = arr[i];
        }
    }
    arr[i] = pivot;
    _sort(arr, left, i - 1);
    _sort(arr, i + 1, right);
}

function quickSort(arr) {
    if (arr == null || arr.length === 0) {
        return;
    }
    _sort(arr, 0, arr.length - 1);
}
