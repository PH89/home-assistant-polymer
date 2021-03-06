import * as HAWS from 'home-assistant-js-websocket';

window.HAWS = HAWS;
window.HASS_DEMO = __DEMO__;
window.HASS_DEV = __DEV__;
window.HASS_BUILD = __BUILD__;
window.HASS_VERSION = __VERSION__;

const init = window.createHassConnection = function (password) {
  const proto = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const url = `${proto}://${window.location.host}/api/websocket?${window.HASS_BUILD}`;
  const options = {
    setupRetry: 10,
  };
  if (password !== undefined) {
    options.authToken = password;
  }

  return HAWS.createConnection(url, options)
    .then(function (conn) {
      HAWS.subscribeEntities(conn);
      HAWS.subscribeConfig(conn);
      return conn;
    });
};

if (window.noAuth === '1') {
  window.hassConnection = init();
} else if (window.localStorage.authToken) {
  window.hassConnection = init(window.localStorage.authToken);
} else {
  window.hassConnection = null;
}
