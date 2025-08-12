/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function (s) {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        let flag = true;
        while (stack[stack.length - 1] === c) {
            flag = false;
            stack.pop();
        }
        if (flag) stack.push(c);
    }
    return stack.join("");
};
