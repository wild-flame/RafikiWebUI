//axios to send ajax request
import axios from 'axios'
import HTTPconfig from "../HTTPConfig"


export const requestSignIn = (authData) => {
  return axios({
    method: 'post',
    url: `${HTTPconfig.gateway}rest-auth/login/`,
    headers: HTTPconfig.HTTP_HEADER,
    data: authData
  });
}