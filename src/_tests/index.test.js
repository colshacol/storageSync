import * as json from '../utilities/json'

import SyncMap from '../SyncMap'
import StorageSync from '../StorageSync'

import { setUpStorage, setupLocalStorage } from './testMockData'
import { dashboard1, login1 } from './testMockData'

const localStorage = window.localStorage

describe('Initialization.', () => {
  it('Should set up derived values at runtime.', () => {
    const { storage } = setUpStorage()

    expect(storage.accessToken).toEqual('ACCESS_TOKEN_0')
    expect(storage.refreshToken).toEqual('REFRESH_TOKEN_0')
    expect(storage.isAuthenticated).toEqual(true)

    expect(storage.login.userData.access_token).toEqual('ACCESS_TOKEN_0')
    expect(storage.login.userData.refresh_token).toEqual('REFRESH_TOKEN_0')
    expect(storage.login.isAuthenticated).toEqual(true)

    expect(localStorage.getItem('isAuthenticated')).toEqual('true')
    expect(localStorage.getItem('accessToken')).toEqual('ACCESS_TOKEN_0')
    expect(localStorage.getItem('refreshToken')).toEqual('REFRESH_TOKEN_0')
  })

  it('Should accept legacy storage as the source of truth.', () => {
    localStorage.setItem('accessToken', 'FOOBAR')
    localStorage.setItem('refreshToken', 'BARBAZ')
    const { storage } = setUpStorage()

    expect(storage.accessToken).toEqual('ACCESS_TOKEN_0')
    expect(storage.refreshToken).toEqual('REFRESH_TOKEN_0')
  })
})

describe('Updating new/short-hand values.', () => {
  it('Should reactively set short-hand keys specified in the syncMap.', () => {
    const { storage } = setUpStorage()
    storage.dashboard = dashboard1

    expect(storage.dashboard).toEqual(dashboard1)
    expect(storage.selectedCountry).toEqual('FO')
    expect(storage.selectedCurrency).toEqual('FUD')
    expect(storage.selectedCountryA3code).toEqual('FOO')
    expect(storage.selectedYardNumber).toEqual(50)
    expect(storage.homeYardNumber).toEqual(12)
  })
})

describe('Updating nested/legacy values.', () => {
  it('Should reactively set legacy keys/paths specified in the syncMap.', () => {
    const { storage } = setUpStorage()

    storage.accessToken = 'abcdefg'
    storage.refreshToken = 'qwerty'
    storage.selectedCountry = 'FR'
    storage.homeYardNumber = 68

    expect(storage.login.userData.access_token).toEqual('abcdefg')
    expect(storage.login.userData.refresh_token).toEqual('qwerty')
    expect(storage.dashboard.selectedCountry).toEqual('FR')
    expect(storage.dashboard.homeYard).toEqual(68)
  })
})

describe('Accurate syncing of data.', () => {
  it('Should sync data correctly to localStorage..', () => {
    const { storage } = setUpStorage()

    storage.accessToken = 'abcdefg'
    storage.refreshToken = 'qwerty'
    storage.selectedCountry = 'FR'
    storage.homeYardNumber = 68

    expect(localStorage.getItem('accessToken')).toEqual('abcdefg')
    expect(localStorage.getItem('refreshToken')).toEqual('qwerty')
    expect(localStorage.getItem('selectedCountry')).toEqual('FR')
    expect(localStorage.getItem('homeYardNumber')).toEqual('68')

    storage.login = login1

    expect(json.parse(localStorage.getItem('login'))).toEqual(login1)

    expect(localStorage.getItem('accessToken')).toEqual(
      login1.userData.access_token,
    )
    expect(localStorage.getItem('refreshToken')).toEqual(
      login1.userData.refresh_token,
    )
  })
})

describe('Helper/utility methods.', () => {
  it('Should have _inspect, map, reduce, filter, and forEach.', () => {
    const { storage } = setUpStorage()

    expect(typeof storage.map).toEqual('function')
    expect(typeof storage.filter).toEqual('function')
    expect(typeof storage.reduce).toEqual('function')
    expect(typeof storage.forEach).toEqual('function')
    expect(typeof storage._inspect).toEqual('function')
  })

  it('Should be spreadable.', () => {
    const { storage } = setUpStorage()

    expect(Array.isArray(...storage)).toBeTruthy()
  })
})

// TODO: Test namespacing.
// TODO: Test namespacing storage persistence.
