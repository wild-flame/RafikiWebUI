//axios to send ajax request
import axios from 'axios'
import HTTPconfig from "../HTTPConfig"

export const requestDBInfo = () => {
  return axios({
    method: 'get',
    url: `${HTTPconfig.gateway}api/info`,
  });
}

export const requestDBSize = () => {
  return axios({
    method: 'get',
    url: `${HTTPconfig.gateway}api/size`,
  })
}