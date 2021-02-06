enum authActions {
  requested = 'REQUESTED_AUTH',
  succeeded = 'REQUESTED_AUTH_SUCCEEDED',
  failed = 'REQUESTED_AUTH_FAILED',
  login = 'LOGIN',
  getUser = 'GET_USER',
  getUserSucceeded = 'GET_USER_SUCCEEDED',
  yandexAuth = 'YANDEX_OAUTH',
  yandexAuthSucceeded = 'OAUTH_SUCCEEDED',
}

export default authActions;
