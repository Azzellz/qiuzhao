// 树转数组 -- 嵌套数组结构打平
function treeToArray(tree) {
	const result = [];
	const dfs = (nodes) => {
		nodes.forEach(({ children, ...node }) => {
			result.push(node);
			if (children.length) dfs(children);
		});
	};
	dfs(tree);
	return result;
}

// 数组转树
function arrayToTree(arr, rootPid = 0) {
	const map = new Map();
	const roots = [];

	// 1. 先把每个节点挂到 map
	arr.forEach((node) => {
		node.children = [];
		map.set(node.id, node);
	});

	// 2. 再遍历绑定父子关系
	arr.forEach((node) => {
		const parent = map.get(node.pid);
		if (parent) {
			parent.children.push(node);
		} else if (node.pid === rootPid) {
			roots.push(node);
		}
	});

	return roots;
}
