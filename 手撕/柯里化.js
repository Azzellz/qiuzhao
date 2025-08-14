function curry(fn) {
	return function _curry(...args) {
		if (args.length >= fn.length) {
			return fn.apply(this, args);
		} else {
			return function (...args2) {
				return _curry.apply(this, args.concat(args2));
			};
		}
	};
}
