/**
 * @param {string} s
 * @return {number} 无重复字符的最长子串长度
 */
function lengthOfLongestSubstring(s) {
    const last = new Map(); // 存储字符 -> 最近索引
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const ch = s[right];
        // 如果字符出现过，且位置在窗口内，则收缩左边界
        if (last.has(ch) && last.get(ch) >= left) {
            left = last.get(ch) + 1;
        }
        last.set(ch, right); // 更新/记录当前字符位置
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}
