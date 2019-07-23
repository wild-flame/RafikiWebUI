//axios to send ajax request
import axios from 'axios'
import HTTPconfig from "../HTTPConfig"

export function _makeUrl(urlPath, params = {}) {
    const query = Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&');
    const queryString = query ? `?${query}` : '';
    const baseUrl = HTTPconfig.gateway
    const url = new URL(`${urlPath}${queryString}`, baseUrl)
    return url.toString()
}

export const requestListDataset = (params, token) => {
  // require bearer token to do the authentication
  console.log(`Authorization: Bearer ${token}`)
  return axios({ // Axios(config) is a promise
    method: 'get',
    url: _makeUrl("datasets", params), // Use _makeUrl function to get the url
    headers: {
        "Authorization": `Bearer ${token}`
    }
  });
}


