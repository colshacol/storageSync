import SyncMap from '../SyncMap'
import StorageSync from '../StorageSync'

export const populateLocalStorage = () => {
  localStorage.setItem(
    'dashboard',
    '{"homeYard":700,"homeTimeZone":"PDT","selectedYard":700,"yard":{"id":"COPART|700","doc_type":"yard","source":"BATCH","company_code":"COPART","updated_ts":"2018-08-05T18:05:32Z","yard_number":700,"yard_name":"CORP-DALLAS","yard_address1":"14185 DALLAS PARKWAY #300","yard_address2":"","yard_city":"DALLAS","yard_state_code":"TX","yard_state_desc":"TEXAS","yard_zip":"75254","yard_country_code":"USA","yard_country_desc":"UNITED STATES","yard_phone":"(972) 391-5000","yard_fax":"(707) 639-5088","yard_location_0_coordinate":32.93905,"yard_location_1_coordinate":-96.82264,"yard_location":"32.93905,-96.82264","gm_email":"","rm_email":"","mail_address1":"4610 WEST AMERICA DRIVE","mail_address2":"","mail_city":"FAIRFIELD","mail_state_code":"CA","mail_state_desc":"CALIFORNIA","mail_zip":"94534","mail_country_code":"USA","mail_country_desc":"UNITED STATES","sale_day":"FRI","sale_time":1000,"time_zone":"PDT","wifi":false,"yard_hours":"00:00 to 00:00","yard_days":" through ","yard_begin_day":"","yard_end_day":"","more_info":"Sales are held every","more_info2":"See calendar for more info","link_info2":"salecalendar.html","preliminary_bidding":"Preview and preliminary bidding are available one day prior to the sale day and until one hour before the start of the virtual sale.","endofprebid":"00:30:00.000000","site_code":["CPRTUS"],"physical_yard_flag":false,"vb_flag":false,"yard_phone_areacode":"972","yard_phone_number":"3915000","yard_fax_areacode":"707","yard_fax_number":"6395088","platform_code":"CPRTA","yard_currency":"USD","yard_minbid":0,"yard_region_code":"","_version_":1608009681535500300},"language":"en","selectedCountryA3code":"USA","selectedCountry":"US","selectedCurrency":"USD"}',
  )
  localStorage.setItem(
    'login',
    '{"userData":{"access_token":"ACCESS_TOKEN_0","token_type":"bearer","refresh_token":"REFRESH_TOKEN_0","expires_in":86399,"scope":"login","jti":"b72cbbbb-6362-48ba-8229-67c420ba2660","entity_type":"employee","entity_id":"COCOLCLEAS","entity_name":"Colton Colcleasure","entity_office":"Corporate","entity_country":"US","entity_roles":["AzureMFA","VPN Corp Group","Mail-Signatures-US","PrivateWirelessAccess","AllMyCopartUsers","Document Retention Non Marketing"],"entity_mail":"Colton.Colcleasure@copart.com"},"yardList":[{"number":700,"name":"CORP-DALLAS                   ","address":{"line1":"14185 DALLAS PARKWAY #300     ","city":"DALLAS                   ","state":"TX","country":"USA","zip":{"zip1":"75254","zip2":"    "}},"phoneNumber":"9723915000","isHomeYard":"Y","userSecurityLevel":"16","userName":"COLTON COLCLEASURE            ","numberStr":"700"}],"allowedCountries":[],"attemptFailed":false,"email":"colton.colcleasure@copart.com","errorMessage":"","isAuthenticated":true,"redirectTo":"home","sessionExpired":false,"userPrefs":{}}',
  )
}

export const setUpStorage = () => {
  localStorage.clear()
  populateLocalStorage()

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

  return { storage, syncMap }
}

