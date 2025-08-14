Function.prototype._call = function (thisArg, ...args) {
	let func = this;

	// 规范为对象
	thisArg = thisArg != null ? Object(thisArg) : globalThis;

	// 用 Symbol 创建一个独一无二的 key，防止冲突
	const fn = Symbol();
	thisArg[fn] = func;
	const result = thisArg[fn](...args);
	delete thisArg[fn];
	return result;
};

Function.prototype._apply = function (thisArg, args) {
	const func = this;

	thisArg = thisArg != null ? Object(thisArg) : globalThis;

	args = Array.isArray(args) ? args : [args];

	const fn = Symbol();
	thisArg[fn] = func;
	const result = thisArg[fn](...args);
	delete thisArg[fn];

	return result;
};

Function.prototype._bind = function (thisArg, ...args) {
	const func = this;
	return function () {
		return func._call(thisArg, ...args);
	};
};
