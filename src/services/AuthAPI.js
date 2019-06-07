//axios to send ajax request
import axios from 'axios'
import HTTPconfig from "../HTTPConfig"


export const requestSignIn = (authData) => {
  return axios({
    method: 'post',
    url: `${HTTPconfig.gateway}api/tokens`,
    headers: HTTPconfig.HTTP_HEADER,
    // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
    // This will set an `Authorization` header, overwriting any existing
    // `Authorization` custom headers you have set using `headers`.
    // Please note that only HTTP Basic auth is configurable through this parameter.
    // For Bearer tokens and such, use `Authorization` custom headers instead.
    auth: authData
  });
}