export const dashboard1 = {
  homeYard: 12,
  homeTimeZone: 'PDT',
  selectedYard: 50,
  yard: {
    id: 'COPART|700',
    doc_type: 'yard',
    source: 'BATCH',
    company_code: 'COPART',
    updated_ts: '2018-08-05T18:05:32Z',
    yard_number: 700,
    yard_name: 'CORP-DALLAS',
    yard_address1: '14185 DALLAS PARKWAY #300',
    yard_address2: '',
    yard_city: 'DALLAS',
    yard_state_code: 'TX',
    yard_state_desc: 'TEXAS',
    yard_zip: '75254',
    yard_country_code: 'USA',
    yard_country_desc: 'UNITED STATES',
    yard_phone: '(972) 391-5000',
    yard_fax: '(707) 639-5088',
    yard_location_0_coordinate: 32.93905,
    yard_location_1_coordinate: -96.82264,
    yard_location: '32.93905,-96.82264',
    gm_email: '',
    rm_email: '',
    mail_address1: '4610 WEST AMERICA DRIVE',
    mail_address2: '',
    mail_city: 'FAIRFIELD',
    mail_state_code: 'CA',
    mail_state_desc: 'CALIFORNIA',
    mail_zip: '94534',
    mail_country_code: 'USA',
    mail_country_desc: 'UNITED STATES',
    sale_day: 'FRI',
    sale_time: 1000,
    time_zone: 'PDT',
    wifi: false,
    yard_hours: '00:00 to 00:00',
    yard_days: ' through ',
    yard_begin_day: '',
    yard_end_day: '',
    more_info: 'Sales are held every',
    more_info2: 'See calendar for more info',
    link_info2: 'salecalendar.html',
    preliminary_bidding:
      'Preview and preliminary bidding are available one day prior to the sale day and until one hour before the start of the virtual sale.',
    endofprebid: '00:30:00.000000',
    site_code: ['CPRTUS'],
    physical_yard_flag: false,
    vb_flag: false,
    yard_phone_areacode: '972',
    yard_phone_number: '3915000',
    yard_fax_areacode: '707',
    yard_fax_number: '6395088',
    platform_code: 'CPRTA',
    yard_currency: 'USD',
    yard_minbid: 0,
    yard_region_code: '',
    _version_: 1608009681535500300,
  },
  language: 'fn',
  selectedCountryA3code: 'FOO',
  selectedCountry: 'FO',
  selectedCurrency: 'FUD',
}
export const login1 = {
  userData: {
    access_token: 'ACCESS_TOKEN_1',
    token_type: 'bearer',
    refresh_token: 'REFRESH_TOKEN_1',
    expires_in: 86399,
    scope: 'login',
    jti: 'b72cbbbb-6362-48ba-8229-67c420ba2660',
    entity_type: 'employee',
    entity_id: 'COCOLCLEAS',
    entity_name: 'Colton Colcleasure',
    entity_office: 'Corporate',
    entity_country: 'US',
    entity_roles: [
      'AzureMFA',
      'VPN Corp Group',
      'Mail-Signatures-US',
      'PrivateWirelessAccess',
      'AllMyCopartUsers',
      'Document Retention Non Marketing',
    ],
    entity_mail: 'Colton.Colcleasure@copart.com',
  },
  yardList: [
    {
      number: 700,
      name: 'CORP-DALLAS                   ',
      address: {
        line1: '14185 DALLAS PARKWAY #300     ',
        city: 'DALLAS                   ',
        state: 'TX',
        country: 'USA',
        zip: { zip1: '75254', zip2: '    ' },
      },
      phoneNumber: '9723915000',
      isHomeYard: 'Y',
      userSecurityLevel: '16',
      userName: 'COLTON COLCLEASURE            ',
      numberStr: '700',
    },
  ],
  allowedCountries: [],
  attemptFailed: false,
  email: 'colton.colcleasure@copart.com',
  errorMessage: '',
  isAuthenticated: true,
  redirectTo: 'home',
  sessionExpired: false,
  userPrefs: {},
}
