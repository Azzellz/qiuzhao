/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
    const res = [];
    const path = [];
    const n = s.length;

    // 验证是否为合法IP段
    const valid = (str) => {
        if (str.length > 1 && str[0] === "0") return false;
        const num = Number(str);
        return num >= 0 && num <= 255;
    };

    const dfs = (pos) => {
        if (path.length === 4) {
            if (pos === n) res.push(path.join("."));
            return;
        }

        for (let l = 1; l <= 3 && pos + l <= n; l++) {
            const seg = s.slice(pos, pos + l);
            if (valid(seg)) {
                // 回溯标准流程
                path.push(seg);
                dfs(pos + l);
                path.pop();
            }
        }
    };
    dfs(0);
    return res;
};
