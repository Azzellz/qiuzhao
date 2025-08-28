/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
	if (nums.length === 0) return 0;
	if (nums.length === 1) return nums[0];

	let prev1 = 0,
		prev2 = 0;

	for (const money of nums) {
		const cur = Math.max(prev1, prev2 + money);
		prev2 = prev1;
		prev1 = cur;
	}

	return prev1;
};
