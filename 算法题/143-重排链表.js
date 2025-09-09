/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
    if (!head || !head.next) return;

    // 1. 全部装进数组
    const nodes = [];
    let cur = head;
    while (cur) {
        nodes.push(cur);
        cur = cur.next;
    }

    // 2. 交叉连接
    let i = 0,
        j = nodes.length - 1;
    while (i < j) {
        nodes[i].next = nodes[j];
        i++;
        if (i === j) break; // 奇数个节点时避免重复处理
        nodes[j].next = nodes[i];
        j--;
    }

    // 3. 关键：把尾节点的 next 置空，防止成环
    nodes[i].next = null;
};
