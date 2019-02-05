//axios to send ajax request
import axios from 'axios'
import HTTPconfig from "../HTTPConfig"

export const requestListDataset = () => {
  return axios({
    method: 'get',
    url: `${HTTPconfig.gateway}api/ls-ds`,
  });
}