/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = val === undefined ? 0 : val;
 *     this.next = next === undefined ? null : next;
 * }
 */

var swapPairs = function (head) {
    const dummy = new ListNode(0, head); // 哨兵，简化头节点交换
    let prev = dummy;

    while (prev.next && prev.next.next) {
        const first = prev.next; // 第 1 个待交换节点
        const second = first.next; // 第 2 个待交换节点

        // 交换
        first.next = second.next;
        second.next = first;
        prev.next = second;

        // 移动到下一对
        prev = first;
    }
    return dummy.next;
};
