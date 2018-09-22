/* global chrome */
import httpCal from './http-calendar'
import store from '../store'

const authUrl = () => {
  const manifest = chrome.runtime.getManifest()
  const redirectUrl = chrome.identity.getRedirectURL()
  console.info('redirect url', redirectUrl)

  return [
    'https://accounts.google.com/o/oauth2/auth',
    '?client_id=' + manifest.oauth2.client_id,
    '&response_type=token',
    '&redirect_uri=' + encodeURIComponent(redirectUrl),
    '&scope=' + manifest.oauth2.scopes.join(',')
  ].join('')
}

const extractAccessToken = redirectUri => {
  const m = redirectUri.match(/[#?](.*)/)
  if (!m || m.length < 1) {
    return null
  }
  const params = new URLSearchParams(m[1].split('#')[0])
  return params.get('access_token')
}

const getAuthToken = () => {
  if (store.getters.hasFirefoxToken) {
    store.commit('calSetToken', store.firefoxToken)
    store.dispatch('getEventList')
  } else {
    chrome.identity.launchWebAuthFlow({
      interactive: true,
      url: authUrl()
    }, async redirectUri => {
      const token = extractAccessToken(redirectUri)
      store.dispatch('setTokenForFirefox', token)
      store.dispatch('getEventList')

      // Setting up an interceptor in case of a token expiration or unsuccessful
      // authentication.
      httpCal.interceptors.response.use(null, error => {
        if (error.status === 401) {
          store.dispatch('setTokenForFirefox', '')
          getAuthToken()
        }
        return Promise.reject(error)
      })
    })
  }
}

export default getAuthToken
