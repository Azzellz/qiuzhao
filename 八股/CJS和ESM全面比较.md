下面把 CommonJS（CJS） 与 ECMAScript Modules（ESM） 做一个**“从语言规范到工程落地”**的全景式对照，方便你根据场景选型或迁移。  
（下文中“Node”指 Node.js，“Browser”指浏览器环境）

---

### 1. 规范与历史
| 维度 | CommonJS | ES Module |
| --- | --- | --- |
| 规范主体 | [CommonJS 社区规范](https://wiki.commonjs.org/wiki/Modules/1.1)（2009） | ECMA-262 官方标准（ES2015 起） |
| 目标环境 | 起初面向服务端（Node），后被 Browserify/Webpack 带入浏览器 | 官方通用，浏览器 & Node 双栈 |
| 当前地位 | Node 遗留方案，新代码已逐步迁移 ESM | 官方“唯一正解”，浏览器/Node 均主推 |

---

### 2. 语法层面
| 维度 | CommonJS | ES Module |
| --- | --- | --- |
| 导出 | `module.exports = value` 或 `exports.x = …` | `export default value` / `export const x = …` |
| 导入 | `const v = require('id')`  （整体或解构） | `import v from 'id'` / `import { x } from 'id'` |
| 动态导入 | 本身就是同步 `require()`，动态路径随意 | `import('id')` 返回 Promise（ES2020） |
| 顶层 this | `this === module.exports` | `this === undefined`（严格模式） |
| 顶层作用域 | 非严格、变量泄漏风险 | 严格模式，无泄漏 |

---

### 3. 运行时行为
| 维度 | CommonJS | ES Module |
| --- | --- | --- |
| 加载策略 | **运行时同步**加载 → 执行 → 缓存 | **静态解析**依赖 → 异步并行加载 → 深度优先实例化 → 缓存 |
| 循环依赖 | 部分导出可用（`module.exports` 快照） | 已实例化绑定，TDZ 暂时死区，最终引用一致 |
| 值 vs 绑定 | 导出的是**值的拷贝**（基本类型复制、对象浅拷贝） | 导出的是**实时绑定**（所有导入方共享同一份可变绑定） |
| 路径规则 | 运行时计算字符串，可做条件 `require` | 静态字符串字面量（动态须 `import()`） |
| 文件扩展名 | 可省略 `.js`（Node 自动补） | 浏览器必须带扩展名；Node 可开启 `--experimental-specifier-resolution=node` |

---

### 4. Node.js 兼容性矩阵
| 特性 | CommonJS | ES Module |
| --- | --- | --- |
| 启动文件 | 任意 `.js` | 需 `.mjs` 或 `"type":"module"` |
| 引入 CJS | — | `import cjs = require('cjs')`（Node 提供兼容层） |
| 引入 ESM | 不可 `require()` | 只能 `import()` |
| __filename / __dirname | 直接可用 | 需手动 `import.meta.url` 计算 |
| JSON 导入 | `require('./x.json')` | `import x from './x.json' assert {type:'json'}`（旧写法）<br>或 `import fs from 'fs'` 读取 |
| 核心模块 | `require('fs')` | `import fs from 'fs'`（Node 内部识别） |

---

### 5. 浏览器端差异
| 维度 | CommonJS | ES Module |
| --- | --- | --- |
| 原生支持 | ❌ 无 | ✅ `<script type="module">` |
| 打包要求 | Browserify/Webpack | Rollup/Webpack/Vite 可零配置 |
| 性能 | 打包后单文件 → 缓存友好 | HTTP/2 + 多文件并行加载，可 Tree-shaking |
| 跨域 | 同普通 `<script>` 受同源限制 | 同源 + CORS，`import` 必须带正确 MIME `text/javascript` |

---

### 6. 工程生态
| 工具/场景 | CommonJS | ES Module |
| --- | --- | --- |
| npm 包 | 绝大多数历史库仍是 CJS | 新库发 “dual package”（`exports` 字段同时暴露 CJS+ESM） |
| Tree-shaking | 不支持（静态分析困难） | 天然支持 |
| 动态插件 | 运行时 `require(pluginPath)` 方便 | 需 `import(specifier)` Promise |
| Jest 测试 | 默认按 CJS 处理 | 需 `transform` 或 `.mjs` |
| TypeScript | `module: CommonJS` 输出 `require` | `module: ES2020` 输出 `import` |
| Electron / 服务端脚本 | 大量遗留 CJS | 可渐进迁移 |

---

### 7. 迁移决策树（实用向）
1. **纯浏览器项目** → 直接 ESM（Vite、原生 `<script type="module">`）。  
2. **Node 工具/CLI** → 若需兼容老 Node (<14) 用 CJS；否则 ESM。  
3. **npm 库作者** → 发 dual package（`package.json` 里 `"exports"` 字段同时声明 `require` 和 `import`）。  
4. **老项目迭代** → 先加 `"type":"module"`，把 `.js` 改 `.cjs` 保留旧文件，逐步迁移；或用 Babel/Webpack 转译。

---

### 8. 一句话速记
> CommonJS 是“运行时同步、值拷贝、Node 遗产”；  
> ES Module 是“静态异步、实时绑定、官方未来”。

根据运行时环境、生态依赖、性能需求选型即可。
