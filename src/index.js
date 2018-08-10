import './storage.mock'
import SyncMap from './SyncMap'
import StorageSync from './StorageSync'

const syncMap = new SyncMap([
  // When login changes, set accessToken to login.userData.acces_token.
  // When accessToken changes, set its value to login.userData.access_token.
  [['dashboard', 'selectedCountryA3code'], 'selectedCountryA3code'],
  [['dashboard', 'selectedCurrency'], 'selectedCurrency'],
  [['dashboard', 'selectedCountry'], 'selectedCountry'],
  [['dashboard', 'selectedYard'], 'selectedYardNumber'],
  [['dashboard', 'homeYard'], 'homeYardNumber'],
  [['login', 'userData.refresh_token'], 'refreshToken'],
  [['login', 'userData.access_token'], 'accessToken'],
  [['login', 'isAuthenticated'], 'isAuthenticated'],
  [['login', 'userData.entity_name'], 'userName'], 
  [['login', 'userData.entity_mail'], 'email'], 
  [['login', 'userData.entity_type'], 'role'],
  [['login', 'userData.entity_id'], 'userID'],
])

const storage = new StorageSync(window.localStorage, syncMap)

window.storage = storage

/**
 * 
 * All short-hand values are introduced into localStorage at runtime,
 * derived from their "legacy" counterparts.
 * 
 * All changes are reactive, so data is *always* in sync in the native
 * storage key/value map, as well as in the living storage object.
 * 
 * Try it out:
 * 
 * storage.accessToken = 'foo'
 * storage.refreshToken = 'bar'
 * storage.role = 'abcde'
 * 
 * storage.login = { userData: { access_token: 123, refreshToken: 321 }}
 * storage.dashboard = { selectedCountry: 'US', homeYard: 12, selectedYard: 68 }
 * 
 * All values stay in sync. (Although some go undefined with this code.)
 * 
 */