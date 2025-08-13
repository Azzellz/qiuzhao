/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    const stack = [];
    for (const c of s) {
        if (c === "]") {
            if (stack[stack.length - 1] === "[") {
                stack.pop();
            } else {
                return false;
            }
        } else if (c === ")") {
            if (stack[stack.length - 1] === "(") {
                stack.pop();
            } else {
                return false;
            }
        } else if (c === "}") {
            if (stack[stack.length - 1] === "{") {
                stack.pop();
            } else {
                return false;
            }
        } else {
            stack.push(c);
        }
    }

    return stack.length === 0;
};
