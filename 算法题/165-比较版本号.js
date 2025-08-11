/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
    const a1 = version1.split(".");
    const a2 = version2.split(".");
    const n = Math.max(a1.length, a2.length);

    for (let i = 0; i < n; i++) {
        const n1 = parseInt(a1[i] || 0, 10);
        const n2 = parseInt(a2[i] || 0, 10);
        if (n1 > n2) return 1;
        if (n1 < n2) return -1;
    }
    
    return 0;
};
