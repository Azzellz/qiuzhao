/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 * 递归时比较作为中间节点和终点节点的路径大小，选最大的
 */
var maxPathSum = function (root) {
    let max = root.val;
    const dfs = (node) => {
        if (node === null) {
            return 0;
        }
        const left = dfs(node.left);
        const right = dfs(node.right);

        // 作为终点
        const end = Math.max(Math.max(left, right) + node.val, node.val);

        // 作为中间点
        const mid = Math.max(left + right + node.val, node.val);
        max = Math.max(Math.max(end, mid), max);

        return end;
    };
    dfs(root);
    return max;
};
