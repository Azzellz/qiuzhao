/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    const dummy = new ListNode(0); // 哨兵节点，简化头指针处理
    let cur = dummy;
    let carry = 0; // 进位

    while (l1 || l2 || carry) {
        const v1 = l1 ? l1.val : 0;
        const v2 = l2 ? l2.val : 0;

        const sum = v1 + v2 + carry;
        // 如果有进位，当前位取 sum % 10
        // 如果没有进位，当前位取 sum
        carry = Math.floor(sum / 10); //
        cur.next = new ListNode(sum % 10);

        cur = cur.next;
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }

    return dummy.next;
};
