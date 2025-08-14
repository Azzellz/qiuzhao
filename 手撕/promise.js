const PENDING = "pending";
const FULLFILLED = "fullfilled";
const REJECTED = "rejected";

class MyPromise {
	static resolve(value) {
		if (value instanceof MyPromise) return value;
		else return new MyPromise((resolve) => resolve(value));
	}

	static reject(reason) {
		if (reason instanceof MyPromise) return reason;
		else return new MyPromise((_, reject) => reject(reason));
	}

	static all(promises) {
		return new MyPromise((resolve, reject) => {
			if (!Array.isArray(promises)) return reject("not array");

			const len = promises.length;
			if (len === 0) return resolve([]);

			const result = new Array(len);
			let count = 0;
			promises.forEach((p, i) => {
				// 把非Promise包装成Promise
				MyPromise.resolve(p)
					.then((v) => {
						result[i] = v;
						if (++count === len) {
							resolve(result);
						}
					})
					.catch(reject);
			});
		});
	}

	static race(promises) {
		return new MyPromise((resolve, reject) => {
			if (!Array.isArray(promises)) return reject("not array");

			promises.forEach((p) => {
				MyPromise.resolve(p).then(resolve, reject);
			});
		});
	}

	static allSettled(promises) {
		return new MyPromise((resolve, reject) => {
			if (!Array.isArray(promises)) return reject("not array");

			const len = promises.length;
			if (len === 0) return resolve([]);

			let count = 0;
			const result = [];

			promises.forEach((p, i) => {
				MyPromise.resolve(p)
					.then(
						(value) => {
							result[i] = {
								status: "fullfilled",
								value,
							};
						},
						(reason) => {
							result[i] = {
								status: "rejected",
								reason,
							};
						}
					)
					.finally(() => {
						if (++count === len) {
							resolve(result);
						}
					});
			});
		});
	}

	constructor(executor) {
		this.state = PENDING;
		this.value = void 0;
		this.reason = void 0;
		this.onResolvedCbs = [];
		this.onRejectedCbs = [];
		this.finallyCbs = [];

		const resolve = (value) => {
			if (this.state === PENDING) {
				this.value = value;
				this.state = FULLFILLED;
				this.onResolvedCbs.forEach((fn) => fn());
				this.finallyCbs.forEach((fn) => fn());
			}
		};

		const reject = (reason) => {
			if (this.state === PENDING) {
				this.reason = reason;
				this.state = REJECTED;
				this.onRejectedCbs.forEach((fn) => fn());
				this.finallyCbs.forEach((fn) => fn());
			}
		};

		try {
			executor(resolve, reject);
		} catch (error) {
			reject(error);
		}
	}

	then(onFullfilled, onRejected) {
		return new MyPromise((resolve, reject) => {
			const fullfilledTask = () => {
				try {
					const x = onFullfilled(this.value);
					resolve(x);
				} catch (error) {
					reject(error);
				}
			};

			const rejectedTask = () => {
				try {
					const x = onRejected(this.reason);
					resolve(x);
				} catch (error) {
					reject(error);
				}
			};

			// setTimeout模拟异步
			if (this.state === FULLFILLED) {
				setTimeout(fullfilledTask, 0);
			} else if (this.state === REJECTED) {
				setTimeout(rejectedTask, 0);
			} else {
				// pending状态，先存起来
				this.onResolvedCbs.push(fullfilledTask);
				this.onRejectedCbs.push(rejectedTask);
			}
		});
	}

	catch(onRejected) {
		return this.then(null, onRejected);
	}

	finally(onFinally) {
		return this.then(
			(value) => {
				return MyPromise.resolve(onFinally()).then(() => value);
			},
			(reason) => {
				return MyPromise.resolve(onFinally()).then(() => {
					throw reason;
				});
			}
		);
	}
}
