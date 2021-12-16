## 快速开始

安装 `vue-router`

```shell
yarn add vue-router@4
```

创建`/src/router/index.js`文件

```js
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import HelloWorld from '../components/HelloWorld'

const constantRoutes = [
  {
    path: '/',
    component: HelloWorld
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

const app = createApp(App)

app.use(router)
```

修改`/src/App.Vue`

```vue
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```

```js
function createRouter() {
  return {
    fullPath,
    // keep the hash encoded so fullPath is effectively path + encodedQuery +
    // hash
    hash,
    query,
    matchedRoute,
    redirectedFrom: undefined,
    href
  }
}
```
