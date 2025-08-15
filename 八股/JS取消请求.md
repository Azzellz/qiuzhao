在浏览器 / Node 里，**“取消 JS 发起的 HTTP 请求”** 常见 3 种官方姿势，一行代码就能停掉网络流。

---

### ✅ 1. Fetch + AbortController（浏览器原生）
```js
const ctrl = new AbortController();
fetch('/api', { signal: ctrl.signal })
  .then(r => r.json())
  .catch(err => {
    if (err.name === 'AbortError') console.log('已取消');
  });

// 想取消就一行
ctrl.abort();
```
- **Node ≥ 18** 同样支持（需 `undici` 或 `--experimental-fetch`）。  
- 取消后底层 **TCP 连接会被关闭**，浏览器不会再接收数据。

---

### ✅ 2. Axios（v0.22+ 支持 signal，老版用 CancelToken）
```js
import axios from 'axios';

const ctrl = new AbortController();
axios.get('/api', { signal: ctrl.signal })
     .catch(e => axios.isCancel(e) && console.log('axios 取消'));

ctrl.abort();
```
老项目写法：
```js
const source = axios.CancelToken.source();
axios.get('/api', { cancelToken: source.token });
source.cancel('用户手动取消');
```

---

### ✅ 3. Node 原生 http/https（仅 Node）
```js
import http from 'http';

const req = http.get('http://example.com');
req.on('response', () => { /* ... */ });

// 取消请求并关闭 socket
req.destroy();
```

---

### ⚠️ 注意
- `XMLHttpRequest` 时代用 `xhr.abort()`，新项目已不推荐。  
- 取消 **只会终止网络 IO**，已执行的同步逻辑无法回撤。  
- Promise **本身不可中断**；所有方案都是**外部控制器**（AbortController / CancelToken / destroy）去打断。

---

### ✅ 一句话背板
> “现代 JS 用 **AbortController**（fetch/axios）或 **Node 的 req.destroy()** 即可真正取消请求，Promise 自身无取消能力。”