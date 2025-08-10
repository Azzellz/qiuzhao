/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 * https://leetcode.cn/problems/reverse-linked-list/
 * 双指针解法 -- 迭代法
 */
var reverseList1 = function (head) {
    let prev = null;
    let curr = head;

    while (curr !== null) {
        const nextTemp = curr.next; // 暂存下一个节点
        curr.next = prev; // 反转指针
        prev = curr; // prev 前移
        curr = nextTemp; // curr 前移
    }

    return prev; // 新的头节点
};

// 递归法
var reverseList2 = function (head) {
    // 1. 递归终止条件：空链表或只剩一个节点
    if (head === null || head.next === null) {
        return head; // 返回新的头节点
    }

    // 2. 递归反转后续链表
    const newHead = reverseList2(head.next);

    // 3. 把当前节点接到已反转部分的尾部
    head.next.next = head; // 让“下一个节点”指向自己
    head.next = null; // 断开原指针，避免成环

    return newHead; // 一直向上返回新的头节点
};
