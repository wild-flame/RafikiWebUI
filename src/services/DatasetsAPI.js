//axios to send ajax request
import axios from 'axios'
import HTTPconfig from "../HTTPconfig"

export function _makeUrl(urlPath, params = {}) {
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  const queryString = query ? `?${query}` : '';
  const baseUrl = HTTPconfig.gateway
  const url = new URL(`${urlPath}${queryString}`, baseUrl)
  return url.toString()
}

export function _getHeader(token) {
  if (token) {
    return {
      "Authorization": `Bearer ${token}`
    }
  } else {
    return {}
  }
}

export const requestListDataset = (params, token) => {
  // require bearer token to do the authentication
  console.log(`Authorization: Bearer ${token}`)
  return _getWithToken(datasets, params, token)
}

export const _getWithToken = (url, params, token) => {
  return axios({ // Axios(config) is a promise
    method: 'get',
    url: _makeUrl(url, params), // Use _makeUrl function to get the url
    headers: _getHeader(token)
  });
}

export const _postFormWithToken = (url, formData, token, params={}) => {
  return axios({ // Axios(config) is a promise
    method: 'post',
    url: _makeUrl(url, params), // Use _makeUrl function to get the url
    headers: _getHeader(token),
    data: formData
  });
}

async createDataset(name, task, file, dataset_url) {
  const formData = new FormData();
  if (file !== undefined) {
    formData.append('dataset', file)
  } else {
    formData.append("dataset_url", dataset_url)
  }
  formData.append("name", name)
  formData.append("task", task)
  const dataset = await this._postForm('/datasets', formData)
  return dataset
}

export const postCreateDataset = (name, task, file, dataset_url, token) => {
  const formData = new FormData();
  if (file !== undefined) {
    formData.append('dataset', file)
  } else {
    formData.append("dataset_url", dataset_url)
  }
  formData.append("name", name)
  formData.append("task", task)
  const dataset = await this._postForm('/datasets', formData)
  return dataset
}

