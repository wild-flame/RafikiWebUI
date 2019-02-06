export const Types = {
  REQUEST_LS_DS: "RowTableCmds/request_ls_ds",
  POPULATE_DS_LIST: "RowTableCmds/populate_ds_list",
  REQUEST_PUT_DE: "RowTableCmds/request_put_de",
  POPULATE_PUT_DE_RESPONSE: "RowTableCmds/populate_put_de_response"

}

export const requestListDS = () => ({
  type: Types.REQUEST_LS_DS
})

export const populateDSList = DatasetList => ({
  type: Types.POPULATE_DS_LIST,
  DatasetList
})

export const requestPutDE = dataEntry => ({
  type: Types.REQUEST_PUT_DE,
  dataEntry
})

export const populatePutDEresponse = Response_PutDE => ({
  type: Types.POPULATE_PUT_DE_RESPONSE,
  Response_PutDE
})