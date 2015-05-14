function cookie(name, value, options) {
  'use strict';
  var expires, date, path, domain, secure, cookieValue, cookie, cookies, i;
  if (typeof value !== 'undefined') { // name and value given, set cookie
    options = options || {};
    if (value === null) {
      value = '';
      options.expires = -1;
    }
    expires = '';
    if (options.expires && (typeof options.expires === 'number' || options.expires.toUTCString)) {
      if (typeof options.expires === 'number') {
        date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
      } else {
        date = options.expires;
      }
      expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
    }
    path = options.path ? '; path=' + (options.path) : '';
    domain = options.domain ? '; domain=' + (options.domain) : '';
    secure = options.secure ? '; secure' : '';
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
  } else {
    cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      cookies = document.cookie.split(';');
      for (i = 0; i < cookies.length; i++) {
        cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
}