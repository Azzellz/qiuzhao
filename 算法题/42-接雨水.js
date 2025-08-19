/**
  用左右指针向中间逼近。
  维护左右两侧已知的最大高度 leftMax 与 rightMax。
  谁小谁向内缩，保证“短板”决定当前位置能接的水量。
 */
function trap(height) {
	if (!height || height.length < 3) return 0;

	let left = 0,
		right = height.length - 1;
	let leftMax = 0,
		rightMax = 0;
	let water = 0;

	while (left < right) {
		if (height[left] < height[right]) {
			leftMax = Math.max(leftMax, height[left]);
			water += leftMax - height[left];
			left++;
		} else {
			rightMax = Math.max(rightMax, height[right]);
			water += rightMax - height[right];
			right--;
		}
	}
	return water;
}
