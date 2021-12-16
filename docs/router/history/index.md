## 路由模式

### Hash 模式

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ]
})
```

实际的 URL 前面会有一个 `#`。因为这部分 URL 不会发送到服务器，我们无需对服务器进行特殊的配置。但不利于 SEO（搜索引擎优化），

### HTML5 模式

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ]
})
```
