<<<<<<< HEAD
/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
=======
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
>>>>>>> 1b030574f9932825a647a1828b54e1e6b9540544

import fetch, { Request, Headers, Response } from 'node-fetch';
import { host } from '../../config';

function localUrl(url) {
  if (url.startsWith('//')) {
    return 'https:' + url;
  }

  if (url.startsWith('http')) {
    return url;
  }

  return `http://${host}${url}`;
}

function localFetch(url, options) {
  return fetch(localUrl(url), options);
}

export { localFetch as default, Request, Headers, Response };
