/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
	this.cap = capacity;
	this.cache = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
	if (!this.cache.has(key)) return -1;
	const val = this.cache.get(key);
	this.cache.delete(key);
	this.cache.set(key, val);
	return val;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
	if (this.cache.has(key)) this.cache.delete(key);
	this.cache.set(key, value);
	// 如果满了要删除第一个（最久未使用的）
	if (this.cache.size > this.cap) {
		const first = this.cache.keys().next().value;
		this.cache.delete(first);
	}
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
