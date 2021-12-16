## createRouterMatcher

根据用户配置的路由进行管理

```js
function createRouterMatcher(routes) {
  const matchers = []

  // 新增路由
  function addRoute() {}

  function resolve() {}
  // 删除路由
  function removeRoute() {}
  // 获取路由
  function getRoutes() {}

  function getRecordMatcher() {}

  return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher }
}
```

## addRoute

```ts
export function normalizeRouteRecord(
  record: RouteRecordRaw
): RouteRecordNormalized {
  return {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: undefined,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      'components' in record
        ? record.components || {}
        : { default: record.component! }
  }
}
```

```js
if ('children' in mainNormalizedRecord) {
  const children = mainNormalizedRecord.children
  for (let i = 0; i < children.length; i++) {
    addRoute(children[i], matcher, originalRecord && originalRecord.children[i])
  }
}
```

```ts
export function createRouteRecordMatcher(
  record: Readonly<RouteRecord>,
  parent: RouteRecordMatcher | undefined,
  options?: PathParserOptions
): RouteRecordMatcher {
  const parser = tokensToParser(tokenizePath(record.path), options)

  const matcher: RouteRecordMatcher = assign(parser, {
    record,
    parent,
    // these needs to be populated by the parent
    children: [],
    alias: []
  })

  if (parent) {
    // both are aliases or both are not aliases
    // we don't want to mix them because the order is used when
    // passing originalRecord in Matcher.addRoute
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher)
  }

  return matcher
}
```
