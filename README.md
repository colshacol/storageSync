# StorageSync

A utility to keep yo' storage in sync.

## API

### `new SyncMap()`

```js
const syncMap = new SyncMap([
  [['foo', 'bar.baz'], 'bah'],
  [['foo', 'bar.boo'], 'bee'],
])
```

#### `syncMap.syncRequirementsFor(key)`

#### `syncMap.original`


---


### `new StorageSync(storageSource, syncMap)`

Creates a living parsed-object representation of the provided storage that
provides an extremely easy to use API for getting and setting values to and
from said storage.

- It is an object, filled with the values sourced from the provided storage,
and also the derived values created from the provided syncMap.

- It is a function, providing a minimal API for getting and setting _namespaced_
values and keeping the low-level API and data tucked away, almost undetectable.

- It is array-like. You can spread it `[...storage]`, loop over it's key/value pairs
`for (const [key, value] of storage) { ... }`, and even filter/map/reduce it.

```js
const storage = new StorageSync(localStorage, syncMap)
```

#### `storage._inspect()`

#### `storage._setItem(key, value)`

#### `storage._getItem(key)`

#### `storage._performSync(key, value)`

#### `storage._storage`

#### `storage._syncMap`

#### `storage._nameSpace`

#### `storage(key, value)`

#### `storage(key)`
