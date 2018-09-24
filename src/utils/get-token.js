/* global chrome */
import store from '../store'

const authUrl = () => {
  const manifest = chrome.runtime.getManifest()
  const redirectUrl = chrome.identity.getRedirectURL()
  console.info('redirect url', redirectUrl)
  return [
    'https://accounts.google.com/o/oauth2/auth',
    '?client_id=' + manifest.applications.gecko.client_id,
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
  if (process.env.VUE_APP_PLATFORM === 'firefox') {
    chrome.identity.launchWebAuthFlow({
      interactive: true,
      url: authUrl()
    }, async redirectUri => {
      const token = extractAccessToken(redirectUri)
      store.dispatch('afterLogin', token)
    })
  } else {
    chrome.identity.getAuthToken({
      interactive: true
    }, async function (token) {
      store.dispatch('afterLogin', token)
    })
  }
}

export default getAuthToken
