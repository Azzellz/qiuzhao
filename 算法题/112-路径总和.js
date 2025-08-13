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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
    // 空树直接返回 false
    if (root === null) return false;

    // 叶子节点：判断剩余值是否等于当前节点值
    if (root.left === null && root.right === null) {
        return targetSum === root.val;
    }

    // 非叶子节点：递归左右子树
    const rest = targetSum - root.val;
    return hasPathSum(root.left, rest) || hasPathSum(root.right, rest);
};
