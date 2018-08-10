import getValue from 'get-value'
import setValue from 'set-value'

import { runAsync } from './utilities'
import * as json from './utilities/json'
import { performInitialSync } from './utilities/storage'
import { warnIfOutOfSync } from './utilities/warnings'

// Hides methods/values from being visible on the object itself.
const nonEnumerable = (target, name, descriptor) => {
  descriptor.enumerable = false
  descriptor.writable = true
  return descriptor
}

// Sets the stringified version of the value to the specified storage.
const setItem = storage => (key, value) => {
  storage.setItem(key, json.stringify(value))
}

// Gets the parsed representation of a value from the specified storage.
const getItem = storage => (key, value) => {
  return json.parse(storage.getItem(key))
}

export default class StorageSync extends Object {
  constructor(storageSource, syncMap) {
    super(performInitialSync(storageSource, syncMap))

    this._setItem = setItem(storageSource)
    this._getItem = getItem(storageSource)
    this._storage = storageSource
    this._syncMap = syncMap
    const self = this

    const proxyStorage = self._selfProxy(self)

    window.storage = proxyStorage
    return proxyStorage
  }

  @nonEnumerable _inspect = () => console.log(this)
  @nonEnumerable _nameSpace = 'opsportal-core:'

  @nonEnumerable _storage
  @nonEnumerable _syncMap
  @nonEnumerable _setItem
  @nonEnumerable _getItem

  @nonEnumerable
  _proxyGet = self => (target, property) => {
    return property ? self[property] : self
  }

  @nonEnumerable
  _proxySet = self => (target, property, value) => {
    const _value = json.parse(value)
    // Apply the change to the living storage object.
    // Reflect.set(self, property, _value)
    self[property] = value
    // Apply the change to the storageSource.
    self._setItem(property, _value)
    // Sync up other data if necessary.
    self._performSync(property, _value)
    return true
  }

  @nonEnumerable
  _proxyApply = self => (target, _, args) => {
    if (args.length === 1) {
      return self[self._nameSpace + args[0]]
    }

    if (args.length === 2) {
      self[self._nameSpace + args[0]] = args[1]
      return args[1]
    }
  }

  @nonEnumerable
  _selfProxy = self => {
    return new Proxy(() => {}, {
      get: self._proxyGet(self),
      set: self._proxySet(self),
      apply: self._proxyApply(self),
    })
  }

  @nonEnumerable
  filter = cb => {
    return [...this].filter(cb)[0]
  }

  @nonEnumerable
  map = cb => {
    return [...this].map(cb)
  }

  @nonEnumerable
  reduce = cb => {
    return [...this].reduce(cb)
  }

  @nonEnumerable
  forEach = cb => {
    return [...this].forEach(cb)
  }

  @nonEnumerable
  _performSync = (key, value) => {
    const syncData = this._syncMap.syncRequirementsFor(key)

    syncData.forEach(data => {
      // i.e ['accessToken', ['login', 'userData.access_token']]
      if (typeof data[0] === 'string') {
        const [targetKey, targetPath] = data[1]

        // Set the updated value on this object.
        setValue(this[targetKey], targetPath, value)
        // Set the updated key/value in storage.
        this._setItem(targetKey, this[targetKey])

        warnIfOutOfSync(getValue(this[targetKey], targetPath), value)
      }

      // i.e [['login', 'userData.access_token'], 'accessToken]
      if (Array.isArray(data[0])) {
        const [_, dataPath] = data[0]
        const targetKey = data[1]

        // Get the nested value from this object.
        const _value = getValue(value, dataPath)
        // Set the updated value on this object.
        setValue(this, targetKey, _value)
        // Set the updated key/value in storage.
        this._setItem(targetKey, _value)

        warnIfOutOfSync(getValue(this, targetKey), _value)
      }
    })
  };

  [Symbol.isConcatSpreadable] = true;

  [Symbol.iterator] = function*() {
    const entries = Object.entries(this._storage)

    for (const entry of entries) {
      yield entry
    }
  }
}
