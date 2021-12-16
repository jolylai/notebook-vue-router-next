export function createRouteRecordMatcher(record, parent) {
  return {
    record,
    parent,
    // these needs to be populated by the parent
    children: [],
    alias: []
  }
}
