下面给出「最小可运行版本」—— 面试时 3-5 分钟就能在纸上写完的核心思路。  
只保留：函数式调用、Promise 结果、基础样式、动画。其余能力（ESC、多层、滚动锁定）用一句话说明即可。

```ts
// Modal.ts
import { createApp, h, ref } from 'vue'

const ModalComp = (props: any, { emit }: any) => {
  const visible = ref(true)
  const close = (val: any) => { visible.value = false; emit('close', val) }
  return () => visible.value && (
    <div class="modal-mask" onClick={() => close('mask')}>
      <div class="modal-box" onClick={e => e.stopPropagation()}>
        <div class="modal-header">{props.title}</div>
        <div class="modal-body">{props.content}</div>
        <div class="modal-footer">
          <button onClick={() => close('cancel')}>取消</button>
          <button onClick={() => close('confirm')}>确认</button>
        </div>
      </div>
    </div>
  )
}

export function showModal(options: { title: string; content: string }) {
  return new Promise<'confirm' | 'cancel' | 'mask'>((resolve) => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const app = createApp(h(ModalComp, { ...options, onClose(v) { resolve(v); app?.unmount(); } }))
    app.mount(el)
  })
}
```

```css
/* 随手写的样式，面试时可直接说“用绝对定位遮罩 + flex 居中” */
.modal-mask { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; }
.modal-box { background: #fff; border-radius: 4px; width: 400px; animation: fade .3s; }
@keyframes fade { from { opacity: 0; transform: scale(.9); } }
```

使用一句话：

```ts
import { showModal } from './Modal'

const ok = await showModal({ title:'删除', content:'确定吗？' }) 
if (ok === 'confirm') console.log('已删除')
```

如需再扩展，只需在 `ModalComp` 里加 `onkeydown`、滚动锁定等逻辑即可。