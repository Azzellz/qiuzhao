// 深拷贝
function cloneDeep(obj, hash = new WeakMap()) {
	// 处理null和原始类型
	if (obj === null || typeof obj !== "object") return obj;

	// 处理循环引用
	if (hash.has(obj)) return hash.get(obj);

	// 处理其他类型：Map、Set、Date、RegExp
	// （可省略）...

	// 构造对象
	const result = new obj.constructor();
	hash.set(obj, result);

	// 拷贝
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			result[key] = cloneDeep(obj[key], hash);
		}
	}

	return result;
}
