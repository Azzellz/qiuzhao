下面是一份“一页能看完”的 Git 全命令速查表（中英双语），按使用频率分组，带最常用选项。复制即可贴墙。

---

### 1. 配置 & 信息
```
git config --global user.name  "Your Name"
git config --global user.email "you@example.com"
git config --list                    # 查看所有配置
git help <command>                   # 官方帮助（如 git help commit）
```

---

### 2. 仓库
```
git init                             # 新建空仓库
git clone <url> [dir]                # 克隆远程仓库
git status                           # 工作区/暂存区状态
git log --oneline --graph --all      # 简洁提交图
git diff [--cached] [file]           # 工作区 vs 暂存区 vs HEAD
```

---

### 3. 基本提交流程
```
git add <file/dir>                   # 添加到暂存区
git add -p                           # 交互式逐块添加
git commit -m "msg"                  # 提交
git commit -am "msg"                 # add + commit 一步（仅已跟踪文件）
git restore <file>                   # 丢弃工作区改动（≥2.23）
git restore --staged <file>          # 取消暂存
```

---

### 4. 分支 & 合并
```
git branch                           # 列本地分支
git branch -r                        # 列远程分支
git branch <new>                     # 创建分支
git checkout <branch>                # 切换分支
git switch <branch>                  # 新语法（≥2.23）
git checkout -b <new>                # 创建并切换
git merge <branch>                   # 合并（快进或产生合并提交）
git rebase <branch>                  # 变基（线性历史）
git cherry-pick <sha>                # 把某提交摘过来
```

---

### 5. 远程同步
```
git remote -v                        # 查看远程地址
git fetch [remote]                   # 拉取不合并
git pull [--rebase]                  # fetch + merge/rebase
git push [-u] origin <branch>        # 推送；-u 建立跟踪
git push --tags                      # 推送标签
git remote add origin <url>          # 绑定远程
```

---

### 6. 撤销 & 回退
```
git reset --soft  HEAD~1             # 仅撤销 commit（保留改动）
git reset --mixed HEAD~1             # 默认：撤销 commit + 取消暂存
git reset --hard  HEAD~1             # 全部丢弃（危险）
git revert <sha>                     # 生成反向提交（公开分支安全）
git clean -fd                        # 删未被跟踪的文件/夹
```

---

### 7. 暂存 & 补丁
```
git stash push -m "msg"              # 把工作区+暂存区入栈
git stash list                       # 查看栈
git stash pop                        # 出栈并应用
git stash apply <n>                  # 应用但不删
git format-patch <range>             # 生成邮件补丁
git am < patch                       # 应用补丁
```

---

### 8. 标签 & 发布
```
git tag v1.0.0                       # 轻量标签
git tag -a v1.0.0 -m "desc"          # 附注标签
git push origin v1.0.0               # 推送单个标签
git push origin --tags               # 推送全部标签
```

---

### 9. 子模块 & 大文件
```
git submodule add <url> path         # 添加子模块
git submodule update --init --recursive
git lfs track "*.psd"                # Git LFS 大文件
```

---

### 10. 调试 & 故障排查
```
git blame <file>                     # 逐行查看最后修改者
git bisect start                     # 二分查 BUG
git bisect good/bad <sha>            # 标记好/坏版本
git reflog                           # 查看所有 HEAD 移动记录（后悔药）
git fsck                             # 仓库完整性检查
```

---

### 11. 一页思维导图
```
配置 → 本地工作区 → 暂存区 → 本地仓库 → 远程仓库
       (add)      (commit)    (push)
                (reset) (revert) (pull/fetch)
```

打印贴显示器，随时 `git <tab>` 补全！
