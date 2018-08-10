import getValue from 'get-value'
import * as json from './json'

// Get a parsed,  living object representation of the storage.
export const parseStorage = storage => {
  return Object.entries(storage).reduce((final, [key, value]) => {
    final[key] = json.parse(value)
    return final
  }, {})
}

// Derive values from original storage paths into short-hand paths
// for easier, safer access, and also update living storage object
// with the derived data.
export const performInitialSync = (storageSource, syncMap) => {
  const storage = parseStorage(storageSource)

  debugger

  // Don't judge me for the for loop... It is the first I have written
  // in 2 years, but I was just soooo fed up with reduce and nasty code.
  for (const [source, target] of syncMap.original) {
    storage[target] = getValue(storage[source[0]], source[1])
    storageSource.setItem(target, json.stringify(storage[target]))
  }

  return { ...storage }
}
