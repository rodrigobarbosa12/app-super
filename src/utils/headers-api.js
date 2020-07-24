/* @flow */

import getAuthorization from './get-authorization';

const headersApi = async () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  Authorization: await getAuthorization(),
});

export default headersApi;
