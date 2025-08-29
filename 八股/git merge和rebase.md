一句话区别  
• `git merge`：把两条分支“**合并成一个新的快照**”，保留完整历史（分叉可见）。  
• `git rebase`：把一条分支的提交“**重新播放**”到另一条分支顶端，得到**线性历史**（看起来没分叉）。

下面按实际场景、结果、风险与命令对比。

---

### 1. 效果图解

初始状态  
```
A---B---C (main)
     \
      D---E (feature)
```

#### git merge main (在 feature 上)
```
A---B---C (main)
     \   \
      D---E---M (feature)   # M 是合并提交，历史保持分叉
```

#### git rebase main (在 feature 上)
```
A---B---C (main)
         \
          D'--E' (feature)  # D/E 被改写为 D'/E'，历史成一直线
```

---

### 2. 命令速记
| 目的 | merge | rebase |
|---|---|---|
| 把 main 更新拿进 feature | `git merge main` | `git rebase main` |
| 把 feature 回进 main | `git checkout main && git merge feature` | `git checkout main && git rebase feature`（不常见） |
| 交互式整理提交 | — | `git rebase -i HEAD~3` |

---

### 3. 优缺点对照

| 维度 | merge | rebase |
|---|---|---|
| **历史形状** | 真实、分叉可见 | 线性、整洁 |
| **冲突次数** | 一次合并冲突 | 每个提交都可能冲突 |
| **可追溯性** | 保留分支名和合并点 | 原始分支名消失，SHA 变 |
| **多人共用分支** | **安全**（不改已推送提交） | **危险**（改写历史需强推 `--force`） |
| **回滚** | `git revert <merge-commit>` | `git reflog` 或 `git reset` |

---

### 4. 何时用哪一个？

• **公共分支（main/develop）** → 一律 merge，保证历史不可变。  
• **私有本地分支（自己的 feature）** → rebase 整理后再 merge，保持主线整洁。  
• **PR/MR 要求 linear history** → 先 rebase，再 fast-forward merge 或 squash merge。

---

### 5. 实战口诀
> “**公开用 merge，私有用 rebase；先 pull --rebase 再 push，减少无意义合并。**”
