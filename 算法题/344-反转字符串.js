/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
    for (let i = 0; i < Math.floor(s.length / 2); i++) {
        let tmp = s[s.length - i - 1];
        s[s.length - i - 1] = s[i];
        s[i] = tmp;
    }
};
