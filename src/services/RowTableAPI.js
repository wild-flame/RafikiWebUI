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

// export const requestUploadCSV = onUploadProgress => formData => {
//   return axios({
//     method: 'post',
//     url: `${HTTPconfig.gateway}api/upload-csv`,
//     headers: HTTPconfig.UPLOAD_FILE,
//     data: formData,
//     onUploadProgress: onUploadProgress
//   });
// }

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

export const requestGetDSSchema = dataEntryForGetDSSchema => {
  return axios({
    method: 'post',
    url: `${HTTPconfig.gateway}api/get-ds-sch`,
    headers: HTTPconfig.HTTP_HEADER,
    data: dataEntryForGetDSSchema
  });
}

export const requestGetDataEntry = dataEntryForGetDataEntry => {
  return axios({
    method: 'post',
    url: `${HTTPconfig.gateway}api/get-data-entry`,
    headers: HTTPconfig.HTTP_HEADER,
    data: dataEntryForGetDataEntry
  });
}

export const requestDiffSameDS = dataEntryForSameDS => {
  return axios({
    method: 'post',
    url: `${HTTPconfig.gateway}api/diff-ds-same-ds`,
    headers: HTTPconfig.HTTP_HEADER,
    data: dataEntryForSameDS
  });
}

export const requestDiffDifferentDS = dataEntryForDifferentDS => {
  return axios({
    method: 'post',
    url: `${HTTPconfig.gateway}api/diff-ds-diff-ds`,
    headers: HTTPconfig.HTTP_HEADER,
    data: dataEntryForDifferentDS
  });
}

export const requestDeleteDataset = dataEntryForDeleteDS => {
  return axios({
    method: 'post',
    url: `${HTTPconfig.gateway}api/delete-dataset`,
    headers: HTTPconfig.HTTP_HEADER,
    data: dataEntryForDeleteDS
  });
}

export const requestExportDS = dataEntryForExportDS => {
  return axios({
    method: 'post',
    url: `${HTTPconfig.gateway}api/export-dataset`,
    headers: HTTPconfig.HTTP_HEADER,
    data: dataEntryForExportDS
  });
}

export const requestVersionHistory = item => {
  return axios({
    method: 'post',
    url: `${HTTPconfig.gateway}api/meta-version-history`,
    headers: HTTPconfig.HTTP_HEADER,
    data: item
  });
}
