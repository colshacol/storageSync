# StorageSync

A utility to keep yo' storage in sync. Simple, easy-to-use API, packed full of helpful features that will _make localStorage fun again_.

## Getting Started

There are few rules when using StorageSync. **The main rule is not to touch localStorage directly.** By doing so, you can throw off the entire balance of the Earth, and the world as we know it may change forever.

**Set up your syncMap.**

```js
const syncMap = new SyncMap([
  [['dashboard', 'homeYard'], 'homeYardNumber'],
  [['login', 'userData.entity_type'], 'role'],
  [['login', 'userData.entity_id'], 'userID'],
])
```

**Use it to generate your `storage`.**

```js
const storage = new StorageSync(localStorage, syncMap)
```

**Use simple assignment to update storage.**

```js
storage.foo = 'bar'
storage.baz = [0, 1, 2]
storage.bah = { a: Infinity }
```

**Easily get data sourced from localStorage.**

```js
const { homeYardNumber, userName, login } = storage
```

**Invoke storage as a function to get and set namespaced values.**

```js
storage('location', { state: 'Texas' })

storage('location') // { state: 'Texas' }
```




---

## API

### `new SyncMap(syncMap)`

A syncMap is used to determine which values to sync with others. The following snippet demonstrated a syncMap that would instruct `foo.bar.baz` change to sync with `bah`, and `bah` changes to be backwards-synced with `foo.bar.baz`. (Once the syncMap is provided to a StorageSync, that is.)

```js
const syncMap = new SyncMap([[['foo', 'bar.baz'], 'bah']])
```

The resulting syncMap object has two unique properties on it, both of which are used internally by StorageSync.

#### `syncMap.syncRequirementsFor(key)`

Checks the syncMap to determine if there is any syncing required for the given `key`. For example, consider the previous code snippet.

When `"zebra"` is set in storage, `syncMap.syncRequirementsFor(key)` will produce no results, because there are no sync prescriptions for `"zebra"` in the syncMap.

When `"foo"` is set in storage, `syncMap.syncRequirementsFor(key)` will produce the prescripton to sync `foo.bar.baz`'s value with `bah`.

Since StorageSync supports reverse-sync by default, when `"bah"` is set in storage, `syncMap.syncRequirementsFor(key)` will produce the a prescription to set `bah`'s new value to `foo.bar.baz`.

```js
// "When foo is updated, set bah to equal foo.bar.baz."
// "Also, when bah is updated, set foo.bar.baz to equal bah."
;[['foo', 'bar.baz'], 'bah']
```

#### `syncMap.original`

Primarily for `StorageSync` internal use. The original syncMap provided to the constructor.

---

### `new StorageSync(storageSource, SyncMap)`

Creates a living parsed-object representation of the provided storage that
provides an extremely easy to use API for getting and setting values to and
from said storage.

### _`storage` is an object._
Filled with the values sourced from the provided storage, and also the derived values created from the provided syncMap.

- #### `storage._inspect()`

To inspect/debug the current state of storage, use `storage._inspect()` to get its internal state logged out to the console. Simply doing `console.log(storage)` will produce very confusing results, because underneath it all...

### _`storage` is a function._
Providing a minimal API for getting and setting _namespaced_ values and keeping the low-level API and data tucked away, almost undetectable.

- #### `storage(key, value)`

Invoking `storage` with two arguments performs a namespaced setter where the first argument is the key to namespace and the second is the value to persist.

**Your namespace is determined by `process.env.APP_NAME` at build-time, via Webpack, or a third `string` argument passed to `new StorageSync()`.**

```js
// assuming process.env.APP_NAME is "core-app"
storage('config', { profile: 'c-dev4' })

localStorage.getItem('core-app:config')
// "{\"profile\": \"c-dev4\"}"

storage['core-app:config']
// { profile: 'c-dev4' }
```

- #### `storage(key)`

Invoking `storage` with one argument will return the value associated with the provided key in your namespace. Unline localStorage, retrieving complex namespaced data this way will provided you with the living, parsed representation of your data, rather than a string.

```js
storage('config')
// { profile: 'c-dev4' }
```

### `storage` is array-like.
For cases that have different requirements and need to iterate `storage`, you can do with it most common things you can do with Arrays.

```js
// Spread it to concat an array.
const something = [ 9999, ...storage ]

// Spread it to dump values into a multi-argument function.
console.log(...storage)

// Map it.
sotrage.map(doStuff)

// Reduce it.
sotrage.reduce(doStuff)

// Filter it.
sotrage.filter(doStuff)

// ForEach it.
sotrage.forEach(doStuff)
```

##  Extended API

You probably won't find yourself using these often.

#### `storage._setItem(key, value)`

Sets a key/value in the storage target provided to the StorageSync.

#### `storage._getItem(key)`

Gets a key/value from the storage target provided to the StorageSync.

#### `storage._performSync(key, value)`

Given a key, checks to see if that key is bound to another key via the syncMap. If so, performs the necessary sync, using the provided value.

#### `storage._storage`

A reference to the storage target provided to StorageSync.

#### `storage._syncMap`

The original syncMap provided to StorageSync.

#### `storage._nameSpace`

Your app's namespace.

## Putting it all together.


### Example Usage

```js
const syncMap = new SyncMap([
  // When login changes, set accessToken to login.userData.acces_token.
  // When accessToken changes, set its value to login.userData.access_token.
  // So on and so forth...
  [['dashboard', 'selectedCountry'], 'selectedCountry'],
  [['dashboard', 'selectedYard'], 'selectedYardNumber'],
  [['dashboard', 'homeYard'], 'homeYardNumber'],
  [['login', 'userData.refresh_token'], 'refreshToken'],
  [['login', 'userData.access_token'], 'accessToken'],
  [['login', 'userData.entity_type'], 'role'],
  [['login', 'userData.entity_id'], 'userID'],
])

const storage = new StorageSync(window.localStorage, syncMap)

storage.role = 'Awesome Possum'
storage.accessToken = 'abcdefg'

storage.dashboard = {
  homeYard: 12,
  selectedCountry: 'US',
  selectedYard: 700
}

storage('config', { profile: 'c-dev4' })
storage('config')

storage.forEach(keyValuePair => { ... })
storage.reduce(keyValuePair => { ... })
storage.filter(keyValuePair => { ... })
storage.map(keyValuePair => { ... })

console.log(...storage)
```
