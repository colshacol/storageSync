// Gives us the reverse-proxy values, because not only do
// we need to keep 'login.foo.bar' updating 'baz', we also
// need 'baz' to update 'login.foo.bar' when it changes.
const reverseSyncMap = (syncMap) => {
  return syncMap.map((data) => {
    return [...data].reverse()
  })
}

export default class SyncMap extends Array {
  constructor(items) {
    super(...items, ...reverseSyncMap(items))
    this.original = items
  }

  // Find any maps that indicate a sync needs to be performed,
  // based on the provided key.
  syncRequirementsFor = (key) => {
    return this.filter((item) => {
      return (
        // i.e [['foo', 'bar.baz'], 'bah']
        Array.isArray(item[0]) && item[0][0] === key ||
        // i.e ['foo', ['bar', 'baz.bah']]
        typeof item[0] === 'string' && item[0] === key
      )
    })
  }
}


