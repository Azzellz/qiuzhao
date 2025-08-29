`git revert` 用来**生成一个新的“反向”提交**，把指定（某些）提交引入的改动**撤销掉**，而不改写历史。  
它与 `git reset` 最大的区别：**`revert` 是“安全撤销”（公开分支友好），`reset` 是“历史改写”（仅限本地或未推送分支）**。

---

### 1. 基本用法
```bash
# 撤销某一次提交（默认只产生一个反向提交）
git revert <commit-ish>

# 撤销连续多个提交，按顺序生成多个反向提交
git revert OLDEST_COMMIT^..NEWEST_COMMIT

# 撤销合并提交，需指定主线 -m 1 或 -m 2
git revert -m 1 <merge-commit>
```

---

### 2. 工作流程示意
假设提交历史：
```
A---B---C---D (main)
```
执行：
```bash
git revert C
```
结果：
```
A---B---C---D---C' (main)
```
`C'` 是一次新提交，里面的内容与 `C` **相反**，即把 `C` 的改动抵消掉。

---

### 3. 常见场景 & 命令
| 场景 | 命令 |
|---|---|
| 撤销最近一次错误提交 | `git revert HEAD` |
| 撤销上一上一次 | `git revert HEAD~1` |
| 撤销多个不连续提交 | `git revert A B C` |
| 撤销合并提交 | `git revert -m 1 <merge-sha>` |
| 避免自动提交（先改再手动提交） | `git revert --no-commit <sha>` |

---

### 4. 冲突处理
- 如果撤销的改动与当前代码冲突，`revert` 会停下来让你解决冲突，然后 `git commit` 完成即可。

---

### 5. revert vs reset 速查
| 维度 | `git revert` | `git reset` |
|---|---|---|
| 是否改历史 | ❌ 新增反向提交（公开分支安全） | ✅ 移动 HEAD/分支指针（改写历史） |
| 已推送分支 | ✅ 可放心使用 | ❌ 需强制推送（`--force`），风险高 |
| 撤销粒度 | 任意提交 | 只能回退到某一点 |
| 结果 | 保留完整历史，易追溯 | 历史被“剪掉” |

---

### 6. 一句话记忆
> **revert = “公开分支的安全撤销”，reset = “本地时间的倒带”。**
