//axios to send ajax request
import axios from 'axios'
import HTTPconfig from "../HTTPConfig"

export const requestListDataset = () => {
  return axios({
    method: 'get',
    url: `${HTTPconfig.gateway}api/ls-ds`,
  });
}

export const requestPutDataEntry = dataEntry => {
  return axios({
    method: 'post',
    url: `${HTTPconfig.gateway}api/put-de`,
    headers: HTTPconfig.HTTP_HEADER,
    data: dataEntry
  })
}