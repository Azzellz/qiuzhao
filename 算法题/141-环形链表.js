/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

var hasCycle = function (head) {
    if (!head || !head.next) return false;

    // 快慢指针法
    // let slow = head;
    // let fast = head.next; // 避免第一次就相遇

    // while (fast && fast.next) {
    //     if (slow === fast) return true;
    //     slow = slow.next;
    //     fast = fast.next.next;
    // }
    // return false;

    // 哈希表法
    const weakMap = new WeakMap();
    while (head) {
        if (weakMap.get(head)) return true;
        weakMap.set(head, true);
        head = head.next;
    }
    return false;
};
