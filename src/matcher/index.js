import { createRouteRecordMatcher } from './pathMatcher'

export function createRouterMatcher(routes, globalOptions) {
  // normalized ordered array of matchers
  const matchers = []
  const matcherMap = new Map()

  function getRecordMatcher(name) {
    return matcherMap.get(name)
  }

  /**
   * 新增路由
   * @param {*} record 用户配置的路由
   * @param {*} parent 父节点
   * @param {*} originalRecord
   */
  function addRoute(record, parent, originalRecord) {
    const normalizedRecords = [record]

    // 当前路由匹配器
    let matcher
    //  树形结构
    let originalMatcher

    for (let normalizedRecord of normalizedRecords) {
      // const { path } = normalizedRecord

      matcher = createRouteRecordMatcher(normalizedRecord)

      if ('children' in normalizedRecord) {
        const children = normalizedRecord.children
        for (let i = 0; i < children.length; i++) {
          addRoute(
            children[i],
            matcher,
            originalRecord && originalRecord.children[i]
          )
        }
      }

      insertMatcher(matcher)

      // if there was no original record, then the first one was not an alias and all
      // other alias (if any) need to reference this record when adding children
      originalRecord = originalRecord || matcher
    }

    return originalMatcher
      ? () => {
          removeRoute(originalMatcher)
        }
      : () => {}
  }

  function insertMatcher(matcher) {
    matcher.push(matcher)
  }

  function resolve() {}

  function removeRoute(matcher) {
    const index = matchers.indexOf(matcher)
    if (index > -1) {
      matchers.splice(index, 1)
      matcher?.children.forEach(removeRoute)
    }
  }
  function getRoutes() {
    return matchers
  }

  return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher }
}
