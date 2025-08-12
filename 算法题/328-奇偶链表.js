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
 */
var oddEvenList = function (head) {
    const odds = [];
    const evens = [];
    let index = 1;
    while (head) {
        if (index % 2 === 0) {
            evens.push(head);
        } else {
            odds.push(head);
        }
        head = head.next;
        index++;
    }
    const list = [...odds, ...evens];
    for (let i = 0; i < list.length - 1; i++) {
        list[i].next = list[i + 1];
    }
    if (list.length >= 1) {
        list[list.length - 1].next = null;
        return list[0];
    } else {
        return head;
    }
};
