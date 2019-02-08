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

export const requestCreateDS = dataEntryForCreateDS => {
  return axios({
    method: 'post',
    url: `${HTTPconfig.gateway}api/create-ds`,
    headers: HTTPconfig.HTTP_HEADER,
    data: dataEntryForCreateDS
  });
}

export const requestBranchDS = dataEntryForBranchDS => {
  return axios({
    method: 'post',
    url: `${HTTPconfig.gateway}api/branch-ds`,
    headers: HTTPconfig.HTTP_HEADER,
    data: dataEntryForBranchDS
  });
}

export const requestUploadCSV = formData => {
  return axios({
    method: 'post',
    url: `${HTTPconfig.gateway}api/upload-csv`,
    headers: HTTPconfig.UPLOAD_FILE,
    data: formData
  });
}

export const requestPutCSV = dataEntryForPutCSV => {
  return axios({
    method: 'post',
    url: `${HTTPconfig.gateway}api/put-de-by-csv`,
    headers: HTTPconfig.HTTP_HEADER,
    data: dataEntryForPutCSV
  });
}

export const requestGetDataset = dataEntryForGetDS => {
  return axios({
    method: 'post',
    url: `${HTTPconfig.gateway}api/get-ds`,
    headers: HTTPconfig.HTTP_HEADER,
    data: dataEntryForGetDS
  });
}