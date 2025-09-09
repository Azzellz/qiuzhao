/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function (words, k) {
    const map = new Map();
    words.forEach((word) => {
        const count = map.get(word) || 0;
        map.set(word, count + 1);
    });
    return [...map.entries()]
        .sort((a, b) => {
            if (a[1] === b[1]) {
                // 字典序比较
                return a[0].localeCompare(b[0]);
            } else {
                return b[1] - a[1];
            }
        })
        .map(([word]) => word)
        .slice(0, k);
};
