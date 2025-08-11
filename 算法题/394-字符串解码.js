/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
    let stack = [];
    let curStr = "";
    let curNum = 0;

    for (const ch of s) {
        if (ch >= "0" && ch <= "9") {
            // 计算倍数
            curNum = curNum * 10 + Number(ch);
        } else if (ch === "[") {
            // 保存现场
            stack.push({
                str: curStr,
                k: curNum,
            });
            curStr = "";
            curNum = 0;
        } else if (ch === "]") {
            const { str, k } = stack.pop();
            curStr = str + curStr.repeat(k);
            
        } else {
            curStr += ch;
        }
    }

    return curStr;
};
